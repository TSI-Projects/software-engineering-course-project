<?php

namespace App\Models;

use App\Observers\RoomObserver;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Plank\Mediable\Mediable;

class Room extends Model
{
    use HasFactory;
    use HasUuids;
    use Mediable;

    protected $fillable = [
        'name',
        'description',
        'price',
        'size',
        'rating',
    ];

    protected $casts = [
        "price" => "decimal:2"
    ];

    public static function booted()
    {
        static::observe(RoomObserver::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function beds(): BelongsToMany
    {
        return $this->belongsToMany(Bed::class, 'room_bed')
            ->withPivot(['count']);
    }

    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(Amenity::class, 'room_amenity');
    }
}
