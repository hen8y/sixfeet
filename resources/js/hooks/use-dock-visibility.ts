import { useEffect, useState, type RefObject } from 'react';

export function useDockVisibility(
    anchor: RefObject<HTMLElement | null>,
    footer: RefObject<HTMLElement | null>,
) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const anchorElement = anchor.current;
        const footerElement = footer.current;

        if (!anchorElement || !footerElement) {
            return;
        }

        let pastAnchor = false;
        let atFooter = false;
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === anchorElement) {
                    pastAnchor =
                        !entry.isIntersecting &&
                        entry.boundingClientRect.top < 0;
                } else {
                    atFooter = entry.isIntersecting;
                }
            }

            setVisible(pastAnchor && !atFooter);
        });

        observer.observe(anchorElement);
        observer.observe(footerElement);

        return () => observer.disconnect();
    }, [anchor, footer]);

    return visible;
}
