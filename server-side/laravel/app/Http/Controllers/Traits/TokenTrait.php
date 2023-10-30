<?php

namespace App\Http\Controllers\Traits;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Redirect;
use Laravel\Sanctum\NewAccessToken;
use Laravel\Socialite\Contracts\User as SocialiteUser;

trait TokenTrait
{
    public const ELECTRON_DEEP_LINK = 'electron-fiddle';

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

    protected function redirectToToken(User $user, bool $remember = false)
    {
        $accessToken = $this->createToken($user, $remember);

        $query = http_build_query([
            'accessToken' => $accessToken->plainTextToken,
        ]);

        return Redirect::away(
            sprintf('%s://auth/token?%s', static::ELECTRON_DEEP_LINK, $query)
        );
    }

    protected function redirectToRegisterComplete(SocialiteUser $socialiteUser): RedirectResponse
    {
        $token = Crypt::encrypt([
            'email' => $socialiteUser->getEmail(),
            'expires_at' => now()->addMinutes(10),
        ]);

        $query = http_build_query([
            'token' => $token,
            'email' => $socialiteUser->getEmail(),
        ]);

        return Redirect::away(
            sprintf('%s://auth/register/complete?%s', static::ELECTRON_DEEP_LINK, $query)
        );
    }
}
