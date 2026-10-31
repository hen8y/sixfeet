import { ArrowUpRight, HeartHandshake } from 'lucide-react';
import { useRef, useState } from 'react';
import { FamilyStorySection } from '@/components/home/family-story-section';
import { GuidesSection } from '@/components/home/guides-section';
import { PackagesSection } from '@/components/home/packages-section';
import { ProvidersSection } from '@/components/home/providers-section';
import { ReviewsSection } from '@/components/home/reviews-section';
import { SupportSection } from '@/components/home/support-section';
import { FaqSection } from '@/components/public/faq-section';
import { HelpBand } from '@/components/public/help-band';
import { PublicPage } from '@/components/public/public-page';
import { StepsSection } from '@/components/public/steps-section';
import { ServiceNavTabs } from '@/components/services/service-nav-tabs';
import { ServiceTabSection } from '@/components/services/service-tab-section';
import { ServicesHeroSection } from '@/components/services/services-hero-section';
import { faqsFor } from '@/constants/home/faqs';
import { footerColumnsFor } from '@/constants/home/footer';
import { guidesFor } from '@/constants/home/guides';
import {
    packageNotice,
    providerApplicationNotice,
    searchNotice,
    serviceNotice,
} from '@/constants/home/notices';
import { basicPackage } from '@/constants/home/packages';
import { stepsFor } from '@/constants/home/steps';
import { supportNotice } from '@/constants/public/notices';
import { tabForService } from '@/constants/services/tabs';
import { useAccountLink } from '@/hooks/use-account-link';
import { useMarket } from '@/hooks/use-market';
import { useServiceTabs } from '@/hooks/use-service-tabs';
import { glideToElement, glideToTop } from '@/lib/smooth-scroll';
import type { Detail, ServiceId, ServiceTab, ServiceTabId } from '@/types';

export default function Services() {
    const { country, countries, changeCountry } = useMarket();
    const account = useAccountLink();
    const [detail, setDetail] = useState<Detail | null>(null);
    const hero = useRef<HTMLElement>(null);
    const serviceTabs = useServiceTabs(setDetail);
    const guides = guidesFor(country);

    function glideToHero() {
        if (hero.current) {
            glideToElement(hero.current);
        }
    }

    function showSupport() {
        setDetail(supportNotice);
    }

    function showProviderApplication() {
        setDetail(providerApplicationNotice(countries));
    }

    function openGuide({ title, description, items }: Detail) {
        setDetail({ title, description, items });
    }

    function openTab(id: ServiceTabId) {
        serviceTabs.changeTab(id);
        glideToTop();
    }

    function openTabCard({ id, href }: ServiceTab) {
        if (!href) {
            openTab(id);
        }
    }

    function selectService(id: ServiceId) {
        openTab(tabForService(id));
    }

    function browseCity(code: string, city: string) {
        const place = countries.find((option) => option.code === code);
        const showCity = () => {
            if (place) {
                setDetail(
                    searchNotice(serviceTabs.tab.searchLabel, city, place),
                );
            }
        };

        if (code === country.code) {
            showCity();
        } else {
            changeCountry(code, showCity);
        }
    }

    return (
        <PublicPage
            page="services"
            title="Services — Six Feet"
            description={`Choose the funeral services you need in ${country.name}, from a mortuary, vault, hearse and coffin to repatriation, fundraising and more. Prices are shown before you book.`}
            action={{ label: 'Start planning', onClick: glideToHero }}
            onHelp={showSupport}
            headerTabs={
                <ServiceNavTabs
                    tabs={serviceTabs.tabs}
                    current={serviceTabs.tab.id}
                    onChange={openTab}
                />
            }
            footerColumns={footerColumnsFor({
                account,
                guides,
                onSelectService: selectService,
                onStartPlanning: glideToHero,
                onOpenGuide: openGuide,
                onSupport: showSupport,
                onApply: showProviderApplication,
            })}
            detail={detail}
            onDetailClose={() => setDetail(null)}
        >
            <ServicesHeroSection serviceTabs={serviceTabs} sectionRef={hero} />
            <ServiceTabSection
                serviceTabs={serviceTabs}
                onOpenTab={openTabCard}
                onOpenOtherService={(service) =>
                    setDetail(serviceNotice(service))
                }
                onExploreBasicPackage={() =>
                    setDetail(packageNotice(basicPackage))
                }
                onBrowseCity={browseCity}
            />
            <FamilyStorySection onSupport={showSupport} />
            <PackagesSection
                collapsed={!['all', 'other'].includes(serviceTabs.tab.id)}
                onHelpChoose={() => openTab('other')}
                onExplore={(item) => setDetail(packageNotice(item))}
            />
            <StepsSection
                title="A few clear steps. Support along the way."
                steps={stepsFor(country)}
            />
            <SupportSection onSupport={showSupport} />
            <ReviewsSection />
            <GuidesSection guides={guides} onOpenGuide={openGuide} />
            <FaqSection
                eyebrow="Questions"
                title="Questions families often ask"
                faqs={faqsFor(country)}
            />
            <ProvidersSection onApply={showProviderApplication} />
            <HelpBand
                icon={HeartHandshake}
                title="Not sure where to start?"
                description="You don’t need to have all the answers. Let’s talk through the next step."
                action={{ label: 'Talk to our team', onClick: showSupport }}
                actionIcon={ArrowUpRight}
            />
        </PublicPage>
    );
}
