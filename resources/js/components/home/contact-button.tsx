import type { ReactNode } from 'react';
import { contactHref, type ContactChannel } from '@/lib/contact';
import type { SupportContact } from '@/types';

export function ContactButton({
    contact,
    channel,
    onUnavailable,
    children,
}: {
    contact: SupportContact;
    channel: ContactChannel;
    onUnavailable: () => void;
    children: ReactNode;
}) {
    const href = contactHref(contact, channel);

    if (!href) {
        return (
            <button
                className="sf-outline"
                type="button"
                onClick={onUnavailable}
            >
                {children}
            </button>
        );
    }

    const external = href.startsWith('https:');

    return (
        <a
            className="sf-outline"
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
        >
            {children}
        </a>
    );
}
