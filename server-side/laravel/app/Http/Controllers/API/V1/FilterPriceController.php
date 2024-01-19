<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Room;

class FilterPriceController extends Controller
{
    public function index()
    {
        return [
            'min' => Room::query()->min('price'),
            'max' => Room::query()->max('price'),
        ];
    }
}
