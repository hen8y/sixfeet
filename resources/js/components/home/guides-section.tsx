import { ArrowRight } from 'lucide-react';
import { LineArt } from '@/components/public/line-art';
import { useMarket } from '@/hooks/use-market';
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
            </div>
            <ul className="sf-guide-list">
                {guides.map((guide) => (
                    <li key={guide.title}>
                        <button
                            type="button"
                            onClick={() => onOpenGuide(guide)}
                        >
                            <LineArt name={guide.art} />
                            <span>
                                <strong>{guide.title}</strong>
                                <span>{guide.summary}</span>
                            </span>
                            <ArrowRight aria-hidden="true" />
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
