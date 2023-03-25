<?php

namespace App\DTOs;

final class StockDataDTO
{
    public function __Construct(
        public readonly string $slug,
        public readonly int $externalId,
        public readonly string $name,
        public readonly float $currentPrice,
        public readonly float $fundamentalValue,
        public readonly float | string $PVP,
        public readonly string $DY,
        public readonly string $growingExpectation,
        public readonly float $pl,
        public readonly float $roe,
        public readonly float $netMargin,
        public readonly float $netDebtEbitda,
        public readonly float $image
    )
    {}

    public function toArray(): array
    {
        return [
          'slug' => $this->slug,
          'image' => $this->image,
          'external_id' => $this->externalId,
          'name' => $this->name,
          'currentPrice' => $this->currentPrice,
          'fundamentalValue' => $this->fundamentalValue,
          'P/VP' => $this->PVP,
          'DY' => $this->DY,
          'growingExpectation' => $this->growingExpectation,
            'pl' => $this->pl,
            'roe' => $this->roe,
            'net_margin' => $this->netMargin,
            'net_debt_ebitda' => $this->netDebtEbitda
        ];
    }
}
