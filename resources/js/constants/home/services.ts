import {
    CarFront,
    Flower2,
    Globe,
    Heart,
    House,
    LayoutDashboard,
    PackageCheck,
    Ribbon,
} from 'lucide-react';
import { repatriation } from '@/routes';
import type { BookableServiceId, Service, ServiceId } from '@/types';

export const services: Service[] = [
    {
        id: 'dashboard',
        title: 'Bereavement dashboard',
        tab: 'Dashboard',
        description:
            'One private place for the whole arrangement. Follow each booking, payment and document, and keep the family up to date.',
        highlights: [
            'Every booking and payment together',
            'Documents kept in one place',
            'Updates the family can follow',
        ],
        action: 'Learn about the dashboard',
        icon: LayoutDashboard,
    },
    {
        id: 'mortuary',
        title: 'Mortuary booking',
        tab: 'Mortuary',
        description:
            'Find a verified mortuary or funeral director in your city. See how they care for your loved one and the price before you book.',
        highlights: [
            'Verified mortuaries and funeral directors',
            'How they care for your loved one',
            'Preparation options and the price',
        ],
        action: 'Find a mortuary',
        icon: House,
    },
    {
        id: 'coffins',
        title: 'Coffin marketplace',
        tab: 'Coffins',
        description:
            'Compare coffins from verified suppliers by style and price, and see whether they can be delivered or collected in your city.',
        highlights: [
            'Coffins from verified suppliers',
            'Style and price, side by side',
            'Delivery or collection in your city',
        ],
        action: 'Browse coffins',
        icon: Ribbon,
    },
    {
        id: 'transport',
        title: 'Hearse & transport',
        tab: 'Transport',
        description:
            'Book a hearse and a car for the family. Set the time, the pickup and where everyone is going, with the cost shown before the day.',
        highlights: [
            'A hearse and a car for the family',
            'The time, the pickup and the route',
            'The cost shown before the day',
        ],
        action: 'Book transport',
        icon: CarFront,
    },
    {
        id: 'flowers',
        title: 'Flowers & ceremony',
        tab: 'Flowers',
        description:
            'Choose flowers and the details of the service, from the arrangements to the order of the day, with the price in view.',
        highlights: [
            'Flowers for the service',
            'The details of the ceremony',
            'The price before you commit',
        ],
        action: 'Find flowers & ceremony',
        icon: Flower2,
    },
    {
        id: 'packages',
        title: 'Funeral packages',
        tab: 'Packages',
        description:
            'Care, a coffin and transport in one arrangement, when you would rather not gather each part yourself. The full cost is shown in one place.',
        highlights: [
            'Care, a coffin and transport together',
            'One arrangement, not several bookings',
            'The full cost in one place',
        ],
        action: 'Explore packages',
        icon: PackageCheck,
    },
    {
        id: 'repatriation',
        title: 'International repatriation',
        tab: 'Repatriation',
        description:
            'Bring someone home from abroad, with clear steps for the paperwork, the flight and the arrangements on arrival.',
        highlights: [
            'The paperwork, step by step',
            'The journey home',
            'Arrangements on arrival',
        ],
        action: 'Bring someone home',
        href: repatriation.url(),
        icon: Globe,
    },
    {
        id: 'memorials',
        title: 'Digital memorials',
        tab: 'Memorials',
        description:
            'A page to remember them by. Share the notice and the arrangements, and gather memories from people near and far.',
        highlights: [
            'The notice and the arrangements',
            'Memories from family and friends',
            'Easy to share, near and far',
        ],
        action: 'Learn about memorials',
        icon: Heart,
    },
];

export const packageService: ServiceId = 'packages';

// These aren't found by city, so they have no tab of their own.
export function isBookable(id: ServiceId): id is BookableServiceId {
    return id !== 'dashboard' && id !== 'memorials';
}
