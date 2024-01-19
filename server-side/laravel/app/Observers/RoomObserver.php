<?php

namespace App\Observers;

use App\Models\Room;
use Random\Randomizer;

class RoomObserver
{
    public function creating(Room $room): void
    {
        $room->rating = (new Randomizer())->getFloat(0, 5);
    }

    public function deleted(Room $room): void
    {
        $room->bookings()->delete();
    }
}
