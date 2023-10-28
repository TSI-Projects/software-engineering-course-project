<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Traits\TokenTrait;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Contracts\Provider as SocialiteProvider;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Two\InvalidStateException;
use SocialiteProviders\Manager\Exception\InvalidArgumentException;

class SocialiteController extends Controller
{
    use TokenTrait;

    public const TOKEN_NAME = 'API Auth';

    public const ELECTRON_DEEP_LINK = 'electron-fiddle';

    public function login(string $provider)
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
            ->firstOr(function () use ($socialiteUser) {
                return $this->createNewUser($socialiteUser);
            });

        $accessToken = $this->createToken($user, 'API Auth');

        $redirectUrl = sprintf('%s://oauth/token?accessToken=%s', static::ELECTRON_DEEP_LINK, $accessToken->plainTextToken);

        return Redirect::away($redirectUrl);
    }

    protected function createNewUser(SocialiteUser $socialiteUser): User
    {
        return User::create([
            'email' => $socialiteUser->getEmail(),
            'email_verified_at' => now(),
        ]);
    }

    protected function resolveProvider(string $provider): SocialiteProvider
    {
        try {
            return Socialite::driver($provider);
        } catch (InvalidArgumentException) {
            abort(401);
        }
    }
}
