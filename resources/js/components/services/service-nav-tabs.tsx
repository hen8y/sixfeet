import { useEffect, useRef } from 'react';
import type { ServiceTab, ServiceTabId } from '@/types';

export function ServiceNavTabs({
    tabs,
    current,
    onChange,
}: {
    tabs: ServiceTab[];
    current: ServiceTabId;
    onChange: (id: ServiceTabId) => void;
}) {
    const list = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const row = list.current;
        const active = row?.querySelector<HTMLElement>('[aria-pressed="true"]');

        if (row && active) {
            row.scrollTo({
                left:
                    active.offsetLeft -
                    (row.clientWidth - active.offsetWidth) / 2,
                behavior: 'smooth',
            });
        }
    }, [current]);

    return (
        <div
            className="sf-nav-tabs"
            ref={list}
            role="group"
            aria-label="Choose a service"
        >
            {tabs.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    className="sf-nav-tab"
                    type="button"
                    aria-pressed={current === id}
                    onClick={() => onChange(id)}
                >
                    <Icon aria-hidden="true" />
                    {label}
                </button>
            ))}
        </div>
    );
}
