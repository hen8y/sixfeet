import { BasicPackageBand } from '@/components/home/basic-package-band';
import { CityBrowse } from '@/components/home/city-browse';
import { ServiceCard } from '@/components/home/service-card';
import { SectionHeading } from '@/components/public/section-heading';
import { packageService } from '@/constants/home/services';
import { servicesTitleFor } from '@/constants/home/service-views';
import { useMarket } from '@/hooks/use-market';
import type { Service, ServiceId, ServiceView } from '@/types';

export function ServicesSection({
    view,
    customServices,
    chosenServices,
    onSelectService,
    onExploreBasicPackage,
    onBrowseCity,
    onSearchOther,
}: {
    view: ServiceView;
    customServices: ServiceId[];
    chosenServices: Service[];
    onSelectService: (id: ServiceId) => void;
    onExploreBasicPackage: () => void;
    onBrowseCity: (countryCode: string, city: string) => void;
    onSearchOther: () => void;
}) {
    const { country } = useMarket();
    const count = chosenServices.length;
    const layout = count === 1 ? 'single' : count === 2 ? 'pair' : 'grid';

    return (
        <section
            className="sf-services sf-section"
            id="sf-services"
            aria-labelledby="sf-services-title"
        >
            <SectionHeading
                id="sf-services-title"
                title={servicesTitleFor(view, customServices)}
            >
                {count > 1 &&
                    'Arrange one part of the farewell, or bring several together. '}
                Prices are shown before you commit, in {country.currency.name}.
            </SectionHeading>
            {chosenServices.some(({ id }) => id === packageService) && (
                <BasicPackageBand onExplore={onExploreBasicPackage} />
            )}
            <div className="sf-service-grid" data-layout={layout}>
                {chosenServices.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        detailed={count === 1}
                        onSelect={() => onSelectService(service.id)}
                    />
                ))}
            </div>
            <CityBrowse
                onBrowseCity={onBrowseCity}
                onSearchOther={onSearchOther}
            />
        </section>
    );
}
