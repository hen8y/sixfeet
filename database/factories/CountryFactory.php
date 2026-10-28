<?php

namespace Database\Factories;

use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Country>
 */
class CountryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => fake()->unique()->countryCode(),
            'name' => fake()->country(),
            'locale' => 'en-GB',
            'currency_code' => fake()->currencyCode(),
            'currency_name' => fake()->word(),
            'currency_symbol' => '¤',
            'flag_colours' => [fake()->hexColor(), '#ffffff', fake()->hexColor()],
            'is_active' => true,
            'sort_order' => 0,
        ];
    }

    /**
     * Indicate that the country is not yet offered to visitors.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}
