import { ArrowUpRight, HeartHandshake } from 'lucide-react';
import { useRef, useState } from 'react';
import { FamilyStorySection } from '@/components/home/family-story-section';
import { GuidesSection } from '@/components/home/guides-section';
import { HeroSection } from '@/components/home/hero-section';
import { MobileDock } from '@/components/home/mobile-dock';
import { PackagesSection } from '@/components/home/packages-section';
import { ProvidersSection } from '@/components/home/providers-section';
import { ReviewsSection } from '@/components/home/reviews-section';
import { ServicesSection } from '@/components/home/services-section';
import { SupportSection } from '@/components/home/support-section';
import { FaqSection } from '@/components/public/faq-section';
import { HelpBand } from '@/components/public/help-band';
import { PublicPage } from '@/components/public/public-page';
import { StepsSection } from '@/components/public/steps-section';
import { faqsFor } from '@/constants/home/faqs';
import { footerColumnsFor } from '@/constants/home/footer';
import { guidesFor } from '@/constants/home/guides';
import {
    packageNotice,
    providerApplicationNotice,
} from '@/constants/home/notices';
import { basicPackage } from '@/constants/home/packages';
import { packageService } from '@/constants/home/services';
import { stepsFor } from '@/constants/home/steps';
import { supportNotice } from '@/constants/public/notices';
import { useAccountLink } from '@/hooks/use-account-link';
import { useDockVisibility } from '@/hooks/use-dock-visibility';
import { useMarket } from '@/hooks/use-market';
import { usePlanner } from '@/hooks/use-planner';
import type { Detail } from '@/types';

export default function Welcome() {
    const { country, countries } = useMarket();
    const account = useAccountLink();
    const [detail, setDetail] = useState<Detail | null>(null);
    const planner = usePlanner(setDetail);
    const footer = useRef<HTMLElement>(null);
    const showDock = useDockVisibility(planner.section, footer);
    const guides = guidesFor(country);

    function showSupport() {
        setDetail(supportNotice);
    }

    function showProviderApplication() {
        setDetail(providerApplicationNotice(countries));
    }

    function openGuide({ title, description, items }: Detail) {
        setDetail({ title, description, items });
    }

    return (
        <PublicPage
            page="home"
            title="Six Feet — Funeral care, one step at a time"
            description={`Find a verified mortuary, coffin, flowers and transport in ${country.name}, or bring them together in one package. Prices are shown before you book.`}
            action={{ label: 'Start planning', onClick: planner.focus }}
            onHelp={showSupport}
            onCountryChange={planner.resetCity}
            footerRef={footer}
            footerColumns={footerColumnsFor({
                account,
                guides,
                onSelectService: planner.selectService,
                onStartPlanning: planner.focus,
                onOpenGuide: openGuide,
                onSupport: showSupport,
                onApply: showProviderApplication,
            })}
            detail={detail}
            onDetailClose={() => setDetail(null)}
            afterFooter={
                <MobileDock
                    visible={showDock}
                    onFindServices={planner.focus}
                    onSupport={showSupport}
                />
            }
        >
            <HeroSection planner={planner} onSupport={showSupport} />
            <ServicesSection
                view={planner.view}
                customServices={planner.customServices}
                chosenServices={planner.chosenServices}
                onSelectService={planner.selectService}
                onExploreBasicPackage={() =>
                    setDetail(packageNotice(basicPackage))
                }
                onBrowseCity={planner.browseCity}
                onSearchOther={planner.focus}
            />
            <FamilyStorySection onSupport={showSupport} />
            <PackagesSection
                collapsed={
                    !planner.chosenServices.some(
                        ({ id }) => id === packageService,
                    )
                }
                onHelpChoose={() => planner.selectService(packageService)}
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
