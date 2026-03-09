# Atomity Frontend Challenge — Cloud Cost Explorer

Live demo: **[your-url-here.vercel.app]**

---

## Feature Chosen

**Option A** — the hierarchical cost drill-down section (0:30–0:40).

I chose this because it has the most interesting interaction model: a three-level tree (Cluster → Namespace → Pod) that maps naturally to a composable component hierarchy. The animated bar chart + tabular data combo also gave me room to show off both motion craft and data rendering in a single cohesive section.

---

## Approach to Animation

All animations are CSS-transition-based (no external animation library) to keep the bundle lean:

- **Scroll trigger** — `IntersectionObserver` via `useInView` fires once when the section enters the viewport; all child elements then animate in via `opacity` + `transform` transitions with staggered `transitionDelay`.
- **Bar chart** — height animates from `0%` to the proportional value using `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight overshoot spring feel), staggered by 80ms per bar.
- **Table rows** — fade + slide-left with 60ms stagger per row.
- **Count-up numbers** — `requestAnimationFrame` loop with cubic ease-out via `useCountUp`. Fires on scroll entry and on every drill-down navigation.
- **Drill-down transitions** — `animKey` increments on every path change, remounting animated children so count-up and stagger replay naturally.
- **prefers-reduced-motion** — global CSS rule sets all durations to `0.01ms`, fully disabling motion for users who need it.

---

## Token Architecture

Tokens live in `src/tokens/index.ts` as TypeScript `const` referencing CSS custom properties:

```ts
export const tokens = {
  colors: {
    bgPrimary: 'var(--color-bg-primary)',
    accentGreen: 'var(--color-accent-green)',
    // ...
  },
  spacing: { xs: '4px', sm: '8px', ... },
  radius:  { sm: '6px', md: '10px', ... },
  font:    { sans: "'DM Sans', ...", mono: "'JetBrains Mono', ..." },
} as const
```

CSS variables are defined in `src/styles/global.css` under `:root` (dark) and `:root[data-theme='light']` (light). Switching themes is a single `setAttribute('data-theme', theme)` call — every component updates automatically because they only reference `var(--color-*)`.

No component ever contains a raw hex value.

---

## Data Fetching & Caching

**API used:** [DummyJSON](https://dummyjson.com) — `GET /products?limit=16`

**Strategy:**

1. `useClusterData` (in `src/hooks/useClusterData.ts`) wraps a TanStack Query `useQuery`.
2. Fetched product prices are used as a multiplicative jitter factor over the static cluster schema — giving dynamic numbers while keeping the data shape sensible.
3. **Cache config:**
   - `staleTime: 5 minutes` — no refetch while data is fresh (instant revisit).
   - `gcTime: 10 minutes` — data stays in memory cache for 10 min after last use.
   - `retry: 2` — two retries on network failure.
4. On error, the app gracefully falls back to `CLUSTERS` static data and shows an error banner.

You can verify in DevTools → Network: first load shows one `dummyjson.com` request; navigate away and back within 5 min — zero new requests.

---

## Modern CSS Features

The app uses several modern CSS capabilities for responsive, maintainable styling:

### 1. **Fluid Sizing with clamp()**
```css
section {
  padding-inline: clamp(1rem, 5vw, 4rem);  /* min, preferred, max */
}

h2 {
  font-size: clamp(1.25rem, 5vw, 3rem);    /* scales smoothly between viewport sizes */
}
```
✅ Eliminates need for multiple breakpoints  
✅ Smooth scaling between min and max

### 2. **Container Queries (@container)**
```css
@container (max-width: 640px) {
  main section { --card-padding: 1rem; }
}
```
✅ Component-level responsiveness, not viewport-level  
✅ Predictable scaling based on parent container

### 3. **Logical Properties (margin-inline, padding-block)**
```css
padding-inline: clamp(1rem, 5vw, 4rem);  /* left + right, RTL/LTR aware */
```
✅ Bidirectional text support built-in  
✅ Cleaner, intention-clear code

### 4. **CSS Custom Properties for Theming**
All colors use CSS variables that switch on data-theme:
```css
:root { --color-bg-primary: #0a0d12; }
:root[data-theme='light'] { --color-bg-primary: #f4f6f9; }
```

---

## Accessibility Features

- ✅ **Semantic HTML** — `<section>`, `<nav>`, `<button>` (not divs pretending to be buttons)
- ✅ **ARIA labels** — `aria-label`, `aria-current`, `role` attributes
- ✅ **Color contrast** — WCAG AA compliant (4.5:1 minimum)
- ✅ **Keyboard navigation** — Tab order logical, Enter/Space activate buttons
- ✅ **prefers-reduced-motion** — animations disabled for users who need it
- ✅ **Focus management** — visible focus rings on interactive elements
- ✅ **Dark/Light modes** — both meet accessibility standards

---

## Libraries Used

| Library | Why |
|---|---|
| React 18 | Component model, hooks |
| Vite | Fast dev server + optimised production build |
| TypeScript | Type safety across all components and hooks |
| TanStack Query v5 | Data fetching, caching, loading/error states |
| Modern CSS | `clamp()`, `@container`, logical properties, CSS variables |

No UI component libraries used ✅. Every card, badge, row, chart, and button is built from scratch.

---

## Responsive Design

- **Desktop (1280px+)** — full layout with all columns visible
- **Tablet (768px–1279px)** — stacked stat cards, `clamp()` adjusts padding
- **Mobile (375px–767px)** — vertical layout, touch-friendly spacing, table scrolls horizontally

Tested on Chrome DevTools emulation, Firefox/Safari responsive design mode.

---

## Tradeoffs & Decisions

- **CSS transitions over Framer Motion** — kept bundle size down. The animations needed (stagger, spring height, count-up) are all achievable with native CSS + rAF. Would reach for Framer Motion if I needed gesture-based drag, layout animations, or complex sequencing.
- **Inline styles over Tailwind/CSS Modules** — easier to wire tokens as JS references and avoid class name collisions across isolated components. Tradeoff: slightly verbose JSX.
- **Static data schema + API jitter** — DummyJSON doesn't have cloud cost data, so I used API values as variance factors. This honestly demonstrates async state handling (loading, error, success, caching) without fabricating a fake endpoint.
- **Fixed positioning for tooltips** — avoids clipping but anchors to viewport instead of bar. Trade-off for UX clarity.
- **No virtual scrolling** — the data sets shown are small (≤ 4 rows per level). Would add `react-virtual` if the pod list grew to hundreds.

---

## What I'd Improve With More Time

- Add **Framer Motion** `layout` animations so bars and rows reflow smoothly when switching levels, rather than remounting.
- **Keyboard navigation** through the drill-down tree (arrow keys to select rows, Escape to go up a level).
- A **time-range picker** (7D / 30D / 90D) that fetches different dataset slices.
- **Sparkline** micro-charts per row showing cost trend over the selected period.
- Full **WCAG AAA audit** + automated testing (axe-core).
- **Cypress E2E tests** covering the drill-down flow and dark mode toggle.
- **Real API backend** with pagination, filtering, and search.

---

## Deployment

### 1: Vercel (Recommended)

```bash
# 1. Create GitHub repository
git init
git add .
git commit -m "Initial commit: Atomity Cloud Cost Explorer"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/atomity-challenge.git
git push -u origin main

# 2. Deploy to Vercel
npm i -g vercel
vercel

# Follow prompts → select GitHub project → deploy
# Your live URL will be printed (e.g., atomity-challenge.vercel.app)
```



### Local Development

```bash
npm install
npm run dev      # Starts at http://localhost:5173
npm run build    # Builds to dist/
npm run preview  # Preview production build locally
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---
