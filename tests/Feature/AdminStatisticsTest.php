<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AdminStatisticsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/statistics');

        $response->assertStatus(200)->assertJsonStructure([
                'user_count',
                'banned_users',
                'deposit_count',
                'withdrawal_count',
                'referral_count',
                'profit',
                'deals',
                'turnover',
                'bonus',
                'clear_balance',
                'total_profit_count',
                'total_loss_count'
        ]);
    }
}
