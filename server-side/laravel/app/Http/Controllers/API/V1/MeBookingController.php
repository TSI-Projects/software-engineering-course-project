<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\V1\BookingResource;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;

class MeBookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::query()
            ->with(['room'])
            ->where('user_id', Auth::guard('sanctum')->id())
            ->paginate(20);

        return BookingResource::collection($bookings);
    }
}
