<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Bed extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'slug',
        'name',
        'size',
    ];

    public function rooms(): BelongsToMany
    {
        return $this->belongsToMany(Room::class, 'room_bed')
            ->withPivot(['count']);
    }
}
