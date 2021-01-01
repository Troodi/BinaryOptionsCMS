<?php

namespace App\Console\Commands;

use App\Models\Symbols\Options\Symbol;
use App\Models\SymbolShortStatistic;
use Carbon\Carbon;
use Illuminate\Console\Command;

class SetSymbolsPercent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'set:percent';

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
      foreach(Symbol::all() as $symbol){
        $stat = SymbolShortStatistic::where('symbol_id', $symbol->id)->get();
        $count = $stat->count();
        if($count){
          $id = SymbolShortStatistic::where('symbol_id', $symbol->id)->latest()->first()->id;
          SymbolShortStatistic::where('symbol_id', $symbol->id)
            ->where('created_at', '<', Carbon::now()->subMinutes(10))
            ->where('id', '<', $id)
            ->delete();
        }
        if($count >= 10){
          $profit_count = $stat->where('profit', '>', 'amount')->count();
          $percent = intval(130 - ($profit_count / $count * 100)); // 130 т.к. на 30 процентов будет повышена доходность, чтобы не была слишком низкой
          if($percent < $symbol->min_percent){
            $percent = $symbol->min_percent;
          }
          elseif($percent > $symbol->max_percent){
            $percent = $symbol->max_percent;
          }
          Symbol::where('id', $symbol->id)->update(['percent' => $percent]);
        } else {
          Symbol::where('id', $symbol->id)->update(['percent' => $symbol->fixed_percent]);
        }
      }
      return 0;
    }
}
