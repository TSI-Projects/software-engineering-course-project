<?php

namespace App\Http\Requests\API\V1;

use Illuminate\Foundation\Http\FormRequest;

class RoomUploadStoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'images' => ['required', 'array'],
            'images.*' => ['required', 'image', 'max:4000'],
        ];
    }
}
