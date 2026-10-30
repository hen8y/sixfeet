import { ArrowUpRight } from 'lucide-react';
import { CheckList } from '@/components/public/check-list';
import { PublicLink } from '@/components/public/public-link';
import type { Service } from '@/types';

export function ServiceCard({
    service,
    detailed,
    onSelect,
}: {
    service: Service;
    detailed: boolean;
    onSelect: () => void;
}) {
    const {
        title,
        heading,
        description,
        highlights,
        action,
        href,
        icon: Icon,
    } = service;
    const content = (
        <>
            <span className="sf-service-icon">
                <Icon aria-hidden="true" />
            </span>
            <h3>{heading ?? title}</h3>
            <p>{description}</p>
            {detailed && (
                <CheckList
                    className="sf-service-highlights"
                    items={highlights}
                />
            )}
            <span className="sf-card-link">
                {action}
                <ArrowUpRight aria-hidden="true" />
            </span>
        </>
    );

    if (href) {
        return (
            <PublicLink className="sf-service-card" href={href}>
                {content}
            </PublicLink>
        );
    }

    return (
        <button className="sf-service-card" type="button" onClick={onSelect}>
            {content}
        </button>
    );
}
