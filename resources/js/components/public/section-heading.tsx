import type { ReactNode } from 'react';

export function SectionHeading({
    id,
    eyebrow,
    title,
    children,
}: {
    id: string;
    eyebrow?: string;
    title: ReactNode;
    children?: ReactNode;
}) {
    return (
        <div className="sf-section-heading">
            {eyebrow && <span className="sf-eyebrow">{eyebrow}</span>}
            <h2 id={id}>{title}</h2>
            {children && <p>{children}</p>}
        </div>
    );
}
