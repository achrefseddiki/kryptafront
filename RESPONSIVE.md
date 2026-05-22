# Responsive Design — Krypta Frontend

No Figma reference exists for mobile. This document records every responsive decision made.

---

## Breakpoints

We use Tailwind's default breakpoints:

| Prefix | Min-width | Typical device         |
|--------|-----------|------------------------|
| (none) | 0px       | Mobile (< 640px)       |
| `sm`   | 640px     | Large phone / small tablet |
| `lg`   | 1024px    | Desktop (original design) |

The original desktop design used `px-24` (96px) horizontal padding throughout. Mobile uses `px-4` (16px) and tablet uses `px-8` (32px).

---

## Navbar

### Desktop (≥ 1024px)
Four stacked bars:
1. **Top info bar** — delivery text + language switcher
2. **Main bar** — logo + search input + action buttons (Build, Wishlist, Profile, Cart)
3. **Primary nav** — "Nos Produits" pill + KryptaBar / KryptaDrop / KryptaLab links + location
4. **Category bar** — all root categories with hover dropdown for subcategories

### Mobile (< 1024px)
Single compact bar (56px tall):
- **Left**: logo (120px)
- **Right**: profile button + cart icon + hamburger button

Bars 1, 3, 4 are hidden (`hidden lg:flex` / `hidden lg:block`).

### Mobile Drawer (`MobileNavDrawer.tsx`)
Triggered by the hamburger button. Slides in from the left (300px wide).

Contents (top to bottom):
1. Logo + close (×) button
2. **Search input** — submits to `/products?search=<query>` on Enter
3. **Primary links** — "Nos Produits" (gradient pill), KryptaBar, KryptaDrop, KryptaLab
4. **Category accordion** — all root categories; tap to expand subcategory list (or navigate directly if no children)
5. **Language switcher** — `NavLanguageSwitcher` component in the drawer footer (the top info bar that contains it is desktop-only)
6. **"Configurer" CTA** button at the bottom (gradient)

State:
- `isOpen: boolean` — whether the drawer is open
- `expanded: string | null` — which root category's children are shown

---

## Padding Pattern

All section/page containers changed from `px-24` to `px-4 sm:px-8 lg:px-24`.

Affected components:
- `Navbar.tsx` (main bar, primary nav, category bar)
- `HeroSection.tsx`
- `CategorySection.tsx`
- `BlogOffersSection.tsx`
- `PCBuildsSection.tsx`
- `KryptaUniverseSection.tsx`
- `ComponentsSection.tsx`
- `TrustSection.tsx`
- `Footer.tsx`
- `app/products/page.tsx` (all three `px-24` blocks)
- `app/products/[category]/page.tsx` (header, subcategory grid, products area)
- `app/products/[category]/[id]/page.tsx`

---

## Home Page Sections

### HeroSection
- Banner height: `h-auto py-12 sm:py-0 sm:h-[380px] lg:h-[498px]` — mobile uses `h-auto` + vertical padding so the container expands to fit the content rather than clipping it at a fixed height. Fixed heights resume at `sm` where there is enough space.
- Title: `text-[36px] sm:text-[48px] lg:text-[58px]`
- Subtitle: `text-base sm:text-xl lg:text-[26px]`
- CTA buttons: `h-11 lg:h-14`, `px-5 lg:px-8`
- Promo banners: stacked on mobile (`flex-col sm:flex-row`), `h-[160px] sm:h-[200px] lg:h-[236px]`

### CategorySection
- Grid changed from `flex` to `grid grid-cols-2 lg:grid-cols-4`
- Card image height: `h-[160px] lg:h-[259px]`
- Card title: `text-xl lg:text-[32px]`

### BlogOffersSection
- Already horizontally scrollable — only padding changed

### PCBuildsSection
- Already horizontally scrollable — heading responsive + padding changed
- Card width: `w-[200px] sm:w-[261px]` — slightly narrower on mobile so more is peeking
- Card image height: `h-[180px] sm:h-[259px]`
- Card price: `text-xl sm:text-[32px]` — the `32px` price was too large on mobile cards

### KryptaUniverseSection
- Service cards: `flex-col sm:flex-row` (stack on mobile)
- Card height: `h-auto sm:h-[270px]` (fixed height only on ≥ sm)
- Card title: `text-3xl lg:text-5xl`
- "Explore →" link: static on mobile, `absolute bottom-8 left-8` on ≥ sm

### ComponentsSection
- 2×2 grid → `grid-cols-1 sm:grid-cols-2`
- Section heading: `text-2xl lg:text-[39px]`
- Item title: `text-xl lg:text-[32px]`

### TrustSection
- Trust badges: `flex-col sm:flex-row`, gap `gap-10 sm:gap-12 lg:gap-32`
- Badge title: `text-xl lg:text-[30px]`
- Badge desc: `text-sm lg:text-[18px]`

### Footer
- Link columns: `flex-wrap lg:flex-nowrap` so they wrap on mobile instead of overflowing
- Newsletter email + subscribe button: `flex-col sm:flex-row`
- Bottom bar (logo + social icons): `flex-col sm:flex-row`

---

## Products — Category Page (`/products/[category]`)

### Header
- Title + search bar row: `flex-col sm:flex-row`
- Search bar: **hidden on mobile** (`hidden sm:block`) — searching via the drawer on mobile
- Title: `text-3xl lg:text-5xl`

### Subcategory grid
- `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`

### Layout
- Sidebar + products: `flex-col lg:flex-row` (sidebar goes above products on mobile, becomes side column on desktop)

### Product grid
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

---

## Product Filters Sidebar (`ProductSidebar.tsx`)

### Desktop (≥ 1024px)
Static `240px` column to the left of the product grid. Always visible.

### Mobile (< 1024px)
Hidden by default. A **"Filtres" toggle button** (full-width, with filter icon + active filter count badge) appears above the product grid.

Tapping it opens a fixed **slide-in panel** from the left (280px wide) with a dark background (`#0f0f0f`). A backdrop overlay (`bg-black/60`) closes it on tap. An `×` close button appears inside the panel.

The panel shares the same filter UI (price ranges, brand checkboxes, Apply/Clear buttons). Pressing "Apply" closes the panel and updates the URL.

A new `filters` translation key was added to both `fr` and `en` i18n dictionaries (`"Filtres"` / `"Filters"`).

Implementation detail: the component wraps everything in `<div className="lg:contents">`. On desktop, `display: contents` makes the wrapper transparent to the parent flex layout so the `<aside>` participates directly in the `flex gap-8` row. On mobile, the wrapper is a normal block element that contributes the toggle button to document flow; the `<aside>` is `fixed` (out of flow).

---

## Product Detail Page (`/products/[category]/[id]`)

- Image gallery + info column: `flex-col lg:flex-row`
- Product title: `text-2xl lg:text-[32px]`
- Price: `text-3xl lg:text-[40px]`
- Breadcrumb: `flex-wrap` to prevent overflow
