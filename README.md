# ChrisAlchemy Consulting — Marketing Funnel Website

AI automation sales funnel for home services businesses (HVAC, plumbing, electrical, roofing, landscaping, pest control).

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** (CSS-first configuration)
- **Framer Motion** — animations
- **Lucide React** — icons
- **React Hook Form + Zod** — form validation
- **Stripe** — checkout (setup fee + monthly subscription)
- **GoHighLevel** — calendar embed + lead webhook

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_live_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_PRICE_STARTER_SETUP` | Stripe Price ID for Starter setup fee (one-time) |
| `STRIPE_PRICE_STARTER_MONTHLY` | Stripe Price ID for Starter monthly (recurring) |
| `STRIPE_PRICE_PRO_SETUP` | Stripe Price ID for Pro setup fee |
| `STRIPE_PRICE_PRO_MONTHLY` | Stripe Price ID for Pro monthly |
| `STRIPE_PRICE_ELITE_SETUP` | Stripe Price ID for Elite setup fee |
| `STRIPE_PRICE_ELITE_MONTHLY` | Stripe Price ID for Elite monthly |
| `NEXT_PUBLIC_GHL_CALENDAR_URL` | GHL calendar embed URL |
| `GHL_LEAD_WEBHOOK_URL` | GHL inbound webhook URL for leads |
| `NEXT_PUBLIC_SITE_URL` | Full site URL (for Stripe success/cancel redirects) |

### 3. Set up Stripe Products

In your Stripe Dashboard, create 6 prices:
- **Starter setup**: one-time, $497
- **Starter monthly**: recurring monthly, $297
- **Pro setup**: one-time, $997
- **Pro monthly**: recurring monthly, $497
- **Elite setup**: one-time, $1,997
- **Elite monthly**: recurring monthly, $797

Copy each Price ID into `.env.local`.

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Deploy to Vercel

```bash
vercel deploy
```

Add all environment variables in the Vercel project settings.

## Site Structure

| Route | Description |
|---|---|
| `/` | Home — hero, pain, solution, pricing teaser, FAQ |
| `/about` | About ChrisAlchemy + Rep Stack partnership |
| `/services` | 12 modules, 3 pricing tiers, full FAQ |
| `/contact` | Contact form + two conversion paths |
| `/checkout/form` | Plan selection + customer details (step 1) |
| `/checkout/payment` | Stripe Checkout session (step 2) |
| `/thank-you/service` | Post-purchase confirmation |
| `/demo/calendar` | GHL calendar embed (step 1) |
| `/demo/details` | Discovery form (step 2) |
| `/thank-you/demo` | Demo booked confirmation |
| `/api/checkout` | Creates Stripe Checkout session |
| `/api/lead` | Forwards leads to GHL webhook |

## Content Updates

- **Plans & pricing**: [content/plans.ts](content/plans.ts)
- **12 modules**: [content/modules.ts](content/modules.ts)
- **FAQs**: [content/faqs.ts](content/faqs.ts)
- **Constants** (industries, software options): [lib/constants.ts](lib/constants.ts)

## Brand Colors

| Color | Hex | Usage |
|---|---|---|
| Navy | `#1B3A5B` | Nav, dark sections, headings |
| Deep navy | `#14283D` | Footer, nav-dark |
| Orange | `#E08A2B` | Primary CTAs, highlights |
| Green | `#2E9E6B` | Starter tier, success states |
| Blue | `#2C6FB5` | Pro tier |
| Purple | `#6B4FA0` | Elite tier |
