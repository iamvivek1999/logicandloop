# Follow-up to-do

## Content and proof

- [ ] Add 2–4 case studies with baseline, intervention and measurable outcomes.
- [ ] Add testimonials, client logos or anonymised client categories after permission is obtained.
- [ ] Add a short “typical engagement” section with realistic budgets and timelines.

## Accounts and identity

- [ ] Create the Logic & Loop LinkedIn company page.
- [ ] Create the Logic & Loop GitHub organisation.
- [ ] Create any approved Clutch, Crunchbase, X or product profiles.
- [ ] Add those URLs to `sameAs` in `lib/site.ts`.
- [x] Keep the founder details in `lib/site.ts` as:
  - Vivek Bhange
  - https://linkedin.com/in/viveksainathbhange/

## Analytics and social previews

- [ ] Choose an analytics provider:
  - Google Analytics: free, broad integrations, cookie consent required.
  - Plausible: simple, privacy-focused, paid hosted service.
  - Umami: privacy-focused and self-hostable, but requires hosting/maintenance.
- [ ] If switching away from Google Analytics, update `components/Consent.tsx`, the privacy policy and `NEXT_PUBLIC_GA_ID`.
- [x] Create page-specific Open Graph images. Done with `ImageResponse`: one card per page (home, services, every service, both products, about, contact), sharing the design in `lib/og.tsx`. Options include:
  - Next.js `ImageResponse` (already used by this project; no external platform needed).
  - Figma or Canva for manually designed social cards.
  - Bannerbear or Placid for API-generated cards.
  - Cloudinary for hosted image transformations.
- [x] Add `openGraph.images` metadata for the homepage, products and key service categories. Each page also gets its own `og:title` and `og:description` instead of the homepage's.

## Performance verification

- [ ] Test the 3D scenes on a mid-range Android phone and an older iPhone.
- [x] Run Lighthouse on mobile with CPU and network throttling. Local production build, Lighthouse 12, simulated mobile throttling (22 Oct 2026):
  - Home: performance 81, accessibility 99, best practices 100, SEO 100. LCP 3.2 s, TBT 400 ms, CLS 0.03.
  - Minute One: 91 / 94 / 100 / 100. LCP 3.0 s, TBT 120 ms.
  - Services: 92 / 98 / 100 / 100. LCP 3.0 s, TBT 60 ms.
- [ ] Compare the canvas against the static fallback for battery usage and Largest Contentful Paint.
  - [x] LCP and CPU, compared locally by blocking the three.js chunk. With the canvas, the LCP element is the announcement-bar text, not the canvas. The canvas roughly doubles blocking time (about 450 ms vs 190 ms), adds about 1 s of main-thread work and about 1.4 s to time-to-interactive. LCP with the chunk blocked (4.0 s vs 3.2 s) isn't a clean comparison, because that chunk also carries shared code.
  - [ ] Battery usage. This can only be measured on a real phone.
- [ ] If needed, add a static image fallback for very low-power devices.

## Testing and operations

- [x] Add unit tests for service data, contact validation, topic selection, WhatsApp URLs and sitemap completeness.
- [x] Add GitHub Actions to run lint, typecheck and build on every pull request. `.github/workflows/ci.yml` also runs the unit tests.
- [ ] Configure production `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in Vercel.
- [ ] Send a production test enquiry and verify the reply-to address, spam placement and Resend delivery log.
- [ ] Always set `CONTACT_FROM_EMAIL` in production. The fallback sender `onboarding@resend.dev` only delivers to the Resend account owner's address.
- [x] Replace the in-memory rate limiter in `app/api/contact/route.ts` with a shared store (e.g. Upstash Redis or Vercel KV). Code is in `lib/rate-limit.ts`: it counts in Upstash Redis when it's configured and otherwise uses an in-memory count that now evicts expired entries.
- [ ] Add Upstash Redis to the Vercel project (Storage or Marketplace) so `KV_REST_API_URL` and `KV_REST_API_TOKEN`, or `UPSTASH_REDIS_REST_*`, are set in production. Until then the limit is still counted per instance.
