<?php

namespace App\Http\Controllers;

use App\Services\StockService;
use Exception;
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
    public function getStockData(string $slug)
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
}
