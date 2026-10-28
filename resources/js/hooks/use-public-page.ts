import { useEffect } from 'react';
import {
    glideToElement,
    prefersReducedMotion,
    startSmoothScroll,
} from '@/lib/smooth-scroll';

function isPlainClick(event: MouseEvent) {
    return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey
    );
}

export function usePublicPage(rootId: string) {
    useEffect(() => {
        if (prefersReducedMotion()) {
            return;
        }

        return startSmoothScroll();
    }, []);

    useEffect(() => {
        const root = document.getElementById(rootId);

        if (!root) {
            return;
        }

        const onClick = (event: MouseEvent) => {
            if (!isPlainClick(event)) {
                return;
            }

            const link = (event.target as Element | null)?.closest(
                'a[href^="#"]',
            );

            if (!link || !root.contains(link)) {
                return;
            }

            const id = link.getAttribute('href')?.slice(1);
            const target = id ? document.getElementById(id) : null;

            if (!target) {
                return;
            }

            event.preventDefault();
            glideToElement(target);
            history.pushState(null, '', `#${id}`);
        };

        root.addEventListener('click', onClick);

        return () => root.removeEventListener('click', onClick);
    }, [rootId]);

    useEffect(() => {
        const root = document.getElementById(rootId);

        if (!root || prefersReducedMotion()) {
            return;
        }

        const sections = root.querySelectorAll<HTMLElement>(
            'main > section:not(:first-of-type)',
        );
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.setAttribute('data-visible', '');
                        observer.unobserve(entry.target);
                    }
                }
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
        );

        root.setAttribute('data-reveal', '');
        sections.forEach((section) => observer.observe(section));

        return () => {
            observer.disconnect();
            root.removeAttribute('data-reveal');
        };
    }, [rootId]);
}
