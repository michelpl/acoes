<?php

namespace App\Services;

use DOMDocument;
use Exception;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class StockService
{
    const GRAHAM_CONST = '22.5';

    /**
     * @throws Exception
     */
    public function getStockId(string $slug): int
    {
        try {
            $uri = env('BASE_EXTERNAL_API_URL') . '/acoes/' . $slug;
            $response = Http::get($uri)->throw(function (Response $response){
                throw new Exception('Stock not found', $response->status());
            });
            $dom = new DOMDocument();
            @$dom->loadHTML($response->body());
            $htmlElement = $dom->getElementById('follow-company-mobile')->getAttributeNode("data-id");

            if (!empty($htmlElement) && ! empty($htmlElement->value)) {
                return (int) $htmlElement->value;
            }

            throw new Exception("Html element not found", 500);
        } catch (Exception $exception) {
            throw new Exception($exception->getMessage(), $exception->getCode() ?? 400);
        }
    }

    public function getStockData(int $stockId)
    {
        try {
            $uri = env('BASE_EXTERNAL_API_URL') . '/api/historico-indicadores/' . $stockId . '/3';

            return Http::get($uri)->throw(function (Response $response){
                throw new Exception('Stock not found', $response->status());
            })->json();

        } catch (Exception $exception) {
            throw new Exception($exception->getMessage(), $exception->getCode() ?? 400);
        }

    }

    /**
     * @throws Exception
     */
    public function getStockFundamentalValue(int $stockId)
    {
        $stockData = $this->getStockData($stockId);
        if (empty($stockData['VPA'][0]['value'])) {
            throw new Exception('VPA not found', 404);
        }

        if (empty($stockData['LPA'][0]['value'])) {
            throw new Exception('VPA not found', 404);
        }

        return $this->graham($stockData['VPA'][0]['value'], $stockData['LPA'][0]['value']) . '%';
    }

    public function graham(float $vpa, float $lpa): float
    {
        //quadrada de (22,5 x LPA x VPA)
        return number_format(sqrt(self::GRAHAM_CONST * $lpa * $vpa), 2);
    }
}
