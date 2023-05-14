<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Symbols\Options\Symbol;

class IssetSymbolRule implements Rule
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
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $pattern = '/^\w+:\w+\/\w+$/';
        if (!preg_match($pattern, $value) or
            strlen($value) == 0 or
            !is_string($value))
        {
            return false;
        }

        $stringExplode = explode(":", $value);
        $symbolExists = Symbol::query()->where('symbol', $stringExplode[1])
            ->where('broker', $stringExplode[0])->exists();

        if (!$symbolExists) {
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
        return 'The validation error message.';
    }
}
