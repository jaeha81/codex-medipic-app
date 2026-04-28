# medipic handoff

This repository contains the current in-progress medipic frontend and supporting demo artifacts.

## Current app state

- The live Next.js app runs from `src/app`.
- The main page at `src/app/page.tsx` has been actively modified to benchmark a more editorial, product-first landing flow.
- The current root route `/` is **not yet split** from the existing page. It is the active working surface.
- The user requested a stronger benchmark match where the four categories become four separate full-screen product sections stacked vertically:
  - weight
  - hair
  - women health / menopause
  - skincare
- The user also requested that the hero CTA buttons (`Start with LINE`, `Start Now`) be removed from the first viewport so the product/category content becomes the primary focus.

## Important files

- `AGENTS.md`: local instructions for working in this repo
- `CLAUDE.md`: points back to `AGENTS.md`
- `src/app/page.tsx`: current root page entry
- `src/components/landing/Hero.tsx`: current hero implementation that still shows the four categories together
- `src/components/landing/CategoryCards.tsx`: current category cards with example product options
- `src/components/landing/HowItWorks.tsx`: process section
- `src/data/productExamples.ts`: example product/therapy data added for the four categories
- `demo/`: preview screenshots and standalone materials used during iteration

## Current visual direction

- Green-led palette
- More premium photo-driven cards
- Flash/shine hover effect and light motion on category surfaces
- Example product blocks added inside category cards

## What still needs to happen

1. Remove the CTA-first hero structure from the top of `/`
2. Turn the four categories into vertically stacked full-screen sections
3. Make each category occupy most or all of one viewport height
4. Preserve product examples inside each section
5. Keep the existing intake flow links working

## Run locally

```bash
npm install
npm run dev -- --port 3001
```

Then open:

```text
http://localhost:3001/
```

## Notes

- `origin` in the original local repo points to a different GitHub repository.
- For handoff, this state is intended to be pushed to a separate repository:
  - `https://github.com/jaeha81/codex-medipic-app.git`
