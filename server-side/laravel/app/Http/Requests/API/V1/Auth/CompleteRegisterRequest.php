<?php

namespace App\Http\Requests\API\V1\Auth;

use Illuminate\Foundation\Http\FormRequest;
use LVR\CountryCode\Three as ISOThreeCountryCode;
use Propaganistas\LaravelPhone\Rules\Phone;

class CompleteRegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'first_name' => ['required', 'string', 'max:32'],
            'last_name' => ['required', 'string', 'max:32'],
            'phone' => ['required', new Phone()],
            'country_iso_code' => ['required', new ISOThreeCountryCode()],
        ];
    }
}
