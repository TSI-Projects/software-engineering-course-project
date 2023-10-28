<?php

namespace App\Http\Requests\API\V1;

use App\Models\Booking;
use App\Models\Enums\BookingStatus;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Validator;
use Propaganistas\LaravelPhone\Rules\Phone;
use LVR\CountryCode\Three as CountryCode;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'room_id' => ['required', 'uuid', 'exists:App\\Models\\Room,id'],
            'checkin_at' => ['required', 'date', 'before:now'],
            'checkout_at' => ['required', 'date', 'after:checkin_at'],
            'adult_count' => ['required', 'int', 'max:10'],
            'children_count' => ['required', 'int', 'max:10'],
            'first_name' => ['required', 'string', 'max:64'],
            'last_name' => ['required', 'string', 'max:64'],
            'phone' => ['required', new Phone()],
            'email' => ['required', 'email'],
            'country_iso_code' => ['required', new CountryCode()],
        ];
    }

    protected function after(): array
    {
        $validated = $this->validated();

        return [
            function (Validator $validator) use ($validated) {
                if ($validator->errors()->hasAny(['checkin_at', 'checkin_out'])) {
                    return;
                }

                $exists = Booking::query()
                    ->whereIn('status', [
                        BookingStatus::RESERVED,
                    ])
                    ->whereRaw("(?, ?) overlaps (?, ?)", [
                        $validated['checkin_at'], $validated['checkin_at'],
                        $validated['checkin_out'], $validated['checkin_out'],
                    ])
                    ->orWhereRaw('? = ?', [$validated['checkin_at'], $validated['checkin_out']])
                    ->exists();

                if ($exists) {
                    $validator->addFailure('checkin_at', 'validation.overlaps');
                    $validator->addFailure('checkin_out', 'validation.overlaps');
                }
            },
            function (Validator $validator) use ($validated) {
                if ($validator->errors()->hasAny(['checkin_out'])) {
                    return;
                }

                $diffInDays = Carbon::parse($validated['checkin_out'])->diffInDays();

                if ($diffInDays > 60) {
                    $validator->addFailure('checkin_out', 'validation.diff');
                }
            }
        ];
    }
}
