<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;

Route::middleware('auth')->group(function () {
    Route::get('employee', [EmployeeController::class, 'index'])
        ->name('employee');

    Route::get('employee/export', [EmployeeController::class, 'export'])
        ->name('employee.export');

    Route::get('employee/create', [EmployeeController::class, 'create'])
        ->name('employee.create');

    Route::get('/employee/{employee}/edit', [EmployeeController::class, 'edit'])->name('employee.edit');

    Route::get('/employee/{employee}', [EmployeeController::class, 'show'])
        ->name('employee.show');

    Route::post('/employee', [EmployeeController::class, 'store'])->name('employee.store');


    Route::patch('/employee/{employee}', [EmployeeController::class, 'update'])->name('employee.update');

    Route::delete('/employee/{employee}', [EmployeeController::class, 'destroy'])->name('employee.destroy');
});
