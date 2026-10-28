import { Check, Plane } from 'lucide-react';
import type { ExampleCase, Milestone } from '@/types';

export function RouteCard({
    example,
    milestones,
}: {
    example: ExampleCase;
    milestones: Milestone[];
}) {
    return (
        <figure
            className="sf-fund-example sf-route-card"
            aria-label={`Example case: ${example.from} to ${example.to}`}
        >
            <span className="sf-fund-tag">Example case</span>
            <div className="sf-route-head">
                <span>
                    <small>From</small>
                    <strong>{example.from}</strong>
                </span>
                <span className="sf-route-line" aria-hidden="true">
                    <Plane />
                </span>
                <span>
                    <small>To</small>
                    <strong>{example.to}</strong>
                </span>
            </div>
            <p className="sf-route-person">
                {example.person} · Case manager assigned
            </p>
            <ol className="sf-route-steps">
                {milestones.map((milestone) => (
                    <li key={milestone.title} data-state={milestone.state}>
                        <span className="sf-route-dot" aria-hidden="true">
                            {milestone.state === 'done' && <Check />}
                        </span>
                        <span>
                            <strong>{milestone.title}</strong>
                            <span>{milestone.detail}</span>
                        </span>
                        {milestone.state === 'current' && <em>In progress</em>}
                    </li>
                ))}
            </ol>
        </figure>
    );
}
