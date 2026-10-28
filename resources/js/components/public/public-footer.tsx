import type { Ref } from 'react';
import { PublicLink } from '@/components/public/public-link';
import { useMarket } from '@/hooks/use-market';
import { countryNames } from '@/lib/format';
import type { FooterColumn } from '@/types';

export function PublicFooter({
    homeHref,
    columns,
    ref,
}: {
    homeHref: string;
    columns: FooterColumn[];
    ref?: Ref<HTMLElement>;
}) {
    const { countries } = useMarket();

    return (
        <footer className="sf-footer" ref={ref}>
            <div className="sf-footer-main">
                <div className="sf-footer-brand">
                    <PublicLink className="sf-logo" href={homeHref}>
                        <span className="sf-brand-mark" aria-hidden="true">
                            S
                        </span>
                        Six Feet
                    </PublicLink>
                    <p>
                        Helping families in {countryNames(countries)} arrange
                        care, with the price shown before they book.
                    </p>
                </div>
                <nav className="sf-footer-links" aria-label="Footer">
                    {columns.map((column) => (
                        <div key={column.title}>
                            <h2>{column.title}</h2>
                            {column.items.map((item) =>
                                item.href ? (
                                    <PublicLink
                                        key={item.label}
                                        href={item.href}
                                    >
                                        {item.label}
                                    </PublicLink>
                                ) : (
                                    <button
                                        key={item.label}
                                        type="button"
                                        onClick={item.onClick}
                                    >
                                        {item.label}
                                    </button>
                                ),
                            )}
                        </div>
                    ))}
                </nav>
            </div>
            <div className="sf-footer-base">
                <span>{countryNames(countries)}</span>
                <span>© 2026 Six Feet</span>
            </div>
        </footer>
    );
}
