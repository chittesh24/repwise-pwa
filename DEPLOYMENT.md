# Repwise PWA — free deployment guide

This app is a static Progressive Web App. It does not need a server, account system, paid API, Mac, Swift, or an Apple Developer membership. A free static-host plan is sufficient for a personal deployment, subject to the provider’s current plan and usage limits. Hosting providers can change free-plan terms, so check the current plan before deploying.

## What is in this first build

Implemented in the app: workout and set/repetition/load logging; cardio duration; previous exercise performance; basic PR tracking; volume and a configurable 7-day/30-day/365-day training score; workout volume chart; 11-muscle tracker with weekly sets, sessions, last-trained date, and estimated recovery status; soreness/fatigue check-ins; weekly workout target and days; adherence; goals; body weight, measurements, and bodyweight trend; local progress photos; exercise library with equipment, primary/secondary muscles, technique notes, common mistakes, alternatives, and level guidance; rest timer; offline cache; local-first storage; CSV workout export; JSON backup export; dark mode; print-friendly progress report; FitNotes/CSV import preview.

Known limitations: the exercise demonstration panel is a placeholder and needs actual licensed video/animation assets. Imported FitNotes CSV column formats should be verified against your own export before relying on them; review the preview before importing. Import currently combines exercise rows on the same date into one session. Body measurements currently cover waist, chest, shoulders, arm, thigh, and calf; height and separate arm/thigh/calf sides can be added later. Browser reminders are preferences only; reliable iOS background reminders need a native notification-capable wrapper or server. Local browser storage is not synced and can be cleared by the browser; use JSON backup regularly. The training score is a simple activity index, not a validated measure of strength or health.

## Deploy free using GitHub Pages

1. Create or sign in to a GitHub account at [github.com](https://github.com/).
2. Create a new **public** repository, for example `repwise-pwa`. A public repository is needed for free GitHub Pages on the standard free plan.
3. In the repository page, choose **Add file → Upload files**.
4. Upload every file inside this `outputs` folder (`index.html`, `styles.css`, `app.js`, `extras.js`, `sw.js`, `manifest.webmanifest`, and `icon.svg`) into the repository root. Do not upload the parent `outputs` folder itself.
5. Commit the uploaded files to the repository’s `main` branch.
6. Open **Settings → Pages** in the repository.
7. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
8. Select branch **main** and folder **/(root)**, then click **Save**.
9. Wait for the Pages deployment to finish. GitHub will show the site address, usually `https://YOUR-USERNAME.github.io/repwise-pwa/`.
10. Open that HTTPS address in Safari on the iPhone. Tap **Share → Add to Home Screen → Add**. Launch Repwise from its Home Screen icon.
11. Keep a copy of the original files and periodically use **Settings → Export full backup JSON**. On iPhone, save the download to Files or another location you control.

## Updating the app

Edit the local project files, upload the changed files to the same repository, and commit to `main`. On the iPhone, close and reopen the installed web app while online. The service worker caches the app shell for offline use and updates its cache when the deployment changes.

## FitNotes import check

Before importing your full history, export a small sample from FitNotes, open **Library → Import history**, select the export, and check the preview’s dates, exercise names, weight, and reps. If the values or columns do not match, cancel the import and keep the file; the parser needs to be adjusted to that export format. Make a JSON backup before a large import.

## First use on iPhone

- Add a workout and a few sets, save it, then reopen the app to confirm the session is still present.
- Add cardio, body weight, and a recovery check-in.
- Visit Progress, Muscles, and Plan to review charts and totals.
- Export a CSV and JSON backup once to verify both download paths.
- Enable airplane mode after the app has loaded once to confirm offline startup and logging.

## Free-tier scope

GitHub Pages can serve this static site without a paid backend or app-store publication. The free-host terms, bandwidth limits, and availability are controlled by GitHub and may change. The app has no paid services built in, but backups remain your responsibility. It is a home-screen web app, not an App Store native iOS binary.

## iPhone Safari troubleshooting

1. First open the published address in Safari: `https://chittesh24.github.io/repwise-pwa/`. The trailing slash matters for this GitHub Pages project path.
2. If Safari says it cannot find the server, check **GitHub → repwise-pwa → Settings → Pages** and confirm Pages is enabled for the `main` branch and root folder. Wait for the Pages deployment status to complete before retrying.
3. If a blank or old version opens, Safari may still hold the previous service-worker cache. On iPhone open **Settings → Safari → Advanced → Website Data**, search for `github.io`, remove the site data, then reopen the address. This removes local browser data for GitHub Pages sites, so export a JSON backup first if this device already contains workouts.
4. Confirm the page loads in Safari before using **Share → Add to Home Screen**. Opening the Pages URL does not require installing the PWA.
5. If it still fails, note the exact Safari error message and whether the URL works on another network. That distinguishes a Pages deployment problem from a device/network restriction.

The service worker cache has been versioned to `repwise-v2`; after publishing these changes, a normal reload should download the new shell and clear the earlier Repwise cache.
