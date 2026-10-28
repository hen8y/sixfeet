import { BadgeCheck, HeartHandshake, ReceiptText } from 'lucide-react';
import type { Assurance } from '@/types';

export const assurances: Assurance[] = [
    {
        title: 'Verified providers',
        short: 'Verified',
        detail: 'Every provider is checked',
        icon: BadgeCheck,
    },
    {
        title: 'Clear prices',
        short: 'Clear prices',
        detail: 'The full cost before you book',
        icon: ReceiptText,
    },
    {
        title: 'A person to turn to',
        short: 'Real support',
        detail: 'Our team by phone or WhatsApp',
        icon: HeartHandshake,
    },
];
