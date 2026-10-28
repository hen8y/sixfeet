import { Check } from 'lucide-react';

export function CheckList({
    items,
    className,
}: {
    items: string[];
    className?: string;
}) {
    return (
        <ul className={className}>
            {items.map((item) => (
                <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                </li>
            ))}
        </ul>
    );
}
