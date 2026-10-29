import type { Country, Faq } from '@/types';

const funeralTiming: Record<string, string> = {
    NG: 'It depends on your faith and family. Muslim burials usually happen within a day, while many Christian and traditional funerals take place weeks later. A mortuary can care for your loved one while the family plans.',
    IE: 'Most funerals in Ireland take place within two or three days. If the coroner is involved, or family need to travel, it can take longer.',
};

export function faqsFor(country: Country): Faq[] {
    return [
        {
            question: 'I don’t know where to start. What should I do first?',
            answer: 'Start with the medical certificate, then call a mortuary or funeral director. Everything else can wait a little. If you are unsure, our team can talk you through the next step.',
        },
        {
            question: 'How soon does the funeral need to happen?',
            answer:
                funeralTiming[country.code] ??
                'It depends on your faith, family and local rules. A mortuary can care for your loved one while you plan.',
        },
        {
            question: 'Do I need a funeral director or mortuary?',
            answer: 'Most families use one, because they care for your loved one and handle much of the planning. You can compare verified providers and their prices on Six Feet.',
        },
        {
            question: 'Is this legal or medical advice?',
            answer: 'No. These guides are general information to help you find your way. Rules differ by place and situation, so check with the hospital, registry, a lawyer or your provider.',
        },
        {
            question: 'Can someone help me in person?',
            answer: 'Yes. Our team can talk you through your options, and when you book, your provider guides you through each step.',
        },
    ];
}
