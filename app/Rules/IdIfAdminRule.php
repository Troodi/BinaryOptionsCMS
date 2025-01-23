<?php

namespace App\Rules;

use App\Helpers\Helper;
use App\User;
use Illuminate\Contracts\Validation\Rule;

class IdIfAdminRule implements Rule
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
        if (is_numeric($value) == true && $value > 0 && !empty($value) && Helper::isAdmin())
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
