<?php

use App\Http\Controllers\CountryController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('fundraising', 'fundraising')->name('fundraising');
Route::inertia('repatriation', 'repatriation')->name('repatriation');
Route::inertia('guides', 'guides')->name('guides');
Route::put('country', [CountryController::class, 'update'])->name('country.update');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
