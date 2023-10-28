<?php

namespace App\Http\Controllers\API\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Laravel\Sanctum\PersonalAccessToken;

class LoginController extends Controller
{
    public function logout(Request $request): Response
    {
        if (! $bearerToken = $request->bearerToken()) {
            abort(401);
        }

        $token = PersonalAccessToken::findToken($bearerToken);

        if (! $token) {
            abort(401);
        }

        $token->delete();

        return Response::noContent();
    }
}
