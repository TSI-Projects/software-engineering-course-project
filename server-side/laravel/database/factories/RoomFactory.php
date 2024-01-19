<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->domainName(),
            'description' => fake()->realTextBetween(),
            'price' => fake()->randomFloat(2, 5, 100),
            'size' => fake()->numberBetween(10, 100),
            'rating' => fake()->randomFloat(2, 1, 5),
        ];
    }
}
