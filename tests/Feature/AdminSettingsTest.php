<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AdminSettingsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
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
}
