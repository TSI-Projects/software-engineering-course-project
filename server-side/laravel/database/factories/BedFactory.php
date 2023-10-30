<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bed>
 */
class BedFactory extends Factory
{
    public function definition(): array
    {
        return [
            'slug' => fake()->slug(6),
            'name' => fake()->domainName(),
            'size' => fake()->randomDigitNotZero(),
        ];
    }
}
