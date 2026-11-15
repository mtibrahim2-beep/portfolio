# Mohammad Tauhid Ibrahim — portfolio

Personal portfolio site. Next.js (App Router), TypeScript, Tailwind CSS v4, lucide-react.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

| What | Where |
|---|---|
| All site copy and CV facts | `src/content/profile.ts` |
| Sections | `src/components/` |
| Colors, fonts, base styles | `src/app/globals.css` |
| SEO metadata, fonts | `src/app/layout.tsx` |
| Downloadable CV | `public/Mohammad-Tauhid-Ibrahim-CV.pdf` |
| Design system notes | `design-system/tauhid-ibrahim/` (`pages/home.md` overrides `MASTER.md`) |

To update the site after a CV change: replace the PDF in `public/`, edit `src/content/profile.ts`, and set `siteUpdated` to the current month.

## Deploy (Vercel)

Push this repo to GitHub, then import it at vercel.com → Add New → Project. Vercel detects Next.js; no settings or environment variables are needed.
