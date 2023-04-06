<?php

namespace App\Rules;

use App\User;
use Illuminate\Contracts\Validation\Rule;
use App\Helpers\Helper;
use Illuminate\Support\Facades\Auth;

class UserIfAdminIdRule implements Rule
{

    public function __construct()
    {
        //
    }


    public function passes($attribute, $value)
    {
        if (!Helper::isAdmin())
        {
        return true;
        }
        if (is_numeric($value) == true && $value > 0 && !empty($value) && Helper::isAdmin() && !empty (User::where('id', $value)->first()))
        {
            return true;
        }

        return false;
    }



    public function message()
    {
        return 'The validation error message.';
    }

}