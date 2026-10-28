import { fundraising, home } from '@/routes';
import type { AccountLink, FooterColumn } from '@/types';

export const footerColumnsFor = ({
    account,
    onRequestQuote,
    onSupport,
}: {
    account: AccountLink;
    onRequestQuote: () => void;
    onSupport: () => void;
}): FooterColumn[] => [
    {
        title: 'Services',
        items: [
            { label: 'Find a service', href: `${home.url()}#sf-services` },
            { label: 'Funeral packages', href: `${home.url()}#sf-packages` },
            { label: 'Fundraising', href: fundraising.url() },
        ],
    },
    {
        title: 'Repatriation',
        items: [
            { label: 'Request a quote', onClick: onRequestQuote },
            { label: 'How it works', href: '#sf-how' },
            { label: 'Documents', href: '#sf-rep-documents' },
            { label: 'Costs', href: '#sf-rep-costs' },
            { label: 'Questions', href: '#sf-faq' },
        ],
    },
    {
        title: 'Families',
        items: [
            { label: 'Help & advice', href: `${home.url()}#sf-guides` },
            { label: account.label, href: account.href },
            { label: 'Talk to our team', onClick: onSupport },
        ],
    },
    {
        title: 'Providers',
        items: [
            {
                label: 'List your services',
                href: `${home.url()}#sf-providers`,
            },
        ],
    },
];
