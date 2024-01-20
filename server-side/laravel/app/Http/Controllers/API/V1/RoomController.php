<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\StoreRoomRequest;
use App\Http\Resources\API\V1\RoomResource;
use App\Models\Booking;
use App\Models\Room;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Response;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::query()
            ->withMedia(['image'])
            ->with(['beds', 'amenities'])
            ->paginate(20);

        return RoomResource::collection($rooms);
    }

    public function show(Room $room)
    {
        $room->loadMedia(['image']);
        $room->load(['beds', 'amenities']);

        $bookings = Booking::query()
            ->where('room_id', $room->getKey())
            ->whereDate('created_at', '<=', now()->addMonth(3))
            ->get();

        $reservedDates = $bookings->map(fn (Booking $booking) => [
            'checkin_at' => $booking->checkin_at,
            'checkout_at' => $booking->checkout_at,
        ]);

        return RoomResource::make($room)->additional([
            'data' => [
                'reserved_dates' => $reservedDates,
            ],
        ]);
    }

    public function destroy(Room $room)
    {
        $this->authorize('delete', $room);

        $room->delete();

        return Response::noContent();
    }

    public function update(Room $room, StoreRoomRequest $request)
    {
        $this->authorize('update', $room);

        return $this->save($room, $request);
    }

    public function store(StoreRoomRequest $request)
    {
        $this->authorize('store', Room::class);

        return $this->save(Room::query()->make(), $request);
    }

    protected function save(Room $room, StoreRoomRequest $request): RoomResource
    {
        $validated = $request->validated();

        $room
            ->fill(Arr::except($validated, ['amenities', 'beds']))
            ->save();

        if (isset($validated['amenities'])) {
            $amenities = collect($validated['amenities'])
                ->map(fn (array $amenity) => $amenity['id'])
                ->all();

            $room->amenities()->sync($amenities);
        }

        if (isset($validated['beds'])) {
            $beds = collect($validated['beds'])
                ->mapWithKeys(fn (array $bed) => [
                    $bed['id'] => ['count' => $bed['count']],
                ])
                ->all();

            $room->beds()->sync($beds);
        }

        return RoomResource::make($room);
    }
}
