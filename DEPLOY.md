# Logic & Loop website (Next.js + React Three Fiber)

Live target: **https://logicandloop.vivekbhange.tech** on Vercel.

## Run it locally
Needs Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm test           # unit tests (Vitest)
```

GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, tests and a
build on every pull request and every push to `main`.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Production | Sends contact enquiries through Resend |
| `CONTACT_FROM_EMAIL` | Production | Verified Resend sender address |
| `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` | Production | Shared contact-form rate limit. `KV_REST_API_URL` + `KV_REST_API_TOKEN` (Vercel KV / Upstash via the Vercel Marketplace) work too |
| `NEXT_PUBLIC_GA_ID` | Optional | Enables consent-gated Google Analytics |

## Edit your details
All contact settings live in `lib/site.ts`:

| Setting | What it does |
| --- | --- |
| `whatsappNumber` | Every WhatsApp button (91 + 10 digits, digits only) |
| `bookingUrl` | Every "Book a call" button. While it still says `your-link`, the buttons open the contact page instead. Free option: create a 30-minute event on cal.com (free for one person, connects to Google Calendar and Google Meet) and paste its link, e.g. `https://cal.com/logicandloop/30min` |
| `email` | Contact form delivery and email links |

Services (all 20 pages) are generated from `lib/services.ts`: edit a service's text, deliverables, stack, timeline or FAQs there and its page updates. Add a new object to the array and a new page appears, in the sitemap too.

## Deploy on Vercel
1. Push this folder to a GitHub repo (e.g. `logicandloop-web`).
2. vercel.com → Add New → Project → import the repo. Vercel detects Next.js; leave the defaults → Deploy.
3. Project → Settings → Domains → add `logicandloop.vivekbhange.tech`, then create the CNAME record Vercel shows at your DNS provider (host `logicandloop`).
   If the old static site already uses this domain, remove it from that project first.

## Turn on the contact form (once)
The form posts to the first-party `/api/contact` route, which sends each enquiry
to `logicandloophq@gmail.com` through Resend. The website does not store
enquiries in a database. Resend keeps delivery/event logs according to its
account settings, and the email arrives in the configured inbox.

1. Create a Resend account and verify a sending domain.
2. Create an API key.
3. Set `RESEND_API_KEY` in Vercel.
4. Set `CONTACT_FROM_EMAIL` to a verified address, for example
   `Logic & Loop <hello@logicandloop.vivekbhange.tech>`.
5. Deploy, submit a test enquiry and verify the email and reply-to address.

If `RESEND_API_KEY` is missing, the form intentionally reports a configuration
error instead of pretending the message was delivered.

### Rate limit
Each visitor can send five enquiries every ten minutes. In production the count
lives in Upstash Redis so it holds across serverless instances: in Vercel, open
Storage (or the Marketplace), add Upstash Redis to the project, and it sets the
`KV_REST_API_*` variables for you. Without them the limit is counted in memory
per instance, which is fine locally but easy to get around in production. If
Redis is unreachable, the route falls back to the in-memory count rather than
rejecting real enquiries.

## What's where
- `app/` pages: home, `/services`, `/services/[slug]` (20 pages), `/products/minute-one`, `/products/loop-os`, `/contact`, 404, sitemap, robots, and an `opengraph-image.tsx` social card per page (shared design in `lib/og.tsx`)
- `components/scenes/` the Three.js scenes (hero rings, Loop OS agent crew). They load after the page with a shimmer placeholder, pause when off screen, respect reduced-motion, and don't hijack scrolling on phones
- `lib/contact.ts` contact form rules (validation, topics), shared by the form and `/api/contact`
- `lib/rate-limit.ts` the contact rate limiter
- `tests/` unit tests: service data, contact validation and route, topic selection, WhatsApp links, rate limiter, sitemap completeness
- `components/PageSkeleton.tsx` shimmer skeletons shown while a page loads on slow connections
- `app/globals.css` the whole design system (colours, type, layout)
