<?php

namespace App\Rules;

use App\Models\WithdrawSystem;
use Illuminate\Contracts\Validation\Rule;

class WithdrawTextRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if(
            (request()->prevText != $value && !WithdrawSystem::query()->where('text', $value)->exists()) ||
            (request()->prevText == $value && WithdrawSystem::query()->where('text', $value)->count() == 1)
        ){
            return true;
        }

        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Text cannot be changed, because already exists with same name.';
    }
}
