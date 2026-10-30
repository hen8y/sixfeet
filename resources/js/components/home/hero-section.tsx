import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { HeroCandle } from '@/components/home/hero-candle';
import { PlannerCard } from '@/components/home/planner-card';
import { heroCopyFor } from '@/constants/home/service-views';
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
    const copy = heroCopyFor(planner.view, country);

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
                    {copy.title}
                    <br />
                    <em>{copy.emphasis}</em>
                </h1>
                <p>{copy.body}</p>
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
            </div>
            <div className="sf-planner-wrap">
                <PlannerCard planner={planner} />
            </div>
        </section>
    );
}
