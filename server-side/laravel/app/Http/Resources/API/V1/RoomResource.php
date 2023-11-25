<?php

namespace App\Http\Resources\API\V1;

use Illuminate\Http\Request;
use Plank\Mediable\Media;

class RoomResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'name' => $this->name,
            'description' => $this->description,
            'amenities' => AmenityResource::collection($this->whenLoaded('amenities')),
            'beds' => BedResource::collection($this->whenLoaded('beds')),
            'media' => $this->whenLoaded('media', function () {
                return collect($this->media)->mapWithKeys(function (Media $media) {
                    return [$media->pivot->tag => $media->getUrl()];
                });
            }),
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}
