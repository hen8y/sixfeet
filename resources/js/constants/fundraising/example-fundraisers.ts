import type { ExampleFundraiser } from '@/types';

// Amounts are minor units of the country's currency; add an entry before activating a country.
export const exampleFundraisers: Record<string, ExampleFundraiser> = {
    NG: {
        title: 'Celebrating Mama Grace Okoro',
        organiser: 'her daughter, Ifeoma',
        goal: 350_000_000,
        raised: 214_000_000,
        donors: 64,
        daysLeft: 12,
        spending: [
            {
                label: 'Mortuary care and preparation',
                paidTo: 'Paid to the mortuary',
                amount: 45_000_000,
            },
            {
                label: 'Coffin',
                paidTo: 'Paid to the supplier',
                amount: 38_000_000,
            },
            {
                label: 'Hearse and family car',
                paidTo: 'Paid to the vehicle operator',
                amount: 22_000_000,
            },
        ],
    },
    IE: {
        title: 'In memory of Patrick Walsh',
        organiser: 'his son, Seán',
        goal: 800_000,
        raised: 512_000,
        donors: 41,
        daysLeft: 9,
        spending: [
            {
                label: 'Funeral director’s care',
                paidTo: 'Paid to the funeral director',
                amount: 240_000,
            },
            {
                label: 'Coffin',
                paidTo: 'Paid to the supplier',
                amount: 115_000,
            },
            {
                label: 'Hearse and family car',
                paidTo: 'Paid to the vehicle operator',
                amount: 62_000,
            },
        ],
    },
};
