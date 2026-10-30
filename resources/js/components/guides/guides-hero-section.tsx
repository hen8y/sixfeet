import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { TopicIndexCard } from '@/components/guides/topic-index-card';
import type { Country, GuideTopic } from '@/types';

export function GuidesHeroSection({
    country,
    topics,
    onSupport,
}: {
    country: Country;
    topics: GuideTopic[];
    onSupport: () => void;
}) {
    return (
        <section
            className="sf-fund-hero"
            id="sf-start"
            aria-labelledby="sf-guides-hero-title"
        >
            <div className="sf-fund-hero-copy">
                <h1 id="sf-guides-hero-title">
                    You don’t have to know
                    <br />
                    <em>where to start.</em>
                </h1>
                <p>
                    Losing someone is hard, and the days after bring questions
                    no one prepares you for. These guides walk you through what
                    happens next in {country.name}, one step at a time.
                </p>
                <div className="sf-hero-actions">
                    <a className="sf-primary sf-light" href="#sf-how">
                        What to do first <ArrowDown aria-hidden="true" />
                    </a>
                    <button
                        className="sf-hero-link"
                        type="button"
                        onClick={onSupport}
                    >
                        Rather talk to someone?{' '}
                        <ArrowUpRight aria-hidden="true" />
                    </button>
                </div>
            </div>
            <TopicIndexCard topics={topics} />
        </section>
    );
}
