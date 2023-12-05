<?php

namespace App\Http\Resources\API\V1;

use Illuminate\Http\Request;

class AmenityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'icon' => $this->icon,
            'slug' => $this->slug,
            'name' => $this->name,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}
