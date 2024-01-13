<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DepartementController;

Route::middleware('auth')->group(function () {
    Route::get('departement', [DepartementController::class, 'index'])
        ->name('departement');

    Route::get('departement/export', [DepartementController::class, 'export'])
        ->name('departement.export');

    Route::get('departement/create', [DepartementController::class, 'create'])
        ->name('departement.create');

    Route::get('/departement/{departement}/edit', [DepartementController::class, 'edit'])->name('departement.edit');

    Route::get('/departement/{departement}', [DepartementController::class, 'show'])
        ->name('departement.show');

    Route::post('/departement', [DepartementController::class, 'store'])->name('departement.store');


    Route::patch('/departement/{departement}', [DepartementController::class, 'update'])->name('departement.update');

    Route::delete('/departement/{departement}', [DepartementController::class, 'destroy'])->name('departement.destroy');
});
