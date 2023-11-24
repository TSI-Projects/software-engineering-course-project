<?php

use App\Http\Controllers\API\V1\AmenityController;
use App\Http\Controllers\API\V1\Auth\CompleteRegisterController;
use App\Http\Controllers\API\V1\Auth\LogoutController;
use App\Http\Controllers\API\V1\BedController;
use App\Http\Controllers\API\V1\BookingController;
use App\Http\Controllers\API\V1\MeBookingController;
use App\Http\Controllers\API\V1\MeController;
use App\Http\Controllers\API\V1\RoomController;
use App\Http\Controllers\API\V1\RoomUploadController;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(static function () {
    Route::prefix('/auth')->group(static function () {
        Route::post('/register/complete', [CompleteRegisterController::class, 'store'])->name('auth.register.complete');
        Route::post('/logout', [LogoutController::class, 'logout'])->middleware('auth:sanctum')->name('auth.logout');
    });

    Route::prefix('/me')->middleware('auth:sanctum')->group(static function () {
        Route::get('/', [MeController::class, 'index'])->name('me');
        Route::get('/bookings', [MeBookingController::class, 'index'])->name('me.bookings');
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

        Route::post('/{room}/media/upload', [RoomUploadController::class, 'store'])->name('rooms.media.store');
        Route::delete('/{room}/media', [RoomUploadController::class, 'destroy'])->name('rooms.media.destroy');
    });

    Route::prefix('/bookings')->group(static function () {
        Route::get('/', [BookingController::class, 'index'])->name('bookings.index');
        Route::post('/', [BookingController::class, 'store'])->middleware(['throttle:store-booking', 'auth:sanctum'])->name('bookings.store');
    });
});
