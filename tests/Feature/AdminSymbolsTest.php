<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AdminSymbolsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/symbols');

        $response->assertStatus(200)->assertJsonStructure([
            '*' => [
                'id',
                'symbol',
                'type',
                'broker',
                'percent',
                'min_percent',
                'fixed_percent',
                'max_percent',
                'work_from',
                'work_to',
                'min_expiration_time',
                'min_percent_tech',
                'min_percent_news',
                'min_percent_user',
                'status',
                'deleted_at'
            ]
        ]);
    }
}
