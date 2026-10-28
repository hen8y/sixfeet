import type { Country, Faq } from '@/types';

export const faqsFor = (country: Country): Faq[] => [
    {
        question: 'Who can start a fundraiser?',
        answer: 'A family member or close friend who can verify their identity. The person arranging the funeral is usually best placed to organise it.',
    },
    {
        question: 'What do I need to get verified?',
        answer: 'Proof of your identity and proof of death, such as a death certificate or a letter from the hospital, mortuary or funeral director. We review them before the fundraiser is shared.',
    },
    {
        question: 'How do people give?',
        answer: `By card, online, from ${country.name} or anywhere else. The page shows amounts in the fundraiser’s currency.`,
    },
    {
        question: 'Where does the money go?',
        answer: 'You can use it to pay providers you book on Six Feet, or request a payout to a verified bank account in the organiser’s name. Donors see a summary of how it was spent.',
    },
    {
        question: 'Are there fees?',
        answer: 'Any platform and payment processing fees are shown to donors before they give, and to the organiser in their dashboard. We will publish the final fees before fundraising opens.',
    },
    {
        question: 'Can people give privately?',
        answer: 'Yes. Donors can hide their name or the amount they gave from the public page.',
    },
    {
        question: 'What happens to money that is not used?',
        answer: 'We will publish clear rules for unused money before fundraising opens, so organisers and donors know what happens from the start.',
    },
    {
        question: 'When does fundraising open?',
        answer: 'Fundraising opens after bookings launch on Six Feet. If you need help with funeral costs now, our team can talk you through your options.',
    },
];
