<?php

namespace App\DTOs;

final class StockDataDTO
{
    public function __Construct(
        public readonly string $slug,
        public readonly string $name,
        public readonly float $currentPrice,
        public readonly float $fundamentalValue,
        public readonly float $PVP,
        public readonly string $DY,
        public readonly string $growingExpectation
    )
    {}

    public function toArray()
    {
        return [
          'slug' => $this->slug,
          'name' => $this->name,
          'currentPrice' => $this->currentPrice,
          'fundamentalValue' => $this->fundamentalValue,
          'P/VP' => $this->PVP,
          'DY' => $this->DY,
          'growingExpectation' => $this->growingExpectation
        ];
    }
}
