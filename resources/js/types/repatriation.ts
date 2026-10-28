import type { LineArtName } from './public';

export type ExampleCase = {
    from: string;
    to: string;
    person: string;
    leavePermission: string;
};

export type MilestoneState = 'done' | 'current' | 'next';

export type Milestone = {
    title: string;
    detail: string;
    state: MilestoneState;
};

export type Direction = {
    title: string;
    art: LineArtName;
    description: string;
    items: string[];
};

export type QuoteLine = { label: string; note: string };
