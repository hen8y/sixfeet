import type { Country } from '@/types';

export function formatPrice(amountInMinorUnits: number, country: Country) {
    return new Intl.NumberFormat(country.locale, {
        style: 'currency',
        currency: country.currency.code,
        maximumFractionDigits: 0,
    }).format(amountInMinorUnits / 100);
}

export function countryNames(countries: Country[]) {
    return new Intl.ListFormat('en', { type: 'conjunction' }).format(
        countries.map(({ name }) => name),
    );
}
