import { ArrowRight } from 'lucide-react';
import { CheckList } from '@/components/public/check-list';
import { useMarket } from '@/hooks/use-market';
import { formatPrice } from '@/lib/format';
import type { ServicePackage } from '@/types';

export function PackageCard({
    item,
    onExplore,
}: {
    item: ServicePackage;
    onExplore: () => void;
}) {
    const { country } = useMarket();
    const fromPrice = item.fromPrice[country.code] ?? null;

    return (
        <article className="sf-package-card">
            <span className="sf-package-tier">{item.tier}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="sf-package-price">
                {fromPrice === null ? (
                    <>
                        <span>Price for {country.name}</span>
                        <strong>Confirmed by city before you book</strong>
                    </>
                ) : (
                    <>
                        <span>From</span>
                        <strong>{formatPrice(fromPrice, country)}</strong>
                    </>
                )}
            </div>
            <CheckList items={item.features} />
            <button className="sf-outline" type="button" onClick={onExplore}>
                Explore package <ArrowRight aria-hidden="true" />
            </button>
        </article>
    );
}
