import type { Review } from '@/types';

// Illustrative until families have booked; replace with verified reviews.
export const reviews: Record<string, Review[]> = {
    NG: [
        {
            quote: 'When Papa died I didn’t know where to begin. Seeing the mortuary, the coffin and the hearse with one total made each decision feel possible.',
            name: 'Chinedu',
            initials: 'C',
            place: 'Lagos',
        },
        {
            quote: 'I live in London and my mother’s funeral was in Enugu. I could follow every part of the plan from here, without a dozen calls home.',
            name: 'Adaeze',
            initials: 'A',
            place: 'London, arranging in Enugu',
        },
        {
            quote: 'We changed the coffin in our package and saw the new price straight away. Nothing on the day surprised us.',
            name: 'Funmilayo',
            initials: 'F',
            place: 'Ibadan',
        },
    ],
    IE: [
        {
            quote: 'When Dad died I didn’t know where to begin. Seeing the funeral director, the coffin and the car with one total made each decision feel possible.',
            name: 'Ciarán',
            initials: 'C',
            place: 'Dublin',
        },
        {
            quote: 'I live in Dublin and my mother’s funeral was in Enugu. I could follow every part of the plan from here, without a dozen calls home.',
            name: 'Adaeze',
            initials: 'A',
            place: 'Dublin, arranging in Enugu',
        },
        {
            quote: 'We changed the coffin in our package and saw the new price straight away. Nothing on the day surprised us.',
            name: 'Sinéad',
            initials: 'S',
            place: 'Cork',
        },
    ],
};
