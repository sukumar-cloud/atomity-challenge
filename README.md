# Atomity Frontend Challenge — Cloud Cost Explorer

Live Demo  
https://atomity-challenge-63m3dbya3-sssssssssssssss-projects.vercel.app/

---

## Feature Chosen

**Option A — Hierarchical Cost Drill-Down (Cluster → Namespace → Pod)**

This feature appears in the product video between **0:30–0:40**.

I selected this feature because it demonstrates a clear interaction pattern: a **three-level hierarchical cost breakdown** where users can progressively drill down from clusters to namespaces and finally to pods.

This approach allowed me to showcase:

- Scroll-triggered animations
- Dynamic data rendering
- Interactive state transitions
- Reusable component architecture

---

## Animation Approach

Animations are implemented using **Framer Motion**.

The section animates when it enters the viewport using scroll-triggered animations.

**Section entrance animation**  
Opacity and vertical translation animate when the component becomes visible.

**Bar chart animation**  
Each bar grows from the bottom using `scaleY` animation with staggered delays.

**Staggered child animations**  
Bars and table rows appear sequentially to create a smooth progressive reveal.

**Number count-up animation**  
Metric totals animate from `0` to their value when the component loads.

**Reduced motion support**  
Animations respect the `prefers-reduced-motion` media query to improve accessibility.

---

## Token / Style Architecture

The project uses a **design token approach** to ensure consistent styling.

Tokens are defined in:

`src/tokens/tokens.ts`

Example:

```ts
export const tokens = {
  colors: {
    bgPrimary: "var(--color-bg-primary)",
    textPrimary: "var(--color-text-primary)",
    accentPrimary: "var(--color-accent-primary)"
  },
  radius: {
    card: "12px"
  },
  spacing: {
    section: "clamp(3rem, 6vw, 6rem)"
  }
}
```

Global CSS variables are defined in `globals.css`:

```css
:root {
  --color-bg-primary: #ffffff;
  --color-text-primary: #0e0f11;
  --color-accent-primary: #4ade80;
}
```

All components reference **tokens instead of raw hex color values**, which ensures consistent styling and easier theme management.

---

## Data Fetching and Caching

The application fetches data dynamically from the **DummyJSON API**.

API Endpoint:

```
https://dummyjson.com/products?limit=4
```

API values are mapped into simulated cloud cost metrics such as:

- CPU cost
- RAM cost
- Storage cost
- Network cost
- GPU cost

Data fetching and caching are handled using **TanStack Query (React Query)**.

Configuration:

- `staleTime: 60000` (1 minute freshness window)
- Automatic caching in memory
- Built-in loading and error state handling

This ensures:

- **First visit → API request is made**
- **Subsequent visits → cached data loads instantly without new requests**

---

## Libraries Used

| Library | Purpose |
|-------|--------|
| **React / Next.js** | Core framework and component architecture |
| **TypeScript** | Static type safety |
| **Framer Motion** | Animation system |
| **TanStack Query** | Data fetching, caching, and async state handling |
| **Modern CSS** | clamp(), CSS variables, logical properties |

No UI component libraries were used.  
All UI elements such as cards, tables, charts, and buttons were built from scratch.

---

## Modern CSS Features

Several modern CSS techniques were used.

### Fluid Typography

```css
font-size: clamp(1.8rem, 3vw, 2.5rem);
```

### Logical Properties

```
padding-inline
margin-block
```

### CSS Custom Properties

Used to implement the token-based design system and centralized theme management.

These approaches improve responsiveness and maintainability.

---

## Accessibility

Basic accessibility best practices were implemented:

- Semantic HTML elements (`<section>`, `<table>`, `<button>`)
- Keyboard-accessible controls
- Adequate color contrast
- `prefers-reduced-motion` support
- Visible focus states for interactive elements

---

## Responsive Design

The section adapts across multiple screen sizes.

**Desktop (1280px+)**  
Full layout with chart and table visible.

**Tablet (768px+)**  
Adaptive spacing and responsive layout.

**Mobile (375px+)**  
Vertical stacking layout with readable typography.

Responsive typography is implemented using `clamp()`.

---

## Tradeoffs and Decisions

DummyJSON does not contain real cloud infrastructure data, so its numeric values were mapped to simulated cost metrics.

A lightweight custom bar chart was implemented instead of using a charting library to maintain full control over animations and component architecture.

The focus of the challenge was to build **one polished section**, prioritizing quality and clarity over building an entire page.

---

## What I Would Improve With More Time

- Add smooth layout transitions when switching between Cluster, Namespace, and Pod levels
- Add time-range filters such as 7-day, 30-day, and 90-day views
- Add sparkline charts for trend visualization
- Implement automated accessibility testing
- Add end-to-end tests for drill-down interactions

---

## Local Development

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## Deployment

The project is deployed using **Vercel**.

```

