<?php

namespace App\Console\Commands;

use App\Events\ChangeBalance;
use App\Models\Contest;
use App\Models\ContestUser;
use App\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateTournamentInfo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contest:check';

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
      $contests = Contest::where('hidden', 0)->where('started_at', '<', Carbon::now())->where('ended_flag', 0)->get();
      foreach ($contests as $contest){
        if(Carbon::now() > $contest->ended_at){
          $contest->update(['ended_flag' => 1]);
        }
        $contest->update(['registered_users' => ContestUser::where('contest_id', $contest->id)->count()]); //TODO не работает
        $type = '';
        switch($contest->type){
          case 1:
            $type = 'balance';
            break;
          case 2:
            $type = 'profit_percent';
            break;
          case 3:
            $type = 'turnover';
            break;
        }
        $count = count($contest->places);
        if($count > 100){
          $count = 100;
        }
        $users = ContestUser::where('contest_id', $contest->id)->where('banned', 0)->orderBy($type, 'desc')
          ->take($count)->get();
        $place = 1;
        $index = 0;
        foreach($users as $user){
          $data = ['winner_place' => $place++];
          if(array_key_exists($index, $contest->places)) {
            $data = array_merge($data, ['winner_reward' => $contest->places[$index++]['reward']]);
          }
          $user->update($data);
        }
        //If contest ended enroll rewards to balance
        if(Carbon::now() > $contest->ended_at){
          $contest_users = ContestUser::where('contest_id', $contest->id)->where('banned', 0)->where('winner_reward', '>', 0)->get();
          foreach($contest_users as $user){
            User::where('id', $user->user_id)->update(['balance' => DB::raw('balance+'.$user->winner_reward)]);
            $main_user = User::where('id', $user->user_id)->first();
            broadcast(new ChangeBalance($main_user->balance, $main_user));
          }
        }
      }
      return 0;
    }
}
