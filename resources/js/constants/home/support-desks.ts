import type { Country, LineArtName, SupportDesk } from '@/types';

const localDesks: Record<string, { description: string; art: LineArtName }> = {
    NG: {
        description:
            'For mortuary care, funeral essentials and transport in the cities we serve across Nigeria.',
        art: 'phone',
    },
    IE: {
        description:
            'For funeral directors, essentials and transport in the cities we serve across Ireland.',
        art: 'chat',
    },
};

export function supportDesksFor(
    country: Country,
    countries: Country[],
): SupportDesk[] {
    return [
        ...countries.map((option) => ({
            title: `Families in ${option.name}`,
            description:
                localDesks[option.code]?.description ??
                `For care, funeral essentials and transport in the cities we serve across ${option.name}.`,
            art: localDesks[option.code]?.art ?? 'phone',
            contact: option.support,
        })),
        {
            title: 'Arranging from abroad',
            description:
                'For family in the UK, the US or anywhere else, planning a farewell at home.',
            art: 'globe',
            contact: country.support,
        },
    ];
}
