import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Flag } from '@/components/public/flag';
import { useMarket } from '@/hooks/use-market';

export function CityBrowse({
    onBrowseCity,
    onSearchOther,
}: {
    onBrowseCity: (countryCode: string, city: string) => void;
    onSearchOther: () => void;
}) {
    const { country, countries } = useMarket();
    const browseCountries = [
        country,
        ...countries.filter(({ code }) => code !== country.code),
    ];

    return (
        <div
            className="sf-city-browse"
            aria-labelledby="sf-cities-title"
            role="group"
        >
            <div className="sf-city-intro">
                <span className="sf-eyebrow">Browse by city</span>
                <h3 id="sf-cities-title">Or start with your city</h3>
                <p>
                    Pick a city to see verified providers nearby. Arranging from
                    abroad? Choose the city where the funeral will be.
                </p>
                <button
                    className="sf-small-link"
                    type="button"
                    onClick={onSearchOther}
                >
                    Search another city or area{' '}
                    <ArrowUpRight aria-hidden="true" />
                </button>
            </div>
            <div
                className="sf-city-cards"
                style={
                    { '--sf-count': browseCountries.length } as CSSProperties
                }
            >
                {browseCountries.map((option) => (
                    <article
                        className="sf-city-card"
                        key={option.code}
                        data-active={option.code === country.code}
                    >
                        <header>
                            <Flag country={option} />
                            <span>
                                <strong>{option.name}</strong>
                                <span>
                                    {option.cities.length} cities ·{' '}
                                    {option.currency.code}
                                </span>
                            </span>
                        </header>
                        <ul>
                            {option.cities.map((city) => (
                                <li key={city.slug}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onBrowseCity(option.code, city.name)
                                        }
                                    >
                                        {city.name}
                                        <ArrowRight aria-hidden="true" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </div>
    );
}
