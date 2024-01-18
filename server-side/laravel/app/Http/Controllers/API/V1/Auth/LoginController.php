<?php

namespace App\Http\Controllers\API\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\TokenTrait;
use App\Http\Requests\API\V1\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    use TokenTrait;

    public function __invoke(LoginRequest $request)
    {
        $validated = $request->validated();

        $user = User::query()
            ->where('email', $validated['email'])
            ->first();

        if (! $user) {
            abort(403);
        }

        if (! Hash::check($validated['password'], $user->password)) {
            abort(403);
        }

        $accessToken = $this->createToken($user);

        return [
            'accessToken' => $accessToken->plainTextToken,
            'is_admin' => $user->is_admin,
        ];
    }
}
