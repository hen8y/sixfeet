import { useRef, useState, type FormEvent } from 'react';
import { searchNotice } from '@/constants/home/notices';
import { searchLabelFor } from '@/constants/home/service-views';
import { useMarket } from '@/hooks/use-market';
import { useServiceView } from '@/hooks/use-service-view';
import { glideToElement } from '@/lib/smooth-scroll';
import type { Detail } from '@/types';

export type Planner = ReturnType<typeof usePlanner>;

export function usePlanner(onSearch: (detail: Detail) => void) {
    const { country, changeCountry } = useMarket();
    const serviceView = useServiceView(onSearch, focus);
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState<string | null>(null);
    const section = useRef<HTMLElement>(null);
    const cityInput = useRef<HTMLInputElement>(null);
    const submitButton = useRef<HTMLButtonElement>(null);

    function glideToPlanner() {
        if (section.current) {
            glideToElement(section.current, 'center');
        }
    }

    function focus() {
        glideToPlanner();
        cityInput.current?.focus({ preventScroll: true });
    }

    function changeCity(value: string) {
        setCity(value);

        if (value.trim()) {
            setCityError(null);
        }
    }

    function resetCity() {
        setCity('');
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!serviceView.confirmChoice()) {
            return;
        }

        if (!city.trim()) {
            setCityError('Enter a city or area to continue.');
            cityInput.current?.focus();

            return;
        }

        onSearch(
            searchNotice(
                searchLabelFor(serviceView.view, serviceView.customServices),
                city.trim(),
                country,
            ),
        );
    }

    function browseCity(code: string, name: string) {
        const pickCity = () => {
            changeCity(name);
            glideToPlanner();
            submitButton.current?.focus({ preventScroll: true });
        };

        if (code === country.code) {
            pickCity();
        } else {
            changeCountry(code, pickCity);
        }
    }

    return {
        ...serviceView,
        city,
        changeCity,
        resetCity,
        cityError,
        section,
        cityInput,
        submitButton,
        focus,
        submit,
        browseCity,
    };
}
