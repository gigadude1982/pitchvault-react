# The Lazy Creator Marketplace

A React-based platform connecting brands with creators for UGC campaigns.

## Tech Stack

- **React 18**
- **TanStack Router** — URL-based client-side routing
- **Create React App** — build tooling

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

Output is placed in the `build/` folder.

## Views

| Route | View | Description |
|---|---|---|
| `/feed` | Discover | Browse and save creators |
| `/request` | Campaign | Submit a campaign brief |
| `/messages` | Messages | In-platform chat |
| `/payments` | Treasury | Escrow and fund releases |
| `/stats` | Analytics | Platform metrics |

## Project Structure

```
src/
├── App.js            # Root layout (nav, toast)
├── router.js         # Route definitions
├── ToastContext.js   # Shared toast notifications
├── styles.css        # Global styles
└── views/
    ├── DiscoverView.js
    ├── CampaignView.js
    ├── MessagesView.js
    ├── PaymentsView.js
    └── AnalyticsView.js
```
