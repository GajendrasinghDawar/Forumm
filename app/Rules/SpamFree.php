<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Exception;
use App\Inspections\Spam;

class SpamFree implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        try {
            resolve(Spam::class)->detect($value);
        } catch (Exception $e) {
            $fail('Your :attribute ' . $e->getMessage());
        }
    }
}
