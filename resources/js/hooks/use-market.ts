import { router, usePage } from '@inertiajs/react';
import { update as updateCountry } from '@/routes/country';

export function useMarket() {
    const { country, countries } = usePage().props;

    function changeCountry(code: string, onChanged?: () => void) {
        if (code === country.code) {
            return;
        }

        router.put(
            updateCountry.url(),
            { country: code },
            { preserveScroll: true, onSuccess: onChanged },
        );
    }

    return { country, countries, changeCountry };
}
