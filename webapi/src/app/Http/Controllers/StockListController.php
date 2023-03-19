<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStockListRequest;
use App\Http\Requests\UpdateStockListRequest;
use App\Models\StockList;

class StockListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StoreStockListRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStockListRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StockList  $stockList
     * @return \Illuminate\Http\Response
     */
    public function show(StockList $stockList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StockList  $stockList
     * @return \Illuminate\Http\Response
     */
    public function edit(StockList $stockList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStockListRequest  $request
     * @param  \App\Models\StockList  $stockList
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStockListRequest $request, StockList $stockList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StockList  $stockList
     * @return \Illuminate\Http\Response
     */
    public function destroy(StockList $stockList)
    {
        //
    }
}
