import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { CondolenceArt } from '@/components/public/condolence-art';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { guides } from '@/routes';

export function WelcomeDialog({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            <DialogContent
                className="sf-theme sf-public-dialog sf-welcome-dialog"
                onOpenAutoFocus={(event) => event.preventDefault()}
            >
                <CondolenceArt />
                <DialogTitle>We’re so sorry for your loss.</DialogTitle>
                <DialogDescription>
                    Losing someone is hard, and the days that follow can feel
                    overwhelming. You don’t have to work everything out at once.
                </DialogDescription>
                <p className="sf-welcome-question">
                    Do you know where to start, or would a{' '}
                    <span className="sf-nowrap">step-by-step</span> guide help?
                </p>
                <div className="sf-welcome-actions">
                    <Link
                        className="sf-welcome-primary"
                        href={guides.url()}
                        onClick={onClose}
                    >
                        Show me the guides <ArrowRight aria-hidden="true" />
                    </Link>
                    <button
                        className="sf-welcome-secondary"
                        type="button"
                        onClick={onClose}
                    >
                        I know where to start
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
