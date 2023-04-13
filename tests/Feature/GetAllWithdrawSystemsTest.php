<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetAllWithdrawSystemsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->actingAs(User::first())->post('/data/getAllWithdrawSystems');


        $response->assertStatus(200)->assertJsonStructure([
            '*' => [
                'id',
                'text',
                'q_id',
                'y_id',
                'placeholder',
                'image',
                'order',
                'hidden',
                'created_at',
                'updated_at',
            ]
        ]);
    }
}
