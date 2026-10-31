import { useRemember } from '@inertiajs/react';
import { useRef, useState, type FormEvent } from 'react';
import { searchNotice, serviceNotice } from '@/constants/home/notices';
import { serviceTabsFor } from '@/constants/services/tabs';
import { useMarket } from '@/hooks/use-market';
import type { Detail, ServiceTabId } from '@/types';

export type ServiceTabsState = ReturnType<typeof useServiceTabs>;

export function useServiceTabs(onNotice: (detail: Detail) => void) {
    const { country } = useMarket();
    const tabs = serviceTabsFor(country);
    const [tabId, setTabId] = useRemember<ServiceTabId>('all', 'services-tab');
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState<string | null>(null);
    const cityInput = useRef<HTMLInputElement>(null);
    const tab = tabs.find(({ id }) => id === tabId) ?? tabs[0];

    function changeTab(next: ServiceTabId) {
        setTabId(next);
        setCityError(null);
    }

    function changeCity(value: string) {
        setCity(value);

        if (value.trim()) {
            setCityError(null);
        }
    }

    function focusSearch() {
        cityInput.current?.focus({ preventScroll: true });
    }

    function showComingSoon() {
        onNotice(serviceNotice(tab));
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!city.trim()) {
            setCityError('Enter a city or area to continue.');
            cityInput.current?.focus();

            return;
        }

        onNotice(searchNotice(tab.searchLabel, city.trim(), country));
    }

    return {
        tabs,
        tab,
        changeTab,
        city,
        changeCity,
        cityError,
        cityInput,
        focusSearch,
        showComingSoon,
        submit,
    };
}
