import { fundraising, guides, home, repatriation } from '@/routes';
import type { PublicNavLink, PublicPageName } from '@/types';

export const publicRootId = 'sf-home';

export function publicNavLinks(current: PublicPageName): PublicNavLink[] {
    const base = current === 'home' ? '' : home.url();

    const links: PublicNavLink[] = [
        { href: `${base}#sf-services`, label: 'Services' },
        { href: `${base}#sf-packages`, label: 'Packages' },
        {
            href: fundraising.url(),
            label: 'Fundraising',
            current: current === 'fundraising',
        },
        {
            href: repatriation.url(),
            label: 'Repatriation',
            current: current === 'repatriation',
        },
        {
            href: guides.url(),
            label: 'Help & advice',
            current: current === 'guides',
        },
        { href: `${base}#sf-providers`, label: 'For providers' },
    ];

    if (current === 'services') {
        return links.filter(
            ({ label }) =>
                !['Services', 'Packages', 'Repatriation'].includes(label),
        );
    }

    return links;
}
