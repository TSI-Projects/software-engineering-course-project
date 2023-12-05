<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\RoomFilterRequest;
use App\Models\Bed;
use App\Models\Room;

class RoomFilterController extends Controller
{
    public function __invoke(RoomFilterRequest $request)
    {
        $validated = $request->validated();

        $maxGuests = intval($validated['adult_count']) + intval($validated['chlidren_count']);

        $orderBy = match ($validated['order_by']['column']) {
            'rating' => 'rooms.rating',
            default => 'id'
        };

        return Room::query()
            ->distinct()
            ->addSelect([
                'max_guests' => Bed::query()
                    ->selectRaw('sum(room_bed.count) * sum(beds.size)')
                    ->join('room_bed', 'beds.id', 'room_bed.bed_id'),
            ])
            ->leftJoin('bookings', 'rooms.id', 'bookings.room_id')
            ->where('room_count', '<=', $validated['room_count'])
            ->where('max_guests', '<=', $maxGuests)
            ->where(function ($query) use ($request) {
                $checkoutAt = $request->date('checkout_at')->toDateString();
                $checkintAt = $request->date('checkin_at')->toDateString();

                return $query
                    ->where('checkin_at', '<=', $checkoutAt)
                    ->where('checkout_at', '>=', $checkintAt);
            })
            ->orderBy($orderBy, $validated['order_by']['direction'])
            ->get('rooms.*');
    }
}
