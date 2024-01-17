<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\StoreBookingRequest;
use App\Http\Resources\API\V1\BookingResource;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class BookingController extends Controller
{
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

    public function destroy(Booking $booking)
    {
        $this->authorize('delete', $booking);

        $booking->delete();

        return Response::noContent();
    }
}
