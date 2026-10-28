import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenis: Lenis | null = null;

export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function startSmoothScroll() {
    lenis = new Lenis({
        autoRaf: true,
        lerp: 0.09,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        // Radix sets this attribute while a dialog or select locks the page.
        virtualScroll: () => !document.body.hasAttribute('data-scroll-locked'),
    });

    return () => {
        lenis?.destroy();
        lenis = null;
    };
}

function easeInOutCubic(progress: number) {
    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function glideTo(top: number) {
    const destination = Math.max(0, top);
    const distance = Math.abs(destination - window.scrollY);

    if (!lenis) {
        window.scrollTo({ top: destination, behavior: 'instant' });

        return;
    }

    lenis.scrollTo(destination, {
        duration: Math.min(1.7, Math.max(0.9, distance * 0.00085)),
        easing: easeInOutCubic,
    });
}

export function glideToElement(
    element: HTMLElement,
    block: 'start' | 'center' = 'start',
) {
    const rect = element.getBoundingClientRect();
    const margin =
        Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
    const top =
        block === 'center'
            ? window.scrollY + rect.top - (window.innerHeight - rect.height) / 2
            : window.scrollY + rect.top - margin;

    glideTo(top);
}
