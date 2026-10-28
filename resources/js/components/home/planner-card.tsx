import { ArrowRight, BadgeCheck } from 'lucide-react';
import { CityField } from '@/components/home/city-field';
import { ServiceField } from '@/components/home/service-field';
import { useMarket } from '@/hooks/use-market';
import type { Planner } from '@/hooks/use-planner';

export function PlannerCard({ planner }: { planner: Planner }) {
    const { country } = useMarket();

    return (
        <section
            className="sf-find"
            ref={planner.section}
            aria-labelledby="sf-search-title"
        >
            <div className="sf-search-heading">
                <h2 id="sf-search-title">Begin planning</h2>
                <span>Start with the essentials.</span>
            </div>
            <form onSubmit={planner.submit} noValidate>
                <ServiceField
                    service={planner.service}
                    onServiceChange={planner.setService}
                />
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
                    Find services <ArrowRight aria-hidden="true" />
                </button>
            </form>
            <p className="sf-find-foot">
                <BadgeCheck aria-hidden="true" /> Your details stay private. You
                choose when to book.
            </p>
        </section>
    );
}
