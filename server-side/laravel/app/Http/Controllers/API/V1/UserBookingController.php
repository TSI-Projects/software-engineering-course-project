<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\V1\BookingResource;
use App\Models\Booking;
use App\Models\User;

class UserBookingController extends Controller
{
    public function index(User $user)
    {
        $this->authorize('indexBookings', $user);

        $bookings = Booking::query()
            ->with([
                'room' => function ($query) {
                    return $query
                        ->with(['beds', 'amenities'])
                        ->withMedia();
                },
            ])
            ->where('user_id', $user->getKey())
            ->get();

        return BookingResource::collection($bookings);
    }
}
