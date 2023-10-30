<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\StoreBookingRequest;
use App\Http\Resources\API\V1\BookingResource;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function index()
    {
        $booking = Booking::query()->paginate(20);

        return BookingResource::collection($booking);
    }

    public function store(StoreBookingRequest $request)
    {
        $booking = Booking::query()->create(array_merge(
            $request->validated(),
            [
                'user_id' => Auth::id(),
            ],
        ));

        $booking->load(['room']);

        return BookingResource::make($booking);
    }
}
