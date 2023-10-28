<?php

use App\Http\Controllers\Web\SocialiteController;
use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->group(static function () {
    Route::prefix('/socialite')->group(static function () {
        Route::prefix('/{provider}')->group(static function () {
            Route::get('/login', [SocialiteController::class, 'login'])->name('socialite.index');
            Route::get('/callback', [SocialiteController::class, 'callback'])->name('socialite.callback');
        })->whereIn('provider', ['google']);
    });
});
