<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

/**
 * Seeds the markets Six Feet serves. Safe to re-run: countries are matched by
 * code and cities by slug. Support contacts stay null until the business
 * confirms its numbers and staffed hours.
 */
class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->countries() as $attributes) {
            ['cities' => $cities, 'popular' => $popular] = $attributes;
            unset($attributes['cities'], $attributes['popular']);

            $country = Country::updateOrCreate(['code' => $attributes['code']], $attributes);

            foreach ($cities as $position => $name) {
                $country->cities()->updateOrCreate(['slug' => Str::slug($name)], [
                    'name' => $name,
                    'is_popular' => in_array($name, $popular, true),
                    'sort_order' => $position,
                ]);
            }
        }
    }

    /**
     * @return list<array{code: string, name: string, locale: string, currency_code: string, currency_name: string, currency_symbol: string, flag_colours: array{string, string, string}, is_active: bool, sort_order: int, cities: list<string>, popular: list<string>}>
     */
    protected function countries(): array
    {
        return [
            [
                'code' => 'NG',
                'name' => 'Nigeria',
                'locale' => 'en-NG',
                'currency_code' => 'NGN',
                'currency_name' => 'naira',
                'currency_symbol' => '₦',
                'flag_colours' => ['#008751', '#ffffff', '#008751'],
                'is_active' => true,
                'sort_order' => 1,
                'cities' => ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu', 'Benin City', 'Owerri', 'Kano', 'Abeokuta', 'Uyo'],
                'popular' => ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu'],
            ],
            [
                'code' => 'IE',
                'name' => 'Ireland',
                'locale' => 'en-IE',
                'currency_code' => 'EUR',
                'currency_name' => 'euro',
                'currency_symbol' => '€',
                'flag_colours' => ['#169b62', '#ffffff', '#ff883e'],
                'is_active' => false,
                'sort_order' => 2,
                'cities' => ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kilkenny', 'Sligo', 'Athlone', 'Drogheda', 'Letterkenny'],
                'popular' => ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'],
            ],
        ];
    }
}
