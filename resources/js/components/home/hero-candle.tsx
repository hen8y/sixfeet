export function HeroCandle() {
    return (
        <svg className="sf-hero-candle" viewBox="0 0 80 200" aria-hidden="true">
            <path
                className="sf-candle-flame"
                d="M40 70 C32 60 33 48 40 36 C47 48 48 60 40 70 Z"
            />
            <line x1="40" y1="70" x2="40" y2="80" />
            <rect x="26" y="80" width="28" height="120" rx="2" />
            <path d="M26 92 C32 96 36 94 40 98" />
        </svg>
    );
}
