<?php

namespace App\Models;

use Database\Factories\CountryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * A market Six Feet serves. Its ISO 3166-1 alpha-2 `code` is the public key,
 * and only active countries are offered to visitors.
 *
 * @property int $id
 * @property string $code
 * @property string $name
 * @property string $locale
 * @property string $currency_code
 * @property string $currency_name
 * @property string $currency_symbol
 * @property array{string, string, string} $flag_colours
 * @property string|null $support_phone
 * @property string|null $support_whatsapp
 * @property string|null $support_hours
 * @property bool $is_active
 * @property int $sort_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'code',
    'name',
    'locale',
    'currency_code',
    'currency_name',
    'currency_symbol',
    'flag_colours',
    'support_phone',
    'support_whatsapp',
    'support_hours',
    'is_active',
    'sort_order',
])]
class Country extends Model
{
    /** @use HasFactory<CountryFactory> */
    use HasFactory;

    /**
     * Get the cities served in this country.
     *
     * @return HasMany<City, $this>
     */
    public function cities(): HasMany
    {
        return $this->hasMany(City::class)->orderBy('sort_order')->orderBy('name');
    }

    /**
     * Limit the query to countries open to visitors, in display order.
     *
     * @param  Builder<self>  $query
     */
    #[Scope]
    protected function active(Builder $query): void
    {
        $query->where('is_active', true)->orderBy('sort_order')->orderBy('name');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'flag_colours' => 'array',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
