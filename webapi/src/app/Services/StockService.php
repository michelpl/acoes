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
            $response = Http::get($uri)->throw(function (Response $response) use ($slug) {
                throw new Exception('Stock not found: ' . $slug, $response->status());
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

            return Http::get($uri)->throw(function (Response $response) use ($stockId) {
                //throw new Exception('Stock not found stockid: ' . $stockId, $response->status());
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
        if (empty($stockData['VPA'][0]['value']) || !is_numeric($stockData['VPA'][0]['value'])) {
            return 0;
            //throw new Exception('VPA for stockId ' . $stockId . ' not found', 404);
        }

        if (empty($stockData['LPA'][0]['value']) || !is_numeric($stockData['LPA'][0]['value'])) {
            return 0;
            //throw new Exception('VPA for stockId ' . $stockId . ' not found', 404);
        }

        return $this->graham((float) $stockData['VPA'][0]['value'], (float) $stockData['LPA'][0]['value']);
    }

    public function getCurrentValue(int $stockId): float
    {
        try {
            $uri = env('BASE_EXTERNAL_API_URL') . '/api/cotacao/ticker/' . $stockId;

            $result = Http::get($uri)->throw(function (Response $response) use ($stockId) {
                logger('Stock not found: ' . $stockId, $response->status());
            })->json();

            return $result['price'];

        } catch (Exception $exception) {
            throw new Exception($exception->getMessage(), 400);
        }
    }

    public function graham(float $vpa, float $lpa): float
    {
        //quadrada de (22,5 x LPA x VPA)
        return (float) number_format(sqrt(self::GRAHAM_CONST * $lpa * $vpa), 2);
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

    public function getStockList()
    {
         return StockList::where('pvp', '>', '0')->where('dy', '>=', '0')->orderBy('dy', 'desc')->get();
    }

    public function updateStockList($skip, $take)
    {
        $allStocks = Stock::all()->skip($skip)->take($take);
        foreach ($allStocks as $item) {
            $this->getStockInvestmentData($item->slug);
        }

        return [$skip, $take];
    }

    public function getStockInvestmentData(string $slug): StockDataDTO | string
    {
        $data = $this->getExternalIdAndNameFromDatabase($slug);
        if(empty($data['external_id'])) {
            return 'Slug not found: ' . $slug;
        }

        $externalId = $data['external_id'];
        $stockData = $this->getStockData($externalId);
        $currentPrice = $this->getCurrentValue($externalId);
        $fundamentalValue = $this->getStockFundamentalValue($externalId);
        $PVP = 0;
        $DY = 0;

        if (!empty($stockData['P/VP'][0]['value']) && is_numeric($stockData['P/VP'][0]['value'])) {
            $PVP = $stockData['P/VP'][0]['value'];
        }

        if (!empty($stockData['DIVIDEND YIELD (DY)'][0]['value']) && is_numeric($stockData['DIVIDEND YIELD (DY)'][0]['value'])) {
            $DY= $stockData['DIVIDEND YIELD (DY)'][0]['value'];
        }

        $growingExpectation = $this->getGrowingExpectation($fundamentalValue, $currentPrice);

        StockList::updateOrCreate(
            ['slug' => $slug],
            [
            'slug' => $slug,
            'name' => $data['name'],
            'external_id' => $externalId,
            'current_price' => $currentPrice,
            'fundamental_value' => $fundamentalValue,
            'pvp' => $PVP,
            'dy' => $DY,
            'growing_expectation' => $growingExpectation
        ]);

        return new StockDataDTO(
            $slug,
            $externalId,
            $data['name'],
            $currentPrice,
            $fundamentalValue,
            $PVP,
            $DY . '%',
            $growingExpectation . '%'
        );
    }

    public function getGrowingExpectation($fundamentalValue, $currentPrice)
    {
        $expectation = ($fundamentalValue - $currentPrice) / $currentPrice * 100;
        return number_format($expectation, 2, '.', '');
    }

    public function addStockList(Request $request)
    {
        return $this->getStockInvestmentData($request->slug);
    }

    public function getExternalIdAndNameFromDatabase(string $slug)
    {
        $stocks = Stock::where('slug', $slug)->first();
        return $stocks;
    }
}
