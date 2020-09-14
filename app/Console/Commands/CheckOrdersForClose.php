<?php

namespace App\Console\Commands;

use App\Events\ChangeBalance;
use App\Events\CloseOptionEvent;
use App\Models\LatestOrder;
use App\Models\OpenOrders;
use App\Models\Symbols\Options\Ticks;
use App\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
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
          //TODO добавить асинхронность
          $start = microtime(true);
          $opened = OpenOrders::where('close_at', '<', Carbon::now()->format('Y-m-d H:i:s.u'))->get();
          $ticks = Ticks::all();
          foreach($opened as $open){
            $open->delete();
            $closed_price = $ticks->where('symbol_id', $open->symbol_id)->where('created_at', '<', Carbon::parse($open->closed_at)->format('Y-m-d H:i:s.u'))->last()->price;
            $profit = 0;
            $success = false;
            if($closed_price == $open->open_price){
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

            DB::table('order_history_1')->insert([
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
            broadcast(new CloseOptionEvent($model, $open->id, $success));
            if($profit > 0){
              $user = User::find($open->user_id);
              $user->balance = $user->balance + $profit;
              $user->save();
              broadcast(new ChangeBalance($user->balance));
            }
            $last_id = LatestOrder::where('user_id', $open->user_id)->take(10)->latest()->get()->last();
            if($last_id->count() >= 10) {
              LatestOrder::where('id', '<=', $last_id->id)->delete();
            }
          }
          $end = microtime(true) - $start;
          if($end < 1000000){
            usleep(1000000 - $end);
          }
        }
        return 0;
    }
}
