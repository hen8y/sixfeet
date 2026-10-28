export type PlaceSuggestion = {
    id: string;
    label: string;
    detail: string | null;
    value: string;
};

type FormattableText = { text: string } | null;

type PlacePrediction = {
    placeId: string;
    text: { text: string };
    mainText: FormattableText;
    secondaryText: FormattableText;
};

type PlacesLibrary = {
    AutocompleteSessionToken: new () => object;
    AutocompleteSuggestion: {
        fetchAutocompleteSuggestions(request: {
            input: string;
            includedRegionCodes: string[];
            includedPrimaryTypes: string[];
            language: string;
            sessionToken: object;
        }): Promise<{
            suggestions: { placePrediction: PlacePrediction | null }[];
        }>;
    };
};

declare global {
    interface Window {
        google?: {
            maps?: {
                importLibrary(name: 'places'): Promise<unknown>;
            };
        };
        __sixFeetMapsReady?: () => void;
    }
}

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const hasGooglePlaces = Boolean(apiKey);

let placesLibrary: Promise<PlacesLibrary> | null = null;

/**
 * Load the Maps JavaScript API once and resolve its Places library.
 */
function loadPlaces(): Promise<PlacesLibrary> {
    placesLibrary ??= new Promise<void>((resolve, reject) => {
        if (window.google?.maps?.importLibrary) {
            resolve();

            return;
        }

        window.__sixFeetMapsReady = () => resolve();

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?${new URLSearchParams(
            {
                key: apiKey ?? '',
                v: 'weekly',
                loading: 'async',
                callback: '__sixFeetMapsReady',
            },
        )}`;
        script.async = true;
        script.onerror = () => reject(new Error('Google Maps failed to load.'));
        document.head.append(script);
    })
        .then(
            () =>
                window.google!.maps!.importLibrary(
                    'places',
                ) as Promise<PlacesLibrary>,
        )
        .catch((error: unknown) => {
            placesLibrary = null;

            throw error;
        });

    return placesLibrary;
}

export async function createPlacesSession(): Promise<object> {
    const { AutocompleteSessionToken } = await loadPlaces();

    return new AutocompleteSessionToken();
}

/**
 * Suggest cities and areas inside one country, using Places Autocomplete (New).
 */
export async function searchPlaces(
    input: string,
    options: { regionCode: string; countryName: string; session: object },
): Promise<PlaceSuggestion[]> {
    const { AutocompleteSuggestion } = await loadPlaces();
    const { suggestions } =
        await AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input,
            includedRegionCodes: [options.regionCode],
            includedPrimaryTypes: ['(regions)'],
            language: 'en',
            sessionToken: options.session,
        });
    const countrySuffix = `, ${options.countryName}`;

    return suggestions.flatMap(({ placePrediction: place }) => {
        if (!place) {
            return [];
        }

        const label = place.mainText?.text ?? place.text.text;
        const detail = place.secondaryText?.text ?? null;
        const value = place.text.text.endsWith(countrySuffix)
            ? place.text.text.slice(0, -countrySuffix.length)
            : place.text.text;

        return [{ id: place.placeId, label, detail, value }];
    });
}
