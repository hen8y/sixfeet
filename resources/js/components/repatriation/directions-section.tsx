import { CheckList } from '@/components/public/check-list';
import { LineArt } from '@/components/public/line-art';
import { SectionHeading } from '@/components/public/section-heading';
import type { Direction } from '@/types';

export function DirectionsSection({ directions }: { directions: Direction[] }) {
    return (
        <section
            className="sf-rep-directions sf-section"
            id="sf-rep-directions"
            aria-labelledby="sf-rep-directions-title"
        >
            <SectionHeading
                id="sf-rep-directions-title"
                title="Wherever home is"
            >
                Families are spread across countries. We help whichever way the
                journey goes.
            </SectionHeading>
            <div className="sf-rep-direction-grid">
                {directions.map((direction) => (
                    <article className="sf-rep-direction" key={direction.title}>
                        <LineArt name={direction.art} />
                        <h3>{direction.title}</h3>
                        <p>{direction.description}</p>
                        <CheckList items={direction.items} />
                    </article>
                ))}
            </div>
        </section>
    );
}
