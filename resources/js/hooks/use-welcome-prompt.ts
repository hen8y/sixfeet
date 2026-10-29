import { useEffect, useState } from 'react';

const storageKey = 'sf-welcome-prompt-seen';
const delay = 3000;

function hasSeenPrompt() {
    try {
        return window.localStorage.getItem(storageKey) !== null;
    } catch {
        return false;
    }
}

function rememberPrompt() {
    try {
        window.localStorage.setItem(storageKey, '1');
    } catch {
        // Private browsing can block storage; the prompt may then show again.
    }
}

export function useWelcomePrompt({
    eligible,
    paused,
}: {
    eligible: boolean;
    paused: boolean;
}) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!eligible) {
            // Visitors who reach the guides on their own don't need the prompt.
            rememberPrompt();

            return;
        }

        if (paused || hasSeenPrompt()) {
            return;
        }

        const timer = window.setTimeout(() => setOpen(true), delay);

        return () => window.clearTimeout(timer);
    }, [eligible, paused]);

    function dismiss() {
        rememberPrompt();
        setOpen(false);
    }

    return { open, dismiss };
}
