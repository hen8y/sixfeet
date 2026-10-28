import { MessageCircle, Phone } from 'lucide-react';
import { ContactButton } from '@/components/home/contact-button';
import { LineArt } from '@/components/public/line-art';
import type { SupportDesk } from '@/types';

export function SupportDeskCard({
    desk,
    onSupport,
}: {
    desk: SupportDesk;
    onSupport: () => void;
}) {
    return (
        <article className="sf-desk">
            <LineArt name={desk.art} />
            <h3>{desk.title}</h3>
            <p>{desk.description}</p>
            <div className="sf-desk-actions">
                <ContactButton
                    contact={desk.contact}
                    channel="phone"
                    onUnavailable={onSupport}
                >
                    <Phone aria-hidden="true" />
                    Call
                </ContactButton>
                <ContactButton
                    contact={desk.contact}
                    channel="whatsapp"
                    onUnavailable={onSupport}
                >
                    <MessageCircle aria-hidden="true" />
                    WhatsApp
                </ContactButton>
            </div>
            <span className="sf-desk-hours">
                {desk.contact.hours ?? 'Opening hours shared at launch'}
            </span>
        </article>
    );
}
