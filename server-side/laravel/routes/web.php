<?php

use App\Http\Controllers\Web\SocialiteController;
use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->group(static function () {
    Route::prefix('/{provider}')->group(static function () {
        Route::get('/redirect', [SocialiteController::class, 'redirect'])->name('socialite.index');
        Route::get('/callback', [SocialiteController::class, 'callback'])->name('socialite.callback');
    })->whereIn('provider', ['google']);
});
