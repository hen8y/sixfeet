import { useRemember } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { serviceNotice } from '@/constants/home/notices';
import { isBookable, services } from '@/constants/home/services';
import { servicesFor } from '@/constants/home/service-views';
import type { Detail, ServiceId, ServiceView } from '@/types';

export type ServiceViewState = ReturnType<typeof useServiceView>;

export function useServiceView(
    onNotice: (detail: Detail) => void,
    onSelected: () => void,
) {
    const [view, setView] = useRemember<ServiceView>(
        'all',
        'home-service-view',
    );
    const [customServices, setCustomServices] = useRemember<ServiceId[]>(
        [],
        'home-chosen-services',
    );
    const [serviceError, setServiceError] = useState<string | null>(null);
    const customPicker = useRef<HTMLFieldSetElement>(null);

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

            onSelected();

            return;
        }

        if (!isBookable(id)) {
            const service = services.find((item) => item.id === id);

            if (service) {
                onNotice(serviceNotice(service));
            }

            return;
        }

        changeView(id);
        onSelected();
    }

    function confirmChoice() {
        if (view === 'custom' && customServices.length === 0) {
            setServiceError('Choose at least one service to continue.');
            customPicker.current?.querySelector('input')?.focus();

            return false;
        }

        return true;
    }

    return {
        view,
        changeView,
        customServices,
        toggleCustomService,
        chosenServices: servicesFor(view, customServices),
        serviceError,
        customPicker,
        selectService,
        confirmChoice,
    };
}
