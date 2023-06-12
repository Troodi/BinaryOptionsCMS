<?php

namespace App\Rules;

use App\Models\DepositSystem;
use Illuminate\Contracts\Validation\Rule;

class DepositTextRule implements Rule
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
            (request()->prevText != $value && !DepositSystem::query()->where('text', $value)->exists()) ||
            (request()->prevText == $value && DepositSystem::query()->where('text', $value)->count() == 1)
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
        return __('locale.admin_deposit_cannot_change_text');
    }
}
