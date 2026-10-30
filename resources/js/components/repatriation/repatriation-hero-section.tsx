import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { RouteCard } from '@/components/repatriation/route-card';
import type { ExampleCase, Milestone } from '@/types';

export function RepatriationHeroSection({
    example,
    milestones,
    onRequestQuote,
    onSupport,
}: {
    example: ExampleCase;
    milestones: Milestone[];
    onRequestQuote: () => void;
    onSupport: () => void;
}) {
    return (
        <section
            className="sf-fund-hero"
            id="sf-start"
            aria-labelledby="sf-rep-title"
        >
            <div className="sf-fund-hero-copy">
                <h1 id="sf-rep-title">
                    Bringing them home,
                    <br />
                    <em>with care at every step.</em>
                </h1>
                <p>
                    When someone dies far from home, a case manager guides your
                    family through the paperwork, the flight and the handover,
                    with itemised quotes from trusted repatriation partners.
                </p>
                <div className="sf-hero-actions">
                    <button
                        className="sf-primary sf-light"
                        type="button"
                        onClick={onRequestQuote}
                    >
                        Request a quote <ArrowRight aria-hidden="true" />
                    </button>
                    <button
                        className="sf-hero-link"
                        type="button"
                        onClick={onSupport}
                    >
                        Someone has just died? Talk to us{' '}
                        <ArrowUpRight aria-hidden="true" />
                    </button>
                </div>
            </div>
            <RouteCard example={example} milestones={milestones} />
        </section>
    );
}
