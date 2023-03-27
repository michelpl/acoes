<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFiiRequest;
use App\Http\Requests\UpdateFiiRequest;
use App\Models\Fii;

class FiiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Fii::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreFiiRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFiiRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Fii  $fii
     * @return \Illuminate\Http\Response
     */
    public function show(Fii $fii)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Fii  $fii
     * @return \Illuminate\Http\Response
     */
    public function edit(Fii $fii)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateFiiRequest  $request
     * @param  \App\Models\Fii  $fii
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateFiiRequest $request, Fii $fii)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Fii  $fii
     * @return \Illuminate\Http\Response
     */
    public function destroy(Fii $fii)
    {
        //
    }
}
