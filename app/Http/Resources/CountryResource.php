<?php

namespace App\Http\Resources;

use App\Models\City;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Country
 */
class CountryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'code' => $this->code,
            'name' => $this->name,
            'locale' => $this->locale,
            'currency' => [
                'code' => $this->currency_code,
                'name' => $this->currency_name,
                'symbol' => $this->currency_symbol,
            ],
            'flag' => $this->flag_colours,
            'support' => [
                'phone' => $this->support_phone,
                'whatsapp' => $this->support_whatsapp,
                'hours' => $this->support_hours,
            ],
            'cities' => $this->whenLoaded('cities', fn () => $this->cities->map(fn (City $city) => [
                'name' => $city->name,
                'slug' => $city->slug,
                'popular' => $city->is_popular,
            ])),
        ];
    }
}
