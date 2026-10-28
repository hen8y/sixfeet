import { MapPin, MessageCircle } from 'lucide-react';

export function MobileDock({
    visible,
    onFindServices,
    onSupport,
}: {
    visible: boolean;
    onFindServices: () => void;
    onSupport: () => void;
}) {
    return (
        <div className="sf-dock" data-visible={visible} inert={!visible}>
            <button
                className="sf-primary"
                type="button"
                onClick={onFindServices}
            >
                <MapPin aria-hidden="true" /> Find services near you
            </button>
            <button
                className="sf-dock-help"
                type="button"
                aria-label="Talk to our team"
                onClick={onSupport}
            >
                <MessageCircle aria-hidden="true" />
            </button>
        </div>
    );
}
