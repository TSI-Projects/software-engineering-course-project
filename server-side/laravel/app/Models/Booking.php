<?php

namespace App\Models;

use App\Models\Enums\BookingStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    use HasUuids;
    use HasFactory;

    protected $fillable = [
        'room_id',
        'checkin_at',
        'checkout_at',
        'adult_count',
        'children_count',
        'first_name',
        'last_name',
        'phone',
        'email',
        'country_iso_code',
    ];

    protected $casts = [
        'chekin_at' => 'date',
        'checkout_at' => 'date',
        'status' => BookingStatus::class,
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}
