<?php

namespace App\Services;

use App\DTOs\StockDataDTO;
use App\Models\Stock;
use App\Models\StockList;
use DOMDocument;
use Exception;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class StockService
{
    const GRAHAM_CONST = '22.5';

    public function __Construct(
    ){}

    /**
     * @throws Exception
     */
    public function getStockExternalId(string $slug): int
    {
        try {
            $uri = env('BASE_EXTERNAL_API_URL') . '/acoes/' . $slug;
            $response = Http::get($uri)->throw(function (Response $response){
                throw new Exception('Stock not found', $response->status());
            });
            $dom = new DOMDocument();
            @$dom->loadHTML($response->body());
            $htmlElement = $dom->getElementById('follow-company-mobile')->getAttributeNode("data-id");
            $htmlTitle = $dom->getElementsByTagName('title');
            $companyName = "";

            if (! empty($htmlTitle[0])) {
                $title = explode('-', $htmlTitle[0]->nodeValue);
                $companyName = $title[1];
            }

            if (!empty($htmlElement) && ! empty($htmlElement->value)) {
                $this->saveStock((int) $htmlElement->value, $slug, trim($companyName));
                return (int) $htmlElement->value;
            }

            throw new Exception("Html element not found", 500);
        } catch (Exception $exception) {
            throw new Exception($exception->getMessage(), 404);
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
            throw new Exception($exception->getMessage(), 400);
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

        return $this->graham($stockData['VPA'][0]['value'], $stockData['LPA'][0]['value']);
    }

    public function getCurrentValue(int $stockId): float
    {
        try {
            $uri = env('BASE_EXTERNAL_API_URL') . '/api/cotacao/ticker/' . $stockId;

            $result = Http::get($uri)->throw(function (Response $response){
                throw new Exception('Stock not found', $response->status());
            })->json();

            return $result['price'];

        } catch (Exception $exception) {
            throw new Exception($exception->getMessage(), 400);
        }
    }

    public function graham(float $vpa, float $lpa): float
    {
        //quadrada de (22,5 x LPA x VPA)
        return number_format(sqrt(self::GRAHAM_CONST * $lpa * $vpa), 2);
    }

    private function saveStock(int $stockExternalId, string $slug, $companyName): void
    {
        $stock = Stock::where('external_id', $stockExternalId)->first();

        if (empty($stock)) {
            $stock = new Stock();
            $stock->external_id = $stockExternalId;
        }

        $stock->slug = $slug;
        $stock->name = $companyName;
        $stock->save();
    }

    public function list()
    {
        return Stock::all();
    }

    public function getStockList(): array | string
    {
        $stockList = StockList::all('slug', 'name');
        $result = [];
        foreach ($stockList as $item) {
            $data = $this->getExternalIdAndNameFromDatabase($item->slug);
            if(empty($data['external_id'])) {
                return 'Slug not found';
            }

            $externalId = $data['external_id'];
            $stockData = $this->getStockData($externalId);
            $currentPrice = $this->getCurrentValue($externalId);
            $fundamentalValue = $this->getStockFundamentalValue($externalId);

            $result[] =
                new StockDataDTO(
                    $item->slug,
                    $item->name,
                    $currentPrice,
                    $fundamentalValue,
                    $stockData['P/VP'][0]['value'],
                    $stockData['DIVIDEND YIELD (DY)'][0]['value'] . '%',
                    $this->getGrowingExpectation($fundamentalValue, $currentPrice)
                );
        }

        return $result;
    }

    public function getStockInvestmentData(string $slug): StockDataDTO | string
    {
        $data = $this->getExternalIdAndNameFromDatabase($slug);
        if(empty($data['external_id'])) {
            return 'Slug not found';
        }

        $externalId = $data['external_id'];
        $stockData = $this->getStockData($externalId);
        $currentPrice = $this->getCurrentValue($externalId);
        $fundamentalValue = $this->getStockFundamentalValue($externalId);

        return new StockDataDTO(
            $slug,
            $data['name'],
            $currentPrice,
            $fundamentalValue,
            $stockData['P/VP'][0]['value'],
            $stockData['DIVIDEND YIELD (DY)'][0]['value'] . '%',
            $this->getGrowingExpectation($fundamentalValue, $currentPrice)
        );
    }

    public function getGrowingExpectation($fundamentalValue, $currentPrice)
    {
        $expectation = ($fundamentalValue - $currentPrice) / $currentPrice * 100;
        return number_format($expectation, 2) . '%';
    }


    public function addStockList(Request $request)
    {
        $stockData = $this->getExternalIdAndNameFromDatabase($request->slug);

        if(empty($stockData->external_id)) {
            return "Could not find the slug " . $request->slug . ' on database';
        }

        StockList::firstOrCreate([
            'user_id' => $request->user_id,
            'name' => $stockData->name,
            'slug' =>  $request->slug,
            'external_id' => $stockData->external_id
        ]);
    }

    public function getExternalIdAndNameFromDatabase(string $slug)
    {
        $stocks = Stock::where('slug', $slug)->first();
        return $stocks;
    }
}
