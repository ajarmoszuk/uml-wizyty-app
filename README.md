# uml-wizyty

A fast, human-friendly interface for booking appointments at the Łódź City Office (Urząd Miasta Łodzi). The official platform at [wizyty.uml.lodz.pl](https://wizyty.uml.lodz.pl) works, but is slow, unintuitive, and returns API responses that include gems like:

```json
"ANALYZE": "5 - 5 = 0, CZYLI WYTWORZYŁ 0 DŁUGU"
```

This wrapper talks to the same servers and does the same thing — just without making you suffer.

---

## Features

- **All Łódź services** — vehicles, driver's licences, ID cards, civil registry, taxes, business, and more (~65 services across 10 categories)
- **Grid & list views** — toggle between a visual card grid and a compact list
- **Dark mode** — follows your system preference, toggleable manually
- **Three languages** — Polish 🇵🇱, English 🇬🇧, Ukrainian 🇺🇦
- **Accessible** — ARIA labels, keyboard navigation, focus management, `prefers-reduced-motion` support
- **No data collected** — your personal details go directly to `wizyty.uml.lodz.pl` and nowhere else

## Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- No UI library — plain CSS variables and inline styles
- Custom i18n (no external library)
- CORS handled by Vite's dev proxy; in production you need a reverse proxy in front of the Łódź API

## Getting started

```bash
# install dependencies
npm install

# start the dev server (includes proxy to wizyty.uml.lodz.pl)
npm run dev

# production build
npm run build
```

The dev server proxies `/api/*` → `https://wizyty.uml.lodz.pl/*`, so the app works out of the box locally without touching CORS headers.

## Production deployment

In production you need a reverse proxy that forwards requests from your domain to `wizyty.uml.lodz.pl`. Example nginx snippet:

```nginx
location /api/ {
    proxy_pass https://wizyty.uml.lodz.pl/;
    proxy_set_header Host wizyty.uml.lodz.pl;
}
```

## Project structure

```
src/
├── api/
│   └── booking.js          # All API calls + SERVICES list + CATEGORY_META
├── components/
│   ├── AboutModal.jsx       # "About this project" dialog
│   ├── StepConfirm.jsx      # Step 4 — booking confirmation
│   ├── StepDetails.jsx      # Step 2 — personal details form
│   ├── StepSlots.jsx        # Step 1 — service & date/time picker
│   ├── StepVerify.jsx       # Step 3 — SMS verification
│   └── TopBar.jsx           # Language switcher, dark mode toggle, GitHub link
├── App.jsx                  # Step orchestration and progress indicator
├── i18n.jsx                 # Translations (PL/EN/UK) + theme/lang contexts
├── index.css                # CSS variables, animations, global styles
└── main.jsx                 # Entry point
```

## Disclaimer

This is an **unofficial** project. It is not affiliated with, endorsed by, or connected to Urząd Miasta Łodzi in any way. Use at your own risk. The booking API may change without notice.

## License

© 2026 Aleksander Jarmoszuk — [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
