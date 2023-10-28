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
            'adult_count' => fake()->numberBetween(1, 10),
            'children_count' => fake()->numberBetween(1, 10),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'country_iso_code' => fake()->countryISOAlpha3(),
            'status' => fake()->randomElement(BookingStatus::cases()),
        ];

        if (random_int(1, 100) >= 50) {
            $attributes['checkin_at'] = fake()->date(max: now()->addDays(32));
            $attributes['checkout_at'] = fake()->date(max: now()->addDays(360));
        } else {
            $attributes['checkin_at'] = fake()->date(max: now()->subDays(360));
            $attributes['checkout_at'] = fake()->date(max: now()->subDays(120));
        }

        return $attributes;
    }
}
