<?php

namespace App\Http\Resources\API\V1;

use Illuminate\Http\Request;

class BedResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'slug' => $this->slug,
            'name' => $this->name,
            'size' => $this->size,
            'room_bed' => $this->whenPivotLoaded('room_bed', function () {
                return [
                    'count' => $this->pivot->count,
                ];
            }),
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}
