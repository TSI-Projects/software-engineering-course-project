<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Plank\Mediable\Media as PlankMedia;

class Media extends PlankMedia
{
    use HasFactory;
    use HasUuids;
}
