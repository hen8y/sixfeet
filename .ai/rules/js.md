---
paths:
    - 'resources/js/**'
---

# Js

## No comments unless necessary

Don't add comments or JSDoc that restate what the code, names or types already say. Only comment a non-obvious reason (a workaround, a browser quirk, a business constraint the code can't express). Keep them to one line.

## Keep pages thin; put code where it belongs

A page file only composes sections and wires page-level state. Don't define data, helpers, hooks or sub-components inside it.

- Static content, data arrays and lookup maps → `resources/js/constants/<area>/<concept>.ts`, one concept per file (e.g. `constants/home/services.ts`). Content that varies by country stays there as a builder (`faqsFor(country)`).
- Pure logic and utilities (formatters, maths, URL builders) → `resources/js/lib/<name>.ts`.
- Hooks (`useX`, effects, observers) → `resources/js/hooks/use-<name>.ts`.
- Components → `resources/js/components/<area>/<name>.tsx`, one exported component per file; page sections go in `components/<page>/<section>-section.tsx`.
- Types → `resources/js/types/<area>.ts`, re-exported from `types/index.ts`.
- Shared public-site pieces (page shell, section heading, FAQ, steps, check list) live in `components/public/`; reuse them instead of repeating markup.
  Before adding something, reuse an existing component, hook or helper if one fits.
