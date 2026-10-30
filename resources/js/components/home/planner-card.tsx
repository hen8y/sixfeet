import { ArrowRight, BadgeCheck } from 'lucide-react';
import { CityField } from '@/components/home/city-field';
import { CustomServicesField } from '@/components/home/custom-services-field';
import { ServiceTabs } from '@/components/home/service-tabs';
import { plannerCopyFor } from '@/constants/home/service-views';
import { useMarket } from '@/hooks/use-market';
import type { Planner } from '@/hooks/use-planner';

export function PlannerCard({ planner }: { planner: Planner }) {
    const { country } = useMarket();
    const copy = plannerCopyFor(planner.view);

    return (
        <section
            className="sf-find"
            ref={planner.section}
            aria-labelledby="sf-search-title"
        >
            <h2 className="sf-find-title" id="sf-search-title">
                {copy.heading}
            </h2>
            <ServiceTabs view={planner.view} onChange={planner.changeView} />
            <form onSubmit={planner.submit} noValidate>
                {planner.view === 'custom' && (
                    <CustomServicesField
                        chosen={planner.customServices}
                        onToggle={planner.toggleCustomService}
                        fieldRef={planner.customPicker}
                        error={planner.serviceError}
                    />
                )}
                <CityField
                    city={planner.city}
                    onCityChange={planner.changeCity}
                    country={country}
                    inputRef={planner.cityInput}
                    error={planner.cityError}
                />
                <button
                    className="sf-primary"
                    type="submit"
                    ref={planner.submitButton}
                >
                    {copy.action} <ArrowRight aria-hidden="true" />
                </button>
            </form>
            <p className="sf-find-foot">
                <BadgeCheck aria-hidden="true" /> Your details stay private. You
                choose when to book.
            </p>
        </section>
    );
}
