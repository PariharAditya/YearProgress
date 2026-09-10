# Year Progress

Year Progress is an installable React PWA that turns the current local year into a calm, useful dashboard. It shows year, quarter, month, week, and day progress, a day matrix, in-app widget previews, milestones, and an ambient OLED view.

## Development

```bash
npm install
npm run dev
```

The app uses the device's local calendar. Monday is the first day of the week, the current day counts as in progress, and derived time metrics are never persisted. Settings and milestones are stored in `localStorage` through one typed hook.

## Checks

```bash
npm run test
npm run lint
npm run build
npm run preview
```

The date utility suite covers leap years, Monday week boundaries, quarter boundaries, calendar-day counts, and percentage clamping.

## PWA behavior

The production app registers `public/service-worker.js`, caches the app shell, and serves `public/offline.html` when navigation cannot reach the network. Chromium browsers expose the native install prompt through the Install tab; other browsers show their manual install guidance.

The Widgets tab contains configurable in-app layout previews. Installing the PWA adds an app shortcut, not a native Android launcher widget. Real launcher widgets require a separate Capacitor or TWA Android wrapper with a native `AppWidgetProvider`.
