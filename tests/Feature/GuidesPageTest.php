<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class GuidesPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_can_view_the_guides_page(): void
    {
        $response = $this->get(route('guides'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('guides'));
    }
}
