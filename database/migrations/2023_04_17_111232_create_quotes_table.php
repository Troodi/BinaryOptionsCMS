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
        id UInt64,
        symbol_id Nullable(UInt64),
        high Decimal(10,5),
        min Decimal(10,5),
        open Decimal(10,5),
        close Decimal(10,5),
        timeframe Decimal(10,5),
        created_at DateTime64(6),
        updated_at DateTime64(6)
    )
    ENGINE = MergeTree()
    ORDER BY created_at
     ');
//        DB::connection('clickhouse')
//            ->statement('ALTER TABLE quotes ADD INDEX symbol_id TYPE minmax SAMPLE BY 8192');
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
