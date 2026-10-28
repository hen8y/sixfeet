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
    MessageCircle,
    Phone,
    Plus,
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
    type ReactNode,
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
type LineArtName =
    | 'document'
    | 'lily'
    | 'plane'
    | 'coins'
    | 'heart'
    | 'phone'
    | 'chat'
    | 'globe';

/**
 * Support contacts stay null until the business confirms its numbers and
 * staffed hours; until then the contact buttons open the support dialog.
 */
type SupportContact = {
    phone: string | null;
    whatsapp: string | null;
    hours: string | null;
};

const countries = {
    ng: {
        name: 'Nigeria',
        regionCode: 'ng',
        locale: 'en-NG',
        currency: 'NGN',
        currencyName: 'Nigerian naira',
        symbol: '₦',
        flag: ['#008751', '#ffffff', '#008751'],
        cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu'],
        browseCities: [
            'Lagos',
            'Abuja',
            'Port Harcourt',
            'Ibadan',
            'Enugu',
            'Benin City',
            'Owerri',
            'Kano',
            'Abeokuta',
            'Uyo',
        ],
        support: { phone: null, whatsapp: null, hours: null },
    },
    ie: {
        name: 'Ireland',
        regionCode: 'ie',
        locale: 'en-IE',
        currency: 'EUR',
        currencyName: 'Euro',
        symbol: '€',
        flag: ['#169b62', '#ffffff', '#ff883e'],
        cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'],
        browseCities: [
            'Dublin',
            'Cork',
            'Galway',
            'Limerick',
            'Waterford',
            'Kilkenny',
            'Sligo',
            'Athlone',
            'Drogheda',
            'Letterkenny',
        ],
        support: { phone: null, whatsapp: null, hours: null },
    },
} satisfies Record<
    Country,
    {
        name: string;
        regionCode: string;
        locale: string;
        currency: string;
        currencyName: string;
        symbol: string;
        flag: [string, string, string];
        cities: string[];
        browseCities: string[];
        support: SupportContact;
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

/**
 * `fromPrice` is the lowest package rate in minor units (kobo or cent). Leave
 * it null until providers have confirmed a rate for that country.
 */
const packages: Array<{
    title: string;
    tier: string;
    description: string;
    features: string[];
    fromPrice: Record<Country, number | null>;
}> = [
    {
        title: 'Essential',
        tier: 'The essentials',
        fromPrice: { ng: null, ie: null },
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
        tier: 'Family care',
        fromPrice: { ng: null, ie: null },
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
        tier: 'Full support',
        fromPrice: { ng: null, ie: null },
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

/**
 * Illustrative stories, labelled as such on the page. Replace them with
 * reviews from verified bookings once families have used the service.
 */
const reviews = [
    {
        quote: 'When Dad died I didn’t know where to begin. Seeing the funeral director, the coffin and the car with one total made each decision feel possible.',
        name: 'Ciarán',
        initials: 'C',
        place: 'Dublin',
    },
    {
        quote: 'I live in Dublin and my mother’s funeral was in Enugu. I could follow every part of the plan from here, without a dozen calls home.',
        name: 'Adaeze',
        initials: 'A',
        place: 'Dublin, arranging in Enugu',
    },
    {
        quote: 'We changed the coffin in our package and saw the new price straight away. Nothing on the day surprised us.',
        name: 'Sinéad',
        initials: 'S',
        place: 'Cork',
    },
];

const navLinks = [
    ['#sf-services', 'Find a service'],
    ['#sf-packages', 'Our packages'],
    ['#sf-guides', 'Help & advice'],
    ['#sf-providers', 'For providers'],
];

const supportDesks: Array<{
    title: string;
    description: string;
    country: Country | null;
    art: LineArtName;
}> = [
    {
        title: 'Families in Nigeria',
        description:
            'For mortuary care, funeral essentials and transport in the cities we serve across Nigeria.',
        country: 'ng',
        art: 'phone',
    },
    {
        title: 'Families in Ireland',
        description:
            'For funeral directors, essentials and transport in the cities we serve across Ireland.',
        country: 'ie',
        art: 'chat',
    },
    {
        title: 'Arranging from abroad',
        description:
            'For family in the UK, the US or anywhere else, planning a farewell at home.',
        country: null,
        art: 'globe',
    },
];

const guides: Array<Detail & { summary: string; art: LineArtName }> = [
    {
        title: 'When someone dies in Nigeria',
        summary: 'The first steps, from the certificate to the mortuary.',
        art: 'document',
        description:
            'These are the usual first steps. Requirements differ between states and local governments, so check with the hospital or your local registry.',
        items: [
            'Ask the hospital or doctor for a medical certificate of the cause of death.',
            'If the death was sudden or unexpected, the police may need to be told first.',
            'Choose a mortuary to care for your loved one while the family plans.',
            'Register the death with the National Population Commission to get a death certificate.',
            'Check whether your state or local government needs a burial permit.',
        ],
    },
    {
        title: 'When someone dies in Ireland',
        summary: 'Who to call first, and how to register the death.',
        art: 'lily',
        description:
            'These are the usual first steps. A funeral director can guide you through each of them.',
        items: [
            'If the death happens at home, call the person’s GP or an out-of-hours doctor. In an emergency, call 112 or 999.',
            'A doctor completes the medical certificate of the cause of death. A sudden or unexplained death is reported to the coroner.',
            'Choose a funeral director to care for your loved one.',
            'Register the death with a Civil Registration Service office, within three months.',
            'Order copies of the death certificate for banks, insurers and the estate.',
        ],
    },
    {
        title: 'Bringing someone home',
        summary: 'Moving a loved one between Ireland and Nigeria.',
        art: 'plane',
        description:
            'Repatriation takes careful paperwork, and requirements vary by airline and embassy, so a specialist funeral director usually arranges it. Booking repatriation through Six Feet is coming later.',
        items: [
            'In Ireland, the coroner must be told before a body is taken out of the State.',
            'The death is registered and certified copies of the certificate are prepared.',
            'Your loved one is embalmed and placed in a sealed coffin approved for air travel.',
            'The embassy or high commission may need to clear the documents.',
            'The airline confirms the flight, and family are told where to meet it.',
        ],
    },
    {
        title: 'Paying for a funeral',
        summary: 'What affects the cost, and sharing it with family.',
        art: 'coins',
        description:
            'The cost depends on your city, the provider and what you choose. On Six Feet you see the full price of each part, or one total for a package, before you book.',
        items: [
            'Care and preparation, the coffin and transport are usually the largest costs.',
            'A package brings them together at one rate for your city.',
            'Ask what is included, and whether anything is paid on the day.',
            'In Ireland, families on a low income may qualify for an Exceptional Needs Payment towards funeral costs.',
        ],
    },
    {
        title: 'Grief and support',
        summary: 'Looking after yourself and the people around you.',
        art: 'heart',
        description:
            'There is no right way to grieve. These are a few things families find helpful in the first weeks.',
        items: [
            'Let others help with meals, calls and errands.',
            'Share tasks across the family, so no one carries everything.',
            'Keep documents and receipts together in one place.',
            'If grief feels too heavy, talk to your doctor or a bereavement service.',
        ],
    },
];

const faqs = [
    {
        question: 'Is Six Feet a funeral director?',
        answer: 'No. Six Feet is a marketplace. Verified local providers carry out the care, the transport and the funeral itself. We help you find them, compare prices and book, and we stay on hand if something goes wrong.',
    },
    {
        question: 'How are providers verified?',
        answer: 'Each provider applies with their business details and documents. Our team reviews them before the provider can be listed, and a listing can be suspended if standards slip.',
    },
    {
        question: 'How much does a funeral cost?',
        answer: 'It depends on your city, the provider and what you choose. Every listing shows the full price before you book, and a package shows one total in naira or euro.',
    },
    {
        question: 'Do I need an account?',
        answer: 'No. You can browse, compare and book without one. After you book, you can create an account to follow the arrangement in one place.',
    },
    {
        question: 'Can I arrange a funeral from another country?',
        answer: 'Yes. Many families arrange care at home while living abroad. You can follow the same plan from anywhere and pay online, with prices in the provider’s currency.',
    },
    {
        question: 'Can you help bring someone home from Ireland to Nigeria?',
        answer: 'Booking repatriation through Six Feet is coming later. Until then, our guide explains the usual steps, and our team can point you in the right direction.',
    },
    {
        question: 'Who do I contact if something goes wrong?',
        answer: 'Contact your provider first. You can also reach our team by phone or WhatsApp, and we will help put it right.',
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

/** Line drawings in the candle's hand, with a single bronze detail each. */
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
            <path className="sf-art-accent" d="M8 58c10-4 38-4 48 0" />
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
                className="sf-art-accent"
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
            <path className="sf-art-accent" d="M6 52c12 8 40 8 52-6" />
        </>
    ),
};

function LineArt({ name }: { name: LineArtName }) {
    return (
        <svg className="sf-line-art" viewBox="0 0 64 64" aria-hidden="true">
            {lineArt[name]}
        </svg>
    );
}

type ContactAction = { href?: string; onClick?: () => void };

function ContactButton({
    action,
    className,
    children,
}: {
    action: ContactAction;
    className: string;
    children: ReactNode;
}) {
    if (action.href) {
        const external = action.href.startsWith('https:');

        return (
            <a
                className={className}
                href={action.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
            >
                {children}
            </a>
        );
    }

    return (
        <button className={className} type="button" onClick={action.onClick}>
            {children}
        </button>
    );
}

function formatPrice(amountInMinorUnits: number, country: Country) {
    const market = countries[country];

    return new Intl.NumberFormat(market.locale, {
        style: 'currency',
        currency: market.currency,
        maximumFractionDigits: 0,
    }).format(amountInMinorUnits / 100);
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
    const [showDock, setShowDock] = useState(false);
    const header = useRef<HTMLElement>(null);
    const footer = useRef<HTMLElement>(null);
    const cityInput = useRef<HTMLInputElement>(null);
    const searchButton = useRef<HTMLButtonElement>(null);
    const searchSection = useRef<HTMLElement>(null);
    const market = countries[country];
    const marketOrder: Country[] =
        country === 'ng' ? ['ng', 'ie'] : ['ie', 'ng'];

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

    /** The phone dock appears once the planner has scrolled away, and steps aside for the footer. */
    useEffect(() => {
        const planner = searchSection.current;
        const pageFooter = footer.current;

        if (!planner || !pageFooter) {
            return;
        }

        let pastPlanner = false;
        let atFooter = false;
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === planner) {
                    pastPlanner =
                        !entry.isIntersecting &&
                        entry.boundingClientRect.top < 0;
                } else {
                    atFooter = entry.isIntersecting;
                }
            }

            setShowDock(pastPlanner && !atFooter);
        });

        observer.observe(planner);
        observer.observe(pageFooter);

        return () => observer.disconnect();
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

    /** Picks a city from the browse list and hands over to the planner's search button. */
    function browseCity(code: Country, name: string) {
        setCountry(code);
        changeCity(name);

        if (searchSection.current) {
            glideToElement(searchSection.current, 'center');
        }

        searchButton.current?.focus({ preventScroll: true });
    }

    function showSupport() {
        setDetail({
            title: 'A helping hand, when you need it.',
            description:
                'Our team’s local contact details and opening hours will be available here when Six Feet launches. You’ll be able to reach us by phone or WhatsApp.',
        });
    }

    function openGuide({ title, description, items }: Detail) {
        setDetail({ title, description, items });
    }

    function showProviderApplication() {
        setDetail({
            title: 'Bring your care to more families.',
            description:
                'Vendor applications will open soon. Six Feet will welcome funeral care providers, funeral essentials suppliers and vehicle operators in Nigeria and Ireland.',
        });
    }

    /** A direct phone or WhatsApp link once a number is confirmed, otherwise the support dialog. */
    function contactAction(
        contact: SupportContact,
        channel: 'phone' | 'whatsapp',
    ): ContactAction {
        const number = contact[channel];

        if (!number) {
            return { onClick: showSupport };
        }

        return channel === 'phone'
            ? { href: `tel:${number}` }
            : { href: `https://wa.me/${number.replace(/\D/g, '')}` };
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
                        {navLinks.map(([href, label]) => (
                            <a key={href} href={href}>
                                {label}
                            </a>
                        ))}
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
                            {navLinks.map(([href, label]) => (
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
                                <em>from home or abroad.</em>
                            </h1>
                            <p>
                                Arrange a mortuary, a coffin, flowers and
                                transport in Nigeria or Ireland, whether you are
                                close by or a flight away. Compare verified
                                providers and see the price before you book.
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
                                    className="sf-hero-link"
                                    onClick={showSupport}
                                >
                                    Or talk to our team{' '}
                                    <ArrowUpRight aria-hidden="true" />
                                </button>
                            </div>
                            <div className="sf-hero-notes">
                                <span>
                                    <Check aria-hidden="true" /> No account
                                    needed to browse
                                </span>
                                <span>
                                    <Check aria-hidden="true" /> Prices in naira
                                    or euro
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
                                        ref={searchButton}
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
                        <div
                            className="sf-city-browse"
                            aria-labelledby="sf-cities-title"
                            role="group"
                        >
                            <div className="sf-city-intro">
                                <span className="sf-eyebrow">
                                    Browse by city
                                </span>
                                <h3 id="sf-cities-title">
                                    Or start with your city
                                </h3>
                                <p>
                                    Pick a city to see verified providers
                                    nearby. Arranging from abroad? Choose the
                                    city where the funeral will be.
                                </p>
                                <button
                                    className="sf-small-link"
                                    type="button"
                                    onClick={scrollToSearch}
                                >
                                    Search another city or area{' '}
                                    <ArrowUpRight aria-hidden="true" />
                                </button>
                            </div>
                            <div className="sf-city-cards">
                                {marketOrder.map((code) => (
                                    <article
                                        className="sf-city-card"
                                        key={code}
                                        data-active={code === country}
                                    >
                                        <header>
                                            <Flag country={code} />
                                            <span>
                                                <strong>
                                                    {countries[code].name}
                                                </strong>
                                                <span>
                                                    {
                                                        countries[code]
                                                            .browseCities.length
                                                    }{' '}
                                                    cities ·{' '}
                                                    {countries[code].currency}
                                                </span>
                                            </span>
                                        </header>
                                        <ul>
                                            {countries[code].browseCities.map(
                                                (name) => (
                                                    <li key={name}>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                browseCity(
                                                                    code,
                                                                    name,
                                                                )
                                                            }
                                                        >
                                                            {name}
                                                            <ArrowRight aria-hidden="true" />
                                                        </button>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </article>
                                ))}
                            </div>
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
                            {packages.map((item) => (
                                <article
                                    className="sf-package-card"
                                    key={item.title}
                                >
                                    <span className="sf-package-tier">
                                        {item.tier}
                                    </span>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <div className="sf-package-price">
                                        {item.fromPrice[country] === null ? (
                                            <>
                                                <span>
                                                    Price for {market.name}
                                                </span>
                                                <strong>
                                                    Confirmed by city before you
                                                    book
                                                </strong>
                                            </>
                                        ) : (
                                            <>
                                                <span>From</span>
                                                <strong>
                                                    {formatPrice(
                                                        item.fromPrice[country],
                                                        country,
                                                    )}
                                                </strong>
                                            </>
                                        )}
                                    </div>
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
                        className="sf-people sf-section"
                        id="sf-people"
                        aria-labelledby="sf-people-title"
                    >
                        <div className="sf-section-heading">
                            <span className="sf-eyebrow">Real support</span>
                            <h2 id="sf-people-title">
                                A person to talk to, by phone or WhatsApp
                            </h2>
                            <p>
                                You don’t have to work it out alone. Our team
                                can explain your options, check a price or help
                                you take the next step.
                            </p>
                        </div>
                        <div className="sf-desk-grid">
                            {supportDesks.map((desk) => {
                                const contact =
                                    countries[desk.country ?? country].support;

                                return (
                                    <article
                                        className="sf-desk"
                                        key={desk.title}
                                    >
                                        <LineArt name={desk.art} />
                                        <h3>{desk.title}</h3>
                                        <p>{desk.description}</p>
                                        <div className="sf-desk-actions">
                                            <ContactButton
                                                className="sf-outline"
                                                action={contactAction(
                                                    contact,
                                                    'phone',
                                                )}
                                            >
                                                <Phone aria-hidden="true" />
                                                Call
                                            </ContactButton>
                                            <ContactButton
                                                className="sf-outline"
                                                action={contactAction(
                                                    contact,
                                                    'whatsapp',
                                                )}
                                            >
                                                <MessageCircle aria-hidden="true" />
                                                WhatsApp
                                            </ContactButton>
                                        </div>
                                        <span className="sf-desk-hours">
                                            {contact.hours ??
                                                'Opening hours shared at launch'}
                                        </span>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                    <section
                        className="sf-reviews sf-section"
                        id="sf-reviews"
                        aria-labelledby="sf-reviews-title"
                    >
                        <h2 id="sf-reviews-title">
                            Made for the moments <em>that matter most</em>
                        </h2>
                        <p className="sf-review-note">
                            Illustrative stories. Reviews from verified bookings
                            will appear here once families have used Six Feet.
                        </p>
                        <div className="sf-review-grid">
                            {reviews.map((review) => (
                                <blockquote key={review.name}>
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
                        className="sf-guides sf-section"
                        id="sf-guides"
                        aria-labelledby="sf-guides-title"
                    >
                        <div className="sf-guides-intro">
                            <span className="sf-eyebrow">Help & advice</span>
                            <h2 id="sf-guides-title">
                                What to do,
                                <br />
                                <em>one step at a time.</em>
                            </h2>
                            <p>
                                Plain guidance for the first days, written for
                                families in Nigeria, in Ireland and abroad.
                            </p>
                        </div>
                        <ul className="sf-guide-list">
                            {guides.map((guide) => (
                                <li key={guide.title}>
                                    <button
                                        type="button"
                                        onClick={() => openGuide(guide)}
                                    >
                                        <LineArt name={guide.art} />
                                        <span>
                                            <strong>{guide.title}</strong>
                                            <span>{guide.summary}</span>
                                        </span>
                                        <ArrowRight aria-hidden="true" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section
                        className="sf-faq sf-section"
                        id="sf-faq"
                        aria-labelledby="sf-faq-title"
                    >
                        <div className="sf-section-heading">
                            <span className="sf-eyebrow">Questions</span>
                            <h2 id="sf-faq-title">
                                Questions families often ask
                            </h2>
                        </div>
                        <div className="sf-faq-list">
                            {faqs.map((faq) => (
                                <details key={faq.question}>
                                    <summary>
                                        {faq.question}
                                        <Plus aria-hidden="true" />
                                    </summary>
                                    <p>{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </section>
                    <section
                        className="sf-providers sf-section"
                        id="sf-providers"
                        aria-labelledby="sf-providers-title"
                    >
                        <div className="sf-provider-panel">
                            <div>
                                <span className="sf-eyebrow">
                                    For providers
                                </span>
                                <h2 id="sf-providers-title">
                                    Bring your care to more families.
                                </h2>
                                <p>
                                    Mortuaries, funeral directors, essentials
                                    suppliers and vehicle operators in Nigeria
                                    and Ireland can apply to join Six Feet.
                                </p>
                                <button
                                    className="sf-primary"
                                    type="button"
                                    onClick={showProviderApplication}
                                >
                                    Apply to list your services{' '}
                                    <ArrowRight aria-hidden="true" />
                                </button>
                            </div>
                            <ul>
                                <li>
                                    <Check aria-hidden="true" /> Reach families
                                    in your city and those arranging from abroad
                                </li>
                                <li>
                                    <Check aria-hidden="true" /> Show your
                                    services and prices clearly
                                </li>
                                <li>
                                    <Check aria-hidden="true" /> Receive
                                    bookings and payments online
                                </li>
                                <li>
                                    <Check aria-hidden="true" /> Stand out as a
                                    verified provider
                                </li>
                            </ul>
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
                <footer className="sf-footer" ref={footer}>
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
                                <h2>Help & advice</h2>
                                {guides.map((guide) => (
                                    <button
                                        key={guide.title}
                                        type="button"
                                        onClick={() => openGuide(guide)}
                                    >
                                        {guide.title}
                                    </button>
                                ))}
                                <a href="#sf-faq">Questions families ask</a>
                            </div>
                            <div>
                                <h2>Providers</h2>
                                <button
                                    type="button"
                                    onClick={showProviderApplication}
                                >
                                    List your services
                                </button>
                                <a href="#sf-providers">Why join Six Feet</a>
                            </div>
                        </nav>
                    </div>
                    <div className="sf-footer-base">
                        <span>Nigeria & Ireland</span>
                        <span>© 2026 Six Feet</span>
                    </div>
                </footer>
                <div
                    className="sf-dock"
                    data-visible={showDock}
                    inert={!showDock}
                >
                    <button
                        className="sf-primary"
                        type="button"
                        onClick={scrollToSearch}
                    >
                        <MapPin aria-hidden="true" /> Find services near you
                    </button>
                    <button
                        className="sf-dock-help"
                        type="button"
                        aria-label="Talk to our team"
                        onClick={showSupport}
                    >
                        <MessageCircle aria-hidden="true" />
                    </button>
                </div>
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
