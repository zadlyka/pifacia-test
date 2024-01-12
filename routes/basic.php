<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BasicController;

Route::middleware('auth')->group(function () {
    Route::get('basic', [BasicController::class, 'index'])
        ->name('basic');

    Route::get('basic/create', [BasicController::class, 'create'])
        ->name('basic.create');

    Route::get('/basic/{basic}/edit', [BasicController::class, 'edit'])->name('basic.edit');

    Route::get('/basic/{basic}', [BasicController::class, 'show'])
        ->name('basic.show');



    Route::post('/basic', [BasicController::class, 'store'])->name('basic.store');


    Route::patch('/basic/{basic}', [BasicController::class, 'update'])->name('basic.update');

    Route::delete('/basic/{basic}', [BasicController::class, 'destroy'])->name('basic.destroy');
});
