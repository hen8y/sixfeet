import { BadgeCheck, HandCoins, ReceiptText } from 'lucide-react';
import type { Assurance } from '@/types';

export const assurances: Assurance[] = [
    {
        title: 'Verified organisers',
        short: 'Verified',
        detail: 'Identity and proof of death checked',
        icon: BadgeCheck,
    },
    {
        title: 'Pay providers directly',
        short: 'Pay direct',
        detail: 'Funds can go straight to who you book',
        icon: HandCoins,
    },
    {
        title: 'A clear spending report',
        short: 'Clear report',
        detail: 'Donors see where the money went',
        icon: ReceiptText,
    },
];
