<?php

namespace App\Http\Resources\API\V1;

use Illuminate\Http\Request;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'room' => RoomResource::make($this->whenLoaded('room')),
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'phone' => $this->phone,
            'checkin_at' => $this->checkin_at,
            'checkout_at' => $this->checkout_at,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}
