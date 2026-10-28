import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    CarFront,
    Check,
    PackageCheck,
    Flower2,
    HeartHandshake,
    House,
    MapPin,
    Menu,
    ReceiptText,
    X,
} from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { dashboard, login } from '@/routes';

type Country = 'ng' | 'ie';
type Detail = { title: string; description: string; items?: string[] };

const countries = {
    ng: {
        name: 'Nigeria',
        currency: 'NGN',
        cities: ['Lagos', 'Abuja', 'Port Harcourt'],
    },
    ie: {
        name: 'Ireland',
        currency: 'EUR',
        cities: ['Dublin', 'Cork', 'Galway'],
    },
};

const services = [
    {
        title: 'Mortuary & funeral care',
        description:
            'Find local care and a trusted team to help with arrangements.',
        action: 'Find a provider',
        icon: House,
    },
    {
        title: 'Coffins & funeral essentials',
        heading: 'Funeral essentials',
        description:
            'Coffins, flowers and thoughtful details for a personal farewell.',
        action: 'Find funeral essentials',
        icon: Flower2,
    },
    {
        title: 'Hearse & vehicle hire',
        heading: 'Hearses & family vehicles',
        description:
            'Arrange transport for your loved one and the people coming together.',
        action: 'Explore vehicle hire',
        icon: CarFront,
    },
    {
        title: 'A complete funeral package',
        heading: 'Funeral packages',
        description:
            'Bring care, funeral essentials and transport together in one coordinated arrangement.',
        action: 'Explore packages',
        icon: PackageCheck,
    },
];

const packages = [
    {
        title: 'Essential',
        description: 'The basic services for a simple farewell.',
        features: [
            'Mortuary care',
            'A simple coffin',
            'Local hearse transport',
        ],
    },
    {
        title: 'Standard Family',
        description: 'The essentials, with more support for your family.',
        features: [
            'Mortuary care and preparation',
            'A mid-range coffin',
            'A hearse and family vehicle',
        ],
    },
    {
        title: 'Complete Service',
        description: 'A fuller arrangement, with someone by your side.',
        features: [
            'The Standard Family essentials',
            'Additional ceremony services',
            'A named case manager',
        ],
    },
];

const steps = [
    {
        label: '01 / FIND',
        title: 'Choose the care you need.',
        description:
            'Explore local providers, services and prices at your own pace.',
    },
    {
        label: '02 / ARRANGE',
        title: 'Book with clarity.',
        description:
            'Review the details and full cost before making a commitment.',
    },
    {
        label: '03 / STAY CLOSE',
        title: 'Know what happens next.',
        description:
            'Follow your booking, get updates and reach out whenever you need help.',
    },
];

export default function Welcome() {
    const { auth } = usePage().props;
    const [country, setCountry] = useState<Country>('ng');
    const [service, setService] = useState(services[0].title);
    const [city, setCity] = useState('');
    const [detail, setDetail] = useState<Detail | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const cityInput = useRef<HTMLInputElement>(null);
    const searchSection = useRef<HTMLElement>(null);
    const market = countries[country];

    function scrollToSearch() {
        searchSection.current?.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                .matches
                ? 'instant'
                : 'smooth',
            block: 'center',
        });
        cityInput.current?.focus({ preventScroll: true });
    }

    function selectService(title: string) {
        setService(title);
        scrollToSearch();
    }

    function search(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
                    href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Poppins:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content="Find funeral care, essentials and family transport in Nigeria and Ireland. Clear options, thoughtful support and a helping hand with what comes next."
                />
            </Head>
            <div id="sf-home">
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
                <header className="sf-header">
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
                        <label>
                            <span className="sf-sr">
                                Your country and currency
                            </span>
                            <select
                                value={country}
                                onChange={(event) => {
                                    setCountry(event.target.value as Country);
                                    setCity('');
                                }}
                            >
                                <option value="ng">Nigeria · NGN</option>
                                <option value="ie">Ireland · EUR</option>
                            </select>
                        </label>
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
                            Start planning <ArrowRight aria-hidden="true" />
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
                            {menuOpen ? (
                                <X aria-hidden="true" />
                            ) : (
                                <Menu aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    {menuOpen && (
                        <nav
                            className="sf-mobile-nav"
                            id="sf-mobile-nav"
                            aria-label="Mobile navigation"
                        >
                            <a
                                href="#sf-services"
                                onClick={() => setMenuOpen(false)}
                            >
                                Find a service
                            </a>
                            <a
                                href="#sf-packages"
                                onClick={() => setMenuOpen(false)}
                            >
                                Our packages
                            </a>
                            <a
                                href="#sf-how"
                                onClick={() => setMenuOpen(false)}
                            >
                                How it works
                            </a>
                            <Link href={auth.user ? dashboard() : login()}>
                                Family space
                            </Link>
                        </nav>
                    )}
                </header>
                <main id="main-content">
                    <div className="sf-assurance">
                        <span>
                            <BadgeCheck aria-hidden="true" />
                            Verified service providers
                        </span>
                        <span>
                            <ReceiptText aria-hidden="true" />
                            Clear prices, before you book
                        </span>
                        <span>
                            <HeartHandshake aria-hidden="true" />A person to
                            turn to
                        </span>
                    </div>
                    <section
                        className="sf-hero"
                        id="sf-start"
                        aria-labelledby="sf-hero-title"
                    >
                        <div className="sf-hero-copy">
                            <div className="sf-eyebrow">
                                <span /> Complete funeral services
                            </div>
                            <h1 id="sf-hero-title">
                                A thoughtful farewell,
                                <br />
                                <em>arranged with care.</em>
                            </h1>
                            <p>
                                From finding local care to bringing the
                                essentials together. Explore funeral services in
                                Nigeria and Ireland, with clear choices and
                                support at every step.
                            </p>
                            <div className="sf-hero-actions">
                                <a href="#sf-services" className="sf-primary">
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
                            <div className="sf-planner-label">
                                <span /> YOUR NEXT STEP, MADE CLEARER
                            </div>
                            <section
                                className="sf-find"
                                ref={searchSection}
                                aria-labelledby="sf-search-title"
                            >
                                <div className="sf-search-heading">
                                    <h2 id="sf-search-title">Begin planning</h2>
                                    <span>Start with the essentials.</span>
                                </div>
                                <form onSubmit={search}>
                                    <label htmlFor="sf-service">
                                        <span>I’m looking for</span>
                                        <select
                                            id="sf-service"
                                            value={service}
                                            onChange={(event) =>
                                                setService(event.target.value)
                                            }
                                        >
                                            {services.map((item) => (
                                                <option key={item.title}>
                                                    {item.title}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label htmlFor="sf-city">
                                        <span>In or around</span>
                                        <span className="sf-location">
                                            <MapPin aria-hidden="true" />
                                            <input
                                                id="sf-city"
                                                ref={cityInput}
                                                value={city}
                                                onChange={(event) =>
                                                    setCity(event.target.value)
                                                }
                                                placeholder="Enter a city or area"
                                                required
                                                maxLength={100}
                                                autoComplete="address-level2"
                                                list="sf-cities"
                                            />
                                            <datalist id="sf-cities">
                                                {market.cities.map(
                                                    (location) => (
                                                        <option
                                                            key={location}
                                                            value={location}
                                                        />
                                                    ),
                                                )}
                                            </datalist>
                                        </span>
                                    </label>
                                    <button
                                        className="sf-primary"
                                        type="submit"
                                    >
                                        Find services{' '}
                                        <ArrowRight aria-hidden="true" />
                                    </button>
                                </form>
                                <div className="sf-popular">
                                    <span>Try a city:</span>
                                    {market.cities.map((location) => (
                                        <button
                                            key={location}
                                            type="button"
                                            onClick={() => {
                                                setCity(location);
                                                cityInput.current?.focus();
                                            }}
                                        >
                                            {location}
                                        </button>
                                    ))}
                                </div>
                            </section>
                            <p className="sf-planner-foot">
                                <BadgeCheck aria-hidden="true" /> Your details
                                stay private. You choose when to book.
                            </p>
                        </div>
                    </section>

                    <section
                        className="sf-services sf-section"
                        id="sf-services"
                        aria-labelledby="sf-services-title"
                    >
                        <div className="sf-section-heading">
                            <div>
                                <div className="sf-eyebrow">
                                    Find what you need
                                </div>
                                <h2 id="sf-services-title">
                                    Everything you need, in one place
                                </h2>
                            </div>
                            <p>
                                Arrange one service or bring several together.
                                Start with what your family needs.
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
                            <div className="sf-eyebrow">
                                For family, near and far
                            </div>
                            <h2 id="sf-family-title">
                                Be there for them,
                                <br />
                                <em>wherever you are.</em>
                            </h2>
                            <p>
                                Whether you’re nearby or making arrangements
                                from abroad, keep the services, people and next
                                steps together in one place.
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
                            <div className="sf-eyebrow">
                                Prefer everything arranged together?
                            </div>
                            <h2 id="sf-packages-title">
                                Funeral packages, made simpler.
                            </h2>
                            <p>
                                Bring the essentials together in one coordinated
                                package, with clear inclusions and a team to
                                help.
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
                                                description:
                                                    'Package contents and prices will be confirmed with participating providers in your city before booking.',
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
                        <div className="sf-eyebrow">How Six Feet works</div>
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
                    <a className="sf-logo" href="#sf-start">
                        Six Feet
                    </a>
                    <p>Helping families arrange care with confidence.</p>
                    <span>Nigeria & Ireland</span>
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
                        For service providers{' '}
                        <ArrowUpRight aria-hidden="true" />
                    </button>
                </footer>
                <Dialog
                    open={detail !== null}
                    onOpenChange={(open) => {
                        if (!open) setDetail(null);
                    }}
                >
                    <DialogContent className="sf-public-dialog">
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
