# Clemman Ghana — React site

A single-page React site (Vite) for Clemman Ghana, built to be deployed on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Build for production

```bash
npm run build
```

Outputs a static site to `dist/`.

## Deploy on Vercel

1. Push this folder to a GitHub repo (or use Vercel's drag-and-drop for a folder).
2. In Vercel: **Add New → Project** → import the repo.
3. Vercel auto-detects Vite. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Click **Deploy**.
5. Once live, go to **Settings → Domains** to attach a custom domain.

## Project structure

```
clemman-react/
  index.html          — HTML shell, loads fonts + the React app
  package.json
  vite.config.js
  public/
    images/            — sector + hero photos, served as static assets
  src/
    main.jsx           — React entry point
    App.jsx            — full page content
    App.css            — all page styling
```
