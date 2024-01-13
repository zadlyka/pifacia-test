<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Exports\ExportRole;
use App\Models\Role;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort =  $request->input('sort');
        $filter =  $request->input('filter');

        $paginate = Role::search($search)->sort($sort)->filter($filter)->simplePaginate(5);
        return Inertia::render('Role/Index', [
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
        return Inertia::render('Role/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        $data = $request->safe()->all();
        Role::create($data);
        return Redirect::route('role');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        $audits = $role->audits()->with('user')->get();
        return Inertia::render('Role/Show', [
            'role' => $role,
            'audits' =>  $audits
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        return Inertia::render('Role/Edit',  [
            'role' => $role,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $data = $request->safe()->all();
        $role->update($data);
        return Redirect::route('role');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return Redirect::route('role');
    }

    public function export()
    {
        return Excel::download(new ExportRole, 'roles.xlsx');
    }
}
