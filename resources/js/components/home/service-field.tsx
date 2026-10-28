import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { services } from '@/constants/home/services';

export function ServiceField({
    service,
    onServiceChange,
}: {
    service: string;
    onServiceChange: (service: string) => void;
}) {
    return (
        <div className="sf-field">
            <label htmlFor="sf-service">I’m looking for</label>
            <Select value={service} onValueChange={onServiceChange}>
                <SelectTrigger id="sf-service" className="sf-select">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="sf-theme sf-select-menu">
                    {services.map((item) => (
                        <SelectItem key={item.title} value={item.title}>
                            <item.icon aria-hidden="true" />
                            <span className="sf-option-label">
                                {item.title}
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
