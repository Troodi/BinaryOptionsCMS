<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class QuotesSymbolIdString extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::connection('bavix::clickhouse')->statement('ALTER TABLE quotes 
        MODIFY COLUMN symbol_id String');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::connection('bavix::clickhouse')->statement('ALTER TABLE quotes
        MODIFY COLUMN symbol_id UInt64');
    }
}
