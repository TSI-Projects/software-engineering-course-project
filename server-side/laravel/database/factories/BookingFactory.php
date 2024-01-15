<?php

namespace Database\Factories;

use App\Models\Enums\BookingStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    public function definition(): array
    {
        $attributes = [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'phone' => fake()->phoneNumber(),
            'country_iso_code' => fake()->countryISOAlpha3(),
            'adult_count' => fake()->numberBetween(1, 10),
            'children_count' => fake()->numberBetween(1, 10),
            'status' => fake()->randomElement(BookingStatus::cases()),
        ];

        if (random_int(1, 100) >= 50) {
            $attributes['checkin_at'] = fake()->unique()->dateTimeBetween(startDate: 'now', endDate: '+32 days', timezone: 'UTC');
            $attributes['checkout_at'] = fake()->unique()->dateTimeBetween(startDate: '+33 days', endDate: '+360 days', timezone: 'UTC');
        } else {
            $attributes['checkin_at'] = fake()->unique()->dateTimeBetween(startDate: '-120 days', endDate: 'now', timezone: 'UTC');
            $attributes['checkout_at'] = fake()->unique()->dateTimeBetween(startDate: '-60 days', endDate: 'now', timezone: 'UTC');
        }

        return $attributes;
    }
}
