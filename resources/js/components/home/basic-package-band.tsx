import { ArrowRight } from 'lucide-react';
import { PackagePrice } from '@/components/home/package-price';
import { CheckList } from '@/components/public/check-list';
import { basicPackage } from '@/constants/home/packages';

export function BasicPackageBand({ onExplore }: { onExplore: () => void }) {
    return (
        <article className="sf-basic-package">
            <div className="sf-basic-package-copy">
                <h3>{basicPackage.title}</h3>
                <p>{basicPackage.description}</p>
                <PackagePrice item={basicPackage} />
                <button
                    className="sf-primary sf-light"
                    type="button"
                    onClick={onExplore}
                >
                    See what’s included <ArrowRight aria-hidden="true" />
                </button>
            </div>
            <CheckList items={basicPackage.features} />
        </article>
    );
}
