import type { ServicePackage } from '@/types';

// fromPrice is in minor units per country code; null until providers confirm a rate.
export const basicPackage: ServicePackage = {
    title: 'Basic Package',
    tier: 'A little of everything',
    fromPrice: { NG: null, IE: null },
    description:
        'Every part of the arrangement in its simplest form, at one price. A good place to start when you don’t yet know what you’ll need.',
    features: [
        'Your bereavement dashboard',
        'Mortuary booking',
        'A simple coffin',
        'Hearse transport',
        'Simple flowers and ceremony support',
        'Repatriation guidance',
        'A digital memorial',
        'Support by phone or WhatsApp',
    ],
};

export const packages: ServicePackage[] = [
    {
        title: 'Essential',
        tier: 'The essentials',
        fromPrice: { NG: null, IE: null },
        description:
            'A simple farewell, with the basics done carefully and the price clear from the start.',
        features: [
            'Mortuary care',
            'A simple coffin',
            'Local hearse transport',
            'Help with basic documents',
        ],
    },
    {
        title: 'Standard Family',
        tier: 'Family care',
        fromPrice: { NG: null, IE: null },
        description:
            'For most families. Care and preparation, with room for the people closest to you.',
        features: [
            'Mortuary care and preparation',
            'A mid-range coffin',
            'A hearse and one family vehicle',
            'A printed order of service',
        ],
    },
    {
        title: 'Complete Service',
        tier: 'Full support',
        fromPrice: { NG: null, IE: null },
        description:
            'A fuller day, with flowers, extra transport and one person your family can call.',
        features: [
            'The Standard Family services',
            'Flowers',
            'An extra vehicle',
            'A named case manager',
        ],
    },
];
