<?php

namespace Database\Seeders;

use App\Models\Bed;
use Illuminate\Database\Seeder;

class BedSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            ['king', 'King', 2],
            ['queen', 'queen', 2],
            ['single', 'single', 1],
        ] as $item) {
            Bed::create([
                'slug' => $item[0],
                'name' => $item[1],
                'size' => $item[2],
            ]);
        }
    }
}
