import { ArrowUpRight } from 'lucide-react';
import { PackageCard } from '@/components/home/package-card';
import { packages } from '@/constants/home/packages';
import type { ServicePackage } from '@/types';

export function PackagesSection({
    onHelpChoose,
    onExplore,
}: {
    onHelpChoose: () => void;
    onExplore: (item: ServicePackage) => void;
}) {
    return (
        <section
            className="sf-package-section sf-section"
            id="sf-packages"
            aria-labelledby="sf-packages-title"
        >
            <div className="sf-package-intro">
                <h2 id="sf-packages-title">Funeral packages, made simpler.</h2>
                <p>
                    Each package brings care, a coffin and transport together at
                    one rate for your city. Keep it as it is, or change a part
                    and see the new total before you book.
                </p>
                <button
                    className="sf-small-link"
                    type="button"
                    onClick={onHelpChoose}
                >
                    Help me choose a package <ArrowUpRight aria-hidden="true" />
                </button>
            </div>
            <div className="sf-package-list">
                {packages.map((item) => (
                    <PackageCard
                        key={item.title}
                        item={item}
                        onExplore={() => onExplore(item)}
                    />
                ))}
            </div>
        </section>
    );
}
