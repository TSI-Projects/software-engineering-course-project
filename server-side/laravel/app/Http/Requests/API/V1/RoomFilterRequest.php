<?php

namespace App\Http\Requests\API\V1;

use Illuminate\Foundation\Http\FormRequest;

class RoomFilterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'checkin_at' => ['required', 'date', 'after:today'],
            'checkout_at' => ['required', 'date', 'before:+1 month', 'after:checkin_at'],
            'guest_count' => ['required', 'int'],
            'order_by' => ['required', 'array:direction,column'],
            'order_by.direction' => ['required', 'string', 'in:asc,desc'],
            'order_by.column' => ['required', 'string', 'in:rating,price'],
        ];
    }
}
