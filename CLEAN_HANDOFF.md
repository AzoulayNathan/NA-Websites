# NA Websites — Original Visual Clean / Latest Handoff

## Direction locked

- The **original NA Websites visual identity remains the source of truth**.
- Original opening, showroom wall, rooms, palette shifts, seams, motion, editorial typography and asymmetric layouts are preserved.
- Professional copy/tone remains locked: **NA Websites / by Nathan Azoulay** and **Websites with structure. Interfaces with atmosphere.**
- No generic portfolio-grid redesign.

## Latest corrections

### Process + Freelance merged

`/process` is now the single coherent page for both the working method and freelance collaboration:

1. Process hero
2. Method timeline
3. Method by project type
4. Deliverables
5. **Work together** section
   - availability
   - three collaboration modes
   - three selected proof projects
   - working stack
   - final contact CTA

The old `/freelance` route is retained only as a compatibility redirect to `/process#work-together`, so there is no duplicated page/content.

### Empty / weak visual zones fixed

- **Home — “One studio frame. Different digital worlds.”** now uses enriched real project assets instead of base placeholder paths.
- **Home — Business scene inside Selected Work** keeps all three screenshots visible; the active frame is emphasized instead of hiding the other two.
- **Work hero** keeps the original map/diagram language but now contains four real project screenshots, layered as a gallery composition.
- Hero/showroom project windows and the Adaptive Studio visual are clickable and open the dedicated case-study page.

### Home process strip

The progress rail, step dots and final arrow now share one visual axis. The strip stays in the original style but reads as one coherent timeline.

### Contact

Project-type choices now keep distinct but restrained visual themes:

- Business Website — olive / service
- Product & Brand — terracotta / warm
- Web Apps & Interfaces — blue / interface
- Experimental / Signature — deep green / cinematic
- Freelance / Contract — warm sand / amber

The page background and side rail follow the selected theme as well.

Changing the project type updates only the query string and **does not scroll the page back to the top**. Global scroll restoration now reacts to actual page changes, not query-string changes.

## Portfolio

Exactly **12 projects**, with **3 per territory**:

1. Business Websites
   - Atelier Nova Habitat
   - Maison Oria Vet & Care
   - Maison Loria
2. Product & Brand Websites
   - DRFuel
   - DROPDROP
   - Volta Mare Energy
3. Web Apps & Interfaces
   - Questline
   - Dilemma Royale
   - Peerless
4. Experimental / Signature
   - Dreams
   - LumenVault Archives
   - NA Studio Portfolio

Every project opens a dedicated case-study route at `/work/:slug`.

## Removed / kept clean

- all plumber/plumbing routes, components, assets, previews, translations and scripts
- `.git`, `node_modules`, `dist`, workspaces and historical generated reports from the deliverable
- standalone duplicated Freelance page

## Quality checks

- ESLint: PASS
- TypeScript/JSDoc: PASS
- Tailwind compilation: PASS
- internal imports: PASS
- selected project proof assets: PASS
- portfolio count: 12 total / 3 per territory
- plumber/plumbing source search: 0 references

A full Vite production build is not executed in this Linux sandbox because the original dependency archive contains Windows npm optional binaries and is missing the Linux Rollup native package. Run `npm ci && npm run build` on the target development/deployment environment to install the correct native dependencies.
