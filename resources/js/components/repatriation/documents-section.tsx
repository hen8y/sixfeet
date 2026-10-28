import { CheckList } from '@/components/public/check-list';
import { LineArt } from '@/components/public/line-art';
import { SectionHeading } from '@/components/public/section-heading';
import {
    arrangedDocuments,
    familyDocuments,
} from '@/constants/repatriation/documents';

export function DocumentsSection() {
    return (
        <section
            className="sf-rep-documents sf-section"
            id="sf-rep-documents"
            aria-labelledby="sf-rep-documents-title"
        >
            <SectionHeading
                id="sf-rep-documents-title"
                title="What you will usually need"
            >
                Requirements depend on the route, the airline and the embassy.
                Your case manager confirms your list, and documents are uploaded
                privately.
            </SectionHeading>
            <div className="sf-rep-doc-panel">
                <div>
                    <h3>
                        <LineArt name="document" />
                        From the family
                    </h3>
                    <CheckList items={familyDocuments} />
                </div>
                <div>
                    <h3>
                        <LineArt name="shield" />
                        Arranged with your partner
                    </h3>
                    <CheckList items={arrangedDocuments} />
                </div>
            </div>
        </section>
    );
}
