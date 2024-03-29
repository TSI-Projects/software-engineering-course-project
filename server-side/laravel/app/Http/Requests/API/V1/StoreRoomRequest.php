<?php

namespace App\Http\Requests\API\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoomRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'price' => ['required', 'decimal:2', 'min:1'],
            'name' => ['required', 'string', 'min:8'],
            'description' => ['required', 'string', 'min:32'],
            'size' => ['required', 'int', 'min:1'],
            'amenities' => ['nullable', 'array'],
            'amenities.*.id' => ['nullable', 'uuid', 'exists:App\\Models\\Amenity,id'],
            'beds' => ['nullable', 'array'],
            'beds.*.id' => ['nullable', 'uuid', 'exists:App\\Models\\Bed,id'],
            'beds.*.count' => ['nullable', 'int', 'min:1'],
        ];
    }
}
