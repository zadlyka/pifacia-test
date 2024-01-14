<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Division;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Exports\ExportEmployee;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Employee\StoreEmployeeRequest;
use App\Http\Requests\Employee\UpdateEmployeeRequest;

class EmployeeController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Employee::class, 'employee');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort =  $request->input('sort');
        $filter =  $request->input('filter');

        $paginate = Employee::search($search)->sort($sort)->filter($filter)->simplePaginate(5);
        return Inertia::render('Employee/Index', [
            'paginate' => $paginate,
            'search' => $search,
            'sort' => $sort,
            'filter' => $filter,
            'options' => [
                'divisions' => Division::get(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employee/Create', [
            'options' => [
                'divisions' => Division::get(),
                'permissions' => [
                    (object) [
                        'value' => "0",
                        'label' => "Manage All"
                    ],
                    (object) [
                        'value' => "100",
                        'label' => "Manage Data"
                    ]
                ]
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $data = $request->safe()->all();
        $file = $request->file('file');

        if ($file) {
            $request->validate([
                'file' => ['max:500', 'min:100', 'mimetypes:application/pdf'],
            ]);

            $path = $file->store('file', 'public');
            $url = Storage::disk('public')->url($path);
            $data['file'] = $url;
        }
        
        Employee::create($data);
        return Redirect::route('employee');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        $audits = $employee->audits()->with('user')->get();
        return Inertia::render('Employee/Show', [
            'employee' => $employee,
            'audits' =>  $audits
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('Employee/Edit',  [
            'employee' => $employee,
            'options' => [
                'divisions' => Division::get(),
                'permissions' => [
                    (object) [
                        'value' => "0",
                        'label' => "Manage All"
                    ],
                    (object) [
                        'value' => "100",
                        'label' => "Manage Data"
                    ]
                ]
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $data = $request->safe()->all();
        $file = $request->file('file');

        if ($file) {
            $request->validate([
                'file' => ['max:500', 'min:100', 'mimetypes:application/pdf'],
            ]);

            $path = $file->store('file', 'public');
            $url = Storage::disk('public')->url($path);
            $data['file'] = $url;
        }
        
        $employee->update($data);
        return Redirect::route('employee');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return Redirect::route('employee');
    }

    public function export()
    {
        return Excel::download(new ExportEmployee, now().' Employees.xlsx');
    }
}
