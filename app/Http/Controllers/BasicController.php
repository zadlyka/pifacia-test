<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Basic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Basic\StoreBasicRequest;
use App\Http\Requests\Basic\UpdateBasicRequest;

class BasicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $paginate = Basic::search($request->input('search'))->simplePaginate(1);
        return Inertia::render('Basic/Index', [
            'paginate' => $paginate,
            'search' => $request->input('search')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Basic/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBasicRequest $request)
    {
        $data = $request->safe()->all();
        Basic::create($data);
        return Redirect::route('basic');
    }

    /**
     * Display the specified resource.
     */
    public function show(Basic $basic)
    {
        return Inertia::render('Basic/Show', ['basic' => $basic]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Basic $basic)
    {
        return Inertia::render('Basic/Edit',  [
            'basic' => $basic,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBasicRequest $request, Basic $basic)
    {
        $data = $request->safe()->all();
        $basic->update($data);
        return Redirect::route('basic');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Basic $basic)
    {
        $basic->delete();
        return Redirect::route('basic');
    }
}
