<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Rules\AlwaysFail;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', new AlwaysFail],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id), new AlwaysFail],
            'username' => [
                'required',
                'string',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
                new AlwaysFail
            ],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $validator->errors()->add('profile', 'Profile update is disabled!');
        });
    }
}
