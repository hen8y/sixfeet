import { ArrowRight } from 'lucide-react';
import { LineArt } from '@/components/public/line-art';
import type { GuideTopic } from '@/types';

export function TopicIndexCard({ topics }: { topics: GuideTopic[] }) {
    return (
        <nav className="sf-topic-index" aria-label="Guide topics">
            <span className="sf-eyebrow">Browse by topic</span>
            <ul>
                {topics.map((topic) => (
                    <li key={topic.id}>
                        <a href={`#sf-guide-${topic.id}`}>
                            <LineArt name={topic.art} />
                            <span>
                                <strong>{topic.title}</strong>
                                <span>{topic.summary}</span>
                            </span>
                            <ArrowRight aria-hidden="true" />
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
