import { usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import type { AccountLink } from '@/types';

export function useAccountLink(): AccountLink {
    const { auth } = usePage().props;

    return auth.user
        ? { href: dashboard.url(), label: 'Your dashboard' }
        : { href: login.url(), label: 'Sign in' };
}
