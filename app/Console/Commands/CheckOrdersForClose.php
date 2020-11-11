<?php

namespace App\Console\Commands;

use App\Events\ChangeBalance;
use App\Events\ChangeDemoBalance;
use App\Events\CloseOptionEvent;
use App\MarketStatus;
use App\Models\LatestDemoOrder;
use App\Models\LatestOrder;
use App\Models\OpenDemoOrders;
use App\Models\OpenOrders;
use App\Models\Referral;
use App\Models\Symbols\Options\Ticks;
use App\Models\SymbolShortStatistic;
use App\Models\SymbolStatistic;
use App\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class CheckOrdersForClose extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:orders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        while(true){
          $start = microtime(true);
          $opened = OpenOrders::where('close_at', '<', Carbon::now()->format('Y-m-d H:i:s.u'))->get();
          $opened_demo = OpenDemoOrders::where('close_at', '<', Carbon::now()->format('Y-m-d H:i:s.u'))->get();
          $market = MarketStatus::all();
          $this->processOrders($opened, $market, false);
          $this->processOrders($opened_demo, $market, true);
          $end = microtime(true) - $start;
          if($end < 1000000){
            usleep(1000000 - $end);
          }
        }
        return 0;
    }

    private function processOrders($opened, $market, $demo = false){
      foreach($opened as $open){
        $open->delete();
        $closed_price_obj = Ticks::where('symbol_id', $open->symbol_id)
          ->where('created_at', '<', Carbon::parse($open->closed_at)->format('Y-m-d H:i:s.u'))
          ->orderBy('created_at', 'desc')
          ->first();
        $profit = 0;
        $success = false;
        if(!isset($closed_price_obj) or !$closed_price_obj->count()){
          continue;
        } else {
          $closed_price = $closed_price_obj->price;
        }
        $current_market = $market->where('symbol_id', $open->symbol_id)->first();
        if(((Carbon::now()->hour >= $closed_price_obj->work_to or Carbon::now()->hour < $closed_price_obj->work_from) and ($closed_price_obj->work_from != $closed_price_obj->work_to)) or !Cache::has('latest_websocket_update') or time() - 5 > Cache::get('latest_websocket_update') or $closed_price == -1 or !isset($current_market) or !$current_market->count() or $current_market->market_status != 'market'){ // Проверка на закрытие рынка на момент закрытия сделки
          $closed_price = $open->open_price;
          $profit = $open->amount;
          $success = true;
        }
        elseif($closed_price == $open->open_price){
          $profit = $open->amount;
          $success = true;
        }
        elseif($open->type == 1){ // Покупка
          if($closed_price > $open->open_price) {
            $profit = $open->amount + ($open->amount * $open->percent / 100);
            $success = true;
          } else {
            $profit = 0;
            $success = false;
          }
        } else { // Продажа
          if($closed_price < $open->open_price) {
            $profit = $open->amount + ($open->amount * $open->percent / 100);
            $success = true;
          } else {
            $profit = 0;
            $success = false;
          }
        }

        $order_history_table = 'order_history_1';
        if($demo){
          $order_history_table = 'order_demo_history_1';
        }

        DB::table($order_history_table)->insert([
          'symbol_id' => $open->symbol_id,
          'user_id' => $open->user_id,
          'close_at' => $open->close_at,
          'amount' => $open->amount,
          'profit' => $profit,
          'percent' => $open->percent,
          'open_price' => $open->open_price,
          'close_price' => $closed_price,
          'type' => $open->type,
          'open_at' => Carbon::parse($open->created_at)->format('Y-m-d H:i:s.u'),
          'created_at' => Carbon::now()->format('Y-m-d H:i:s.u'),
        ]);

        $model = new LatestOrder;
        if($demo){
          $model = new LatestDemoOrder;
        }
        $model->symbol_id = $open->symbol_id;
        $model->user_id = $open->user_id;
        $model->close_at = $open->close_at;
        $model->amount = $open->amount;
        $model->profit = $profit;
        $model->percent = $open->percent;
        $model->open_price = $open->open_price;
        $model->close_price = $closed_price;
        $model->type = $open->type;
        $model->open_at = Carbon::parse($open->created_at)->format('Y-m-d H:i:s.u');
        $model->created_at = Carbon::now()->format('Y-m-d H:i:s.u');
        $model->save();
        $diff = date_diff(new \DateTime($model->close_at), new \DateTime($model->open_at));
        $model->expiration = sprintf("%'.02d", $diff->h).':'.sprintf("%'.02d", $diff->i).':'.sprintf("%'.02d", $diff->s);
        broadcast(new CloseOptionEvent($model, $open->id, $success, $open->user_id));
        if(!$open->hedging and !$demo){ // Если не хеджирование и не демо счет
          User::where('id', $open->user_id)->update(['left_turnover' => DB::raw("left_turnover-$open->amount")]);
        }
        if($profit > 0 and !$demo){ // Если прибыль на реал счете
          $user = User::find($open->user_id);
          $user->balance = $user->balance + $profit;
          $user->save();
          $referer_id = $user->referer_id;
          if($referer_id and !$user->left_turnover){ // Если бонус отработан, даем рефереру процент
            $balance_to_referer = $model->amount * 0.02;
            User::where('id', $referer_id)->update(['balance' => DB::raw("balance+$balance_to_referer")]);
            Referral::where('user_id', $referer_id)->update(['balance' => DB::raw("reward+$balance_to_referer")]);
          }
          broadcast(new ChangeBalance($user->balance, $user));
        }
        if($profit > 0 and $demo){ // Если прибыль на демо счете
          $user = User::find($open->user_id);
          $user->demo_balance = $user->demo_balance + $profit;
          $user->save();
          broadcast(new ChangeDemoBalance($user->demo_balance, $user));
        }
        $latest_order_table = 'latest_orders';
        if($demo){
          $latest_order_table = 'latest_demo_orders';
        }
        $latest_order_table_instance = DB::table($latest_order_table)->where('user_id', $open->user_id);
        $last_id = $latest_order_table_instance->take(10)->latest()->get()->last();
        if($latest_order_table_instance->count() >= 10) {
          DB::table($latest_order_table)->where('id', '<=', $last_id->id)->delete();
        }
        if(!$demo){
          $model = new SymbolShortStatistic();
          $model->symbol_id = $open->symbol_id;
          $model->amount = $open->amount;
          $model->profit = $profit;
          $model->save();

          if(!SymbolStatistic::where('symbol_id', $open->symbol_id)->where('created_at', '>=', Carbon::today())->count()){
            SymbolStatistic::create(['symbol_id' => $open->symbol_id]);
          }

          SymbolStatistic::where('symbol_id', $open->symbol_id)->where('created_at', '>=', Carbon::today())->update([
            'daily_orders_count' => DB::raw('daily_orders_count+1'),
            'daily_orders_amount' => DB::raw("daily_orders_amount+$open->amount"),
            'daily_profit' => DB::raw("daily_profit+".($profit > 0 ? strval($profit - $open->amount) : '0')),
            'daily_loss' => DB::raw("daily_loss+".($profit == 0 ? strval($open->amount) : '0')),
            'daily_profit_count' => DB::raw("daily_profit_count+".($profit > 0 ? '1' : '0')),
            'daily_loss_count' => DB::raw("daily_loss_count+".($profit == 0 ? '1' : '0')),
          ]);
        }
      }
    }
}
