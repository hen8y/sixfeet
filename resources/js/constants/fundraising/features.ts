import type { Country, LineArtFeature } from '@/types';

export const featuresFor = (country: Country): LineArtFeature[] => [
    {
        title: 'Pay providers from the fund',
        description:
            'Use the money to book a mortuary, a coffin, transport or a full package on Six Feet, so it goes exactly where it is needed.',
        art: 'coins',
    },
    {
        title: 'Verified before it is shared',
        description:
            'We check the organiser’s identity and proof of death before a fundraiser goes live, so people can give with confidence.',
        art: 'shield',
    },
    {
        title: 'Give from anywhere',
        description: `Family in ${country.cities[0]?.name ?? country.name}, London or Houston can give by card, with the amount shown in ${country.currency.name}.`,
        art: 'globe',
    },
    {
        title: 'Share it in one tap',
        description:
            'Send one link on WhatsApp or by email, or print a QR code for the order of service and the wake.',
        art: 'phone',
    },
    {
        title: 'Updates and thanks',
        description:
            'Post updates as plans come together and thank the people who gave. Donors can choose to give privately.',
        art: 'chat',
    },
    {
        title: 'A clear spending report',
        description:
            'Donors can see what their gifts paid for, so trust is kept long after the funeral.',
        art: 'receipt',
    },
];
