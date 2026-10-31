import {
    CarFront,
    Flower2,
    Globe,
    HandHeart,
    House,
    Landmark,
    LayoutGrid,
    PiggyBank,
    Ribbon,
} from 'lucide-react';
import { services } from '@/constants/home/services';
import { fundraising, repatriation } from '@/routes';
import type {
    Country,
    Service,
    ServiceId,
    ServiceTab,
    ServiceTabId,
} from '@/types';

export function serviceTabsFor(country: Country): ServiceTab[] {
    return [
        {
            id: 'all',
            label: 'Home',
            title: 'All services',
            heroTitle: 'Everything for a funeral, in one place',
            heroBody: `Mortuaries, vaults, hearses, coffins, repatriation, fundraising and more in ${country.name}. Compare verified providers and see the price before you book.`,
            description:
                'Every part of the farewell, from verified providers, with prices you can compare.',
            highlights: [],
            action: 'Find services',
            searchLabel: 'All services',
            priced: true,
            icon: LayoutGrid,
        },
        {
            id: 'mortuary',
            label: 'Mortuary',
            title: 'Mortuary',
            heroTitle: 'Find a mortuary you can trust',
            heroBody: `Compare verified mortuaries and funeral directors in ${country.name}, and see the price before you book.`,
            description:
                'Find a verified mortuary or funeral director in your city. See how they care for your loved one and the price before you book.',
            highlights: [
                'Verified mortuaries and funeral directors',
                'How they care for your loved one',
                'Preparation options and the price',
            ],
            action: 'Find a mortuary',
            searchLabel: 'Mortuaries',
            priced: true,
            icon: House,
        },
        {
            id: 'vaults',
            label: 'Vaults',
            title: 'Vaults',
            heroTitle: 'Arrange a burial vault',
            heroBody: `Compare burial vault providers in ${country.name}, see what each one includes, and know the price before you book.`,
            description:
                'Find a verified provider for a burial vault in your city. See what is included and the price before you book.',
            highlights: [
                'Verified vault providers',
                'What each option includes',
                'The price before you book',
            ],
            action: 'Find a vault',
            searchLabel: 'Vaults',
            priced: true,
            icon: Landmark,
        },
        {
            id: 'hearse',
            label: 'Hearse',
            title: 'Hearse',
            heroTitle: 'Book a hearse and cars for the family',
            heroBody: `Book funeral transport in ${country.name}. Set the time, the pickup and the route, with the cost shown before the day.`,
            description:
                'Book a hearse and a car for the family. Set the time, the pickup and where everyone is going, with the cost shown before the day.',
            highlights: [
                'A hearse and a car for the family',
                'The time, the pickup and the route',
                'The cost shown before the day',
            ],
            action: 'Find a hearse',
            searchLabel: 'Hearses',
            priced: true,
            icon: CarFront,
        },
        {
            id: 'coffins',
            label: 'Coffins',
            title: 'Coffins',
            heroTitle: 'Choose the right coffin, without the pressure',
            heroBody: `Compare coffins from verified suppliers in ${country.name} by style and price, with delivery or collection in your city.`,
            description:
                'Compare coffins from verified suppliers by style and price, and see whether they can be delivered or collected in your city.',
            highlights: [
                'Coffins from verified suppliers',
                'Style and price, side by side',
                'Delivery or collection in your city',
            ],
            action: 'Find coffins',
            searchLabel: 'Coffins',
            priced: true,
            icon: Ribbon,
        },
        {
            id: 'repatriation',
            label: 'Repatriation',
            title: 'Repatriation',
            heroTitle: 'Bring someone home',
            heroBody: `Bring someone home to ${country.name} from abroad, or take them to where they belong, with clear steps for the paperwork and the journey.`,
            description:
                'Bring someone home from abroad, with clear steps for the paperwork, the flight and the arrangements on arrival.',
            highlights: [
                'The paperwork, step by step',
                'The journey home',
                'Arrangements on arrival',
            ],
            action: 'Bring someone home',
            href: repatriation.url(),
            searchLabel: 'Repatriation',
            barNote: 'See each step, from the paperwork to arrival.',
            priced: true,
            icon: Globe,
        },
        {
            id: 'fundraising',
            label: 'Fundraising',
            title: 'Fundraising',
            heroTitle: 'Raise funds for a funeral',
            heroBody:
                'Bring family and friends together to share the cost of a farewell, wherever they are.',
            description:
                'Bring family and friends together to share the cost of a farewell, wherever they are.',
            highlights: [
                'A page to share with family and friends',
                'Support from near and far',
                'Funds for the arrangements',
            ],
            action: 'Start a fundraiser',
            href: fundraising.url(),
            searchLabel: 'Fundraising',
            barNote: 'See how a fundraiser works before you begin.',
            priced: false,
            icon: HandHeart,
        },
        {
            id: 'savings',
            label: 'Savings',
            title: 'Savings',
            heroTitle: 'Plan ahead for a funeral',
            heroBody:
                'Set money aside over time, so the cost does not fall on your family all at once.',
            description:
                'Set money aside over time, so the cost does not fall on your family all at once.',
            highlights: [
                'Plan ahead at your own pace',
                'Track what you have set aside',
                'Offered through licensed partners',
            ],
            action: 'Learn about savings',
            searchLabel: 'Savings',
            barNote: 'Funeral savings are not available yet.',
            comingSoon: true,
            priced: false,
            icon: PiggyBank,
        },
        {
            id: 'other',
            label: 'Other services',
            title: 'Other services',
            heroTitle: 'Everything else for the farewell',
            heroBody: `Flowers and ceremony details, funeral packages, digital memorials and a private dashboard for your family in ${country.name}.`,
            description:
                'Flowers, packages, memorials and a private place for the whole arrangement.',
            highlights: [],
            action: 'Find services',
            searchLabel: 'Other services',
            priced: true,
            icon: Flower2,
        },
    ];
}

const otherServiceIds: ServiceId[] = [
    'flowers',
    'packages',
    'memorials',
    'dashboard',
];

export const otherServices: Service[] = services.filter(({ id }) =>
    otherServiceIds.includes(id),
);

export function tabForService(id: ServiceId): ServiceTabId {
    const tabs: Partial<Record<ServiceId, ServiceTabId>> = {
        mortuary: 'mortuary',
        coffins: 'coffins',
        transport: 'hearse',
        repatriation: 'repatriation',
    };

    return tabs[id] ?? 'other';
}

export function isSearchable({ href, comingSoon }: ServiceTab): boolean {
    return !href && !comingSoon;
}
