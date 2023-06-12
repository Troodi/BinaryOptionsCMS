<?php

namespace App\Rules;

use App\Models\Symbols\Options\Symbol;
use Illuminate\Contracts\Validation\Rule;

class CreateSymbolRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {

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
        $exploded = explode("/", $value);
        if (Symbol::query()->where('symbol', $exploded[0].$exploded[1])->exists())
        {
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __('locale.admin_symbol_cannot_create');
    }
}
