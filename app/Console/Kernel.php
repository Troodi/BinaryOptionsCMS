<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
      $schedule->command('clear:ticks')->everyMinute();
      $schedule->command('clear:deposit')->everyMinute();
      $schedule->command('set:percent')->everyMinute();
      $schedule->command('clear:stat')->everyMinute();
      $schedule->command('exchange:rate')->everyMinute();
      $schedule->command('clear:today_user_stat')->daily();
      $schedule->command('geoip:update')->daily();
      $schedule->command('contest:check')->everyTenMinutes();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
