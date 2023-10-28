<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bed extends Model
{
    use HasUuids;
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'size',
    ];
}
