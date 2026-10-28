import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { PublicAction } from '@/types';

export function HelpBand({
    icon: Icon,
    title,
    description,
    action,
    actionIcon: ActionIcon,
}: {
    icon: LucideIcon;
    title: string;
    description: ReactNode;
    action: PublicAction;
    actionIcon: LucideIcon;
}) {
    return (
        <section className="sf-help-band" aria-labelledby="sf-help-title">
            <Icon className="sf-help-flower" aria-hidden="true" />
            <div>
                <h2 id="sf-help-title">{title}</h2>
                <p>{description}</p>
            </div>
            <button
                className="sf-primary sf-light"
                type="button"
                onClick={action.onClick}
            >
                {action.label} <ActionIcon aria-hidden="true" />
            </button>
        </section>
    );
}
