import type { Country } from '@/types';

export function Flag({ country }: { country: Country }) {
    const [left, middle, right] = country.flag;

    return (
        <svg className="sf-flag" viewBox="0 0 3 2" aria-hidden="true">
            <rect width="1" height="2" fill={left} />
            <rect x="1" width="1" height="2" fill={middle} />
            <rect x="2" width="1" height="2" fill={right} />
        </svg>
    );
}
