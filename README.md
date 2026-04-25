# 🍿 Popcorn Universe — React App

Canada's Movie Universe — full React conversion of the HTML demo.

---

## Quick Start

```bash
npm install
npm start
```

Runs on `http://localhost:3000`

---

## Project Structure

```
src/
├── App.js                     # Root — renders NavBar, PageSwitcher, current page
├── index.js                   # Entry point
│
├── hooks/
│   └── useNavigation.js       # Page routing state hook
│
├── data/
│   └── mockData.js            # All static data (movies, theatres, seats, etc.)
│                              # ← Replace with API calls here
│
├── styles/
│   └── globals.css            # Design tokens, reset, shared component styles
│
├── components/
│   ├── NavBar.js / .css       # Top navigation bar
│   ├── PageSwitcher.js / .css # Bottom pill navigation (demo helper)
│   ├── MovieCard.js           # Reusable movie card (book / remind / preorder)
│   └── Footer.js              # Shared footer
│
└── pages/
    ├── HomePage.js / .css       # Hero, trending, experience grid, Scene+ banner
    ├── NowPlayingPage.js / .css # Filter sidebar + sortable movie grid
    ├── ComingSoonPage.js / .css # Live countdown + month-tabbed releases
    ├── TheatresPage.js / .css   # Theatre list + map placeholder
    ├── GiftCardsPage.js / .css  # Card designer + purchase form
    ├── LocationPage.js / .css   # Province / city / postal code selector
    ├── SignInPage.js            # Email + social auth form
    ├── JoinPage.js              # Registration + membership tier panel
    ├── AuthPages.css            # Shared auth page styles
    ├── SeatsPage.js / .css      # Interactive seat map with live pricing
    └── CheckoutPage.js / .css   # Multi-step checkout + order summary
```

---

## Connecting to a Backend

All data is currently served from `src/data/mockData.js`. To wire up a real API:

### 1. Movies (Now Playing / Coming Soon)

```js
// Replace in NowPlayingPage.js
const [movies, setMovies] = useState([]);

useEffect(() => {
  fetch('/api/movies/now-playing?city=toronto')
    .then(r => r.json())
    .then(setMovies);
}, []);
```

### 2. Theatres

```js
fetch('/api/theatres?lat=43.6532&lng=-79.3832')
```

### 3. Showtimes & Seat Maps

```js
fetch(`/api/showtimes?movieId=${movieId}&theatreId=${theatreId}&date=${date}`)
fetch(`/api/seatmap?showtimeId=${showtimeId}`)
```

### 4. Authentication

Replace `social-btn` click handlers and form `handleSubmit` in `SignInPage.js` / `JoinPage.js`
with calls to your auth provider (e.g. Firebase Auth, Auth0, Supabase, custom JWT).

### 5. Checkout / Payments

Replace `handleSubmit` in `CheckoutPage.js` with a call to your payment backend
(e.g. Stripe, Moneris for Canada).

---

## Design Tokens

All colours and fonts are CSS variables in `src/styles/globals.css`:

| Token         | Value       | Usage                    |
|---------------|-------------|--------------------------|
| `--butter`    | `#F5C842`   | Primary accent / CTA     |
| `--caramel`   | `#C47A2B`   | Secondary accent          |
| `--red`       | `#D94F3D`   | Age ratings / alerts      |
| `--bg`        | `#0C0A08`   | Page background           |
| `--surface`   | `#201D14`   | Card backgrounds          |
| `--text`      | `#F5F0E8`   | Body text                 |
| `--muted`     | `#7A7260`   | Secondary text            |
| `--green`     | `#5ADB8E`   | Success / "New" badges    |
| `--font-display` | Syne     | Headings / CTAs           |
| `--font-body`    | DM Sans  | Body text                 |
| `--font-mono`    | Space Mono| Badges / metadata        |

---

## Key Components

### `<MovieCard movie={} variant="book|remind|preorder" onAction={fn} />`

Accepts a movie object from `mockData.js` and renders a card with the appropriate CTA.

### `useNavigation(initialPage)`

Returns `{ currentPage, navigate }`. All page transitions go through `navigate('pageName')`.

### `mockData.js`

Central data file. Each export corresponds to a page's data needs and is designed
to be swapped for an API call with minimal changes.

---

## Notes

- The **PageSwitcher** (bottom pill bar) is a demo navigation aid — remove it
  in production and rely on `NavBar` links + in-page CTAs.
- Tax rates in `CheckoutPage.js` are hardcoded for Ontario (HST 13%) — implement
  province-aware tax logic from your backend.
- The seat map in `SeatsPage.js` uses a static layout from `mockData.js`.
  Replace `SEAT_ROWS` with a dynamic fetch from your showtime/seat API.
