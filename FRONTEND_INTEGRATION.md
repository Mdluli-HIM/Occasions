# Frontend integration notes

This zip contains your `src/` folder with the backend wired in, plus a `middleware.ts` for the
project root. Only `src/` and `middleware.ts` were provided/changed — no `package.json` was in the
upload, so add the dependency and env vars below yourself.

## 1. Install the one new dependency

```bash
npm install next-auth@^4.24.8
```

Everything else (fetch, React state, etc.) uses what your project already has.

## 2. Environment variables (`.env.local`)

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_SECRET=<same value as the backend's NEXTAUTH_SECRET — generate with `openssl rand -base64 32`>
NEXTAUTH_URL=http://localhost:3000
```

## 3. Drop `middleware.ts` into your project root

It's at the top level of this zip (next to where `src/` goes), not inside `src/`.

## 4. Run the backend first

See `occasions-backend/README.md` in the other zip — `npm install && npm run prisma:migrate && npm run seed && npm run dev`.
Demo logins are printed at the end of the seed script.

## What changed, file by file

**New files**
- `src/lib/api.ts` — fetch client (`apiServer` for Server Components, `apiClient` for Client Components)
- `src/lib/server-auth-token.ts` — reads the NextAuth session cookie server-side
- `src/lib/auth.ts` — NextAuth config (Credentials provider → backend `/api/auth/login`)
- `src/app/api/auth/[...nextauth]/route.ts` — NextAuth route handler
- `src/app/api/auth/token/route.ts` — exposes the raw session token to Client Components
- `src/app/login/page.tsx`, `src/app/signup/page.tsx` — new auth pages
- `src/components/auth/session-provider.tsx` — wraps the app in NextAuth's `SessionProvider`
- `src/components/provider-dashboard/listing-editor-client.tsx` — listing editor UI, split out of
  `listing/page.tsx` so the page itself can be a Server Component that fetches initial data
- `middleware.ts` (project root) — protects `/provider-dashboard/*` and `/provider-onboarding/*`

**Rewired to call the API (UI untouched)**
- `src/app/search/page.tsx`, `src/components/search/search-results-page.tsx`
- `src/app/providers/[providerId]/page.tsx`, `src/components/providers/provider-detail-page.tsx`
  (quote form now creates a real Lead; heart-save now calls the saved-providers API)
- `src/components/home/featured-providers.tsx`, `popular-services.tsx`, `popular-events.tsx`,
  `hero-search.tsx` (live result count)
- `src/app/provider-dashboard/page.tsx`, `leads/page.tsx` (with a working "mark as followed up"
  action), `settings/page.tsx`, `listing/page.tsx`, `customer-preview/page.tsx`
- `src/components/provider-onboarding/provider-onboarding-flow.tsx` — each "Next" and "Save & exit"
  now also `PATCH`es `/api/onboarding`; localStorage draft is kept as a fast local cache

**Reduced to stubs / type re-exports** (their static arrays are no longer imported anywhere;
kept so a stray import doesn't crash the build)
- `src/data/search-results.ts` — kept the filter *option labels*, dropped the fake `providerListings`
- `src/data/provider-details.ts`, `src/data/homepage.ts`, `src/data/provider-dashboard.ts` — emptied
- `src/data/provider-search.ts` — kept the hero's dropdown option labels, dropped the fake index

**Deleted** (dead files, not referenced anywhere, would have failed the build's type-check against
the new API-shaped types)
- `src/components/providers/provider-detail-page.before-quote-flow.tsx`
- `src/components/home/hero-search.backup.tsx`

**Untouched on purpose** (not in the handoff doc's file list, and no functional dependency on the
backend): `src/components/layout/site-header.tsx` still shows the dummy avatar/notification badge.
Wiring it to real auth state is a small follow-up — swap its static markup for `useSession()`
from `next-auth/react` the same way `provider-detail-page.tsx` now does.

## Known gaps (also called out in the backend README)

- `/saved` and `/quote` pages still don't exist (non-goals in the handoff doc) — the saved-providers
  API (`/api/me/saved-providers`) is ready for whenever `/saved` gets built.
- Onboarding's "photos" step still only tracks a count client-side; the backend's
  `POST /api/providers/me/media` upload endpoint is ready but not yet wired to a real file picker.
- Settings page notification toggles are read-only (see backend README).
