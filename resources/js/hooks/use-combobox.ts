import { useState, type KeyboardEvent } from 'react';

export function useCombobox<Option>(
    options: Option[],
    onChoose: (option: Option) => void,
) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);
    const expanded = open && options.length > 0;

    function choose(option: Option) {
        onChoose(option);
        setOpen(false);
        setActive(-1);
    }

    function reopen() {
        setOpen(true);
        setActive(-1);
    }

    function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);

            if (options.length > 0) {
                const step = event.key === 'ArrowDown' ? 1 : -1;
                setActive((active + step + options.length) % options.length);
            }

            return;
        }

        if (event.key === 'Enter' && expanded && active >= 0) {
            event.preventDefault();
            choose(options[active]);

            return;
        }

        if (event.key === 'Escape' && expanded) {
            event.preventDefault();
            setOpen(false);
        }
    }

    return {
        expanded,
        active,
        setActive,
        setOpen,
        choose,
        reopen,
        onKeyDown,
    };
}
