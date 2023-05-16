<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MainTest extends TestCase
{

    /** @test */

    public function DemoLatestTest()
    {
        $response = $this->actingAs(User::first())->post('/data/demo/latest');

        $response->assertStatus(200);
    }
    /** @test */

    public function DemoOpenedTest()
    {
        $response = $this->actingAs(User::first())->post('/data/demo/opened');

        $response->assertStatus(200);
    }
    /** @test */

    public function DepositHistoryTest()
    {
        $response = $this->actingAs(User::first())->post('/data/depositHistory');

        $response->assertStatus(200)->assertJsonStructure([
                'draw',
                'recordsTotal',
                'recordsFiltered',
                'data',
                'input'
        ]);
    }
    /** @test */

    public function GetAccountDataTest()
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
    /** @test */

    public function GetAllContestsTest()
    {
        $response = $this->actingAs(User::first())->post('/data/getAllContests');

        $response->assertStatus(200)->assertJsonStructure([
            'active',
            'ended',
            'planned'
        ]);
    }
    /** @test */

    public function GetAllDepositSystemsTest()
    {
        $response = $this->actingAs(User::first())->post('/data/getAllDepositSystems');

        $response->assertStatus(200)->assertJsonStructure([
            '*' => [
                'id',
                'text',
                'hidden',
                'max',
                'order',
                'created_at',
                'updated_at',
            ]
        ]);
    }
    /** @test */

    public function GetAllWithdrawSystemsTest()
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
    /** @test */

    public function GetAuthTokenTest()
    {
        $response = $this->actingAs(User::first())->get('/data/GetAuthToken');

        $response->assertStatus(200);
        $this->assertNotEmpty($response->getContent());
    }
    /** @test */

    public function GetDepositPromocodesTest()
    {
        $response = $this->actingAs(User::first())->post('/data/getDepositPromocodes');


        $response->assertStatus(200)->assertJsonStructure([
            '*' => [
                'id',
                'description',
                'bonus_size',
                'code',
                'image',
                'public_code',
                'used',
                'for_new',
                'attempts',
                'type',
                'turnover',
                'min_amount',
                'active_from',
                'active_to',
                'deleted_at',
                'created_at',
                'updated_at'
            ]
        ]);
    }
    /** @test */

    public function LatestTest()
    {
        $response = $this->actingAs(User::first())->post('/data/latest');

        $response->assertStatus(200);
    }
    /** @test */

    public function OpenedTest()
    {
        $response = $this->actingAs(User::first())->post('/data/opened');

        $response->assertStatus(200);
    }
    /** @test */

    public function ProfileTest()
    {
        $response = $this->actingAs(User::first())->post('/data/profile');

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
            'updated_at',
            'profile',
            'provider'
        ]);
    }
    /** @test */

    public function PromocodeHistoryTest()
    {
        $response = $this->actingAs(User::first())->post('/promocode/history');

        $response->assertStatus(200)->assertJsonStructure([
                'draw',
                'recordsTotal',
                'recordsFiltered',
                'data',
                'input'
        ]);
    }
    /** @test */

    public function PromocodeTest()
    {

        $response = $this->actingAs(User::first())->post('/promocodes');


        $response->assertStatus(200)->assertJsonStructure([
            '*' => [
                'id',
                'description',
                'bonus_size',
                'code',
                'image',
                'public_code',
                'used',
                'for_new',
                'attempts',
                'type',
                'turnover',
                'min_amount',
                'active_from',
                'active_to',
                'deleted_at',
                'created_at',
                'updated_at'
            ]
        ]);
    }
    /** @test */

    public function ReferralsInfoTest()
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
    /** @test */

    public function ReferralsTest()
    {
        $response = $this->actingAs(User::first())->post('/data/referrals');

        $response->assertStatus(200)->assertJsonStructure([
                'draw',
                'recordsTotal',
                'recordsFiltered',
                'data',
                'input'
        ]);
    }
    /** @test */

    public function SymbolsTest()
    {
        $response = $this->actingAs(User::first())->get('/data/symbols');

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

    public function TradingDemoHistoryTest()
    {
        $response = $this->actingAs(User::first())->post('/trading/demo/history');


        $response->assertStatus(200)->assertJsonStructure([
                'draw',
                'recordsTotal',
                'recordsFiltered',
                'data',
                'input'
        ]);
    }
    /** @test */
    public function TradingHistoryTest()
    {
        $response = $this->actingAs(User::first())->post('/trading/history');


        $response->assertStatus(200)->assertJsonStructure([
                'draw',
                'recordsTotal',
                'recordsFiltered',
                'data',
                'input'
        ]);
    }

    /** @test
     *
     */
    public function WithdrawalHistoryTest()
    {
        $response = $this->actingAs(User::first())->post('/data/withdrawalHistory');


        $response->assertStatus(200)->assertJsonStructure([
                'draw',
                'recordsTotal',
                'recordsFiltered',
                'data',
                'input'
        ]);
    }

}
