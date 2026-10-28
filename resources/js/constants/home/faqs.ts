import type { Country, Faq } from '@/types';

const homecomingQuestions: Record<string, string> = {
    NG: 'Can you help bring someone home to Nigeria?',
    IE: 'Can you help bring someone home from Ireland to Nigeria?',
};

export function faqsFor(country: Country): Faq[] {
    return [
        {
            question: 'Is Six Feet a funeral director?',
            answer: 'No. Six Feet is a marketplace. Verified local providers carry out the care, the transport and the funeral itself. We help you find them, compare prices and book, and we stay on hand if something goes wrong.',
        },
        {
            question: 'How are providers verified?',
            answer: 'Each provider applies with their business details and documents. Our team reviews them before the provider can be listed, and a listing can be suspended if standards slip.',
        },
        {
            question: 'How much does a funeral cost?',
            answer: `It depends on your city, the provider and what you choose. Every listing shows the full price before you book, and a package shows one total in ${country.currency.name}.`,
        },
        {
            question: 'Do I need an account?',
            answer: 'No. You can browse, compare and book without one. After you book, you can create an account to follow the arrangement in one place.',
        },
        {
            question: 'Can I arrange a funeral from another country?',
            answer: 'Yes. Many families arrange care at home while living abroad. You can follow the same plan from anywhere and pay online, with prices in the provider’s currency.',
        },
        {
            question:
                homecomingQuestions[country.code] ??
                'Can you help bring someone home from abroad?',
            answer: 'Booking repatriation through Six Feet is coming later. Until then, our guide explains the usual steps, and our team can point you in the right direction.',
        },
        {
            question: 'Who do I contact if something goes wrong?',
            answer: 'Contact your provider first. You can also reach our team by phone or WhatsApp, and we will help put it right.',
        },
    ];
}
