/**
 * Support contacts stay null until the business confirms its numbers and
 * staffed hours; until then the contact buttons open the support dialog.
 */
export type SupportContact = {
    phone: string | null;
    whatsapp: string | null;
    hours: string | null;
};

export type City = {
    name: string;
    slug: string;
    popular: boolean;
};

/** A market Six Feet serves, shared from `App\Http\Resources\CountryResource`. */
export type Country = {
    code: string;
    name: string;
    locale: string;
    currency: { code: string; name: string; symbol: string };
    flag: [string, string, string];
    support: SupportContact;
    cities: City[];
};
