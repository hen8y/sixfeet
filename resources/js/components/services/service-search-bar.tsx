import { ArrowRight } from 'lucide-react';
import { CityField } from '@/components/home/city-field';
import { PublicLink } from '@/components/public/public-link';
import { useMarket } from '@/hooks/use-market';
import type { ServiceTabsState } from '@/hooks/use-service-tabs';

export function ServiceSearchBar({
    serviceTabs,
}: {
    serviceTabs: ServiceTabsState;
}) {
    const { country } = useMarket();
    const { tab } = serviceTabs;

    if (tab.href) {
        return (
            <div className="sf-search-bar sf-search-bar-note">
                <p>{tab.barNote}</p>
                <PublicLink className="sf-primary" href={tab.href}>
                    {tab.action} <ArrowRight aria-hidden="true" />
                </PublicLink>
            </div>
        );
    }

    if (tab.comingSoon) {
        return (
            <div className="sf-search-bar sf-search-bar-note">
                <p>{tab.barNote}</p>
                <button
                    className="sf-primary"
                    type="button"
                    onClick={serviceTabs.showComingSoon}
                >
                    {tab.action} <ArrowRight aria-hidden="true" />
                </button>
            </div>
        );
    }

    return (
        <form
            className="sf-search-bar"
            onSubmit={serviceTabs.submit}
            noValidate
        >
            <CityField
                city={serviceTabs.city}
                onCityChange={serviceTabs.changeCity}
                country={country}
                inputRef={serviceTabs.cityInput}
                error={serviceTabs.cityError}
            />
            <button className="sf-primary" type="submit">
                {tab.action} <ArrowRight aria-hidden="true" />
            </button>
        </form>
    );
}
