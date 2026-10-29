export function CondolenceArt() {
    return (
        <svg
            className="sf-condolence-art"
            viewBox="0 0 240 150"
            aria-hidden="true"
        >
            <circle className="sf-condolence-glow" cx="120" cy="48" r="38" />
            <path
                className="sf-condolence-ground"
                d="M24 134c48-10 144-10 192 0"
            />
            <path
                className="sf-candle-flame"
                d="M120 58c-7-8-6-18 0-28 6 10 7 20 0 28Z"
            />
            <path d="M120 58v8" />
            <rect x="106" y="66" width="28" height="66" rx="2" />
            <path d="M106 77c6 4 10 2 14 6" />
            <path d="M78 132c0-16-2-28 0-44M78 112c-9-2-14-9-15-16 8 1 14 7 15 16Z" />
            <path d="M78 88c-7-1-13-6-15-13 7 0 13 5 15 13ZM78 88c7-1 13-6 15-13-7 0-13 5-15 13Z" />
            <path
                className="sf-condolence-accent"
                d="M78 88c-5-6-5-14 0-20 5 6 5 14 0 20Z"
            />
            <path d="M162 132c0-12 1-22 0-34M162 116c8-2 12-8 13-14-7 1-12 6-13 14Z" />
            <path d="M162 98c6-1 11-5 13-11-6 0-11 4-13 11ZM162 98c-6-1-11-5-13-11 6 0 11 4 13 11Z" />
            <path
                className="sf-condolence-accent"
                d="M162 98c-4-5-4-11 0-16 4 5 4 11 0 16Z"
            />
        </svg>
    );
}
