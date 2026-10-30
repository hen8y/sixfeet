import { serviceTabs } from '@/constants/home/service-views';
import type { ServiceView } from '@/types';

export function ServiceTabs({
    view,
    onChange,
}: {
    view: ServiceView;
    onChange: (view: ServiceView) => void;
}) {
    return (
        <div
            className="sf-service-tabs"
            role="group"
            aria-label="Choose which services to see"
        >
            {serviceTabs.map(({ view: tabView, label, icon: Icon }) => (
                <button
                    key={tabView}
                    className="sf-service-tab"
                    type="button"
                    aria-pressed={view === tabView}
                    onClick={() => onChange(tabView)}
                >
                    <Icon aria-hidden="true" />
                    {label}
                </button>
            ))}
        </div>
    );
}
