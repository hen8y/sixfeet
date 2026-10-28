import { useEffect, type RefObject } from 'react';

export function useDismiss(
    container: RefObject<HTMLElement | null>,
    active: boolean,
    onDismiss: () => void,
) {
    useEffect(() => {
        if (!active) {
            return;
        }

        const onPointerDown = (event: PointerEvent) => {
            if (!container.current?.contains(event.target as Node)) {
                onDismiss();
            }
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onDismiss();
            }
        };

        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [container, active, onDismiss]);
}
