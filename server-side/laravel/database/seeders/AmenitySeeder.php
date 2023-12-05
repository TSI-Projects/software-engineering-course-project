<?php

namespace Database\Seeders;

use App\Models\Amenity;
use Illuminate\Database\Seeder;

class AmenitySeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            ['wifi', 'wifi', 'Бесплатный Wi-Fi'],
            ['mode_fan', 'air_conditioner', 'Кондиционер'],
            ['tv', 'tv', 'Телевизор'],
            ['kitchen', 'refrigerator', 'Холодильник'],
            ['videogame_asset', 'game_console', 'Игровая консоль'],
            ['lightbulb', 'neon_backlight', 'Неоновая подсветка'],
        ] as $item) {
            Amenity::create([
                'icon' => $item[0],
                'slug' => $item[1],
                'name' => $item[2],
            ]);
        }
    }
}
