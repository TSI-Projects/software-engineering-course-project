<?php

namespace App\Http\Resources\API\V1;

use Illuminate\Http\Resources\Json\JsonResource as IlluminateJsonResource;
use Override;

class JsonResource extends IlluminateJsonResource
{
    #[Override]
    protected static function newCollection($resource)
    {
        return new AnonymousResourceCollection($resource, static::class);
    }
}
