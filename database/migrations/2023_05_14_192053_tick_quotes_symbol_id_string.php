<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class TickQuotesSymbolIdString extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::connection('bavix::clickhouse')->statement('ALTER TABLE tick_quotes 
        MODIFY COLUMN symbol_id Nullable(String)
');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::connection('clickhouse')->statement('ALTER TABLE tick_quotes
        MODIFY COLUMN symbol_id Nullable(UInt64)');
    }
}
