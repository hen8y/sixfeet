import { ArrowUpRight, HeartHandshake } from 'lucide-react';

export function FamilyStorySection({ onSupport }: { onSupport: () => void }) {
    return (
        <section
            className="sf-family-story sf-section"
            aria-labelledby="sf-family-title"
        >
            <figure className="sf-family-photo">
                <img
                    src="/images/family-support.webp"
                    alt="Two family members sharing a quiet moment of support at home"
                    width="1200"
                    height="800"
                    loading="lazy"
                />
                <figcaption>
                    <HeartHandshake aria-hidden="true" /> Support for your
                    family, near or far.
                </figcaption>
            </figure>
            <div>
                <h2 id="sf-family-title">
                    Be there for them,
                    <br />
                    <em>wherever you are.</em>
                </h2>
                <p>
                    If you are at home, or arranging and paying from another
                    country, you can follow the same plan. See who is providing
                    each part, what it costs, and what happens next.
                </p>
                <button
                    className="sf-small-link"
                    type="button"
                    onClick={onSupport}
                >
                    Ask us where to start <ArrowUpRight aria-hidden="true" />
                </button>
            </div>
        </section>
    );
}
