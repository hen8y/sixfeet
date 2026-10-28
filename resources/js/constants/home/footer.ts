import { services } from '@/constants/home/services';
import { fundraising, repatriation } from '@/routes';
import type { AccountLink, FooterColumn, Guide } from '@/types';

export function footerColumnsFor({
    account,
    guides,
    onSelectService,
    onStartPlanning,
    onOpenGuide,
    onSupport,
    onApply,
}: {
    account: AccountLink;
    guides: Guide[];
    onSelectService: (title: string) => void;
    onStartPlanning: () => void;
    onOpenGuide: (guide: Guide) => void;
    onSupport: () => void;
    onApply: () => void;
}): FooterColumn[] {
    return [
        {
            title: 'Services',
            items: services.map(({ title, heading }) => ({
                label: heading ?? title,
                onClick: () => onSelectService(title),
            })),
        },
        {
            title: 'Families',
            items: [
                { label: 'Start planning', onClick: onStartPlanning },
                { label: 'How it works', href: '#sf-how' },
                { label: 'Raise funds for a funeral', href: fundraising.url() },
                { label: 'Bring someone home', href: repatriation.url() },
                account,
                { label: 'Talk to our team', onClick: onSupport },
            ],
        },
        {
            title: 'Help & advice',
            items: [
                ...guides.map((guide) => ({
                    label: guide.title,
                    onClick: () => onOpenGuide(guide),
                })),
                { label: 'Questions families ask', href: '#sf-faq' },
            ],
        },
        {
            title: 'Providers',
            items: [
                { label: 'List your services', onClick: onApply },
                { label: 'Why join Six Feet', href: '#sf-providers' },
            ],
        },
    ];
}
