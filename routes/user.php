<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::middleware('auth')->group(function () {
    Route::get('user', [UserController::class, 'index'])
        ->name('user');

    Route::get('user/export', [UserController::class, 'export'])
        ->name('user.export');

    Route::get('user/create', [UserController::class, 'create'])
        ->name('user.create');

    Route::get('/user/{user}/edit', [UserController::class, 'edit'])->name('user.edit');

    Route::get('/user/{user}', [UserController::class, 'show'])
        ->name('user.show');

    Route::post('/user', [UserController::class, 'store'])->name('user.store');


    Route::patch('/user/{user}', [UserController::class, 'update'])->name('user.update');

    Route::delete('/user/{user}', [UserController::class, 'destroy'])->name('user.destroy');
});
