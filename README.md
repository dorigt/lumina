# Lumina

**Lumina** is a mobile-first installable habit tracker (PWA). Track daily or monthly habits, check in each day, and see a calm monthly overview with motivational quotes — all stored locally in your browser.

To rename the app, edit [`src/branding.ts`](src/branding.ts) (`APP_NAME`, `APP_TAGLINE`, colors). Keep `LOCAL_STORAGE_KEY` unless you intentionally want to reset saved habits. Update [`index.html`](index.html) title and meta tags to match.

Home-screen icons (`public/pwa-*.png`, `apple-touch-icon.png`) are generated from the Lumina glow design in [`scripts/generate-app-icons.mjs`](scripts/generate-app-icons.mjs). After editing that script, run `npm run icons`.

## Quick start

The repo includes an [`.npmrc`](.npmrc) with `legacy-peer-deps=true` so `npm install` stays compatible with **Vite 8** and **vite-plugin-pwa**’s peer range.

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Preview serves the built app so you can verify the service worker and offline behavior.

## Share with someone on another Wi‑Fi (public link)

Your Mac’s `localhost` or `192.168.x.x` URL only works on **your** network. To give anyone a link that works **anywhere**, deploy the **built** site (`dist/`) to a free host. Each person gets a **fresh, empty app** (no habits): data stays only in their own browser, not yours.

1. Push this project to **GitHub** (or use the folder with Git in Netlify/Vercel).
2. Pick one host and connect the repo (or drag-and-drop the `dist` folder where supported):

### Vercel (simple)

1. Sign in at [https://vercel.com](https://vercel.com) → **Add New** → **Project** → import the repo.  
2. Framework: **Vite** (or Other); **Build command:** `npm run build`; **Output directory:** `dist`.  
3. Deploy. Open the `https://….vercel.app` link and share that URL.

[`vercel.json`](vercel.json) tells Vercel to serve `index.html` for client routes (`/today`, `/habits`, etc.).

### Netlify

1. [https://app.netlify.com](https://app.netlify.com) → **Add new site** → import from Git, or drag the **`dist`** folder after running `npm run build` locally.  
2. If using Git, set build command `npm run build` and publish directory `dist` (see [`netlify.toml`](netlify.toml)).  
3. [`public/_redirects`](public/_redirects) is copied into `dist` so deep links work.

After deploy, send them the **https** link (iMessage, WhatsApp, email, QR code—anything that opens on their phone).

### For the person you share with (phone only — no computer needed)

They do **not** need a laptop. The whole app runs in the **phone browser**:

1. They tap your **`https://…`** link on their phone.  
2. **iPhone:** it should open in **Safari** for the best experience. If it opens inside Messages, Mail, or Instagram, tap **Open in Safari** (or share icon → Open in Safari).  
3. **Android:** open the link in **Chrome** if another browser opens first.  
4. They use Lumina right in the browser, or choose **Add to Home Screen** / **Install app** if they want an icon (optional).

Their habits stay on **their** phone only; they never need to visit the site from a desktop.

## Install on your phone

### iPhone (Safari)

1. Open the deployed or preview URL in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**.
3. Launch **Lumina** from your home screen for a full-screen app experience.

### Android (Chrome)

1. Open the site in **Chrome**.
2. Tap the menu (**⋮**) and choose **Install app** or **Add to Home screen** (wording varies by version).

Data lives in **local storage** on that device; clearing site data will reset habits. There is no cloud account in this version.

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript  
- [Tailwind CSS](https://tailwindcss.com/) v4  
- [React Router](https://reactrouter.com/), [Zustand](https://github.com/pmndrs/zustand) (persisted), [date-fns](https://date-fns.org/)  
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) for the web app manifest and service worker  

## Project structure (high level)

- `src/branding.ts` — app name, tagline, PWA colors, storage key.  
- `src/features/habits` — create, edit, delete habits (daily vs monthly target).  
- `src/features/today` — per-day check-in toggles and quote on completion.  
- `src/features/progress` — month navigation, streaks, averages, heat-style dots.  
- `src/store/habitStore.ts` — persisted app state.  
- `src/data/quotes.json` — offline motivational quotes.  

Enjoy the rhythm.
