import { router } from '@inertiajs/react';
import { ArrowUpRight, HeartHandshake } from 'lucide-react';
import { useState } from 'react';
import { GuidesHeroSection } from '@/components/guides/guides-hero-section';
import { TopicSection } from '@/components/guides/topic-section';
import { FaqSection } from '@/components/public/faq-section';
import { HelpBand } from '@/components/public/help-band';
import { PublicPage } from '@/components/public/public-page';
import { StepsSection } from '@/components/public/steps-section';
import { faqsFor } from '@/constants/guides/faqs';
import { firstStepsFor } from '@/constants/guides/first-steps';
import { footerColumnsFor } from '@/constants/guides/footer';
import { guideTopicsFor } from '@/constants/guides/topics';
import { supportNotice } from '@/constants/public/notices';
import { useAccountLink } from '@/hooks/use-account-link';
import { useMarket } from '@/hooks/use-market';
import { home } from '@/routes';
import type { Detail } from '@/types';

export default function Guides() {
    const { country } = useMarket();
    const account = useAccountLink();
    const [detail, setDetail] = useState<Detail | null>(null);
    const topics = guideTopicsFor(country);

    function showSupport() {
        setDetail(supportNotice);
    }

    function openGuide({ title, description, items }: Detail) {
        setDetail({ title, description, items });
    }

    return (
        <PublicPage
            page="guides"
            title="Help & advice — Six Feet"
            description={`Plain, step-by-step guidance for when someone dies in ${country.name}: certificates, registering the death, arranging a funeral, costs, repatriation and grief.`}
            action={{
                label: 'Start planning',
                onClick: () => router.visit(home.url()),
            }}
            onHelp={showSupport}
            footerColumns={footerColumnsFor({
                account,
                topics,
                onSupport: showSupport,
            })}
            detail={detail}
            onDetailClose={() => setDetail(null)}
        >
            <GuidesHeroSection
                country={country}
                topics={topics}
                onSupport={showSupport}
            />
            <StepsSection
                title="What to do when someone dies."
                steps={firstStepsFor(country)}
            />
            {topics.map((topic) => (
                <TopicSection
                    key={topic.id}
                    topic={topic}
                    onOpenGuide={openGuide}
                />
            ))}
            <FaqSection
                eyebrow="Questions"
                title="Questions families often ask"
                faqs={faqsFor(country)}
            />
            <HelpBand
                icon={HeartHandshake}
                title="Still not sure what to do next?"
                description="You don’t need to have all the answers. Our team can talk it through with you."
                action={{ label: 'Talk to our team', onClick: showSupport }}
                actionIcon={ArrowUpRight}
            />
        </PublicPage>
    );
}
