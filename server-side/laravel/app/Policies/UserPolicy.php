<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        return $user->is_admin ? true : null;
    }

    public function indexBookings(User $user, User $target): bool
    {
        return $user->getKey() === $target->getKey();
    }
}
