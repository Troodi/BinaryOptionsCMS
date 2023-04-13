<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AdminDepositsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/deposits');

        $response->assertStatus(200)->assertJsonStructure([
            'headers',
            'original' => [
                'draw',
                'recordsTotal',
                'recordsFiltered',
                'data',
                'input'
            ],
            'exception'
        ]);
    }
}
