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
            $table->string('external_id')->unique();
            $table->string('name');
            $table->float('current_price');
            $table->float('fundamental_value');
            $table->float('pvp');
            $table->float('dy');
            $table->float('growing_expectation');
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
