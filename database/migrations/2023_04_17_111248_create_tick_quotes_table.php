<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateTickQuotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::connection('bavix::clickhouse')->statement('CREATE TABLE tick_quotes (
            symbol_id String(255),
            price Decimal(20,5),
            created_at DateTime64(6)
        ) 
        ENGINE = MergeTree() ORDER BY (created_at, symbol_id)');

//        DB::connection('bavix::clickhouse')
//            ->statement('ALTER TABLE tick_quotes ADD INDEX col_index(symbol_id) TYPE minmax GRANULARITY 3');
//        DB::connection('bavix::clickhouse')
//            ->statement('ALTER TABLE quotes ADD INDEX col_index(created_at) TYPE minmax GRANULARITY 3');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::connection('clickhouse')->statement('DROP TABLE IF EXISTS tick_quotes');
    }
}
