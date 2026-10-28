import type { Country, Guide } from '@/types';

const localGuides: Record<string, Guide[]> = {
    NG: [
        {
            title: 'When someone dies in Nigeria',
            summary: 'The first steps, from the certificate to the mortuary.',
            art: 'document',
            description:
                'These are the usual first steps. Requirements differ between states and local governments, so check with the hospital or your local registry.',
            items: [
                'Ask the hospital or doctor for a medical certificate of the cause of death.',
                'If the death was sudden or unexpected, the police may need to be told first.',
                'Choose a mortuary to care for your loved one while the family plans.',
                'Register the death with the National Population Commission to get a death certificate.',
                'Check whether your state or local government needs a burial permit.',
            ],
        },
        {
            title: 'Bringing someone home',
            summary: 'Moving a loved one home to Nigeria from abroad.',
            art: 'plane',
            description:
                'Repatriation takes careful paperwork, and requirements vary by airline and embassy, so a specialist funeral director usually arranges it. Booking repatriation through Six Feet is coming later.',
            items: [
                'The death is registered where it happened, and certified copies of the certificate are prepared.',
                'Local authorities, such as a coroner, may need to release your loved one before they travel.',
                'Your loved one is embalmed and placed in a sealed coffin approved for air travel.',
                'The Nigerian embassy or high commission clears the documents.',
                'The airline confirms the flight, and family are told where to meet it in Nigeria.',
            ],
        },
    ],
    IE: [
        {
            title: 'When someone dies in Ireland',
            summary: 'Who to call first, and how to register the death.',
            art: 'lily',
            description:
                'These are the usual first steps. A funeral director can guide you through each of them.',
            items: [
                'If the death happens at home, call the person’s GP or an out-of-hours doctor. In an emergency, call 112 or 999.',
                'A doctor completes the medical certificate of the cause of death. A sudden or unexplained death is reported to the coroner.',
                'Choose a funeral director to care for your loved one.',
                'Register the death with a Civil Registration Service office, within three months.',
                'Order copies of the death certificate for banks, insurers and the estate.',
            ],
        },
        {
            title: 'Bringing someone home',
            summary: 'Moving a loved one between Ireland and Nigeria.',
            art: 'plane',
            description:
                'Repatriation takes careful paperwork, and requirements vary by airline and embassy, so a specialist funeral director usually arranges it. Booking repatriation through Six Feet is coming later.',
            items: [
                'In Ireland, the coroner must be told before a body is taken out of the State.',
                'The death is registered and certified copies of the certificate are prepared.',
                'Your loved one is embalmed and placed in a sealed coffin approved for air travel.',
                'The embassy or high commission may need to clear the documents.',
                'The airline confirms the flight, and family are told where to meet it.',
            ],
        },
    ],
};

const localCostAdvice: Record<string, string[]> = {
    NG: [
        'Many families share the cost with relatives, or through a town union, church or age grade.',
    ],
    IE: [
        'In Ireland, families on a low income may qualify for an Exceptional Needs Payment towards funeral costs.',
    ],
};

export function guidesFor(country: Country): Guide[] {
    return [
        ...(localGuides[country.code] ?? []),
        {
            title: 'Paying for a funeral',
            summary: 'What affects the cost, and sharing it with family.',
            art: 'coins',
            description:
                'The cost depends on your city, the provider and what you choose. On Six Feet you see the full price of each part, or one total for a package, before you book.',
            items: [
                'Care and preparation, the coffin and transport are usually the largest costs.',
                'A package brings them together at one rate for your city.',
                'Ask what is included, and whether anything is paid on the day.',
                ...(localCostAdvice[country.code] ?? []),
            ],
        },
        {
            title: 'Grief and support',
            summary: 'Looking after yourself and the people around you.',
            art: 'heart',
            description:
                'There is no right way to grieve. These are a few things families find helpful in the first weeks.',
            items: [
                'Let others help with meals, calls and errands.',
                'Share tasks across the family, so no one carries everything.',
                'Keep documents and receipts together in one place.',
                'If grief feels too heavy, talk to your doctor or a bereavement service.',
            ],
        },
    ];
}
