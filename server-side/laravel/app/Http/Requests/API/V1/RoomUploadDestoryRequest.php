<?php

namespace App\Http\Requests\API\V1;

use Illuminate\Foundation\Http\FormRequest;

class RoomUploadDestoryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'media_ids' => ['required', 'array'],
            'media_ids' => ['required', 'uuid', 'exists:App\\Models\\Media,id'],
        ];
    }
}
