<?php

namespace Tests\Feature;

use App\Models\Country;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\TestWith;
use RuntimeException;
use Tests\TestCase;

class CountryTest extends TestCase
{
    use RefreshDatabase;

    public function test_visitors_see_nigeria_with_its_currency_and_cities_by_default(): void
    {
        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->where('country.code', 'NG')
            ->where('country.currency', ['code' => 'NGN', 'name' => 'naira', 'symbol' => '₦'])
            ->has('country.cities', 10)
            ->where('country.cities.0', ['name' => 'Lagos', 'slug' => 'lagos', 'popular' => true])
            ->has('countries', 1)
            ->where('countries.0.code', 'NG'));
    }

    public function test_a_remembered_country_takes_precedence_over_location(): void
    {
        $this->activateIreland();

        $response = $this->withCookie('country', 'IE')
            ->withHeader('CF-IPCountry', 'NG')
            ->get(route('home'));

        $response->assertInertia(fn (Assert $page) => $page
            ->where('country.code', 'IE')
            ->has('countries', 2));
    }

    #[TestWith(['CF-IPCountry'])]
    #[TestWith(['CloudFront-Viewer-Country'])]
    public function test_the_visitors_location_picks_an_active_country(string $header): void
    {
        $this->activateIreland();

        $response = $this->withHeader($header, 'ie')->get(route('home'));

        $response->assertInertia(fn (Assert $page) => $page->where('country.code', 'IE'));
    }

    public function test_an_inactive_country_is_never_shown(): void
    {
        $response = $this->withCookie('country', 'IE')
            ->withHeader('CF-IPCountry', 'IE')
            ->get(route('home'));

        $response->assertInertia(fn (Assert $page) => $page
            ->where('country.code', 'NG')
            ->has('countries', 1));
    }

    public function test_visitors_can_switch_country_and_return_to_the_same_page(): void
    {
        $this->activateIreland();

        $response = $this->from(route('fundraising'))
            ->put(route('country.update'), ['country' => 'IE']);

        $response->assertRedirect(route('fundraising'));
        $response->assertCookie('country', 'IE');
    }

    public function test_visitors_cannot_switch_to_an_inactive_country(): void
    {
        $response = $this->from(route('home'))
            ->put(route('country.update'), ['country' => 'IE']);

        $response->assertRedirect(route('home'));
        $response->assertInvalid(['country' => 'The selected country is invalid.']);
        $response->assertCookieMissing('country');
    }

    public function test_pages_fail_loudly_when_no_country_is_active(): void
    {
        $this->withoutExceptionHandling();
        Country::query()->update(['is_active' => false]);

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('No active country.');

        $this->get(route('home'));
    }

    protected function activateIreland(): void
    {
        Country::where('code', 'IE')->update(['is_active' => true]);
    }
}
