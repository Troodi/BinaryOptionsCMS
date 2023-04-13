<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetDepositPromocodesTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
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
}
