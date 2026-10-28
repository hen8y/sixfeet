import { Flag } from '@/components/public/flag';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useMarket } from '@/hooks/use-market';

export function CountrySelect({
    onCountryChange,
}: {
    onCountryChange?: () => void;
}) {
    const { country, countries, changeCountry } = useMarket();
    const label = `Country and currency: ${country.name}, ${country.currency.name}`;
    const current = (
        <>
            <Flag country={country} />
            <span className="sf-currency-code">{country.currency.code}</span>
            <span className="sf-currency-symbol">
                {country.currency.symbol}
            </span>
        </>
    );

    if (countries.length < 2) {
        return (
            <span className="sf-country" role="img" aria-label={label}>
                <span className="sf-country-value">{current}</span>
            </span>
        );
    }

    return (
        <Select
            value={country.code}
            onValueChange={(code) => changeCountry(code, onCountryChange)}
        >
            <SelectTrigger className="sf-country" aria-label={label}>
                <SelectValue>{current}</SelectValue>
            </SelectTrigger>
            <SelectContent
                className="sf-theme sf-select-menu sf-currency-menu"
                align="end"
            >
                {countries.map((option) => (
                    <SelectItem key={option.code} value={option.code}>
                        <Flag country={option} />
                        <span className="sf-currency-name">
                            <strong>{option.name}</strong>
                            <span>
                                {option.currency.name} ·{' '}
                                {option.currency.symbol} {option.currency.code}
                            </span>
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
