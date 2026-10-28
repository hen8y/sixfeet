<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class FundraisingPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_can_view_the_fundraising_page(): void
    {
        $response = $this->get(route('fundraising'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('fundraising'));
    }
}
