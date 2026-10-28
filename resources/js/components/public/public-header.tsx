import { Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { CountrySelect } from '@/components/public/country-select';
import { PublicLink } from '@/components/public/public-link';
import { useAccountLink } from '@/hooks/use-account-link';
import { useDismiss } from '@/hooks/use-dismiss';
import { useMarket } from '@/hooks/use-market';
import { countryNames } from '@/lib/format';
import type { PublicAction, PublicNavLink } from '@/types';

export function PublicHeader({
    homeHref,
    links,
    onCountryChange,
    action,
    onHelp,
}: {
    homeHref: string;
    links: PublicNavLink[];
    onCountryChange?: () => void;
    action: PublicAction;
    onHelp: () => void;
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const header = useRef<HTMLElement>(null);
    const { countries } = useMarket();
    const account = useAccountLink();

    useDismiss(header, menuOpen, () => setMenuOpen(false));

    function closeMenuAnd(callback: () => void) {
        setMenuOpen(false);
        callback();
    }

    return (
        <>
            <div className="sf-top">
                <span>Funeral care in {countryNames(countries)}</span>
                <button type="button" onClick={onHelp}>
                    Need help? Talk to us <ArrowUpRight aria-hidden="true" />
                </button>
            </div>
            <header className="sf-header" ref={header}>
                <PublicLink
                    className="sf-logo"
                    href={homeHref}
                    aria-label="Six Feet home"
                >
                    <span className="sf-brand-mark" aria-hidden="true">
                        S
                    </span>
                    Six Feet
                </PublicLink>
                <nav className="sf-desktop-nav" aria-label="Main navigation">
                    {links.map(({ href, label, current }) => (
                        <PublicLink
                            key={href}
                            href={href}
                            aria-current={current ? 'page' : undefined}
                        >
                            {label}
                        </PublicLink>
                    ))}
                </nav>
                <div className="sf-account">
                    <CountrySelect onCountryChange={onCountryChange} />
                    <Link className="sf-family-link" href={account.href}>
                        {account.label}
                    </Link>
                    <button
                        className="sf-header-plan"
                        type="button"
                        onClick={action.onClick}
                    >
                        {action.label}
                    </button>
                    <button
                        className="sf-menu-toggle"
                        type="button"
                        aria-expanded={menuOpen}
                        aria-controls="sf-mobile-nav"
                        aria-label={
                            menuOpen ? 'Close navigation' : 'Open navigation'
                        }
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <Menu className="sf-icon-open" aria-hidden="true" />
                        <X className="sf-icon-close" aria-hidden="true" />
                    </button>
                </div>
                <div
                    className="sf-mobile-menu"
                    id="sf-mobile-nav"
                    data-open={menuOpen}
                    inert={!menuOpen}
                >
                    <nav aria-label="Mobile navigation">
                        {links.map(({ href, label, current }) => (
                            <PublicLink
                                key={href}
                                href={href}
                                aria-current={current ? 'page' : undefined}
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                                <ArrowRight aria-hidden="true" />
                            </PublicLink>
                        ))}
                    </nav>
                    <div className="sf-mobile-actions">
                        <Link className="sf-mobile-account" href={account.href}>
                            {account.label}
                        </Link>
                        <button
                            className="sf-mobile-plan"
                            type="button"
                            onClick={() => closeMenuAnd(action.onClick)}
                        >
                            {action.label} <ArrowRight aria-hidden="true" />
                        </button>
                    </div>
                    <button
                        className="sf-mobile-help"
                        type="button"
                        onClick={() => closeMenuAnd(onHelp)}
                    >
                        Need help? Talk to us{' '}
                        <ArrowUpRight aria-hidden="true" />
                    </button>
                </div>
            </header>
        </>
    );
}
