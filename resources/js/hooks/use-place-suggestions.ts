import { useEffect, useRef, useState } from 'react';
import {
    createPlacesSession,
    hasGooglePlaces,
    searchPlaces,
} from '@/lib/google-places';
import type { PlaceSuggestion } from '@/lib/google-places';

type Market = {
    regionCode: string;
    countryName: string;
    cities: string[];
};

export type PlaceSuggestionsSource = 'google' | 'local';

/**
 * Suggest places for a search box. Uses Google Places when a key is set and
 * falls back to the market's own city list when it is not or the call fails.
 */
export function usePlaceSuggestions(query: string, market: Market) {
    const [result, setResult] = useState<{
        suggestions: PlaceSuggestion[];
        source: PlaceSuggestionsSource;
    }>({ suggestions: [], source: 'local' });
    const session = useRef<object | null>(null);
    const { regionCode, countryName, cities } = market;

    useEffect(() => {
        const input = query.trim();
        let cancelled = false;

        const localMatches = (): PlaceSuggestion[] =>
            cities
                .filter((city) =>
                    city.toLowerCase().includes(input.toLowerCase()),
                )
                .map((city) => ({
                    id: city,
                    label: city,
                    detail: countryName,
                    value: city,
                }));

        const timer = setTimeout(
            async () => {
                if (!input || !hasGooglePlaces) {
                    setResult({
                        suggestions: input ? localMatches() : [],
                        source: 'local',
                    });

                    return;
                }

                try {
                    session.current ??= await createPlacesSession();
                    const suggestions = await searchPlaces(input, {
                        regionCode,
                        countryName,
                        session: session.current,
                    });

                    if (!cancelled) {
                        setResult({ suggestions, source: 'google' });
                    }
                } catch {
                    if (!cancelled) {
                        setResult({
                            suggestions: localMatches(),
                            source: 'local',
                        });
                    }
                }
            },
            input ? 200 : 0,
        );

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [query, regionCode, countryName, cities]);

    /** Close the billing session once a place has been chosen. */
    function endSession() {
        session.current = null;
    }

    return { ...result, endSession };
}
