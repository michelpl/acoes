<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fii extends Model
{
    use HasFactory;
    protected $fillable = [
        'slug',
        'area',
        'dy'
    ];
}
