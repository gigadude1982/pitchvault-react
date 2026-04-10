# PitchVault

A React-based platform connecting brands with creators for UGC campaigns.

## Tech Stack

- **React 18**
- **TanStack Router** — URL-based client-side routing
- **Create React App** — build tooling
- **ESLint + Prettier** — linting and formatting

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start dev server |
| `npm run build` | Production build (output in `build/`) |
| `npm test` | Run tests |
| `npm run lint` | Lint source files |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run format` | Format source files with Prettier |
| `npm run verify` | Build + test + lint (full local check) |

## Views

| Route | View | Description |
|---|---|---|
| `/auth` | Auth | Sign in / sign up |
| `/feed` | Discover | Browse and save creators |
| `/creators/:id` | Creator Profile | Individual creator detail page |
| `/creator` | Creator Dashboard | Creator-side view |
| `/products` | Marketplace | Browse products |
| `/request` | Campaign | Submit a campaign brief |
| `/messages` | Messages | In-platform chat |
| `/payments` | Payments | Escrow and fund releases |
| `/stats` | Analytics | Platform metrics |
| `/subscribe` | Subscribe | Subscription plans |

## Project Structure

```
src/
├── App.js            # Root layout (nav, toast)
├── router.js         # Route definitions
├── ToastContext.js   # Shared toast notifications
├── styles.css        # Global styles
├── data/
│   └── creators.js   # Creator data
└── views/
    ├── AuthView.js
    ├── DiscoverView.js
    ├── CreatorView.js
    ├── CreatorProfileView.js
    ├── ProductsView.js
    ├── CampaignView.js
    ├── MessagesView.js
    ├── PaymentsView.js
    ├── AnalyticsView.js
    └── SubscriptionView.js
```

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that builds the app, runs tests and lint, then syncs the `build/` output to an AWS S3 bucket.