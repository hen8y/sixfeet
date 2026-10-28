import { BadgeCheck } from 'lucide-react';
import { LineArt } from '@/components/public/line-art';
import { formatPrice } from '@/lib/format';
import { progressPercent, spentTotal } from '@/lib/fundraiser';
import type { Country, ExampleFundraiser } from '@/types';

export function ExampleFundraiserCard({
    example,
    country,
}: {
    example: ExampleFundraiser;
    country: Country;
}) {
    const progress = progressPercent(example);

    return (
        <figure
            className="sf-fund-example"
            aria-label={`Example fundraiser: ${example.title}`}
        >
            <span className="sf-fund-tag">Example fundraiser</span>
            <div className="sf-fund-example-head">
                <LineArt name="lily" />
                <div>
                    <strong>{example.title}</strong>
                    <span>
                        Organised by {example.organiser}
                        <span className="sf-fund-verified">
                            <BadgeCheck aria-hidden="true" />
                            Verified
                        </span>
                    </span>
                </div>
            </div>
            <p className="sf-fund-amount">
                <strong>{formatPrice(example.raised, country)}</strong>
                <span>raised of {formatPrice(example.goal, country)}</span>
            </p>
            <div
                className="sf-progress"
                role="progressbar"
                aria-label="Raised so far"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <span style={{ width: `${progress}%` }} />
            </div>
            <dl className="sf-fund-stats">
                <div>
                    <dt>Donors</dt>
                    <dd>{example.donors}</dd>
                </div>
                <div>
                    <dt>Paid to providers</dt>
                    <dd>{formatPrice(spentTotal(example), country)}</dd>
                </div>
                <div>
                    <dt>Days left</dt>
                    <dd>{example.daysLeft}</dd>
                </div>
            </dl>
        </figure>
    );
}
