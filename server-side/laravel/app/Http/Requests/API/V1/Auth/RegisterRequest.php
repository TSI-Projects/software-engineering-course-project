<?php

namespace App\Http\Requests\API\V1\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'phone' => ['requried', 'string'],
            'email' => ['required', 'string', 'unique:App\\Models\\User,email'],
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'country_iso_code' => ['required', 'string', 'min:3', 'max:3'],
            'password' => ['required', Password::min(8)
                ->letters()
                ->mixedCase()
                ->numbers()
                ->symbols(),
            ],
        ];
    }
}
