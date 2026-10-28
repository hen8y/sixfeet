import type { Assurance } from '@/types';

export function AssuranceBar({
    label,
    assurances,
}: {
    label: string;
    assurances: Assurance[];
}) {
    return (
        <ul className="sf-assurance" aria-label={label}>
            {assurances.map(({ title, short, detail, icon: Icon }) => (
                <li key={title}>
                    <Icon aria-hidden="true" />
                    <span>
                        <strong>
                            <span className="sf-long">{title}</span>
                            <span className="sf-short">{short}</span>
                        </strong>
                        <span className="sf-assurance-detail">{detail}</span>
                    </span>
                </li>
            ))}
        </ul>
    );
}
