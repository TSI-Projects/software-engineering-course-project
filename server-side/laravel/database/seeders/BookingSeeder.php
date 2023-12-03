<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::factory()->create();
        $room = Room::query()->first();

        Booking::factory()
            ->create([
                'user_id' => $user->getKey(),
                'room_id' => $room->getKey(),
            ]);
    }
}
