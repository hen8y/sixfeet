import type { ReactNode } from 'react';
import { LineArt } from '@/components/public/line-art';
import { SectionHeading } from '@/components/public/section-heading';
import type { LineArtFeature } from '@/types';

export function FeatureSection({
    id,
    eyebrow,
    title,
    description,
    features,
}: {
    id: string;
    eyebrow?: string;
    title: string;
    description: ReactNode;
    features: LineArtFeature[];
}) {
    return (
        <section
            className="sf-fund-features sf-section"
            id={id}
            aria-labelledby={`${id}-title`}
        >
            <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title}>
                {description}
            </SectionHeading>
            <div className="sf-fund-grid">
                {features.map((feature) => (
                    <article className="sf-fund-feature" key={feature.title}>
                        <LineArt name={feature.art} />
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
