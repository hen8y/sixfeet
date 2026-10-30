import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ExampleFundraiserCard } from '@/components/fundraising/example-fundraiser-card';
import type { Country, ExampleFundraiser } from '@/types';

export function FundraisingHeroSection({
    country,
    example,
    onStart,
}: {
    country: Country;
    example: ExampleFundraiser;
    onStart: () => void;
}) {
    return (
        <section
            className="sf-fund-hero"
            id="sf-start"
            aria-labelledby="sf-fund-title"
        >
            <div className="sf-fund-hero-copy">
                <h1 id="sf-fund-title">
                    Let the people who love them
                    <br />
                    <em>help carry the cost.</em>
                </h1>
                <p>
                    Create a fundraiser for a funeral in {country.name}. Family
                    and friends can give from anywhere, and the money can pay
                    the providers you book directly.
                </p>
                <div className="sf-hero-actions">
                    <button
                        className="sf-primary sf-light"
                        type="button"
                        onClick={onStart}
                    >
                        Start a fundraiser <ArrowRight aria-hidden="true" />
                    </button>
                    <a className="sf-hero-link" href="#sf-how">
                        See how it works <ArrowUpRight aria-hidden="true" />
                    </a>
                </div>
            </div>
            <ExampleFundraiserCard example={example} country={country} />
        </section>
    );
}
