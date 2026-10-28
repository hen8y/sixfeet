import type { ExampleCase, Milestone } from '@/types';

// Add an entry before activating a new country.
export const exampleCases: Record<string, ExampleCase> = {
    NG: {
        from: 'London',
        to: 'Lagos',
        person: 'Bringing Mr Adebayo home',
        leavePermission: 'Out of England certificate from the coroner',
    },
    IE: {
        from: 'Dublin',
        to: 'Lagos',
        person: 'Taking Mrs Eze home',
        leavePermission: 'Coroner’s permission to leave Ireland',
    },
};

export const milestonesFor = (example: ExampleCase): Milestone[] => [
    {
        title: 'Case opened',
        detail: 'A case manager is assigned and calls the family',
        state: 'done',
    },
    {
        title: 'Documents checked',
        detail: 'Passport and death certificates received',
        state: 'done',
    },
    {
        title: 'Permission to travel',
        detail: example.leavePermission,
        state: 'done',
    },
    {
        title: 'Care and preparation',
        detail: 'Embalming and a sealed coffin for air travel',
        state: 'current',
    },
    {
        title: 'Flight confirmed',
        detail: `Airline cargo booked to ${example.to}`,
        state: 'next',
    },
    {
        title: 'Arrival and handover',
        detail: 'Met by the family or a local funeral director',
        state: 'next',
    },
];
