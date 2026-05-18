# NA Websites

Premium adaptive web showroom — local business, brand websites, SaaS interfaces and signature concepts.

Part of [NA Studio](https://na-studio.pages.dev/).

## Stack

- React 18 + Vite
- React Router
- Tailwind CSS
- Framer Motion

## Local development

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run build   # production build
npm run lint    # ESLint
npm run preview # preview production build
```

## Languages

English (default), French and Spanish via the navbar switcher or `?lang=fr` / `?lang=es`.

## Deploy on Cloudflare Pages

**Important:** deploy the **build output**, not the source folder.

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20 |

Without `npm run build`, the site serves `/src/main.jsx` and shows a white screen.

Connect the GitHub repo and set these in **Workers & Pages → your project → Settings → Builds**.  
Or use the included GitHub Action (requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets).

## License

Private portfolio — Nathan Azoulay / NA Studio.
