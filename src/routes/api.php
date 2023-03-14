<?php

use App\Http\Controllers\BoletoController;
use App\Http\Controllers\ChargeController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\WebhookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['prefix' => 'V1'], function () {

    //API ROOT
    Route::get('/', function(){
        return "BASE";
    });
    Route::controller(StockController::class)->group(function () {
        Route::get('/stock','list');
        Route::get('/stock/{slug}','getStockExternalId');
        Route::get('/stock/external-data/{slug}','getStockExternalData');
        Route::get('/stock/fundamental-value/{slug}','getStockFundamentalValue');
        Route::get('/stock-list','getStockList');
        Route::post('/stock-list','addStockList');
    });
});
