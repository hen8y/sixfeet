import { SpendingReportCard } from '@/components/fundraising/spending-report-card';
import { CheckList } from '@/components/public/check-list';
import { promises } from '@/constants/fundraising/promises';
import type { Country, ExampleFundraiser } from '@/types';

export function FundFlowSection({
    country,
    example,
}: {
    country: Country;
    example: ExampleFundraiser;
}) {
    return (
        <section
            className="sf-fund-flow sf-section"
            id="sf-fund-flow"
            aria-labelledby="sf-fund-flow-title"
        >
            <div className="sf-fund-flow-copy">
                <span className="sf-eyebrow">Where the money goes</span>
                <h2 id="sf-fund-flow-title">
                    Every {country.currency.name},
                    <br />
                    <em>accounted for.</em>
                </h2>
                <p>
                    Every gift is recorded against the fundraiser, and the money
                    can only be used in the ways donors were told.
                </p>
                <CheckList items={promises} />
            </div>
            <SpendingReportCard example={example} country={country} />
        </section>
    );
}
