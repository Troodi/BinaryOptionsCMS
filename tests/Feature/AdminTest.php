<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AdminTest extends TestCase
{
    /** @test */

    public function AdminContestsTest()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/contests', ['id' => 1]);


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
    /** @test */

    public function AdminDailyTest()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/daily');

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
    /** @test */

    public function AdminDepositsTest()
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
    /** @test */

    public function AdminDepositSystemsTest()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/deposit/systems');

        $response->assertStatus(200)->assertJsonStructure([
            '*' => [
                'id',
                'text',
                'hidden',
                'max',
                'order'
            ]
        ]);
    }
    /** @test */

    public function AdminGetAllPromocodeTest()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/getAllPromocode');

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
    /** @test */

    public function AdminHistoryDemoTest()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/history/demo/0');

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
    /** @test */

    public function AdminHistoryTest()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/history/0');

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
    /** @test */

    public function AdminPartnerTest()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/partner');

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
    /** @test */

    public function AdminSettingsTest()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/settings');

        $response->assertStatus(200)->assertJsonStructure([
            '*' => [
                'line',
                'export',
                'value',
                'comment',
            ]
        ]);
    }
    /** @test */

    public function AdminStatisticsTest()
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
    /** @test */

    public function AdminSymbolsTest()
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
    /** @test */

    public function AdminUsersTest()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/users');

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
    /** @test */

    public function AdminVerifyTest()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/verify');

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
    /** @test */

    public function AdminWithdrawalTest()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/withdrawal');

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
    /** @test */

    public function AdminWithdrawSystemsTest()
    {
        $response = $this->actingAs(User::first())->post('/admin/data/withdraw/systems');

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
            ]
        ]);
    }


}
