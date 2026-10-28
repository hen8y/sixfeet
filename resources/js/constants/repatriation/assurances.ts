import { ClipboardCheck, ReceiptText, UserRound } from 'lucide-react';
import type { Assurance } from '@/types';

export const assurances: Assurance[] = [
    {
        title: 'A named case manager',
        short: 'Case manager',
        detail: 'One person who knows your case',
        icon: UserRound,
    },
    {
        title: 'Itemised quotes',
        short: 'Itemised',
        detail: 'Every part priced before you commit',
        icon: ReceiptText,
    },
    {
        title: 'Every document tracked',
        short: 'Tracked',
        detail: 'See each step until they are home',
        icon: ClipboardCheck,
    },
];
