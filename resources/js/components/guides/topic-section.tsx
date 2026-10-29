import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { GuideList } from '@/components/public/guide-list';
import { LineArt } from '@/components/public/line-art';
import type { GuideArticle, GuideTopic } from '@/types';

export function TopicSection({
    topic,
    onOpenGuide,
}: {
    topic: GuideTopic;
    onOpenGuide: (guide: GuideArticle) => void;
}) {
    const id = `sf-guide-${topic.id}`;

    return (
        <section
            className="sf-guides sf-guide-topic sf-section"
            id={id}
            aria-labelledby={`${id}-title`}
        >
            <div className="sf-guides-intro">
                <LineArt name={topic.art} />
                <h2 id={`${id}-title`}>{topic.title}</h2>
                <p>{topic.description}</p>
                {topic.link && (
                    <Link className="sf-small-link" href={topic.link.href}>
                        {topic.link.label} <ArrowRight aria-hidden="true" />
                    </Link>
                )}
            </div>
            <GuideList guides={topic.articles} onOpenGuide={onOpenGuide} />
        </section>
    );
}
