<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetAccountDataTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->actingAs(User::first())->post('/data/getAccountData');

        $response->assertStatus(200)->assertJsonStructure([
                'id',
                'name',
                'email',
                'token',
                'banned',
                'partner_status',
                'balance',
                'demo_balance',
                'email_verified_at',
                'banned_at',
                'bonus',
                'all_turnover',
                'left_turnover',
                'deleted_at',
                'created_at',
                'updated_at'
        ]);
    }
}
