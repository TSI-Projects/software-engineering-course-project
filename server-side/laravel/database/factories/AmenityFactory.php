<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Amenity>
 */
class AmenityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'slug' => fake()->slug(6),
            'icon' => '',
            'name' => fake()->domainName(),
        ];
    }
}
