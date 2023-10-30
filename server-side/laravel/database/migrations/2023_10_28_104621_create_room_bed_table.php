<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('room_bed', function (Blueprint $table) {
            $table->foreignUuid('room_id')->constrained('rooms')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignUuid('bed_id')->constrained('beds')->cascadeOnDelete()->cascadeOnUpdate();
            $table->unsignedTinyInteger('count')->default(1);

            $table->unique(['room_id', 'bed_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('room_bed');
    }
};
