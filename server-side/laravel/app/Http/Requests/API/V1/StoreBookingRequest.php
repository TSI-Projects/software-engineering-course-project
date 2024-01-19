<?php

namespace App\Http\Requests\API\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Validator;

class StoreBookingRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'room_id' => ['required', 'uuid', 'exists:App\\Models\\Room,id'],
            'checkin_at' => ['required', 'date', 'after:today'],
            'checkout_at' => ['required', 'date', 'before:+1 month', 'after:checkin_at'],
        ];
    }

    protected function after(): array
    {
        return [
            function (Validator $validator) {
                $validated = $validator->validated();

                if ($validator->errors()->hasAny(['checkin_at', 'checkout_at'])) {
                    return;
                }

                $exists = DB::table('bookings')
                    ->where(static function ($query) use ($validated) {
                        $query->whereDate('checkin_at', '>=', $validated['checkin_at']);
                        $query->whereDate('checkout_at', '<=', $validated['checkout_at']);
                    })
                    ->exists();

                if ($exists) {
                    $validator->addFailure('checkin_at', 'validation.rooms.overlaps');
                    $validator->addFailure('checkout_at', 'validation.rooms.overlaps');
                }
            },
        ];
    }
}
