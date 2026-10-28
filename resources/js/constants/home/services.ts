import { CarFront, Flower2, House, PackageCheck } from 'lucide-react';
import type { Service } from '@/types';

export const services: Service[] = [
    {
        title: 'Mortuary & funeral care',
        description:
            'Find a verified mortuary or funeral director in your city. See how they care for your loved one, what preparation they offer, and the price before you book.',
        action: 'Find a provider',
        icon: House,
    },
    {
        title: 'Coffins & funeral essentials',
        heading: 'Funeral essentials',
        description:
            'Choose a coffin, flowers and the details of the farewell. Compare style and price, and see whether it can be delivered or collected in your city.',
        action: 'Find funeral essentials',
        icon: Flower2,
    },
    {
        title: 'Hearse & vehicle hire',
        heading: 'Hearses & family vehicles',
        description:
            'Book a hearse and a car for the family. Set the time, the pickup and where everyone is going, with the cost shown before the day.',
        action: 'Explore vehicle hire',
        icon: CarFront,
    },
    {
        title: 'A complete funeral package',
        heading: 'Funeral packages',
        description:
            'Care, a coffin and transport in one arrangement, when you would rather not gather each part yourself. The full cost is shown in one place.',
        action: 'Explore packages',
        icon: PackageCheck,
    },
];

export const packageService = 'A complete funeral package';
