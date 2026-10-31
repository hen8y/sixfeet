import type { Ref } from 'react';
import { ServiceSearchBar } from '@/components/services/service-search-bar';
import type { ServiceTabsState } from '@/hooks/use-service-tabs';

export function ServicesHeroSection({
    serviceTabs,
    sectionRef,
}: {
    serviceTabs: ServiceTabsState;
    sectionRef: Ref<HTMLElement>;
}) {
    const { heroTitle, heroBody } = serviceTabs.tab;

    return (
        <section
            className="sf-tab-hero"
            id="sf-start"
            ref={sectionRef}
            aria-labelledby="sf-hero-title"
        >
            <h1 id="sf-hero-title">{heroTitle}</h1>
            <p>{heroBody}</p>
            <ServiceSearchBar serviceTabs={serviceTabs} />
        </section>
    );
}
