import { ArrowRight, HeartHandshake } from 'lucide-react';
import { useState } from 'react';
import { FundFlowSection } from '@/components/fundraising/fund-flow-section';
import { FundraisingHeroSection } from '@/components/fundraising/fundraising-hero-section';
import { FaqSection } from '@/components/public/faq-section';
import { FeatureSection } from '@/components/public/feature-section';
import { HelpBand } from '@/components/public/help-band';
import { PublicPage } from '@/components/public/public-page';
import { StepsSection } from '@/components/public/steps-section';
import { exampleFundraisers } from '@/constants/fundraising/example-fundraisers';
import { faqsFor } from '@/constants/fundraising/faqs';
import { featuresFor } from '@/constants/fundraising/features';
import { footerColumnsFor } from '@/constants/fundraising/footer';
import { startFundraiserNotice } from '@/constants/fundraising/notices';
import { steps } from '@/constants/fundraising/steps';
import { supportNotice } from '@/constants/public/notices';
import { useAccountLink } from '@/hooks/use-account-link';
import { useMarket } from '@/hooks/use-market';
import type { Detail } from '@/types';

export default function Fundraising() {
    const { country } = useMarket();
    const account = useAccountLink();
    const [detail, setDetail] = useState<Detail | null>(null);
    const example = exampleFundraisers[country.code] ?? exampleFundraisers.NG;

    function startFundraiser() {
        setDetail(startFundraiserNotice);
    }

    function showSupport() {
        setDetail(supportNotice);
    }

    return (
        <PublicPage
            page="fundraising"
            title="Funeral fundraising — Six Feet"
            description={`Raise money for a funeral in ${country.name}. Verified organisers, gifts from anywhere, and funds that can pay providers directly, with a spending report donors can see.`}
            action={{ label: 'Start a fundraiser', onClick: startFundraiser }}
            onHelp={showSupport}
            footerColumns={footerColumnsFor({
                account,
                onStart: startFundraiser,
                onSupport: showSupport,
            })}
            detail={detail}
            onDetailClose={() => setDetail(null)}
        >
            <FundraisingHeroSection
                country={country}
                example={example}
                onStart={startFundraiser}
            />
            <FeatureSection
                id="sf-fund-features"
                title="More than a donation page"
                description="Six Feet fundraising is tied to the farewell itself, so gifts become care, not just a balance in someone’s account."
                features={featuresFor(country)}
            />
            <StepsSection
                title="Three steps, with us beside you."
                steps={steps}
            />
            <FundFlowSection country={country} example={example} />
            <FaqSection
                title="Questions about fundraising"
                faqs={faqsFor(country)}
            />
            <HelpBand
                icon={HeartHandshake}
                title="Start a fundraiser when you are ready."
                description={`Worried about the cost today? Our team can talk you through your options in ${country.name}.`}
                action={{
                    label: 'Start a fundraiser',
                    onClick: startFundraiser,
                }}
                actionIcon={ArrowRight}
            />
        </PublicPage>
    );
}
