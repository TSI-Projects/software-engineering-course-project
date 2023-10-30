<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\TokenTrait;
use App\Models\User;
use Laravel\Socialite\Contracts\Provider as SocialiteProvider;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;
use SocialiteProviders\Manager\Exception\InvalidArgumentException;

class SocialiteController extends Controller
{
    use TokenTrait;

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
}
