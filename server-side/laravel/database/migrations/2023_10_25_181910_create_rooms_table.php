<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rooms', static function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->unsignedFloat('price');
            $table->string('name');
            $table->text('description');
            $table->unsignedTinyInteger('size');
            $table->unsignedFloat('rating');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
