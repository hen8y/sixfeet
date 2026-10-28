import type { Step } from '@/types';

export function StepsSection({
    title,
    steps,
}: {
    title: string;
    steps: Step[];
}) {
    return (
        <section
            className="sf-how sf-section"
            id="sf-how"
            aria-labelledby="sf-how-title"
        >
            <h2 id="sf-how-title">{title}</h2>
            <div className="sf-steps">
                {steps.map((step) => (
                    <article key={step.label}>
                        <span>{step.label}</span>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
