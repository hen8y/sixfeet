import type { ExampleFundraiser } from '@/types';

export function spentTotal(example: ExampleFundraiser): number {
    return example.spending.reduce((total, item) => total + item.amount, 0);
}

export function progressPercent(example: ExampleFundraiser): number {
    return Math.round((example.raised / example.goal) * 100);
}
