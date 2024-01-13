<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;

Route::middleware('auth')->group(function () {
    Route::get('role', [RoleController::class, 'index'])
        ->name('role');

    Route::get('role/export', [RoleController::class, 'export'])
        ->name('role.export');

    Route::get('role/create', [RoleController::class, 'create'])
        ->name('role.create');

    Route::get('/role/{role}/edit', [RoleController::class, 'edit'])->name('role.edit');

    Route::get('/role/{role}', [RoleController::class, 'show'])
        ->name('role.show');

    Route::post('/role', [RoleController::class, 'store'])->name('role.store');


    Route::patch('/role/{role}', [RoleController::class, 'update'])->name('role.update');

    Route::delete('/role/{role}', [RoleController::class, 'destroy'])->name('role.destroy');
});
