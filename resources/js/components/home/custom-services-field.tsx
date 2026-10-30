import { Check, CircleAlert } from 'lucide-react';
import type { RefObject } from 'react';
import { services } from '@/constants/home/services';
import type { ServiceId } from '@/types';

export function CustomServicesField({
    chosen,
    onToggle,
    fieldRef,
    error,
}: {
    chosen: ServiceId[];
    onToggle: (id: ServiceId) => void;
    fieldRef: RefObject<HTMLFieldSetElement | null>;
    error: string | null;
}) {
    return (
        <fieldset
            className="sf-field sf-service-picker"
            ref={fieldRef}
            aria-describedby={error ? 'sf-service-error' : undefined}
        >
            <legend>Choose everything you need</legend>
            <div className="sf-service-options">
                {services.map(({ id, title, icon: Icon }) => (
                    <label key={id} className="sf-service-option">
                        <input
                            type="checkbox"
                            checked={chosen.includes(id)}
                            onChange={() => onToggle(id)}
                        />
                        <span className="sf-service-option-icon">
                            <Icon aria-hidden="true" />
                        </span>
                        <span className="sf-service-option-label">{title}</span>
                        <span className="sf-service-option-tick">
                            <Check aria-hidden="true" />
                        </span>
                    </label>
                ))}
            </div>
            {error && (
                <p className="sf-field-error" id="sf-service-error">
                    <CircleAlert aria-hidden="true" />
                    {error}
                </p>
            )}
        </fieldset>
    );
}
