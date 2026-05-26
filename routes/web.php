<?php

use App\Http\Controllers\Auth\AddressController;
use App\Http\Controllers\Auth\OrderController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'indexPage'])
    ->name('home');

Route::get('/checkout', [HomeController::class, 'checkoutPage'])
    ->name('checkout');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/addresses/get', [AddressController::class, 'get'])->name('addresses.get');
    Route::post('/addresses/store', [AddressController::class, 'store'])->name('addresses.store');
    Route::get('/address/last', [AddressController::class, 'getLast'])->name('addresses.last');

    Route::post('/order/store', [OrderController::class, 'store'])->name('order.store');
    Route::get('/order/{id}', [OrderController::class, 'show'])->name('order.show');
});

require __DIR__ . '/auth.php';
