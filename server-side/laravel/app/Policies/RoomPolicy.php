<?php

namespace App\Policies;

use App\Models\Room;
use App\Models\User;

class RoomPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        return $user->is_admin ? true : null;
    }

    public function store(User $user): bool
    {
        return false;
    }

    public function update(User $user, Room $room): bool
    {
        return false;
    }

    public function delete(User $user, Room $room): bool
    {
        return false;
    }

    public function uploadMedia(User $user, Room $room): bool
    {
        return false;
    }

    public function deleteMedia(User $user, Room $room): bool
    {
        return false;
    }
}
