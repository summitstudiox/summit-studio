# Summit Studio

Branding, Web Design & Development for ambitious businesses. Marketing site built with [TanStack Start](https://tanstack.com/start) (React 19), Tailwind CSS, and deployed on Vercel.

## Stack

- **Framework:** TanStack Start (file-based routing via TanStack Router, SSR via Nitro)
- **UI:** React 19, Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com) primitives (Radix UI)
- **Package manager:** [bun](https://bun.sh) — this is what both local dev and the Vercel build (`vercel.json`) use. Don't add `package-lock.json`/`yarn.lock`; they're gitignored.
- **Analytics:** Vercel Web Analytics + Speed Insights (`@vercel/analytics`, `@vercel/speed-insights`)

## Development

You need [bun](https://bun.sh) installed.

```sh
git clone <this-repository-url>
cd summit-studio
bun install
bun run dev
```

The dev server runs at `http://localhost:3000`.

## Scripts

| Command             | Description                                   |
| -------------------- | ---------------------------------------------- |
| `bun run dev`         | Start the dev server                           |
| `bun run build`       | Production build (also what Vercel runs)       |
| `bun run preview`     | Preview a production build locally             |
| `bun run lint`        | ESLint                                         |
| `bun run format`      | Prettier — writes formatting fixes in place    |
| `bunx tsc --noEmit`   | Type-check the whole project                   |

## Project structure

```
src/
  routes/            # File-based routes (TanStack Router) — index.tsx, work.tsx, work_/$slug.tsx
  components/
    home/            # Home page sections (hero, studio, work, process, FAQ, contact, footer)
    ui/              # shadcn/ui primitives
    effects/         # Predictive Arc hero background (canvas effects)
    site-header.tsx  # Shared nav/header used by the home and work-listing pages
  assets/            # Images used across routes
public/              # Static files served as-is (favicons, robots.txt, sitemap.xml, og-image.png)
```

## Deployment

Deploys via Vercel, linked to the `summitstudiox/summit-studio` GitHub repo. Pushes to `main` deploy to production; other branches get preview deployments. Build command and framework preset are pinned in `vercel.json`.
