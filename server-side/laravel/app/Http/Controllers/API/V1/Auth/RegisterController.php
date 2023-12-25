<?php

namespace App\Http\Controllers\API\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\TokenTrait;
use App\Http\Requests\API\V1\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    use TokenTrait;

    public function __invoke(RegisterRequest $request)
    {
        $validated = $request->validated();

        $user = User::query()
            ->create(array_merge($validated, [
                'email_verified_at' => now(),
                'country_iso_code' => Str::upper($validated['country_iso_code']),
                'password' => Hash::make($validated['password']),
            ]));

        $accessToken = $this->createToken($user);

        return [
            'accessToken' => $accessToken->plainTextToken,
        ];
    }
}
