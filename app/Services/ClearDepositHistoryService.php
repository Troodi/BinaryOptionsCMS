<?php

namespace App\Services;

use App\Models\Deposit;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ClearDepositHistoryService {

    public function clear()
    {
        Deposit::where('status', 0)->where('created_at', '<', Carbon::now()->subHours(1))->delete();
        dump("Deposit History has been cleared");
        return 0;
    }
}