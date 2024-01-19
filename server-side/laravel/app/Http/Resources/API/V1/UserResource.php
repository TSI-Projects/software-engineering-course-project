<?php

namespace App\Http\Resources\API\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'email' => $this->email,
            $this->mergeWhen($this->canSeePrivateFields(), fn () => [
                'is_admin' => $this->is_admin,
            ]),
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }

    protected function canSeePrivateFields(): bool
    {
        $user = Auth::guard('sanctum')->user();

        return $user && ($user->getAuthIdentifier() === $this->resource->getKey() || $user->is_admin);
    }
}
