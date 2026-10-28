<?php

namespace App\Http\Controllers;

use App\Actions\Countries\ResolveVisitorCountry;
use App\Http\Requests\UpdateCountryRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cookie;

class CountryController extends Controller
{
    /**
     * Remember the visitor's chosen country and return them to where they were.
     */
    public function update(UpdateCountryRequest $request): RedirectResponse
    {
        return back()->withCookie(
            Cookie::forever(ResolveVisitorCountry::Cookie, $request->validated('country')),
        );
    }
}
