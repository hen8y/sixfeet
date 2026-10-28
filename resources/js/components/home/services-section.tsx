import { CityBrowse } from '@/components/home/city-browse';
import { ServiceCard } from '@/components/home/service-card';
import { SectionHeading } from '@/components/public/section-heading';
import { services } from '@/constants/home/services';
import { useMarket } from '@/hooks/use-market';

export function ServicesSection({
    onSelectService,
    onBrowseCity,
    onSearchOther,
}: {
    onSelectService: (title: string) => void;
    onBrowseCity: (countryCode: string, city: string) => void;
    onSearchOther: () => void;
}) {
    const { country } = useMarket();

    return (
        <section
            className="sf-services sf-section"
            id="sf-services"
            aria-labelledby="sf-services-title"
        >
            <SectionHeading
                id="sf-services-title"
                title="Everything you need, in one place"
            >
                Arrange one part of the farewell, or bring several together.
                Prices are shown before you commit, in {country.currency.name}.
            </SectionHeading>
            <div className="sf-service-grid">
                {services.map((service) => (
                    <ServiceCard
                        key={service.title}
                        service={service}
                        onSelect={() => onSelectService(service.title)}
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
