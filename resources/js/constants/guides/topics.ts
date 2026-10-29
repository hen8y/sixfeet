import { fundraising, repatriation } from '@/routes';
import type { Country, GuideArticle, GuideTopic } from '@/types';

const firstDaysArticles: Record<string, GuideArticle[]> = {
    NG: [
        {
            title: 'Getting the medical certificate',
            summary: 'The first document, and who can give it to you.',
            description:
                'A medical certificate of the cause of death is usually the first document you will need. Everything else, from the mortuary to registration, follows from it.',
            items: [
                'In a hospital, the doctor who cared for your loved one usually writes it.',
                'If the death happened at home, call the family doctor or take your loved one to the nearest hospital so a doctor can confirm the death.',
                'Keep the original safe and make several copies. The mortuary and registry will both ask for it.',
            ],
        },
        {
            title: 'Registering the death',
            summary:
                'Getting a death certificate from the National Population Commission.',
            description:
                'Deaths in Nigeria are registered with the National Population Commission (NPC). Offices and timings differ between states and local governments, so ask the hospital or your local registry what they need.',
            items: [
                'Take the medical certificate and a means of identification for your loved one and for yourself.',
                'The informant is usually a close relative, or someone present at the death.',
                'Ask for extra certified copies. Banks, employers and insurers often need their own.',
                'Check whether your state or local government also needs a burial permit.',
            ],
        },
        {
            title: 'When a death is sudden or unexpected',
            summary: 'When the police or a coroner may need to be told.',
            description:
                'If a death was sudden, violent or unexplained, the police may need to be told before anything else happens. This can feel hard, but it is a normal part of the process.',
            items: [
                'Report the death to the nearest police station, or call the emergency line on 112.',
                'A coroner may order an autopsy before your loved one can be released.',
                'Ask for a police report or coroner’s release. The mortuary and registry may need them.',
            ],
        },
    ],
    IE: [
        {
            title: 'Getting the medical certificate',
            summary: 'Who completes it, and what happens if they can’t.',
            description:
                'A doctor who treated your loved one in the month before their death completes the medical certificate of the cause of death. You need it to register the death.',
            items: [
                'In a hospital or nursing home, staff usually arrange it for you.',
                'If the death happens at home, call the person’s GP or an out-of-hours doctor.',
                'If no doctor can certify the cause, the death is reported to the coroner.',
            ],
        },
        {
            title: 'Registering the death',
            summary:
                'At any Civil Registration Service office, within three months.',
            description:
                'In Ireland, deaths are registered with the Civil Registration Service. You can register at any office in the country, usually by appointment.',
            items: [
                'A relative is usually the informant. If no relative is available, someone present at the death or the person arranging the funeral can register.',
                'Bring the medical certificate and your own photo ID.',
                'Order copies of the death certificate for banks, insurers and the estate.',
                'If the death was reported to the coroner, the coroner sends the details to the registrar instead.',
            ],
        },
        {
            title: 'When the coroner is involved',
            summary:
                'Sudden or unexplained deaths, and what it means for the funeral.',
            description:
                'The coroner looks into deaths that are sudden, unexplained or unnatural. It can delay the funeral a little, but the coroner’s office will keep you informed.',
            items: [
                'Doctors, Gardaí or a funeral director usually report the death for you.',
                'A post-mortem may be needed to find the cause of death.',
                'The coroner can give an interim certificate so the family can deal with banks and other matters while an inquest is pending.',
            ],
        },
    ],
};

const arrangingArticles: Record<string, GuideArticle[]> = {
    NG: [
        {
            title: 'Burial customs and timing',
            summary: 'From same-day burials to a wake weeks later.',
            description:
                'Timing depends on faith, family and community. There is no single right way, and it is fine to take advice from elders and your place of worship.',
            items: [
                'Muslim burials usually take place as soon as possible, often within a day.',
                'Many Christian and traditional funerals take place weeks later, after a wake-keeping and service of songs.',
                'If the funeral will be later, choose a mortuary to care for your loved one in the meantime.',
                'Agree early who in the family is making decisions, and how costs are shared.',
            ],
        },
    ],
    IE: [
        {
            title: 'The wake and funeral customs',
            summary:
                'Reposing at home or at a funeral home, and how quickly funerals happen.',
            description:
                'Irish funerals usually take place within two or three days. Many families hold a wake, with the person reposing at home or at a funeral home so people can pay their respects.',
            items: [
                'Your funeral director can arrange reposing at home, at a funeral home or at the church.',
                'Death notices are usually published online and in local papers with the funeral details.',
                'Families can choose a private funeral or ask for “house private” if they need some quiet.',
                'Burial is most common, but cremation is available at crematoria around the country.',
            ],
        },
    ],
};

const costArticles: Record<string, GuideArticle> = {
    NG: {
        title: 'Help with funeral costs',
        summary: 'Sharing the cost with family, community and friends.',
        description:
            'Funerals in Nigeria are often a shared effort. Many families spread the cost across relatives and community groups.',
        items: [
            'A town union, church, mosque or age grade may contribute towards the funeral.',
            'Check whether your loved one’s employer, pension or insurer pays a death benefit.',
            'A Six Feet fundraiser lets relatives at home and abroad give towards verified providers.',
        ],
    },
    IE: {
        title: 'Help with funeral costs',
        summary: 'Payments and supports that may be available in Ireland.',
        description:
            'Some families can get help with funeral costs. What you can claim depends on your circumstances, so check with the Department of Social Protection or your local Intreo centre.',
        items: [
            'Families on a low income may qualify for an Exceptional Needs Payment towards funeral costs.',
            'Some social welfare payments continue for a short time after a death to help the family adjust.',
            'Check whether your loved one had a funeral plan, life insurance or a death benefit through work or a pension.',
            'A Six Feet fundraiser lets family and friends give towards verified providers.',
        ],
    },
};

const estateArticles: Record<string, GuideArticle> = {
    NG: {
        title: 'Wills and the estate',
        summary: 'Probate, letters of administration and who can act.',
        description:
            'Dealing with an estate can take months, so there is no need to rush. A lawyer can explain what applies in your state.',
        items: [
            'If there is a will, the executors apply to the Probate Registry of the State High Court for a grant of probate.',
            'If there is no will, close family usually apply for letters of administration.',
            'Customary and Islamic law can also shape how property is shared.',
            'Keep a record of every payment you make from the estate.',
        ],
    },
    IE: {
        title: 'Wills and the estate',
        summary: 'Probate, administration and who can act.',
        description:
            'Dealing with an estate can take months, so there is no need to rush. A solicitor can help, or you can apply to the Probate Office yourself.',
        items: [
            'If there is a will, the executor applies for a grant of probate.',
            'If there is no will, the next of kin usually applies for letters of administration.',
            'You may need to file an inheritance tax return (Form CA24) with Revenue.',
            'Keep a record of every payment you make from the estate.',
        ],
    },
};

const supportArticles: Record<string, string> = {
    NG: 'Your doctor, a counsellor, or a religious leader you trust can help. Some hospitals also have counselling services.',
    IE: 'Your GP can help, and the Irish Hospice Foundation runs a free bereavement support line.',
};

export function guideTopicsFor(country: Country): GuideTopic[] {
    return [
        {
            id: 'first-days',
            title: 'When someone dies',
            summary: 'The first hours and days, and the documents you need.',
            description: `Practical steps for the first days after a death in ${country.name}, from the certificate to registration.`,
            art: 'document',
            articles: [
                {
                    title: 'The first few hours',
                    summary:
                        'There is less to do straight away than you might think.',
                    description:
                        'Very little has to be done in the first hours. It is fine to sit with your loved one, call family and take a breath.',
                    items: [
                        'If the death was expected, a doctor or nurse will confirm it. There is no need to call emergency services.',
                        'If it was sudden or unexpected, call the emergency services first.',
                        'Ask one or two people to help you tell family and friends.',
                        'Look for any wishes your loved one left about their funeral.',
                    ],
                },
                ...(firstDaysArticles[country.code] ?? []),
                {
                    title: 'Telling family and friends',
                    summary: 'Sharing the news, and asking others to help.',
                    description:
                        'You don’t have to tell everyone yourself. Share the news with a few close people, and let them help pass it on.',
                    items: [
                        'Make a short list of who should hear first, before it is shared more widely.',
                        'Agree one message the family can share, so details stay consistent.',
                        'Ask someone abroad to keep relatives there informed.',
                        'When you know the funeral details, a death notice can share them with everyone.',
                    ],
                },
            ],
        },
        {
            id: 'arranging',
            title: 'Arranging a funeral',
            summary:
                'Choosing providers, planning the service and local customs.',
            description:
                'There are many choices to make, but not all at once. Start with care for your loved one, then plan the rest together.',
            art: 'lily',
            articles: [
                {
                    title: 'Choosing a mortuary or funeral director',
                    summary: 'What to ask, and how to compare.',
                    description:
                        'The provider you choose looks after your loved one and much of the planning. It is fine to ask questions and compare before you decide.',
                    items: [
                        'Ask what is included in the price, and what is charged by the day.',
                        'Ask how your loved one will be cared for, and when you can visit.',
                        'Check that they can work with your faith and family customs.',
                        'On Six Feet, every provider is verified and shows prices before you book.',
                    ],
                },
                ...(arrangingArticles[country.code] ?? []),
                {
                    title: 'Planning the service',
                    summary: 'Readings, music, a tribute and who takes part.',
                    description:
                        'A funeral service can be as traditional or as personal as you like. Your place of worship or funeral director can help shape it.',
                    items: [
                        'Choose who will lead the service, and where it will take place.',
                        'Pick readings, hymns or music that meant something to your loved one.',
                        'Ask family members to share tasks, such as the programme, flowers and transport.',
                        'Decide whether you would like donations, gifts or flowers.',
                    ],
                },
                {
                    title: 'Writing a tribute or eulogy',
                    summary: 'Simple ways to begin when the words won’t come.',
                    description:
                        'A tribute doesn’t have to be long or perfect. A few honest stories often say more than a full life history.',
                    items: [
                        'Ask family and friends for a memory or a phrase that sums them up.',
                        'Start with who they were, then a few moments that showed it.',
                        'Read it aloud beforehand, and keep a printed copy with you.',
                        'It is fine to ask someone else to read it for you on the day.',
                    ],
                },
            ],
        },
        {
            id: 'costs',
            title: 'Costs and paying',
            summary: 'What a funeral costs, and help with paying for it.',
            description:
                'Money can be one of the hardest parts. Knowing the full price early makes the rest easier to plan.',
            art: 'coins',
            link: {
                label: 'Raise funds for a funeral',
                href: fundraising.url(),
            },
            articles: [
                {
                    title: 'What a funeral costs',
                    summary: 'The main costs, and what changes the total.',
                    description:
                        'The cost depends on your city, the provider and what you choose. On Six Feet you see the full price of each part, or one total for a package, before you book.',
                    items: [
                        'Care and preparation, the coffin and transport are usually the largest costs.',
                        'Venue, catering, programmes and flowers are often extra.',
                        'A package brings the main parts together at one rate for your city.',
                    ],
                },
                ...(costArticles[country.code]
                    ? [costArticles[country.code]]
                    : []),
                {
                    title: 'Questions to ask before you pay',
                    summary: 'Avoid surprises on the day.',
                    description:
                        'A clear, written price protects everyone. These questions help you compare providers fairly.',
                    items: [
                        'Is anything paid on the day, or charged by the day?',
                        'What happens if the date changes?',
                        'Is there a deposit, and is any of it refundable?',
                        'Can I have the quote in writing, with each item listed?',
                    ],
                },
            ],
        },
        {
            id: 'abroad',
            title: 'Far from home',
            summary: 'When someone dies abroad, or needs to travel home.',
            description:
                'Repatriation takes careful paperwork, and requirements vary by airline and embassy. You don’t have to understand it all before you ask for help.',
            art: 'plane',
            link: { label: 'How repatriation works', href: repatriation.url() },
            articles: [
                {
                    title: 'When someone dies abroad',
                    summary: 'Who to contact first, and what happens next.',
                    description:
                        'If your loved one died in another country, the local authorities and your embassy can help. A repatriation partner can handle most of the practical work.',
                    items: [
                        'Contact the embassy, high commission or consulate of their home country.',
                        'If they were travelling, tell their travel insurer as soon as you can.',
                        'The death is registered where it happened, and certified copies are prepared.',
                        'Decide with family whether to bring them home, or hold the funeral where they died.',
                    ],
                },
                {
                    title: 'Bringing someone home',
                    summary: 'The documents and steps for a repatriation.',
                    description:
                        'A specialist repatriation partner usually arranges the journey. Your case manager on Six Feet keeps every step in one place.',
                    items: [
                        'Local authorities, such as a coroner, may need to release your loved one first.',
                        'Your loved one is embalmed and placed in a sealed coffin approved for air travel.',
                        'The embassy or high commission clears the documents.',
                        'The airline confirms the flight, and family are told where to meet it.',
                    ],
                },
            ],
        },
        {
            id: 'estate',
            title: 'Paperwork and the estate',
            summary:
                'Who to tell, documents to keep and dealing with the estate.',
            description:
                'There is paperwork after a death, but most of it can wait until after the funeral. Take it one step at a time.',
            art: 'receipt',
            articles: [
                {
                    title: 'Who to tell after a death',
                    summary: 'Banks, employers, pensions and more.',
                    description:
                        'Many organisations need to know about a death. Most will ask for a copy of the death certificate.',
                    items: [
                        'Banks, building societies and credit card companies.',
                        'Their employer, pension provider and any insurers.',
                        'Utility companies, landlords and mobile network.',
                        'Government offices that paid them a benefit or pension.',
                    ],
                },
                {
                    title: 'Documents to keep together',
                    summary: 'One folder for everything you will be asked for.',
                    description:
                        'Keeping documents in one place saves time and stress later.',
                    items: [
                        'The medical certificate and copies of the death certificate.',
                        'Their ID, passport, birth and marriage certificates.',
                        'Their will, insurance policies and bank details.',
                        'Every quote, invoice and receipt for the funeral.',
                    ],
                },
                ...(estateArticles[country.code]
                    ? [estateArticles[country.code]]
                    : []),
            ],
        },
        {
            id: 'grief',
            title: 'Grief and support',
            summary: 'Looking after yourself and the people around you.',
            description:
                'There is no right way to grieve, and no timetable. Be gentle with yourself and with each other.',
            art: 'heart',
            articles: [
                {
                    title: 'Coping in the first weeks',
                    summary:
                        'Small things that help when everything feels heavy.',
                    description:
                        'The first weeks can feel like a blur. These are a few things families find helpful.',
                    items: [
                        'Let others help with meals, calls and errands.',
                        'Try to eat, rest and get outside, even briefly.',
                        'Share tasks across the family, so no one carries everything.',
                        'Expect hard days, including after the funeral is over.',
                    ],
                },
                {
                    title: 'Supporting someone who is grieving',
                    summary: 'What to say, and what to do.',
                    description:
                        'You don’t need the perfect words. Being there, and staying in touch, matters most.',
                    items: [
                        'Offer something specific, like a meal or a lift, instead of “let me know”.',
                        'Say their loved one’s name, and share a memory if you have one.',
                        'Keep checking in after the funeral, when support often fades.',
                    ],
                },
                {
                    title: 'Helping children understand',
                    summary: 'Honest, gentle words for young people.',
                    description:
                        'Children grieve too, though it can look different. Simple, honest answers help them feel safe.',
                    items: [
                        'Use clear words like “died”, instead of “gone to sleep”.',
                        'Let them ask questions, and it is fine to say you don’t know.',
                        'Ask whether they would like to take part in the funeral.',
                        'Tell their school, so teachers can support them.',
                    ],
                },
                {
                    title: 'When to look for more support',
                    summary: 'Signs that grief needs more help.',
                    description:
                        'Sometimes grief feels too heavy to carry alone. Reaching out is a sign of strength, not weakness.',
                    items: [
                        'If you can’t sleep, eat or manage daily life for a long time.',
                        'If you feel numb, hopeless or unable to cope.',
                        supportArticles[country.code] ??
                            'Your doctor or a bereavement service can help.',
                    ],
                },
            ],
        },
    ];
}
