import { BasicPackageBand } from '@/components/home/basic-package-band';
import { CityBrowse } from '@/components/home/city-browse';
import { ServiceCard } from '@/components/home/service-card';
import { SectionHeading } from '@/components/public/section-heading';
import { isSearchable, otherServices } from '@/constants/services/tabs';
import { useMarket } from '@/hooks/use-market';
import type { ServiceTabsState } from '@/hooks/use-service-tabs';
import type { Service } from '@/types';

const headings: Record<string, string> = {
    all: 'Everything you need, in one place',
    other: 'Other services',
};

export function ServiceTabSection({
    serviceTabs,
    onOpenTab,
    onOpenOtherService,
    onExploreBasicPackage,
    onBrowseCity,
}: {
    serviceTabs: ServiceTabsState;
    onOpenTab: (tab: ServiceTabsState['tab']) => void;
    onOpenOtherService: (service: Service) => void;
    onExploreBasicPackage: () => void;
    onBrowseCity: (countryCode: string, city: string) => void;
}) {
    const { country } = useMarket();
    const { tab, tabs } = serviceTabs;
    const isOverview = tab.id === 'all' || tab.id === 'other';

    function cards() {
        if (tab.id === 'other') {
            return otherServices.map((service) => (
                <ServiceCard
                    key={service.id}
                    service={service}
                    detailed={false}
                    onSelect={() => onOpenOtherService(service)}
                />
            ));
        }

        if (tab.id === 'all') {
            return tabs
                .filter(({ id }) => id !== 'all')
                .map((item) => (
                    <ServiceCard
                        key={item.id}
                        service={item}
                        detailed={false}
                        onSelect={() => onOpenTab(item)}
                    />
                ));
        }

        return (
            <ServiceCard
                service={tab}
                detailed
                onSelect={() =>
                    tab.comingSoon
                        ? serviceTabs.showComingSoon()
                        : serviceTabs.focusSearch()
                }
            />
        );
    }

    return (
        <section
            className="sf-services sf-section"
            id="sf-services"
            aria-labelledby="sf-services-title"
        >
            <SectionHeading
                id="sf-services-title"
                title={headings[tab.id] ?? 'What to expect'}
            >
                {tab.priced &&
                    `Prices are shown before you commit, in ${country.currency.name}.`}
            </SectionHeading>
            {isOverview && (
                <BasicPackageBand onExplore={onExploreBasicPackage} />
            )}
            <div
                className="sf-service-grid"
                data-layout={isOverview ? 'grid' : 'single'}
            >
                {cards()}
            </div>
            {isSearchable(tab) && <CityBrowse onBrowseCity={onBrowseCity} />}
        </section>
    );
}
