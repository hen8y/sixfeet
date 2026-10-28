import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { HeroCandle } from '@/components/home/hero-candle';
import { PlannerCard } from '@/components/home/planner-card';
import { useMarket } from '@/hooks/use-market';
import type { Planner } from '@/hooks/use-planner';

export function HeroSection({
    planner,
    onSupport,
}: {
    planner: Planner;
    onSupport: () => void;
}) {
    const { country } = useMarket();

    return (
        <section
            className="sf-hero"
            id="sf-start"
            aria-labelledby="sf-hero-title"
        >
            <div className="sf-hero-media">
                <img
                    className="sf-hero-photo"
                    src="/images/hero-funeral-hall.webp"
                    srcSet="/images/hero-funeral-hall-small.webp 800w, /images/hero-funeral-hall.webp 1500w"
                    sizes="100vw"
                    alt=""
                    width="1500"
                    height="1000"
                    fetchPriority="high"
                />
            </div>
            <div className="sf-hero-copy">
                <HeroCandle />
                <h1 id="sf-hero-title">
                    A thoughtful farewell,
                    <br />
                    <em>from home or abroad.</em>
                </h1>
                <p>
                    Arrange a mortuary, a coffin, flowers and transport in{' '}
                    {country.name}, whether you are close by or a flight away.
                    Compare verified providers and see the price before you
                    book.
                </p>
                <div className="sf-hero-actions">
                    <a href="#sf-services" className="sf-primary sf-light">
                        Explore services <ArrowRight aria-hidden="true" />
                    </a>
                    <button
                        type="button"
                        className="sf-hero-link"
                        onClick={onSupport}
                    >
                        Or talk to our team <ArrowUpRight aria-hidden="true" />
                    </button>
                </div>
                <div className="sf-hero-notes">
                    <span>
                        <Check aria-hidden="true" /> No account needed to browse
                    </span>
                    <span>
                        <Check aria-hidden="true" /> Prices in{' '}
                        {country.currency.name}
                    </span>
                </div>
            </div>
            <div className="sf-planner-wrap">
                <PlannerCard planner={planner} />
            </div>
        </section>
    );
}
