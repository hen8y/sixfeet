<?php

namespace App\Actions\Countries;

use App\Models\Country;
use Illuminate\Http\Request;
use RuntimeException;

/**
 * Picks the country a visitor's content, prices and support are shown for.
 */
class ResolveVisitorCountry
{
    /**
     * The cookie that remembers a visitor's chosen country between visits.
     */
    public const string Cookie = 'country';

    /**
     * Geolocation headers set by the CDN in front of the app (Cloudflare,
     * then CloudFront). A forged header can only choose another active country.
     *
     * @var list<string>
     */
    protected const array LocationHeaders = ['CF-IPCountry', 'CloudFront-Viewer-Country'];

    /**
     * Resolve the visitor's country: their remembered choice, then their
     * location, then the configured default, then the first active country.
     */
    public function handle(Request $request): Country
    {
        $countries = Country::active()->get()->keyBy('code');

        $candidates = [
            $request->cookie(self::Cookie),
            ...array_map(fn (string $header) => $request->header($header), self::LocationHeaders),
            config('app.default_country'),
        ];

        foreach ($candidates as $code) {
            if (is_string($code) && $countries->has(strtoupper($code))) {
                return $countries->get(strtoupper($code));
            }
        }

        return $countries->first()
            ?? throw new RuntimeException('No active country. Run `php artisan db:seed --class=CountrySeeder`.');
    }
}
