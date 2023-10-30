<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', static function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignUuid('room_id')->constrained('rooms')->cascadeOnDelete()->cascadeOnUpdate();
            $table->unsignedTinyInteger('adult_count')->default(1);
            $table->unsignedTinyInteger('children_count')->default(0);
            $table->datetime('checkin_at');
            $table->datetime('checkout_at');
            $table->unsignedTinyInteger('status');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
