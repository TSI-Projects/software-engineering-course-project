<?php

use App\Http\Controllers\API\V1\AmenityController;
use App\Http\Controllers\API\V1\Auth\LoginController;
use App\Http\Controllers\API\V1\BedController;
use App\Http\Controllers\API\V1\BookingController;
use App\Http\Controllers\API\V1\RoomController;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(static function () {
    Route::prefix('/auth')->group(static function () {
        Route::post('/login', [LoginController::class, 'login'])->name('auth.login');
        Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum')->name('auth.logout');
    });

    Route::prefix('/beds')->group(static function () {
        Route::get('/', [BedController::class, 'index'])->name('beds.index');
    });

    Route::prefix('/amenities')->group(static function () {
        Route::get('/', [AmenityController::class, 'index'])->name('amenities.index');
    });

    Route::prefix('/rooms')->group(static function () {
        Route::get('/', [RoomController::class, 'index'])->name('rooms.index');
        Route::get('/{room}', [RoomController::class, 'show'])->name('rooms.show');
    });

    Route::prefix('/bookings')->group(static function () {
        Route::get('/', [BookingController::class, 'index'])->name('bookings.index');
        Route::post('/', [BookingController::class, 'store'])->middleware(['throttle:store-booking', 'auth:sanctum'])->name('bookings.store');
    });
});
