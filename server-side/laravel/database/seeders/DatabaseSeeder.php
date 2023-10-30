<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Amenity;
use App\Models\Bed;
use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Room::factory()
            ->has(Booking::factory()->for(User::factory())->count(1))
            ->has(Amenity::factory()->count(1))
            ->hasAttached(Bed::factory()->count(1), [
                'count' => fake()->numberBetween(1, 2),
            ])
            ->count(20)
            ->create();
    }
}
