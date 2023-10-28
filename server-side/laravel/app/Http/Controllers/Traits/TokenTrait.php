<?php

namespace App\Http\Controllers\Traits;

use App\Models\User;
use Laravel\Sanctum\NewAccessToken;

trait TokenTrait
{
    public function createToken(User $user, string $name, bool $remember = false): NewAccessToken
    {
        $expireIn = $remember
            ? null
            : config('session.lifetime', 120) * 60;

        $expiresAt = $expireIn
            ? now()->addSeconds($expireIn)
            : null;

        return $user->createToken(
            name: 'API Auth',
            expiresAt: $expiresAt,
        );
    }
}
