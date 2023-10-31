<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\TokenTrait;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Contracts\Provider as SocialiteProvider;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;
use SocialiteProviders\Manager\Exception\InvalidArgumentException;

class SocialiteController extends Controller
{
    use TokenTrait;

    public const ELECTRON_DEEP_LINK = 'electron-fiddle';

    public function redirect(string $provider)
    {
        return $this->resolveProvider($provider)->redirect();
    }

    public function callback(string $provider)
    {
        try {
            $socialiteUser = $this->resolveProvider($provider)->user();
        } catch (InvalidStateException) {
            abort(401);
        }

        $user = User::query()
            ->where('email', $socialiteUser->getEmail())
            ->first();

        if ($user) {
            return $this->redirectToToken($user);
        }

        return $this->redirectToRegisterComplete($socialiteUser);
    }

    protected function resolveProvider(string $provider): SocialiteProvider
    {
        try {
            return Socialite::driver($provider);
        } catch (InvalidArgumentException) {
            abort(401);
        }
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
