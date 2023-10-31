<?php

namespace App\Http\Controllers\Traits;

use App\Models\User;
use Laravel\Sanctum\NewAccessToken;

trait TokenTrait
{
    public const TOKEN_NAME = 'API Auth';

    protected function createToken(User $user, bool $remember = false): NewAccessToken
    {
        $expireIn = $remember
            ? null
            : config('session.lifetime', 120) * 60;

        $expiresAt = $expireIn
            ? now()->addSeconds($expireIn)
            : null;

        return $user->createToken(
            name: static::TOKEN_NAME,
            expiresAt: $expiresAt,
        );
    }
}
