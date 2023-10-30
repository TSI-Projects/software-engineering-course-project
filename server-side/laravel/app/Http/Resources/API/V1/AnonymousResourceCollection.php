<?php

namespace App\Http\Resources\API\V1;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection as IlluminateAnonymousResourceCollection;

class AnonymousResourceCollection extends IlluminateAnonymousResourceCollection
{
    public function paginationInformation($request, $paginated, $default): array
    {
        return [
            'meta' => [
                'perPage' => $paginated['per_page'],
                'currentPage' => $paginated['current_page'],
                'lastPage' => $paginated['last_page'],
                'from' => $paginated['from'],
                'to' => $paginated['to'],
                'total' => $paginated['total'],
            ],
        ];
    }
}
