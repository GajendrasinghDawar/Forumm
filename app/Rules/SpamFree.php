<?php

namespace App\Rules;

use App\Inspections\Spam;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

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
        } catch (\Exception $e) {
            $fail('Your :attribute ' . $e->getMessage());
        }
    }
}
