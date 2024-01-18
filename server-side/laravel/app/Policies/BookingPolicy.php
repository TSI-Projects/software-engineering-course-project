<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;

class BookingPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        return $user->is_admin ? true : null;
    }

    public function delete(User $user, Booking $booking): bool
    {
        return $user->getKey() === $booking->user_id;
    }
}
