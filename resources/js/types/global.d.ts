import type { Auth } from '@/types/auth';
import type { Country } from '@/types/country';

declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            /** The visitor's country: remembered choice, location, then default. */
            country: Country;
            /** Every country open to visitors, in display order. */
            countries: Country[];
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
