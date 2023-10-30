<?php

namespace App\Http\Requests\API\V1;

use App\Models\Enums\BookingStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Validator;

class StoreBookingRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'room_id' => ['required', 'uuid', 'exists:App\\Models\\Room,id'],
            'checkin_at' => ['required', 'date', 'after:now'],
            'checkout_at' => ['required', 'date', 'before:+60 years', 'after:checkin_at'],
            'adult_count' => ['required', 'int', 'max:10'],
            'children_count' => ['required', 'int', 'max:10'],
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
                    ->whereIn('status', [
                        BookingStatus::AWAITING_PAYMENT,
                        BookingStatus::RESERVED,
                    ])
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
            function (Validator $validator) {
                $validated = $validator->validated();

                if ($validator->errors()->hasAny(['adult_count', 'children_count'])) {
                    return;
                }

                $maxGuests = DB::table('beds')
                    ->selectRaw('(sum(beds.size) * sum(room_bed.count)) as max_guests')
                    ->join('room_bed', 'beds.id', '=', 'room_bed.bed_id')
                    ->where('room_bed.room_id', $validated['room_id'])
                    ->pluck('max_guests')
                    ->first();

                $guestCount = $validated['adult_count'] + $validated['children_count'];

                if ($guestCount > $maxGuests) {
                    $validator->addFailure('adult_count', 'validation.rooms.max_guests');
                    $validator->addFailure('children_count', 'validation.rooms.max_guests');
                }
            },
        ];
    }
}
