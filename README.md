# NA Websites

Portfolio / digital showroom by Nathan Azoulay.

**Websites with structure. Interfaces with atmosphere.**

This version preserves the original NA Websites visual language — opening sequence, editorial showroom, room-based Work experience, palette shifts, seams, motion and typography — while cleaning the project and making it stronger for portfolio and freelance use.

## Portfolio structure

12 projects, 3 per territory:

- **Business Websites** — Atelier Nova Habitat, Maison Oria Vet & Care, Maison Loria
- **Product & Brand Websites** — DRFuel, DROPDROP, Volta Mare Energy
- **Web Apps & Interfaces** — Questline, Dilemma Royale, Peerless
- **Experimental / Signature** — Dreams, LumenVault Archives, NA Studio Portfolio

Every project opens a dedicated case-study route at `/work/:slug`.

## Main routes

- `/` — original visual homepage/showroom
- `/work` — original room-based portfolio, reorganized around 4 territories
- `/work/:slug` — dedicated project case study
- `/services` — capabilities
- `/process` — process + freelance collaboration in one coherent page
- `/freelance` — compatibility redirect to `/process#work-together`
- `/about` — Nathan / NA Websites
- `/contact` — themed brief/contact room

## Stack

React 18 · Vite · React Router · Tailwind CSS · Framer Motion

## Local development

```bash
npm ci
npm run dev
```

Checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Contact endpoint (optional)

The UI works without email infrastructure: if `/api/contact` is unavailable or not configured, it falls back to a prefilled email.

For Cloudflare Pages + Resend, configure:

```text
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
```

Never commit real secrets.

## Cloudflare Pages

Build command: `npm run build`  
Output directory: `dist`  
Node: 20+

Private portfolio — Nathan Azoulay / NA Studio.
