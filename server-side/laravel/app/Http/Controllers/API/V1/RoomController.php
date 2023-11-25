<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\V1\RoomResource;
use App\Models\Booking;
use App\Models\Enums\BookingStatus;
use App\Models\Room;
use Illuminate\Http\Request;

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

    public function show(Room $room, Request $request)
    {
        $room->loadMedia(['image']);
        $room->load(['beds', 'amenities']);

        $additional = [];

        if ($request->boolean('include_unavailable_dates')) {
            $bookings = Booking::query()
                ->where('room_id', $room->getKey())
                ->whereIn('status', [BookingStatus::RESERVED])
                ->whereDate('checkout_at', '<=', now())
                ->get();

            $bookings = $bookings->filter(function (Booking $booking) use ($room) {
                return $booking->room_id === $room->getKey();
            });

            $additional['data']['unavailable_dates'] = $bookings->map(fn (Booking $booking) => [
                'checkin_at' => $booking->checkin_at,
                'checkout_at' => $booking->checkout_at,
            ]);
        }

        return RoomResource::make($room)->additional($additional);
    }
}
