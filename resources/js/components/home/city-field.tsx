import { CircleAlert, MapPin } from 'lucide-react';
import type { RefObject } from 'react';
import { Input } from '@/components/ui/input';
import { useCombobox } from '@/hooks/use-combobox';
import { usePlaceSuggestions } from '@/hooks/use-place-suggestions';
import type { PlaceSuggestion } from '@/lib/google-places';
import type { Country } from '@/types';

export function CityField({
    city,
    onCityChange,
    country,
    inputRef,
    error,
}: {
    city: string;
    onCityChange: (city: string) => void;
    country: Country;
    inputRef: RefObject<HTMLInputElement | null>;
    error: string | null;
}) {
    const popularCities = country.cities
        .filter(({ popular }) => popular)
        .map(({ name }) => name);
    const { suggestions, source, endSession } = usePlaceSuggestions(city, {
        regionCode: country.code.toLowerCase(),
        countryName: country.name,
        cities: popularCities,
    });
    const showingPopular = city.trim() === '';
    const options: PlaceSuggestion[] = showingPopular
        ? popularCities.map((name) => ({
              id: name,
              label: name,
              detail: null,
              value: name,
          }))
        : suggestions;
    const combobox = useCombobox(options, (suggestion) => {
        onCityChange(suggestion.value);
        endSession();
    });

    return (
        <div className="sf-field">
            <label htmlFor="sf-city">In or around</label>
            <div className="sf-combobox">
                <div className="sf-control" data-invalid={Boolean(error)}>
                    <MapPin aria-hidden="true" />
                    <Input
                        id="sf-city"
                        ref={inputRef}
                        role="combobox"
                        aria-autocomplete="list"
                        aria-expanded={combobox.expanded}
                        aria-controls="sf-city-options"
                        aria-activedescendant={
                            combobox.expanded && combobox.active >= 0
                                ? `sf-city-option-${combobox.active}`
                                : undefined
                        }
                        value={city}
                        onChange={(event) => {
                            onCityChange(event.target.value);
                            combobox.reopen();
                        }}
                        onKeyDown={combobox.onKeyDown}
                        onFocus={() => combobox.setOpen(true)}
                        onBlur={() => combobox.setOpen(false)}
                        placeholder="Enter a city or area"
                        required
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? 'sf-city-error' : undefined}
                        maxLength={100}
                        autoComplete="off"
                    />
                </div>
                {error && (
                    <p className="sf-field-error" id="sf-city-error">
                        <CircleAlert aria-hidden="true" />
                        {error}
                    </p>
                )}
                {combobox.expanded && (
                    <div className="sf-suggestions">
                        {showingPopular && (
                            <p
                                className="sf-suggestions-heading"
                                id="sf-city-popular"
                            >
                                Popular in {country.name}
                            </p>
                        )}
                        <ul
                            id="sf-city-options"
                            role="listbox"
                            aria-labelledby={
                                showingPopular ? 'sf-city-popular' : undefined
                            }
                        >
                            {options.map((suggestion, index) => (
                                <li
                                    key={suggestion.id}
                                    id={`sf-city-option-${index}`}
                                    role="option"
                                    aria-selected={index === combobox.active}
                                    onMouseDown={(event) =>
                                        event.preventDefault()
                                    }
                                    onMouseEnter={() =>
                                        combobox.setActive(index)
                                    }
                                    onClick={() => combobox.choose(suggestion)}
                                >
                                    <span>
                                        <strong>{suggestion.label}</strong>
                                        {suggestion.detail && (
                                            <span>{suggestion.detail}</span>
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        {!showingPopular && source === 'google' && (
                            <p className="sf-attribution">Powered by Google</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
