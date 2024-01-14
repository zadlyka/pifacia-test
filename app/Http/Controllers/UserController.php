<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Exports\ExportUser;
use App\Models\User;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\Role;

class UserController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort =  $request->input('sort');
        $filter =  $request->input('filter');

        $paginate = User::search($search)->sort($sort)->filter($filter)->simplePaginate(5);
        return Inertia::render('User/Index', [
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
        return Inertia::render('User/Create', [
            'options' => [
                'roles' => Role::get(),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->safe()->all();
        User::create($data);
        return Redirect::route('user');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $audits = $user->audits()->with('user')->get();
        return Inertia::render('User/Show', [
            'user' => $user,
            'audits' =>  $audits
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit',  [
            'user' => $user,
            'options' => [
                'roles' => Role::get(),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->safe()->all();
        $user->update($data);
        return Redirect::route('user');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return Redirect::route('user');
    }

    public function export()
    {
        return Excel::download(new ExportUser, now().' Users.xlsx');
    }
}
