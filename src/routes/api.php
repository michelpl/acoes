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
        Route::get('/{slug}','getStockExternalId');
    });

    Route::controller(StockController::class)->group(function () {
        Route::get('/stock_data/{slug}','getStockData');
    });

    Route::controller(StockController::class)->group(function () {
        Route::get('/fundamental_value/{slug}','getStockFundamentalValue');
    });
});
