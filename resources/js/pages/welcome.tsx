import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    CarFront,
    Check,
    CircleAlert,
    PackageCheck,
    Flower2,
    HeartHandshake,
    House,
    MapPin,
    Menu,
    ReceiptText,
    X,
} from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import {
    useEffect,
    useRef,
    useState,
    type FormEvent,
    type KeyboardEvent,
    type RefObject,
} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { usePlaceSuggestions } from '@/hooks/use-place-suggestions';
import type { PlaceSuggestion } from '@/lib/google-places';
import { dashboard, login } from '@/routes';

type Country = 'ng' | 'ie';
type Detail = { title: string; description: string; items?: string[] };

const countries = {
    ng: {
        name: 'Nigeria',
        regionCode: 'ng',
        currency: 'NGN',
        currencyName: 'Nigerian naira',
        symbol: '₦',
        flag: ['#008751', '#ffffff', '#008751'],
        cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu'],
    },
    ie: {
        name: 'Ireland',
        regionCode: 'ie',
        currency: 'EUR',
        currencyName: 'Euro',
        symbol: '€',
        flag: ['#169b62', '#ffffff', '#ff883e'],
        cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'],
    },
} satisfies Record<
    Country,
    {
        name: string;
        regionCode: string;
        currency: string;
        currencyName: string;
        symbol: string;
        flag: [string, string, string];
        cities: string[];
    }
>;

const assurances = [
    {
        title: 'Verified providers',
        short: 'Verified',
        detail: 'Every provider is checked',
        icon: BadgeCheck,
    },
    {
        title: 'Clear prices',
        short: 'Clear prices',
        detail: 'The full cost before you book',
        icon: ReceiptText,
    },
    {
        title: 'A person to turn to',
        short: 'Real support',
        detail: 'Our team by phone or WhatsApp',
        icon: HeartHandshake,
    },
];

const services = [
    {
        title: 'Mortuary & funeral care',
        description:
            'Find a verified mortuary or funeral director in your city. See how they care for your loved one, what preparation they offer, and the price before you book.',
        action: 'Find a provider',
        icon: House,
    },
    {
        title: 'Coffins & funeral essentials',
        heading: 'Funeral essentials',
        description:
            'Choose a coffin, flowers and the details of the farewell. Compare style and price, and see whether it can be delivered or collected in your city.',
        action: 'Find funeral essentials',
        icon: Flower2,
    },
    {
        title: 'Hearse & vehicle hire',
        heading: 'Hearses & family vehicles',
        description:
            'Book a hearse and a car for the family. Set the time, the pickup and where everyone is going, with the cost shown before the day.',
        action: 'Explore vehicle hire',
        icon: CarFront,
    },
    {
        title: 'A complete funeral package',
        heading: 'Funeral packages',
        description:
            'Care, a coffin and transport in one arrangement, when you would rather not gather each part yourself. The full cost is shown in one place.',
        action: 'Explore packages',
        icon: PackageCheck,
    },
];

const packages = [
    {
        title: 'Essential',
        description:
            'A simple farewell, with the basics done carefully and the price clear from the start.',
        features: [
            'Mortuary care',
            'A simple coffin',
            'Local hearse transport',
            'Help with basic documents',
        ],
    },
    {
        title: 'Standard Family',
        description:
            'For most families. Care and preparation, with room for the people closest to you.',
        features: [
            'Mortuary care and preparation',
            'A mid-range coffin',
            'A hearse and one family vehicle',
            'A printed order of service',
        ],
    },
    {
        title: 'Complete Service',
        description:
            'A fuller day, with flowers, extra transport and one person your family can call.',
        features: [
            'The Standard Family services',
            'Flowers',
            'An extra vehicle',
            'A named case manager',
        ],
    },
];

const reviews = [
    {
        quote: 'I was completely overwhelmed when Dad passed. Six Feet gave me a checklist, a coordinator, and a coffin I helped design. I felt less alone every step of the way.',
        name: 'Ciarán Murphy',
        initials: 'CM',
        place: 'Dublin · April 2026',
    },
    {
        quote: 'The repatriation service was extraordinary. My mother passed in Dublin and needed to be brought home to Lagos. The team handled everything with dignity and precision.',
        name: 'Adaeze Okafor',
        initials: 'AO',
        place: 'Dublin → Lagos · February 2026',
    },
    {
        quote: 'The fundraising feature was something we didn’t know we needed until we used it. €2,400 raised in 4 days, all applied straight to the funeral cost.',
        name: 'Sinead Ryan',
        initials: 'SR',
        place: 'Cork · March 2026',
    },
];

const steps = [
    {
        label: '01 / FIND',
        title: 'Choose the care you need.',
        description:
            'Look through mortuaries, essentials, vehicles and packages in your city. No account is needed to browse.',
    },
    {
        label: '02 / ARRANGE',
        title: 'Book with clarity.',
        description:
            'Check what is included and the full cost in naira or euro. You book only when you are ready.',
    },
    {
        label: '03 / STAY CLOSE',
        title: 'Know what happens next.',
        description:
            'Follow the arrangement as it moves forward, and reach the provider or our team by phone or WhatsApp.',
    },
];

/** A line-drawn memorial candle whose flame flickers softly. Purely decorative. */
function HeroCandle() {
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

function Flag({ country }: { country: Country }) {
    const [left, middle, right] = countries[country].flag;

    return (
        <svg className="sf-flag" viewBox="0 0 3 2" aria-hidden="true">
            <rect width="1" height="2" fill={left} />
            <rect x="1" width="1" height="2" fill={middle} />
            <rect x="2" width="1" height="2" fill={right} />
        </svg>
    );
}

function CityField({
    city,
    onCityChange,
    country,
    inputRef,
    error,
}: {
    city: string;
    onCityChange: (city: string) => void;
    country: Country;
    inputRef: RefObject<HTMLInputElement | null>;
    error: string | null;
}) {
    const market = countries[country];
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);
    const { suggestions, source, endSession } = usePlaceSuggestions(city, {
        regionCode: market.regionCode,
        countryName: market.name,
        cities: market.cities,
    });
    const showingPopular = city.trim() === '';
    const options: PlaceSuggestion[] = showingPopular
        ? market.cities.map((location) => ({
              id: location,
              label: location,
              detail: null,
              value: location,
          }))
        : suggestions;
    const showSuggestions = open && options.length > 0;

    function choose(suggestion: PlaceSuggestion) {
        onCityChange(suggestion.value);
        setOpen(false);
        setActive(-1);
        endSession();
    }

    function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);

            if (options.length > 0) {
                const step = event.key === 'ArrowDown' ? 1 : -1;
                setActive((active + step + options.length) % options.length);
            }

            return;
        }

        if (event.key === 'Enter' && showSuggestions && active >= 0) {
            event.preventDefault();
            choose(options[active]);

            return;
        }

        if (event.key === 'Escape' && showSuggestions) {
            event.preventDefault();
            setOpen(false);
        }
    }

    return (
        <div className="sf-field">
            <label htmlFor="sf-city">In or around</label>
            <div className="sf-combobox">
                <div className="sf-control" data-invalid={Boolean(error)}>
                    <MapPin aria-hidden="true" />
                    <Input
                        id="sf-city"
                        ref={inputRef}
                        role="combobox"
                        aria-autocomplete="list"
                        aria-expanded={showSuggestions}
                        aria-controls="sf-city-options"
                        aria-activedescendant={
                            showSuggestions && active >= 0
                                ? `sf-city-option-${active}`
                                : undefined
                        }
                        value={city}
                        onChange={(event) => {
                            onCityChange(event.target.value);
                            setOpen(true);
                            setActive(-1);
                        }}
                        onKeyDown={onKeyDown}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setOpen(false)}
                        placeholder="Enter a city or area"
                        required
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? 'sf-city-error' : undefined}
                        maxLength={100}
                        autoComplete="off"
                    />
                </div>
                {error && (
                    <p className="sf-field-error" id="sf-city-error">
                        <CircleAlert aria-hidden="true" />
                        {error}
                    </p>
                )}
                {showSuggestions && (
                    <div className="sf-suggestions">
                        {showingPopular && (
                            <p
                                className="sf-suggestions-heading"
                                id="sf-city-popular"
                            >
                                Popular in {market.name}
                            </p>
                        )}
                        <ul
                            id="sf-city-options"
                            role="listbox"
                            aria-labelledby={
                                showingPopular ? 'sf-city-popular' : undefined
                            }
                        >
                            {options.map((suggestion, index) => (
                                <li
                                    key={suggestion.id}
                                    id={`sf-city-option-${index}`}
                                    role="option"
                                    aria-selected={index === active}
                                    onMouseDown={(event) =>
                                        event.preventDefault()
                                    }
                                    onMouseEnter={() => setActive(index)}
                                    onClick={() => choose(suggestion)}
                                >
                                    <span>
                                        <strong>{suggestion.label}</strong>
                                        {suggestion.detail && (
                                            <span>{suggestion.detail}</span>
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        {!showingPopular && source === 'google' && (
                            <p className="sf-attribution">Powered by Google</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

let lenis: Lenis | null = null;

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

function glideToElement(
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

export default function Welcome() {
    const { auth } = usePage().props;
    const [country, setCountry] = useState<Country>('ng');
    const [service, setService] = useState(services[0].title);
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState<string | null>(null);
    const [detail, setDetail] = useState<Detail | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const header = useRef<HTMLElement>(null);
    const cityInput = useRef<HTMLInputElement>(null);
    const searchSection = useRef<HTMLElement>(null);
    const market = countries[country];

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        lenis = new Lenis({
            autoRaf: true,
            lerp: 0.09,
            allowNestedScroll: true,
            stopInertiaOnNavigate: true,
            virtualScroll: () =>
                !document.body.hasAttribute('data-scroll-locked'),
        });

        return () => {
            lenis?.destroy();
            lenis = null;
        };
    }, []);

    useEffect(() => {
        const home = document.getElementById('sf-home');

        if (!home) {
            return;
        }

        const onClick = (event: MouseEvent) => {
            if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            const link = (event.target as Element | null)?.closest(
                'a[href^="#"]',
            );

            if (!link || !home.contains(link)) {
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

        home.addEventListener('click', onClick);

        return () => home.removeEventListener('click', onClick);
    }, []);

    useEffect(() => {
        const home = document.getElementById('sf-home');

        if (
            !home ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        const sections = home.querySelectorAll<HTMLElement>(
            'main > section:not(.sf-hero)',
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

        home.setAttribute('data-reveal', '');
        sections.forEach((section) => observer.observe(section));

        return () => {
            observer.disconnect();
            home.removeAttribute('data-reveal');
        };
    }, []);

    useEffect(() => {
        if (!menuOpen) {
            return;
        }

        const onPointerDown = (event: PointerEvent) => {
            if (!header.current?.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        const onKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [menuOpen]);

    function scrollToSearch() {
        if (searchSection.current) {
            glideToElement(searchSection.current, 'center');
        }

        cityInput.current?.focus({ preventScroll: true });
    }

    function selectService(title: string) {
        setService(title);
        scrollToSearch();
    }

    function changeCity(value: string) {
        setCity(value);

        if (value.trim()) {
            setCityError(null);
        }
    }

    function search(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!city.trim()) {
            setCityError('Enter a city or area to continue.');
            cityInput.current?.focus();

            return;
        }

        setDetail({
            title: `${service} in ${city.trim()}`,
            description: `We’re bringing trusted local services to ${market.name}. Provider listings and online booking are coming soon.`,
            items: [
                'Clear prices in ' + market.currency,
                'Provider profiles and service details',
                'Booking updates in your family space',
            ],
        });
    }

    function showSupport() {
        setDetail({
            title: 'A helping hand, when you need it.',
            description:
                'Our team’s local contact details and opening hours will be available here when Six Feet launches. You’ll be able to reach us by phone or WhatsApp.',
        });
    }

    return (
        <>
            <Head title="Six Feet — Funeral care, one step at a time">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Poppins:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content="Find a verified mortuary, coffin, flowers and transport in Nigeria and Ireland, or bring them together in one package. Prices are shown before you book."
                />
            </Head>
            <div id="sf-home" className="sf-theme">
                <a className="sf-skip-link" href="#main-content">
                    Skip to content
                </a>
                <div className="sf-top">
                    <span>Funeral care in Nigeria and Ireland</span>
                    <button type="button" onClick={showSupport}>
                        Need help? Talk to us{' '}
                        <ArrowUpRight aria-hidden="true" />
                    </button>
                </div>
                <header className="sf-header" ref={header}>
                    <a
                        className="sf-logo"
                        href="#sf-start"
                        aria-label="Six Feet home"
                    >
                        <span className="sf-brand-mark" aria-hidden="true">
                            S
                        </span>
                        Six Feet
                    </a>
                    <nav
                        className="sf-desktop-nav"
                        aria-label="Main navigation"
                    >
                        <a href="#sf-services">Find a service</a>
                        <a href="#sf-packages">Our packages</a>
                        <a href="#sf-how">How it works</a>
                    </nav>
                    <div className="sf-account">
                        <Select
                            value={country}
                            onValueChange={(value) => {
                                setCountry(value as Country);
                                setCity('');
                            }}
                        >
                            <SelectTrigger
                                className="sf-country"
                                aria-label={`Country and currency: ${market.name}, ${market.currencyName}`}
                            >
                                <SelectValue>
                                    <Flag country={country} />
                                    <span className="sf-currency-code">
                                        {market.currency}
                                    </span>
                                    <span className="sf-currency-symbol">
                                        {market.symbol}
                                    </span>
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent
                                className="sf-theme sf-select-menu sf-currency-menu"
                                align="end"
                            >
                                {(Object.keys(countries) as Country[]).map(
                                    (code) => (
                                        <SelectItem key={code} value={code}>
                                            <Flag country={code} />
                                            <span className="sf-currency-name">
                                                <strong>
                                                    {countries[code].name}
                                                </strong>
                                                <span>
                                                    {
                                                        countries[code]
                                                            .currencyName
                                                    }{' '}
                                                    · {countries[code].symbol}{' '}
                                                    {countries[code].currency}
                                                </span>
                                            </span>
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                        <Link
                            className="sf-family-link"
                            href={auth.user ? dashboard() : login()}
                        >
                            {auth.user ? 'Your dashboard' : 'Sign in'}
                        </Link>
                        <button
                            className="sf-header-plan"
                            type="button"
                            onClick={scrollToSearch}
                        >
                            Start planning
                        </button>
                        <button
                            className="sf-menu-toggle"
                            type="button"
                            aria-expanded={menuOpen}
                            aria-controls="sf-mobile-nav"
                            aria-label={
                                menuOpen
                                    ? 'Close navigation'
                                    : 'Open navigation'
                            }
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <Menu className="sf-icon-open" aria-hidden="true" />
                            <X className="sf-icon-close" aria-hidden="true" />
                        </button>
                    </div>
                    <div
                        className="sf-mobile-menu"
                        id="sf-mobile-nav"
                        data-open={menuOpen}
                        inert={!menuOpen}
                    >
                        <nav aria-label="Mobile navigation">
                            {[
                                ['#sf-services', 'Find a service'],
                                ['#sf-packages', 'Our packages'],
                                ['#sf-how', 'How it works'],
                            ].map(([href, label]) => (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {label}
                                    <ArrowRight aria-hidden="true" />
                                </a>
                            ))}
                        </nav>
                        <div className="sf-mobile-actions">
                            <Link
                                className="sf-mobile-account"
                                href={auth.user ? dashboard() : login()}
                            >
                                {auth.user ? 'Your dashboard' : 'Sign in'}
                            </Link>
                            <button
                                className="sf-mobile-plan"
                                type="button"
                                onClick={() => {
                                    setMenuOpen(false);
                                    scrollToSearch();
                                }}
                            >
                                Start planning <ArrowRight aria-hidden="true" />
                            </button>
                        </div>
                        <button
                            className="sf-mobile-help"
                            type="button"
                            onClick={() => {
                                setMenuOpen(false);
                                showSupport();
                            }}
                        >
                            Need help? Talk to us{' '}
                            <ArrowUpRight aria-hidden="true" />
                        </button>
                    </div>
                </header>
                <main id="main-content">
                    <ul
                        className="sf-assurance"
                        aria-label="Why families use Six Feet"
                    >
                        {assurances.map(
                            ({ title, short, detail, icon: Icon }) => (
                                <li key={title}>
                                    <Icon aria-hidden="true" />
                                    <span>
                                        <strong>
                                            <span className="sf-long">
                                                {title}
                                            </span>
                                            <span className="sf-short">
                                                {short}
                                            </span>
                                        </strong>
                                        <span className="sf-assurance-detail">
                                            {detail}
                                        </span>
                                    </span>
                                </li>
                            ),
                        )}
                    </ul>
                    <section
                        className="sf-hero"
                        id="sf-start"
                        aria-labelledby="sf-hero-title"
                    >
                        <div className="sf-hero-media">
                            <img
                                className="sf-hero-photo"
                                src="/images/hero-funeral-hall.webp"
                                srcSet="/images/hero-funeral-hall-small.webp 800w, /images/hero-funeral-hall.webp 1500w"
                                sizes="100vw"
                                alt=""
                                width="1500"
                                height="1000"
                                fetchPriority="high"
                            />
                        </div>
                        <div className="sf-hero-copy">
                            <HeroCandle />
                            <h1 id="sf-hero-title">
                                A thoughtful farewell,
                                <br />
                                <em>arranged with care.</em>
                            </h1>
                            <p>
                                Find a mortuary, a coffin, flowers and
                                transport, or bring them together in one
                                package. Compare verified providers in Nigeria
                                and Ireland, and see the price before you book.
                            </p>
                            <div className="sf-hero-actions">
                                <a
                                    href="#sf-services"
                                    className="sf-primary sf-light"
                                >
                                    Explore services{' '}
                                    <ArrowRight aria-hidden="true" />
                                </a>
                                <button
                                    type="button"
                                    className="sf-outline"
                                    onClick={showSupport}
                                >
                                    Talk to our team{' '}
                                    <ArrowUpRight aria-hidden="true" />
                                </button>
                            </div>
                            <div className="sf-hero-notes">
                                <span>
                                    <Check aria-hidden="true" /> No account
                                    needed to browse
                                </span>
                                <span>
                                    <Check aria-hidden="true" /> Plan locally or
                                    from abroad
                                </span>
                            </div>
                        </div>
                        <div className="sf-planner-wrap">
                            <section
                                className="sf-find"
                                ref={searchSection}
                                aria-labelledby="sf-search-title"
                            >
                                <div className="sf-search-heading">
                                    <h2 id="sf-search-title">Begin planning</h2>
                                    <span>Start with the essentials.</span>
                                </div>
                                <form onSubmit={search} noValidate>
                                    <div className="sf-field">
                                        <label htmlFor="sf-service">
                                            I’m looking for
                                        </label>
                                        <Select
                                            value={service}
                                            onValueChange={setService}
                                        >
                                            <SelectTrigger
                                                id="sf-service"
                                                className="sf-select"
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="sf-theme sf-select-menu">
                                                {services.map((item) => (
                                                    <SelectItem
                                                        key={item.title}
                                                        value={item.title}
                                                    >
                                                        <item.icon aria-hidden="true" />
                                                        <span className="sf-option-label">
                                                            {item.title}
                                                        </span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <CityField
                                        city={city}
                                        onCityChange={changeCity}
                                        country={country}
                                        inputRef={cityInput}
                                        error={cityError}
                                    />
                                    <button
                                        className="sf-primary"
                                        type="submit"
                                    >
                                        Find services{' '}
                                        <ArrowRight aria-hidden="true" />
                                    </button>
                                </form>
                                <p className="sf-find-foot">
                                    <BadgeCheck aria-hidden="true" /> Your
                                    details stay private. You choose when to
                                    book.
                                </p>
                            </section>
                        </div>
                    </section>

                    <section
                        className="sf-services sf-section"
                        id="sf-services"
                        aria-labelledby="sf-services-title"
                    >
                        <div className="sf-section-heading">
                            <h2 id="sf-services-title">
                                Everything you need, in one place
                            </h2>
                            <p>
                                Arrange one part of the farewell, or bring
                                several together. Prices are shown before you
                                commit, in naira or euro.
                            </p>
                        </div>
                        <div className="sf-service-grid">
                            {services.map(
                                ({
                                    title,
                                    heading,
                                    description,
                                    action,
                                    icon: Icon,
                                }) => (
                                    <button
                                        className="sf-service-card"
                                        type="button"
                                        key={title}
                                        onClick={() => selectService(title)}
                                    >
                                        <span className="sf-service-icon">
                                            <Icon aria-hidden="true" />
                                        </span>
                                        <h3>{heading ?? title}</h3>
                                        <p>{description}</p>
                                        <span className="sf-card-link">
                                            {action}
                                            <ArrowUpRight aria-hidden="true" />
                                        </span>
                                    </button>
                                ),
                            )}
                        </div>
                    </section>
                    <section
                        className="sf-family-story sf-section"
                        aria-labelledby="sf-family-title"
                    >
                        <figure className="sf-family-photo">
                            <img
                                src="/images/family-support.webp"
                                alt="Two family members sharing a quiet moment of support at home"
                                width="1200"
                                height="800"
                                loading="lazy"
                            />
                            <figcaption>
                                <HeartHandshake aria-hidden="true" /> Support
                                for your family, near or far.
                            </figcaption>
                        </figure>
                        <div>
                            <h2 id="sf-family-title">
                                Be there for them,
                                <br />
                                <em>wherever you are.</em>
                            </h2>
                            <p>
                                If you are at home, or arranging and paying from
                                another country, you can follow the same plan.
                                See who is providing each part, what it costs,
                                and what happens next.
                            </p>
                            <button
                                className="sf-small-link"
                                type="button"
                                onClick={showSupport}
                            >
                                Ask us where to start{' '}
                                <ArrowUpRight aria-hidden="true" />
                            </button>
                        </div>
                    </section>
                    <section
                        className="sf-package-section sf-section"
                        id="sf-packages"
                        aria-labelledby="sf-packages-title"
                    >
                        <div className="sf-package-intro">
                            <h2 id="sf-packages-title">
                                Funeral packages, made simpler.
                            </h2>
                            <p>
                                Each package brings care, a coffin and transport
                                together at one rate for your city. Keep it as
                                it is, or change a part and see the new total
                                before you book.
                            </p>
                            <button
                                className="sf-small-link"
                                type="button"
                                onClick={() =>
                                    selectService('A complete funeral package')
                                }
                            >
                                Help me choose a package{' '}
                                <ArrowUpRight aria-hidden="true" />
                            </button>
                        </div>
                        <div className="sf-package-list">
                            {packages.map((item, index) => (
                                <article
                                    className="sf-package-card"
                                    key={item.title}
                                >
                                    <span className="sf-package-tier">
                                        {
                                            [
                                                'The essentials',
                                                'Family care',
                                                'Full support',
                                            ][index]
                                        }
                                    </span>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <ul>
                                        {item.features.map((feature) => (
                                            <li key={feature}>
                                                <Check aria-hidden="true" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className="sf-outline"
                                        type="button"
                                        onClick={() =>
                                            setDetail({
                                                title: item.title,
                                                description: `${item.description} Prices are confirmed with providers in your city before you book.`,
                                                items: item.features,
                                            })
                                        }
                                    >
                                        Explore package{' '}
                                        <ArrowRight aria-hidden="true" />
                                    </button>
                                </article>
                            ))}
                        </div>
                    </section>
                    <section
                        className="sf-how sf-section"
                        id="sf-how"
                        aria-labelledby="sf-how-title"
                    >
                        <h2 id="sf-how-title">
                            A few clear steps. Support along the way.
                        </h2>
                        <div className="sf-steps">
                            {steps.map((step) => (
                                <article key={step.label}>
                                    <span>{step.label}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                    <section
                        className="sf-reviews sf-section"
                        id="sf-reviews"
                        aria-labelledby="sf-reviews-title"
                    >
                        <h2 id="sf-reviews-title">
                            Trusted when it <em>matters most</em>
                        </h2>
                        <div className="sf-review-grid">
                            {reviews.map((review) => (
                                <blockquote key={review.initials}>
                                    <div
                                        className="sf-review-marks"
                                        aria-hidden="true"
                                    >
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <p>“{review.quote}”</p>
                                    <footer>
                                        <span
                                            className="sf-review-initials"
                                            aria-hidden="true"
                                        >
                                            {review.initials}
                                        </span>
                                        <span>
                                            <strong>{review.name}</strong>
                                            <span>{review.place}</span>
                                        </span>
                                    </footer>
                                </blockquote>
                            ))}
                        </div>
                    </section>
                    <section
                        className="sf-help-band"
                        aria-labelledby="sf-help-title"
                    >
                        <HeartHandshake
                            className="sf-help-flower"
                            aria-hidden="true"
                        />
                        <div>
                            <h2 id="sf-help-title">Not sure where to start?</h2>
                            <p>
                                You don’t need to have all the answers. Let’s
                                talk through the next step.
                            </p>
                        </div>
                        <button
                            className="sf-primary sf-light"
                            type="button"
                            onClick={showSupport}
                        >
                            Talk to our team <ArrowUpRight aria-hidden="true" />
                        </button>
                    </section>
                </main>
                <footer className="sf-footer">
                    <div className="sf-footer-main">
                        <div className="sf-footer-brand">
                            <a className="sf-logo" href="#sf-start">
                                <span
                                    className="sf-brand-mark"
                                    aria-hidden="true"
                                >
                                    S
                                </span>
                                Six Feet
                            </a>
                            <p>
                                Helping families in Nigeria and Ireland arrange
                                care, with the price shown before they book.
                            </p>
                        </div>
                        <nav className="sf-footer-links" aria-label="Footer">
                            <div>
                                <h2>Services</h2>
                                <button
                                    type="button"
                                    onClick={() =>
                                        selectService('Mortuary & funeral care')
                                    }
                                >
                                    Mortuary & funeral care
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        selectService(
                                            'Coffins & funeral essentials',
                                        )
                                    }
                                >
                                    Funeral essentials
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        selectService('Hearse & vehicle hire')
                                    }
                                >
                                    Hearses & family vehicles
                                </button>
                                <a href="#sf-packages">Funeral packages</a>
                            </div>
                            <div>
                                <h2>Families</h2>
                                <button type="button" onClick={scrollToSearch}>
                                    Start planning
                                </button>
                                <a href="#sf-how">How it works</a>
                                <Link href={auth.user ? dashboard() : login()}>
                                    {auth.user ? 'Your dashboard' : 'Sign in'}
                                </Link>
                                <button type="button" onClick={showSupport}>
                                    Talk to our team
                                </button>
                            </div>
                            <div>
                                <h2>Providers</h2>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setDetail({
                                            title: 'Bring your care to more families.',
                                            description:
                                                'Vendor applications will open soon. Six Feet will welcome funeral care providers, funeral essentials suppliers and vehicle operators in Nigeria and Ireland.',
                                        })
                                    }
                                >
                                    List your services
                                </button>
                            </div>
                        </nav>
                    </div>
                    <div className="sf-footer-base">
                        <span>Nigeria & Ireland</span>
                        <span>© 2026 Six Feet</span>
                    </div>
                </footer>
                <Dialog
                    open={detail !== null}
                    onOpenChange={(open) => {
                        if (!open) setDetail(null);
                    }}
                >
                    <DialogContent className="sf-theme sf-public-dialog">
                        <DialogHeader>
                            <DialogTitle>{detail?.title}</DialogTitle>
                            <DialogDescription>
                                {detail?.description}
                            </DialogDescription>
                        </DialogHeader>
                        {detail?.items && (
                            <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground">
                                {detail.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
