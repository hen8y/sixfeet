import { ArrowRight } from 'lucide-react';
import { PackagePrice } from '@/components/home/package-price';
import { CheckList } from '@/components/public/check-list';
import type { ServicePackage } from '@/types';

export function PackageCard({
    item,
    onExplore,
}: {
    item: ServicePackage;
    onExplore: () => void;
}) {
    return (
        <article className="sf-package-card">
            <span className="sf-package-tier">{item.tier}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <PackagePrice item={item} />
            <CheckList items={item.features} />
            <button className="sf-outline" type="button" onClick={onExplore}>
                Explore package <ArrowRight aria-hidden="true" />
            </button>
        </article>
    );
}
