<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateQuotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::connection('bavix::clickhouse')->statement('CREATE TABLE quotes (
            symbol_id UInt64,
            high Decimal(10,5),
            min Decimal(10,5),
            open Decimal(10,5),
            close Decimal(10,5),
            created_at DateTime64(6)
        )
        ENGINE = ReplacingMergeTree()
        ORDER BY (symbol_id, created_at)');
//        DB::connection('bavix::clickhouse')
//            ->statement('ALTER TABLE quotes ADD INDEX col_index(symbol_id) TYPE minmax GRANULARITY 3');
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
        DB::connection('clickhouse')->statement('DROP TABLE IF EXISTS quotes');
    }
}
