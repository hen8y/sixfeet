import { ArrowRight } from 'lucide-react';
import { CheckList } from '@/components/public/check-list';
import { providerBenefits } from '@/constants/home/providers';
import { useMarket } from '@/hooks/use-market';
import { countryNames } from '@/lib/format';

export function ProvidersSection({ onApply }: { onApply: () => void }) {
    const { countries } = useMarket();

    return (
        <section
            className="sf-providers sf-section"
            id="sf-providers"
            aria-labelledby="sf-providers-title"
        >
            <div className="sf-provider-panel">
                <div>
                    <span className="sf-eyebrow">For providers</span>
                    <h2 id="sf-providers-title">
                        Bring your care to more families.
                    </h2>
                    <p>
                        Mortuaries, funeral directors, essentials suppliers and
                        vehicle operators in {countryNames(countries)} can apply
                        to join Six Feet.
                    </p>
                    <button
                        className="sf-primary"
                        type="button"
                        onClick={onApply}
                    >
                        Apply to list your services{' '}
                        <ArrowRight aria-hidden="true" />
                    </button>
                </div>
                <CheckList items={providerBenefits} />
            </div>
        </section>
    );
}
