import type { Detail, LineArtName } from './public';

export type GuideArticle = Detail & { summary: string; art?: LineArtName };

export type GuideTopic = {
    id: string;
    title: string;
    summary: string;
    description: string;
    art: LineArtName;
    link?: { label: string; href: string };
    articles: GuideArticle[];
};
