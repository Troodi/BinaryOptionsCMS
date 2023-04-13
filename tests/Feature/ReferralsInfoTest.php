<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ReferralsInfoTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->actingAs(User::first())->post('/data/referralsInfo');

        $response->assertStatus(200)->assertJsonStructure([
                'id',
                'user_id',
                'total_referrals',
                'reward',
                'active',
                'deposit_count',
                'tracked',
                'created_at',
                'updated_at',
                'user',
                'request',
        ]);
    }
}
