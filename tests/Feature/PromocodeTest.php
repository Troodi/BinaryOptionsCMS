<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;

class PromocodeTest extends TestCase
{

    public function test_example()
    {

        $response = $this->actingAs(User::first())->post('/promocodes');


        $response->assertStatus(200);
    }
}
