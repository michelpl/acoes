<?php

namespace Database\Seeders;

use App\Models\Stock;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = public_path('stocks.sql');
        $sql = file_get_contents($path);
        DB::query($sql);
    }
}
