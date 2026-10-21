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
- [ ] Keep the founder details in `lib/site.ts` as:
  - Vivek Bhange
  - https://linkedin.com/in/viveksainathbhange/

## Analytics and social previews

- [ ] Choose an analytics provider:
  - Google Analytics: free, broad integrations, cookie consent required.
  - Plausible: simple, privacy-focused, paid hosted service.
  - Umami: privacy-focused and self-hostable, but requires hosting/maintenance.
- [ ] If switching away from Google Analytics, update `components/Consent.tsx`, the privacy policy and `NEXT_PUBLIC_GA_ID`.
- [ ] Create page-specific Open Graph images. Options include:
  - Next.js `ImageResponse` (already used by this project; no external platform needed).
  - Figma or Canva for manually designed social cards.
  - Bannerbear or Placid for API-generated cards.
  - Cloudinary for hosted image transformations.
- [ ] Add `openGraph.images` metadata for the homepage, products and key service categories.

## Performance verification

- [ ] Test the 3D scenes on a mid-range Android phone and an older iPhone.
- [ ] Run Lighthouse on mobile with CPU and network throttling.
- [ ] Compare the canvas against the static fallback for battery usage and Largest Contentful Paint.
- [ ] If needed, add a static image fallback for very low-power devices.

## Testing and operations

- [ ] Add unit tests for service data, contact validation, topic selection, WhatsApp URLs and sitemap completeness.
- [ ] Add GitHub Actions to run lint, typecheck and build on every pull request.
- [ ] Configure production `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in Vercel.
- [ ] Send a production test enquiry and verify the reply-to address, spam placement and Resend delivery log.
- [ ] Always set `CONTACT_FROM_EMAIL` in production. The fallback sender `onboarding@resend.dev` only delivers to the Resend account owner's address.
- [ ] Replace the in-memory rate limiter in `app/api/contact/route.ts` with a shared store (e.g. Upstash Redis or Vercel KV). The current per-instance Map resets on cold starts, is not shared across instances and never evicts old entries.
