import type { SupportContact } from '@/types';

export type ContactChannel = 'phone' | 'whatsapp';

export function contactHref(
    contact: SupportContact,
    channel: ContactChannel,
): string | null {
    const number = contact[channel];

    if (!number) {
        return null;
    }

    return channel === 'phone'
        ? `tel:${number}`
        : `https://wa.me/${number.replace(/\D/g, '')}`;
}
