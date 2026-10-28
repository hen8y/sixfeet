import type { ReactNode } from 'react';
import type { LineArtName } from '@/types';

const lineArt: Record<LineArtName, ReactNode> = {
    document: (
        <>
            <path d="M18 8h20l10 10v38H18Z" />
            <path d="M38 8v10h10M24 28h18M24 35h18M24 42h10" />
            <circle className="sf-art-accent" cx="42" cy="48" r="5" />
        </>
    ),
    lily: (
        <>
            <path d="M32 58c0-12-1-20 0-30M32 46c-8-2-12-8-13-14 7 1 12 6 13 14Z" />
            <path d="M32 28c-7-1-13-6-15-13 7 0 13 5 15 13ZM32 28c7-1 13-6 15-13-7 0-13 5-15 13Z" />
            <path
                className="sf-art-accent"
                d="M32 28c-5-6-5-14 0-20 5 6 5 14 0 20Z"
            />
        </>
    ),
    plane: (
        <>
            <path d="M32 8c2 0 3 3 3 6v12l19 10v4l-19-6v12l6 5v3l-9-3-9 3v-3l6-5V34l-19 6v-4l19-10V14c0-3 1-6 3-6Z" />
            <path className="sf-art-stroke" d="M8 58c10-4 38-4 48 0" />
        </>
    ),
    coins: (
        <>
            <ellipse cx="26" cy="20" rx="14" ry="5" />
            <path d="M12 20v8c0 2.8 6.3 5 14 5s14-2.2 14-5v-8M12 28v8c0 2.8 6.3 5 14 5s14-2.2 14-5v-8M12 36v8c0 2.8 6.3 5 14 5s14-2.2 14-5v-8" />
            <circle className="sf-art-accent" cx="47" cy="46" r="9" />
        </>
    ),
    heart: (
        <>
            <path
                className="sf-art-accent"
                d="M32 52C20 44 12 36 12 26c0-7 5-12 11-12 4 0 7 2 9 6 2-4 5-6 9-6 6 0 11 5 11 12 0 10-8 18-20 26Z"
            />
            <path d="M24 24c-3 1-5 4-5 7" />
        </>
    ),
    phone: (
        <>
            <rect x="18" y="8" width="24" height="48" rx="4" />
            <path d="M26 14h8" />
            <circle cx="30" cy="49" r="2" />
            <path
                className="sf-art-stroke"
                d="M48 24c3 3 3 9 0 12M53 19c6 6 6 16 0 22"
            />
        </>
    ),
    chat: (
        <>
            <path d="M10 12h30a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H24l-9 8v-8h-5a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4Z" />
            <path d="M48 22h6a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4h-2v7l-8-7H34" />
            <circle className="sf-art-accent" cx="17" cy="25" r="2" />
            <circle className="sf-art-accent" cx="25" cy="25" r="2" />
            <circle className="sf-art-accent" cx="33" cy="25" r="2" />
        </>
    ),
    globe: (
        <>
            <circle cx="32" cy="30" r="20" />
            <ellipse cx="32" cy="30" rx="8" ry="20" />
            <path d="M12 30h40M15 20h34M15 40h34" />
            <path className="sf-art-stroke" d="M6 52c12 8 40 8 52-6" />
        </>
    ),
    shield: (
        <>
            <path d="M32 6l20 7v15c0 13-9 23-20 28C21 51 12 41 12 28V13Z" />
            <path className="sf-art-stroke" d="M23 31l6 6 12-13" />
        </>
    ),
    receipt: (
        <>
            <path d="M16 6h32v52l-5.3-4-5.3 4-5.4-4-5.3 4-5.4-4-5.3 4Z" />
            <path d="M23 18h18M23 26h18M23 34h10" />
            <path className="sf-art-stroke" d="M23 44h18" />
        </>
    ),
};

export function LineArt({ name }: { name: LineArtName }) {
    return (
        <svg className="sf-line-art" viewBox="0 0 64 64" aria-hidden="true">
            {lineArt[name]}
        </svg>
    );
}
