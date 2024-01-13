<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DivisionController;

Route::middleware('auth')->group(function () {
    Route::get('division', [DivisionController::class, 'index'])
        ->name('division');

    Route::get('division/export', [DivisionController::class, 'export'])
        ->name('division.export');

    Route::get('division/create', [DivisionController::class, 'create'])
        ->name('division.create');

    Route::get('/division/{division}/edit', [DivisionController::class, 'edit'])->name('division.edit');

    Route::get('/division/{division}', [DivisionController::class, 'show'])
        ->name('division.show');

    Route::post('/division', [DivisionController::class, 'store'])->name('division.store');


    Route::patch('/division/{division}', [DivisionController::class, 'update'])->name('division.update');

    Route::delete('/division/{division}', [DivisionController::class, 'destroy'])->name('division.destroy');
});
