import { Link } from '@inertiajs/react';
import type { AriaAttributes, ReactNode } from 'react';

export function PublicLink({
    href,
    children,
    ...props
}: {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    'aria-current'?: AriaAttributes['aria-current'];
    'aria-label'?: string;
}) {
    // Inertia visits skip the browser's jump to the anchor.
    if (href.includes('#')) {
        return (
            <a href={href} {...props}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    );
}
