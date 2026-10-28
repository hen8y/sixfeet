import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/types';

export function ServiceCard({
    service,
    onSelect,
}: {
    service: Service;
    onSelect: () => void;
}) {
    const { title, heading, description, action, icon: Icon } = service;

    return (
        <button className="sf-service-card" type="button" onClick={onSelect}>
            <span className="sf-service-icon">
                <Icon aria-hidden="true" />
            </span>
            <h3>{heading ?? title}</h3>
            <p>{description}</p>
            <span className="sf-card-link">
                {action}
                <ArrowUpRight aria-hidden="true" />
            </span>
        </button>
    );
}
