import type { ReactNode, Ref } from 'react';
import { DetailDialog } from '@/components/public/detail-dialog';
import { PublicFooter } from '@/components/public/public-footer';
import { PublicHead } from '@/components/public/public-head';
import { PublicHeader } from '@/components/public/public-header';
import { publicNavLinks, publicRootId } from '@/constants/public/navigation';
import { usePublicPage } from '@/hooks/use-public-page';
import { home } from '@/routes';
import type {
    Detail,
    FooterColumn,
    PublicAction,
    PublicPageName,
} from '@/types';

export function PublicPage({
    page,
    title,
    description,
    action,
    onHelp,
    onCountryChange,
    footerColumns,
    footerRef,
    detail,
    onDetailClose,
    afterFooter,
    children,
}: {
    page: PublicPageName;
    title: string;
    description: string;
    action: PublicAction;
    onHelp: () => void;
    onCountryChange?: () => void;
    footerColumns: FooterColumn[];
    footerRef?: Ref<HTMLElement>;
    detail: Detail | null;
    onDetailClose: () => void;
    afterFooter?: ReactNode;
    children: ReactNode;
}) {
    const homeHref = page === 'home' ? '#sf-start' : home.url();

    usePublicPage(publicRootId);

    return (
        <>
            <PublicHead title={title} description={description} />
            <div id={publicRootId} className="sf-theme">
                <a className="sf-skip-link" href="#main-content">
                    Skip to content
                </a>
                <PublicHeader
                    homeHref={homeHref}
                    links={publicNavLinks(page)}
                    onCountryChange={onCountryChange}
                    action={action}
                    onHelp={onHelp}
                />
                <main id="main-content">{children}</main>
                <PublicFooter
                    ref={footerRef}
                    homeHref={homeHref}
                    columns={footerColumns}
                />
                {afterFooter}
                <DetailDialog detail={detail} onClose={onDetailClose} />
            </div>
        </>
    );
}
