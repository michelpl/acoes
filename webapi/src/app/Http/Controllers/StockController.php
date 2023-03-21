<?php

namespace App\Http\Controllers;

use App\DTOs\StockDataDTO;
use App\Models\StockList;
use App\Services\StockService;
use Exception;
use Illuminate\Http\Request;
use function response;

class StockController extends Controller
{

    public function __construct(
        private StockService $stockService
    )
    {
    }

    public function getStockExternalId(string $slug)
    {
        try {
            return $this->stockService->getStockExternalId($slug);
        } catch (Exception $e) {
            return response($e->getMessage(), $e->getCode());
        }
    }
    public function getStockExternalData(string $slug)
    {
        try {
            $stockId = $this->stockService->getStockExternalId($slug);

            return $this->stockService->getStockData($stockId);
        } catch (Exception $e) {
            return response($e->getMessage(), $e->getCode());
        }
    }

    public function getStockFundamentalValue(string $slug)
    {
        try {
            $stockId = $this->stockService->getStockExternalId($slug);

            return $this->stockService->getStockFundamentalValue($stockId);
        } catch (Exception $e) {
            return response($e->getMessage(), $e->getCode());
        }
    }

    public function list()
    {
        return $this->stockService->list();
    }

    public function getStockList()
    {
        return $this->stockService->getStockList();
    }
    public function getStockInvestmentData(string $slug)
    {
        $data = $this->stockService->getStockInvestmentData($slug);
        if($data instanceof StockDataDTO) {
            return $data->toArray();
        }

        return $data;
    }

    public function addStockList(Request $request)
    {
       return $this->stockService->addStockList($request);
    }

    public function updateStockList(Request $request)
    {
        $skip = 0;
        $take = 1;

        if (!empty($request->skip)) {
            $skip = $request->skip;
        }

        if (!empty($request->take)) {
            $take = $request->take;
        }

        return $this->stockService->updateStockList($skip, $take);
    }
}
