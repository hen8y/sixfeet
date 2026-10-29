import { ArrowUpRight, Plane } from 'lucide-react';
import { useState } from 'react';
import { AssuranceBar } from '@/components/public/assurance-bar';
import { FaqSection } from '@/components/public/faq-section';
import { FeatureSection } from '@/components/public/feature-section';
import { HelpBand } from '@/components/public/help-band';
import { PublicPage } from '@/components/public/public-page';
import { StepsSection } from '@/components/public/steps-section';
import { CostsSection } from '@/components/repatriation/costs-section';
import { DirectionsSection } from '@/components/repatriation/directions-section';
import { DocumentsSection } from '@/components/repatriation/documents-section';
import { RepatriationHeroSection } from '@/components/repatriation/repatriation-hero-section';
import { supportNotice } from '@/constants/public/notices';
import { assurances } from '@/constants/repatriation/assurances';
import { directionsFor } from '@/constants/repatriation/directions';
import {
    exampleCases,
    milestonesFor,
} from '@/constants/repatriation/example-cases';
import { faqs } from '@/constants/repatriation/faqs';
import { footerColumnsFor } from '@/constants/repatriation/footer';
import { handled } from '@/constants/repatriation/handled';
import { requestQuoteNotice } from '@/constants/repatriation/notices';
import { steps } from '@/constants/repatriation/steps';
import { useAccountLink } from '@/hooks/use-account-link';
import { useMarket } from '@/hooks/use-market';
import type { Detail } from '@/types';

export default function Repatriation() {
    const { country } = useMarket();
    const account = useAccountLink();
    const [detail, setDetail] = useState<Detail | null>(null);
    const example = exampleCases[country.code] ?? exampleCases.NG;

    function requestQuote() {
        setDetail(requestQuoteNotice);
    }

    function showSupport() {
        setDetail(supportNotice);
    }

    return (
        <PublicPage
            page="repatriation"
            title="Repatriation — Six Feet"
            description={`Bring a loved one home, or take them home from ${country.name}. A named case manager, itemised quotes from repatriation partners, and every document and milestone in one place.`}
            action={{ label: 'Request a quote', onClick: requestQuote }}
            onHelp={showSupport}
            footerColumns={footerColumnsFor({
                account,
                onRequestQuote: requestQuote,
                onSupport: showSupport,
            })}
            detail={detail}
            onDetailClose={() => setDetail(null)}
        >
            <AssuranceBar
                label="How Six Feet repatriation works"
                assurances={assurances}
            />
            <RepatriationHeroSection
                country={country}
                example={example}
                milestones={milestonesFor(example)}
                onRequestQuote={requestQuote}
                onSupport={showSupport}
            />
            <DirectionsSection directions={directionsFor(country)} />
            <FeatureSection
                id="sf-rep-handled"
                title="Every part of the journey, taken care of"
                description="Your repatriation partner looks after the practical work. Your case manager makes sure nothing is missed."
                features={handled}
            />
            <StepsSection
                title="Three steps, with one person beside you."
                steps={steps}
            />
            <DocumentsSection />
            <CostsSection />
            <FaqSection title="Questions about repatriation" faqs={faqs} />
            <HelpBand
                icon={Plane}
                title="Someone has died far from home?"
                description="Our team can tell you what to do first, even before repatriation opens on Six Feet."
                action={{ label: 'Talk to our team', onClick: showSupport }}
                actionIcon={ArrowUpRight}
            />
        </PublicPage>
    );
}
