<?php

namespace App\Observers;

use App\Models\Room;

class RoomObserver
{
    public function deleted(Room $room): void
    {
        $room->bookings()->delete();
    }
}
