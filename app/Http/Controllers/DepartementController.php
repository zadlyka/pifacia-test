<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Departement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Departement\StoreDepartementRequest;
use App\Http\Requests\Departement\UpdateDepartementRequest;

class DepartementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort =  $request->input('sort');
        $filter =  $request->input('filter');

        $paginate = Departement::search($search)->sort($sort)->filter($filter)->simplePaginate(5);
        return Inertia::render('Departement/Index', [
            'paginate' => $paginate,
            'search' => $search,
            'sort' => $sort,
            'filter' => $filter
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Departement/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartementRequest $request)
    {
        $data = $request->safe()->all();
        Departement::create($data);
        return Redirect::route('departement');
    }

    /**
     * Display the specified resource.
     */
    public function show(Departement $departement)
    {
        $audits = $departement->audits()->with('user')->get();
        return Inertia::render('Departement/Show', [
            'departement' => $departement,
            'audits' =>  $audits
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Departement $departement)
    {
        return Inertia::render('Departement/Edit',  [
            'departement' => $departement,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartementRequest $request, Departement $departement)
    {
        $data = $request->safe()->all();
        $departement->update($data);
        return Redirect::route('departement');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departement $departement)
    {
        $departement->delete();
        return Redirect::route('departement');
    }
}
