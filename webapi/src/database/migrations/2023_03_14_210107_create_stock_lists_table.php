<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_lists', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('external_id')->unique()->nullable(true);
            $table->string('name')->default('');
            $table->float('current_price')->default(0.0);
            $table->float('fundamental_value')->default(0.0);
            $table->float('pvp')->default(0.0);
            $table->float('dy')->default(0.0);
            $table->float('pl')->default(0.0);
            $table->float('roe')->default(0.0);
            $table->float('net_margin')->default(0.0);
            $table->float('net_debt_ebitda')->default(0.0);
            $table->float('growing_expectation')->default(0.0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock_lists');
    }
};
