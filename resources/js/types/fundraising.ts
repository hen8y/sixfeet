export type SpendingItem = { label: string; paidTo: string; amount: number };

export type ExampleFundraiser = {
    title: string;
    organiser: string;
    goal: number;
    raised: number;
    donors: number;
    daysLeft: number;
    spending: SpendingItem[];
};
