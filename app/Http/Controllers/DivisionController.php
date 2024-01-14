<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Division;
use App\Models\Departement;
use Illuminate\Http\Request;
use App\Exports\ExportDivision;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Division\StoreDivisionRequest;
use App\Http\Requests\Division\UpdateDivisionRequest;

class DivisionController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Division::class, 'division');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort =  $request->input('sort');
        $filter =  $request->input('filter');

        $paginate = Division::search($search)->sort($sort)->filter($filter)->simplePaginate(5);
        return Inertia::render('Division/Index', [
            'paginate' => $paginate,
            'search' => $search,
            'sort' => $sort,
            'filter' => $filter,
            'options' => [
                'departements' => Departement::get(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Division/Create', [
            'options' => [
                'departements' => Departement::get(),
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
    public function store(StoreDivisionRequest $request)
    {
        $data = $request->safe()->all();
        Division::create($data);
        return Redirect::route('division');
    }

    /**
     * Display the specified resource.
     */
    public function show(Division $division)
    {
        $audits = $division->audits()->with('user')->get();
        return Inertia::render('Division/Show', [
            'division' => $division,
            'audits' =>  $audits
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Division $division)
    {
        return Inertia::render('Division/Edit',  [
            'division' => $division,
            'options' => [
                'departements' => Departement::get(),
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
    public function update(UpdateDivisionRequest $request, Division $division)
    {
        $data = $request->safe()->all();
        $division->update($data);
        return Redirect::route('division');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Division $division)
    {
        $division->delete();
        return Redirect::route('division');
    }

    public function export()
    {
        return Excel::download(new ExportDivision, now() . ' Divisions.xlsx');
    }
}
