import { useRef, useState, type FormEvent } from 'react';
import { searchNotice } from '@/constants/home/notices';
import { services } from '@/constants/home/services';
import { useMarket } from '@/hooks/use-market';
import { glideToElement } from '@/lib/smooth-scroll';
import type { Detail } from '@/types';

export type Planner = ReturnType<typeof usePlanner>;

export function usePlanner(onSearch: (detail: Detail) => void) {
    const { country, changeCountry } = useMarket();
    const [service, setService] = useState(services[0].title);
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

    function selectService(title: string) {
        setService(title);
        focus();
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

        if (!city.trim()) {
            setCityError('Enter a city or area to continue.');
            cityInput.current?.focus();

            return;
        }

        onSearch(searchNotice(service, city.trim(), country));
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
        service,
        setService,
        city,
        changeCity,
        resetCity,
        cityError,
        section,
        cityInput,
        submitButton,
        focus,
        selectService,
        submit,
        browseCity,
    };
}
