import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { GuideList } from '@/components/public/guide-list';
import { useMarket } from '@/hooks/use-market';
import { guides as guidesPage } from '@/routes';
import type { Guide } from '@/types';

export function GuidesSection({
    guides,
    onOpenGuide,
}: {
    guides: Guide[];
    onOpenGuide: (guide: Guide) => void;
}) {
    const { country } = useMarket();

    return (
        <section
            className="sf-guides sf-section"
            id="sf-guides"
            aria-labelledby="sf-guides-title"
        >
            <div className="sf-guides-intro">
                <span className="sf-eyebrow">Help & advice</span>
                <h2 id="sf-guides-title">
                    What to do,
                    <br />
                    <em>one step at a time.</em>
                </h2>
                <p>
                    Plain guidance for the first days, written for families in{' '}
                    {country.name} and abroad.
                </p>
                <Link className="sf-small-link" href={guidesPage.url()}>
                    Read all guides <ArrowRight aria-hidden="true" />
                </Link>
            </div>
            <GuideList guides={guides} onOpenGuide={onOpenGuide} />
        </section>
    );
}
