<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\V1\BedResource;
use App\Models\Bed;

class BedController extends Controller
{
    public function index()
    {
        $beds = Bed::query()->paginate(20);

        return BedResource::collection($beds);
    }
}
