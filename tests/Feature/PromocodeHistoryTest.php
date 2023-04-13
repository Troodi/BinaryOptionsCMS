<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PromocodeHistoryTest extends TestCase
{

    public function test_example()
    {
        $response = $this->actingAs(User::first())->post('/promocode/history');

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
