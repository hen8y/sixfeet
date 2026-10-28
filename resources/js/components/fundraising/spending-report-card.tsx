import { LineArt } from '@/components/public/line-art';
import { formatPrice } from '@/lib/format';
import { spentTotal } from '@/lib/fundraiser';
import type { Country, ExampleFundraiser } from '@/types';

export function SpendingReportCard({
    example,
    country,
}: {
    example: ExampleFundraiser;
    country: Country;
}) {
    const spent = spentTotal(example);

    return (
        <figure className="sf-fund-report" aria-label="Example spending report">
            <header>
                <LineArt name="receipt" />
                <div>
                    <strong>Spending report</strong>
                    <span>Example · {example.title}</span>
                </div>
            </header>
            <ul>
                {example.spending.map((item) => (
                    <li key={item.label}>
                        <span>
                            <strong>{item.label}</strong>
                            <span>{item.paidTo}</span>
                        </span>
                        <span className="sf-report-amount">
                            {formatPrice(item.amount, country)}
                        </span>
                    </li>
                ))}
            </ul>
            <dl>
                <div>
                    <dt>Raised</dt>
                    <dd>{formatPrice(example.raised, country)}</dd>
                </div>
                <div>
                    <dt>Paid to providers</dt>
                    <dd>{formatPrice(spent, country)}</dd>
                </div>
                <div className="sf-report-total">
                    <dt>Still available to the family</dt>
                    <dd>{formatPrice(example.raised - spent, country)}</dd>
                </div>
            </dl>
        </figure>
    );
}
