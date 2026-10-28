<?php

namespace Tests;

use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Laravel\Fortify\Features;

abstract class TestCase extends BaseTestCase
{
    /**
     * Seed the markets after each database refresh: every Inertia page shares
     * the visitor's country.
     */
    protected bool $seed = true;

    protected string $seeder = CountrySeeder::class;

    protected function skipUnlessFortifyHas(string $feature, ?string $message = null): void
    {
        if (! Features::enabled($feature)) {
            $this->markTestSkipped($message ?? "Fortify feature [{$feature}] is not enabled.");
        }
    }
}
