import type { Country, Direction } from '@/types';

export const directionsFor = (country: Country): Direction[] => [
    {
        title: 'Bringing someone home',
        art: 'plane',
        description: `When someone dies abroad and the family wants them laid to rest in ${country.name}.`,
        items: [
            'We work with the funeral director or authorities where they died',
            'Follow the documents and the flight from wherever you are',
            'Met at the airport and handed to the family or a local funeral director',
        ],
    },
    {
        title: 'Taking someone home',
        art: 'globe',
        description: `When someone dies in ${country.name} and will be laid to rest in another country.`,
        items: [
            'Permits and certificates for leaving the country',
            'Embalming and a coffin approved for air travel',
            'Airline booking and embassy clearance for the destination',
        ],
    },
];
