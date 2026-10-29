import { ArrowRight } from 'lucide-react';
import { LineArt } from '@/components/public/line-art';
import type { GuideArticle } from '@/types';

export function GuideList<T extends GuideArticle>({
    guides,
    onOpenGuide,
}: {
    guides: T[];
    onOpenGuide: (guide: T) => void;
}) {
    return (
        <ul className="sf-guide-list">
            {guides.map((guide) => (
                <li key={guide.title}>
                    <button type="button" onClick={() => onOpenGuide(guide)}>
                        {guide.art && <LineArt name={guide.art} />}
                        <span>
                            <strong>{guide.title}</strong>
                            <span>{guide.summary}</span>
                        </span>
                        <ArrowRight aria-hidden="true" />
                    </button>
                </li>
            ))}
        </ul>
    );
}
