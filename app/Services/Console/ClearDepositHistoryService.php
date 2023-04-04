<?php

namespace App\Services\Console;

use App\Models\Deposit;
use Carbon\Carbon;

class ClearDepositHistoryService {

    public function clear()
    {
        Deposit::where('status', 0)->where('created_at', '<', Carbon::now()->subHours(1))->delete();
        dump("Deposit History has been cleared");
        return 0;
    }
}