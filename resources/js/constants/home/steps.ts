import type { Country, Step } from '@/types';

export function stepsFor(country: Country): Step[] {
    return [
        {
            label: '01 / FIND',
            title: 'Choose the care you need.',
            description:
                'Look through mortuaries, essentials, vehicles and packages in your city. No account is needed to browse.',
        },
        {
            label: '02 / ARRANGE',
            title: 'Book with clarity.',
            description: `Check what is included and the full cost in ${country.currency.name}. You book only when you are ready.`,
        },
        {
            label: '03 / STAY CLOSE',
            title: 'Know what happens next.',
            description:
                'Follow the arrangement as it moves forward, and reach the provider or our team by phone or WhatsApp.',
        },
    ];
}
