<?php

use App\Http\Controllers\API\V1\AmenityController;
use App\Http\Controllers\API\V1\Auth\LoginController;
use App\Http\Controllers\API\V1\Auth\LogoutController;
use App\Http\Controllers\API\V1\Auth\RegisterController;
use App\Http\Controllers\API\V1\BedController;
use App\Http\Controllers\API\V1\BookingController;
use App\Http\Controllers\API\V1\MeBookingController;
use App\Http\Controllers\API\V1\MeController;
use App\Http\Controllers\API\V1\RoomController;
use App\Http\Controllers\API\V1\RoomFilterController;
use App\Http\Controllers\API\V1\RoomUploadController;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(static function () {
    Route::prefix('/auth')->group(static function () {
        Route::post('/login', LoginController::class)->middleware('guest:sanctum')->name('auth.login');
        Route::post('/register', RegisterController::class)->middleware('guest:sanctum')->name('auth.register');
        Route::post('/logout', LogoutController::class)->middleware('auth:sanctum')->name('auth.logout');
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
        Route::post('/filter', RoomFilterController::class)->name('rooms.filter');
        Route::get('/{room}', [RoomController::class, 'show'])->name('rooms.show');

        Route::post('/{room}/media/upload', [RoomUploadController::class, 'store'])->name('rooms.media.store');
        Route::delete('/{room}/media', [RoomUploadController::class, 'destroy'])->name('rooms.media.destroy');

        Route::middleware(['auth:sanctum', 'is_admin'])->group(static function () {
            Route::delete('/{room}', [RoomController::class, 'destroy'])->name('rooms.destroy');
            Route::patch('/{room}', [RoomController::class, 'update'])->name('rooms.update');
            Route::post('/', [RoomController::class, 'store'])->name('rooms.store');
        });
    });

    Route::prefix('/bookings')->group(static function () {
        Route::get('/', [BookingController::class, 'index'])->name('bookings.index');
        Route::post('/', [BookingController::class, 'store'])->middleware(['throttle:store-booking', 'auth:sanctum'])->name('bookings.store');
    });
});
