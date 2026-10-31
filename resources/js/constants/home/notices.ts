import { countryNames } from '@/lib/format';
import type { Country, Detail, Service, ServicePackage } from '@/types';

export function searchNotice(
    service: string,
    city: string,
    country: Country,
): Detail {
    return {
        title: `${service} in ${city}`,
        description: `We’re bringing trusted local services to ${country.name}. Provider listings and online booking are coming soon.`,
        items: [
            `Clear prices in ${country.currency.name}`,
            'Provider profiles and service details',
            'Booking updates in your family space',
        ],
    };
}

export function serviceNotice({
    title,
    description,
    highlights,
}: Pick<Service, 'title' | 'description' | 'highlights'>): Detail {
    return {
        title,
        description: `${description} Coming soon.`,
        items: highlights,
    };
}

export function providerApplicationNotice(countries: Country[]): Detail {
    return {
        title: 'Bring your care to more families.',
        description: `Vendor applications will open soon. Six Feet will welcome funeral care providers, funeral essentials suppliers and vehicle operators in ${countryNames(countries)}.`,
    };
}

export function packageNotice(item: ServicePackage): Detail {
    return {
        title: item.title,
        description: `${item.description} Prices are confirmed with providers in your city before you book.`,
        items: item.features,
    };
}
