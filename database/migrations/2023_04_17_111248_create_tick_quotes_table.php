<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
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
    symbol_id Nullable(UInt64),
    price Decimal(20,5),
    created_at DateTime64(6),
) 
    ENGINE = MergeTree()
    ORDER BY created_at
    ');
//        DB::connection('clickhouse')
//            ->statement('ALTER TABLE tick_quotes ADD INDEX symbol_id TYPE minmax SAMPLE BY 8192');

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
