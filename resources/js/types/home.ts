import type { LucideIcon } from 'lucide-react';
import type { SupportContact } from './country';
import type { GuideArticle } from './guides';
import type { LineArtName } from './public';

export type ServiceId =
    | 'dashboard'
    | 'mortuary'
    | 'coffins'
    | 'transport'
    | 'flowers'
    | 'packages'
    | 'repatriation'
    | 'memorials';

export type BookableServiceId = Exclude<ServiceId, 'dashboard' | 'memorials'>;

export type ServiceView = BookableServiceId | 'all' | 'custom';

export type Service = {
    id: ServiceId;
    title: string;
    tab: string;
    heading?: string;
    description: string;
    highlights: string[];
    action: string;
    href?: string;
    icon: LucideIcon;
};

export type ServicePackage = {
    title: string;
    tier: string;
    description: string;
    features: string[];
    fromPrice: Record<string, number | null>;
};

export type Review = {
    quote: string;
    name: string;
    initials: string;
    place: string;
};

export type Guide = GuideArticle & { art: LineArtName };

export type SupportDesk = {
    title: string;
    description: string;
    art: LineArtName;
    contact: SupportContact;
};
