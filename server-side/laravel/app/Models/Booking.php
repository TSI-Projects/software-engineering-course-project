<?php

namespace App\Models;

use App\Models\Enums\BookingStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'user_id',
        'room_id',
        'adult_count',
        'children_count',
        'checkin_at',
        'checkout_at',
    ];

    protected $casts = [
        'chekin_at' => 'datetime',
        'checkout_at' => 'datetime',
        'status' => BookingStatus::class,
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
