<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockList extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'external_id',
        'current_price',
        'fundamental_value',
        'pvp',
        'dy',
        'growing_expectation',
        'pl',
        'roe',
        'net_margin',
        'net_debt_ebitda'
    ];
}
