<?php

namespace App\Http\Controllers\API\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\TokenTrait;
use App\Http\Requests\API\V1\Auth\CompleteRegisterRequest;
use App\Models\User;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Crypt;

class CompleteRegisterController extends Controller
{
    use TokenTrait;

    public function store(CompleteRegisterRequest $request)
    {
        $this->assertTokenValid(
            $validated = $request->validated()
        );

        $exists = User::query()
            ->where('email', $validated['email'])
            ->exists();

        if ($exists) {
            abort(403);
        }

        $accessToken = $this->createToken(
            $this->createNewUser($validated),
        );

        return [
            'accessToken' => $accessToken,
        ];
    }

    protected function createNewUser(array $validated)
    {
        return User::create([
            'email' => $validated['email'],
            'email_verified_at' => now(),
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
        ]);
    }

    protected function assertTokenValid(array $validated): void
    {
        try {
            $token = Crypt::decrypt($validated['token']);
        } catch (DecryptException) {
            abort(403);
        }

        if (! hash_equals($token['email'], $validated['email'])) {
            abort(403);
        }

        if (now() >= Carbon::parse($token['expires_at'])) {
            abort(403);
        }
    }
}
