import type { CSSProperties } from 'react';
import { SupportDeskCard } from '@/components/home/support-desk-card';
import { SectionHeading } from '@/components/public/section-heading';
import { supportDesksFor } from '@/constants/home/support-desks';
import { useMarket } from '@/hooks/use-market';

export function SupportSection({ onSupport }: { onSupport: () => void }) {
    const { country, countries } = useMarket();
    const desks = supportDesksFor(country, countries);

    return (
        <section
            className="sf-people sf-section"
            id="sf-people"
            aria-labelledby="sf-people-title"
        >
            <SectionHeading
                id="sf-people-title"
                eyebrow="Real support"
                title="A person to talk to, by phone or WhatsApp"
            >
                You don’t have to work it out alone. Our team can explain your
                options, check a price or help you take the next step.
            </SectionHeading>
            <div
                className="sf-desk-grid"
                style={{ '--sf-count': desks.length } as CSSProperties}
            >
                {desks.map((desk) => (
                    <SupportDeskCard
                        key={desk.title}
                        desk={desk}
                        onSupport={onSupport}
                    />
                ))}
            </div>
        </section>
    );
}
