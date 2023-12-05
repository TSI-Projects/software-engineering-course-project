<?php

namespace App\Http\Requests\API\V1;

use Illuminate\Foundation\Http\FormRequest;

class RoomFilterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'checkin_at' => ['required', 'date', 'after:now'],
            'checkout_at' => ['required', 'date', 'before:+1 month', 'after:checkin_at'],
            'adult_count' => ['required', 'int', 'max:10'],
            // 'children_count' => ['required', 'int', 'max:10'],
            // 'room_count' => ['required', 'int', 'max:10'],
            'order_by' => ['required', 'array'],
            'order_by.direction' => ['required', 'string', 'in:asc,desc'],
            'order_by.column' => ['required', 'string', 'in:rating'],
        ];
    }
}
