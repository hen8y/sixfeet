import { ArrowUpRight, Check } from 'lucide-react';
import { CheckList } from '@/components/public/check-list';
import { LineArt } from '@/components/public/line-art';
import { costNotes } from '@/constants/repatriation/costs';
import { quoteLines } from '@/constants/repatriation/quote-lines';
import { fundraising } from '@/routes';

export function CostsSection() {
    return (
        <section
            className="sf-fund-flow sf-section"
            id="sf-rep-costs"
            aria-labelledby="sf-rep-costs-title"
        >
            <div className="sf-fund-flow-copy">
                <span className="sf-eyebrow">What it costs</span>
                <h2 id="sf-rep-costs-title">
                    Itemised quotes,
                    <br />
                    <em>before you commit.</em>
                </h2>
                <p>
                    The cost depends on the route, the flight and what the
                    destination requires. Partner quotes are itemised, so you
                    see each part before you pay a deposit.
                </p>
                <CheckList items={costNotes} />
                <a className="sf-small-link" href={fundraising.url()}>
                    How fundraising works <ArrowUpRight aria-hidden="true" />
                </a>
            </div>
            <figure
                className="sf-fund-report"
                aria-label="What a repatriation quote covers"
            >
                <header>
                    <LineArt name="receipt" />
                    <div>
                        <strong>What a quote covers</strong>
                        <span>Each line priced by your partner</span>
                    </div>
                </header>
                <ul>
                    {quoteLines.map(({ label, note }) => (
                        <li key={label}>
                            <span>
                                <strong>{label}</strong>
                                <span>{note}</span>
                            </span>
                            <Check
                                className="sf-quote-tick"
                                aria-hidden="true"
                            />
                        </li>
                    ))}
                </ul>
            </figure>
        </section>
    );
}
