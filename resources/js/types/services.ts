import type { Service } from './home';

export type ServiceTabId =
    | 'all'
    | 'mortuary'
    | 'vaults'
    | 'hearse'
    | 'coffins'
    | 'repatriation'
    | 'fundraising'
    | 'savings'
    | 'other';

export type ServiceTab = Omit<Service, 'id' | 'tab' | 'heading'> & {
    id: ServiceTabId;
    label: string;
    heroTitle: string;
    heroBody: string;
    searchLabel: string;
    barNote?: string;
    comingSoon?: boolean;
    priced: boolean;
};
