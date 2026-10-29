import { fundraising, home, repatriation } from '@/routes';
import type { AccountLink, FooterColumn, GuideTopic } from '@/types';

export const footerColumnsFor = ({
    account,
    topics,
    onSupport,
}: {
    account: AccountLink;
    topics: GuideTopic[];
    onSupport: () => void;
}): FooterColumn[] => [
    {
        title: 'Services',
        items: [
            { label: 'Find a service', href: `${home.url()}#sf-services` },
            { label: 'Funeral packages', href: `${home.url()}#sf-packages` },
            { label: 'Fundraising', href: fundraising.url() },
            { label: 'Repatriation', href: repatriation.url() },
        ],
    },
    {
        title: 'Help & advice',
        items: [
            { label: 'What to do first', href: '#sf-how' },
            ...topics.map((topic) => ({
                label: topic.title,
                href: `#sf-guide-${topic.id}`,
            })),
        ],
    },
    {
        title: 'Families',
        items: [
            { label: account.label, href: account.href },
            { label: 'Questions', href: '#sf-faq' },
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
