import { LayoutGrid, ListChecks } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { isBookable, services } from '@/constants/home/services';
import type { Country, Service, ServiceId, ServiceView } from '@/types';

export const serviceTabs: {
    view: ServiceView;
    label: string;
    icon: LucideIcon;
}[] = [
    { view: 'all', label: 'All services', icon: LayoutGrid },
    ...services.flatMap(({ id, tab, icon }) =>
        isBookable(id) ? [{ view: id, label: tab, icon }] : [],
    ),
    { view: 'custom', label: 'Custom', icon: ListChecks },
];

export function servicesFor(
    view: ServiceView,
    customServices: ServiceId[],
): Service[] {
    if (view === 'all' || (view === 'custom' && customServices.length === 0)) {
        return services;
    }

    return services.filter(({ id }) =>
        view === 'custom' ? customServices.includes(id) : id === view,
    );
}

export function searchLabelFor(
    view: ServiceView,
    customServices: ServiceId[],
): string {
    if (view === 'all') {
        return 'All services';
    }

    const chosen = servicesFor(view, customServices);

    if (view === 'custom') {
        return new Intl.ListFormat('en', { type: 'conjunction' }).format(
            chosen.map(({ tab }) => tab),
        );
    }

    return chosen[0].title;
}

export function servicesTitleFor(
    view: ServiceView,
    customServices: ServiceId[],
): string {
    if (view === 'all' || (view === 'custom' && customServices.length === 0)) {
        return 'Everything you need, in one place';
    }

    return view === 'custom' ? 'The services you chose' : 'What to expect';
}

export function plannerCopyFor(view: ServiceView): {
    heading: string;
    action: string;
} {
    if (view === 'all') {
        return {
            heading: 'Begin planning',
            action: 'Find services',
        };
    }

    if (view === 'custom') {
        return {
            heading: 'Choose what you need',
            action: 'Find services',
        };
    }

    const service = services.find(({ id }) => id === view) as Service;

    return {
        heading: service.heading ?? service.title,
        action: service.action,
    };
}

export function heroCopyFor(
    view: ServiceView,
    country: Country,
): { title: string; emphasis: string; body: string } {
    const copy: Record<
        ServiceView,
        { title: string; emphasis: string; body: string }
    > = {
        all: {
            title: 'A thoughtful farewell,',
            emphasis: 'from home or abroad.',
            body: `Arrange a mortuary, a coffin, flowers and transport in ${country.name}, whether you are close by or a flight away. Compare verified providers and see the price before you book.`,
        },
        mortuary: {
            title: 'Gentle care for someone you love,',
            emphasis: 'wherever you are.',
            body: `Find a verified mortuary or funeral director in ${country.name}. See how they care for your loved one, what preparation they offer, and the price before you book.`,
        },
        coffins: {
            title: 'The right coffin,',
            emphasis: 'without the pressure.',
            body: `Compare coffins from verified suppliers in ${country.name} by style and price, and see whether they can be delivered or collected in your city.`,
        },
        transport: {
            title: 'A hearse and cars for the family,',
            emphasis: 'arranged for the day.',
            body: `Book funeral transport in ${country.name}. Set the time, the pickup and where everyone is going, with the cost shown before the day.`,
        },
        flowers: {
            title: 'Flowers and a ceremony,',
            emphasis: 'as they would have wanted.',
            body: `Choose flowers and the details of the service in ${country.name}, from the arrangements to the order of the day, with the price in view.`,
        },
        packages: {
            title: 'One arrangement,',
            emphasis: 'with one clear price.',
            body: `Care, a coffin and transport together in ${country.name}, when you would rather not gather each part yourself. The full cost is shown in one place.`,
        },
        repatriation: {
            title: 'Bringing someone home,',
            emphasis: 'one clear step at a time.',
            body: `Bring someone home to ${country.name} from abroad, or take them from ${country.name} to where they belong, with clear steps for the paperwork and the journey.`,
        },
        custom: {
            title: 'Arrange only',
            emphasis: 'what you need.',
            body: `Choose the services you want in ${country.name} and this page will show just those. You can change your mind at any time.`,
        },
    };

    return copy[view];
}
