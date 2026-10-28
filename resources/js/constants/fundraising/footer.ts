import { home, repatriation } from '@/routes';
import type { AccountLink, FooterColumn } from '@/types';

export const footerColumnsFor = ({
    account,
    onStart,
    onSupport,
}: {
    account: AccountLink;
    onStart: () => void;
    onSupport: () => void;
}): FooterColumn[] => [
    {
        title: 'Services',
        items: [
            { label: 'Find a service', href: `${home.url()}#sf-services` },
            { label: 'Funeral packages', href: `${home.url()}#sf-packages` },
            { label: 'How it works', href: `${home.url()}#sf-how` },
        ],
    },
    {
        title: 'Fundraising',
        items: [
            { label: 'Start a fundraiser', onClick: onStart },
            { label: 'How fundraising works', href: '#sf-how' },
            { label: 'Where the money goes', href: '#sf-fund-flow' },
            { label: 'Questions', href: '#sf-faq' },
        ],
    },
    {
        title: 'Families',
        items: [
            { label: 'Bring someone home', href: repatriation.url() },
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
