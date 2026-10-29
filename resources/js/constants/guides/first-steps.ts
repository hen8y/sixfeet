import type { Country, Step } from '@/types';

const registration: Record<string, string> = {
    NG: 'Take the medical certificate to the National Population Commission to register the death and get a death certificate. Ask whether your state also needs a burial permit.',
    IE: 'Register the death at any Civil Registration Service office within three months, and order copies of the death certificate.',
};

export function firstStepsFor(country: Country): Step[] {
    return [
        {
            label: '01 / CERTIFY',
            title: 'Get the medical certificate.',
            description:
                'A doctor confirms the death and writes the medical certificate of the cause of death. If the death was sudden or unexplained, the police or coroner may need to be told first.',
        },
        {
            label: '02 / REGISTER',
            title: 'Register the death.',
            description:
                registration[country.code] ??
                'Register the death with the local registry and order copies of the death certificate.',
        },
        {
            label: '03 / ARRANGE',
            title: 'Arrange the funeral.',
            description:
                'Choose a mortuary or funeral director to care for your loved one, then plan the farewell with family when you are ready.',
        },
    ];
}
