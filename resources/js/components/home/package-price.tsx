import { useMarket } from '@/hooks/use-market';
import { formatPrice } from '@/lib/format';
import type { ServicePackage } from '@/types';

export function PackagePrice({ item }: { item: ServicePackage }) {
    const { country } = useMarket();
    const fromPrice = item.fromPrice[country.code] ?? null;

    return (
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
    );
}
