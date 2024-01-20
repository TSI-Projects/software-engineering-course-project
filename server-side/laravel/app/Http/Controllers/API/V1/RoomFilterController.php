<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\RoomFilterRequest;
use App\Http\Resources\API\V1\RoomResource;
use App\Models\Bed;
use App\Models\Booking;
use App\Models\Room;
use Illuminate\Database\Query\Builder as QueryBuilder;

class RoomFilterController extends Controller
{
    public function __invoke(RoomFilterRequest $request)
    {
        $validated = $request->validated();

        $orderBy = match ($validated['order_by']['column'] ?? null) {
            'rating' => 'rooms.rating',
            'price' => 'rooms.price',
            default => 'id'
        };

        $rooms = Room::query()
            ->from(function (QueryBuilder $query) {
                return $query
                    ->from((new Room())->getTable())
                    ->addSelect([
                        'rooms.*',
                        'max_guests' => Bed::query()
                            ->selectRaw('sum(room_bed.count) * sum(beds.size)')
                            ->whereColumn('room_bed.room_id', 'rooms.id')
                            ->join('room_bed', 'beds.id', 'room_bed.bed_id'),
                    ]);
            }, 'rooms')
            ->whereNotIn('rooms.id', static function (QueryBuilder $query) use ($request) {
                $checkinAt = $request->date('checkin_at')->toDateString();
                $checkoutAt = $request->date('checkout_at')->toDateString();

                return $query
                    ->select('room_id')
                    ->from((new Booking())->getTable())
                    ->where('checkin_at', '<', $checkoutAt)
                    ->where('checkout_at', '>', $checkinAt);
            })
            ->where('max_guests', '>=', $validated['guest_count'])
            ->orderBy($orderBy, $validated['order_by']['direction'] ?? 'asc')
            ->get('rooms.*');

        $rooms->loadMedia(['image']);
        $rooms->load(['beds', 'amenities']);

        return RoomResource::collection($rooms);
    }
}
