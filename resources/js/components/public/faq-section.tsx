import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/public/section-heading';
import type { Faq } from '@/types';

export function FaqSection({
    eyebrow,
    title,
    faqs,
}: {
    eyebrow?: string;
    title: string;
    faqs: Faq[];
}) {
    return (
        <section
            className="sf-faq sf-section"
            id="sf-faq"
            aria-labelledby="sf-faq-title"
        >
            <SectionHeading id="sf-faq-title" eyebrow={eyebrow} title={title} />
            <div className="sf-faq-list">
                {faqs.map((faq) => (
                    <details key={faq.question}>
                        <summary>
                            {faq.question}
                            <Plus aria-hidden="true" />
                        </summary>
                        <p>{faq.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
