# Logic & Loop website (Next.js + React Three Fiber)

Live target: **https://logicandloop.vivekbhange.tech** on Vercel.

## Run it locally
Needs Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## Edit your details
All contact settings live in `lib/site.ts`:

| Setting | What it does |
| --- | --- |
| `whatsappNumber` | Every WhatsApp button (91 + 10 digits, digits only) |
| `bookingUrl` | Every "Book a call" button. While it still says `your-link`, the buttons open the contact page instead |
| `email` | Contact form delivery and email links |

Services (all 20 pages) are generated from `lib/services.ts`: edit a service's text, deliverables, stack, timeline or FAQs there and its page updates. Add a new object to the array and a new page appears, in the sitemap too.

## Deploy on Vercel
1. Push this folder to a GitHub repo (e.g. `logicandloop-web`).
2. vercel.com → Add New → Project → import the repo. Vercel detects Next.js; leave the defaults → Deploy.
3. Project → Settings → Domains → add `logicandloop.vivekbhange.tech`, then create the CNAME record Vercel shows at your DNS provider (host `logicandloop`).
   If the old static site already uses this domain, remove it from that project first.

## Turn on the contact form (once)
The form posts to FormSubmit, which emails each enquiry to `logicandloophq@gmail.com`.
1. On the live site, send one test message.
2. Open the "Activate form" email from FormSubmit in that inbox (check Spam) and click Activate.
3. Send another test; it should arrive in Gmail.

## What's where
- `app/` pages: home, `/services`, `/services/[slug]` (20 pages), `/products/minute-one`, `/products/loop-os`, `/contact`, 404, sitemap, robots, OG image
- `components/scenes/` the Three.js scenes (hero rings, Loop OS agent crew). They load after the page with a shimmer placeholder, pause when off screen, respect reduced-motion, and don't hijack scrolling on phones
- `components/PageSkeleton.tsx` shimmer skeletons shown while a page loads on slow connections
- `app/globals.css` the whole design system (colours, type, layout)
