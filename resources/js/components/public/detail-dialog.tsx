import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { Detail } from '@/types';

export function DetailDialog({
    detail,
    onClose,
}: {
    detail: Detail | null;
    onClose: () => void;
}) {
    return (
        <Dialog
            open={detail !== null}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <DialogContent className="sf-theme sf-public-dialog">
                <DialogHeader>
                    <DialogTitle>{detail?.title}</DialogTitle>
                    <DialogDescription>{detail?.description}</DialogDescription>
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
    );
}
