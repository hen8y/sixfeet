import { useRemember } from '@inertiajs/react';
import { useRef, useState, type FormEvent } from 'react';
import { searchNotice, serviceNotice } from '@/constants/home/notices';
import { isBookable, services } from '@/constants/home/services';
import { searchLabelFor, servicesFor } from '@/constants/home/service-views';
import { useMarket } from '@/hooks/use-market';
import { glideToElement } from '@/lib/smooth-scroll';
import type { Detail, ServiceId, ServiceView } from '@/types';

export type Planner = ReturnType<typeof usePlanner>;

export function usePlanner(onSearch: (detail: Detail) => void) {
    const { country, changeCountry } = useMarket();
    const [view, setView] = useRemember<ServiceView>(
        'all',
        'home-service-view',
    );
    const [customServices, setCustomServices] = useRemember<ServiceId[]>(
        [],
        'home-chosen-services',
    );
    const [serviceError, setServiceError] = useState<string | null>(null);
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState<string | null>(null);
    const section = useRef<HTMLElement>(null);
    const customPicker = useRef<HTMLFieldSetElement>(null);
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

    function changeView(next: ServiceView) {
        setView(next);
        setServiceError(null);
    }

    function toggleCustomService(id: ServiceId) {
        setCustomServices(
            customServices.includes(id)
                ? customServices.filter((chosen) => chosen !== id)
                : [...customServices, id],
        );
        setServiceError(null);
    }

    function selectService(id: ServiceId) {
        if (view === 'custom') {
            if (!customServices.includes(id)) {
                toggleCustomService(id);
            }

            focus();

            return;
        }

        if (!isBookable(id)) {
            const service = services.find((item) => item.id === id);

            if (service) {
                onSearch(serviceNotice(service));
            }

            return;
        }

        changeView(id);
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

        if (view === 'custom' && customServices.length === 0) {
            setServiceError('Choose at least one service to continue.');
            customPicker.current?.querySelector('input')?.focus();

            return;
        }

        if (!city.trim()) {
            setCityError('Enter a city or area to continue.');
            cityInput.current?.focus();

            return;
        }

        onSearch(
            searchNotice(
                searchLabelFor(view, customServices),
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
        view,
        changeView,
        customServices,
        toggleCustomService,
        chosenServices: servicesFor(view, customServices),
        serviceError,
        customPicker,
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
