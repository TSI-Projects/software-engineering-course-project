<?php

namespace App\Http\Controllers\API\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Laravel\Sanctum\PersonalAccessToken;

class LogoutController extends Controller
{
    public function __invoke(Request $request)
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
