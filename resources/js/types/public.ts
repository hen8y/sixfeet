export type Detail = { title: string; description: string; items?: string[] };

export type FooterItem = { label: string; href?: string; onClick?: () => void };

export type FooterColumn = { title: string; items: FooterItem[] };

export type PublicPageName = 'home' | 'fundraising' | 'repatriation' | 'guides';

export type PublicNavLink = { href: string; label: string; current?: boolean };

export type PublicAction = { label: string; onClick: () => void };

export type AccountLink = { href: string; label: string };

export type LineArtName =
    | 'document'
    | 'lily'
    | 'plane'
    | 'coins'
    | 'heart'
    | 'phone'
    | 'chat'
    | 'globe'
    | 'shield'
    | 'receipt';

export type Step = { label: string; title: string; description: string };

export type Faq = { question: string; answer: string };

export type LineArtFeature = {
    title: string;
    description: string;
    art: LineArtName;
};
