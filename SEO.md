# SEO checklist and instructions

Audit of the Logic & Loop website against the common SEO mistakes, done 6 November 2026 on a production build. Work through "What you need to do" from top to bottom.

---

## 1. Status at a glance

| Problem | Status | Where it's handled |
|---|---|---|
| Empty HTML without JavaScript | ✅ Fine | Every page is rendered on the server (300–2,200 words of real HTML) |
| Same title on every page | ✅ Fine | Each page sets its own `metadata.title`; layout adds "\| Logic & Loop" |
| No meta descriptions | ✅ Fine | Each page sets `metadata.description` |
| No sitemap | ✅ Fine | `app/sitemap.ts` → `/sitemap.xml`; `tests/sitemap.test.ts` fails if a page is missing |
| Hashtag URLs | ✅ Fine | Real URLs; `/#process` is only an in-page jump link |
| Buttons instead of links | ✅ Fixed | Navigation is `<a>`/`<Link>`; buttons only for tabs, filters, FAQs. Fixed the agents panels (below) |
| No H1, or several | ✅ Fine | Exactly one `<h1>` per page |
| No alt text | ✅ Fine | Every image has alt text (`components/Photo.tsx`) |
| 5 MB hero image | ✅ Fine | Hero is a 3D canvas; photos are WebP, 41–171 KB, served resized by `next/image` |
| Lorem ipsum live | ✅ Fine | None |
| Broken URLs load a page | ✅ Fixed | Real 404 status; 404 page is `noindex` with no canonical (`app/not-found.tsx`) |
| Preview URL indexed | ✅ Fixed | `*.vercel.app` gets `X-Robots-Tag: noindex, nofollow` (`next.config.ts`) |
| www and non-www both live | ✅ Fixed | `www.` permanently redirects to the bare domain (`next.config.ts`) |
| No canonical tags | ✅ Fine | Every page canonicalises to `https://logicandloop.vivekbhange.tech/...` |
| No schema | ✅ Fine | Organization (with founders), WebSite, FAQPage, Service, BreadcrumbList |
| One-page site | ✅ Fine | 32 pages |
| AI crawlers blocked | ✅ Fixed in code, ⚠️ check Cloudflare | `app/robots.ts` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others; `/llms.txt` added |
| Never added to Search Console | ❌ Your action | Section 3 |
| Zero backlinks | ❌ Your action | Section 5 |

## 2. Changes made in code

| File | Change |
|---|---|
| `next.config.ts` | `X-Robots-Tag: noindex, nofollow` on any `*.vercel.app` host; 308 redirect from `www.` to the bare domain |
| `app/robots.ts` | Allows all crawlers, names the AI crawlers explicitly, blocks only `/api/`, points to the sitemap |
| `app/llms.txt/route.ts` | Plain-text guide for AI assistants at `/llms.txt`, built from `lib/services.ts` so it never goes stale |
| `components/fx/ExpandAgents.tsx` | All three agent panels' text and links are always in the HTML; panel titles are real buttons |
| `app/not-found.tsx` | Title "Page not found", `noindex, follow`, no canonical |
| `app/careers/opengraph-image.tsx`, `app/careers/page.tsx` | Social preview image and breadcrumb schema for Careers |

Restart `npm run dev` after pulling these changes (config changes need a restart).

---

## 3. What you need to do

### Step 1. Deploy (nothing above is live yet)

The live site still runs the old build. To publish:

```bash
cd logicandloop-web
npm install
npm run typecheck && npm run lint && npm test && npm run build
git add -A
git commit -m "Redesign, careers, talent assessment, SEO fixes"
git push -u origin design/skiper-refresh
```

Then open a pull request into `main` on GitHub and merge it. Vercel deploys `main` automatically. Afterwards check:

- https://logicandloop.vivekbhange.tech/robots.txt names GPTBot and ClaudeBot
- https://logicandloop.vivekbhange.tech/llms.txt loads
- https://logicandloop.vivekbhange.tech/careers loads

### Step 2. Google Search Console

1. Go to https://search.google.com/search-console and sign in with the company Google account.
2. **Add property → Domain** → enter `logicandloop.vivekbhange.tech`.
3. Google shows a TXT record. In **Cloudflare → DNS → Records → Add record**: Type `TXT`, Name `logicandloop`, Content = the value Google gave. Save, wait a few minutes, click **Verify**.
   - Alternative: choose **URL prefix** → **HTML tag**, copy only the `content="..."` value, add it in **Vercel → Project → Settings → Environment Variables** as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, then click **Verify**.
4. **Sitemaps** → enter `sitemap.xml` → **Submit**.
5. **URL inspection** → paste the home page URL → **Request indexing**. Repeat for `/services`, `/products/minute-one`, `/products/loop-os`, `/services/online-assessments`, `/about`, `/careers`.
6. Check **Pages** and **Core Web Vitals** once a week for the first month.

### Step 3. Bing Webmaster Tools (also feeds ChatGPT search and Copilot)

1. Go to https://www.bing.com/webmasters and sign in.
2. Choose **Import from Google Search Console**. It copies the verified site and sitemap.
3. If importing fails, use the meta tag option and set `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Vercel the same way.

### Step 4. Cloudflare: make sure AI crawlers aren't blocked

The site sits behind Cloudflare, which can block AI crawlers regardless of robots.txt.

1. Cloudflare dashboard → your domain → **Security → Bots** (or **AI Crawl Control**).
2. Turn **Block AI bots / AI Scrapers and Crawlers** **off**.
3. If there's a **Managed robots.txt** option, turn it **off** so our `app/robots.ts` is the one served.
4. Under **Security → WAF → Custom rules**, make sure no rule blocks user agents containing `GPTBot`, `ClaudeBot` or `PerplexityBot`.

### Step 5. Vercel domains

1. **Vercel → Project → Settings → Domains**: `logicandloop.vivekbhange.tech` should be the production domain.
2. If you ever add `www.logicandloop.vivekbhange.tech`, set it to **redirect** to the bare domain (the code also handles this).
3. Leave **Deployment Protection** on for preview deployments.

---

## 4. Checking it worked (after deploy)

| Check | How |
|---|---|
| Indexed | Google `site:logicandloop.vivekbhange.tech` (takes days to weeks after Step 2) |
| Rich results | https://search.google.com/test/rich-results → paste the home page and a service page |
| Social previews | https://www.opengraph.xyz → paste any page URL |
| Speed | https://pagespeed.web.dev → mobile score; aim for 85+ |
| Preview hidden | `curl -I https://<project>.vercel.app` shows `x-robots-tag: noindex, nofollow` |

---

## 5. Backlinks (start from zero)

Create these profiles, each linking to the website. After each one, add its URL to `sameAs` in `lib/site.ts` so Google knows they're the same company.

1. **LinkedIn company page** "Logic & Loop": logo from `../brand/`, cover `../marketing/cover-linkedin.png`, website link.
2. **Both founders' LinkedIn profiles**: Harshita Kadam (Founder) and Vivek Bhange (Co-founder) list Logic & Loop as current company, with the website in Contact info.
3. **Google Business Profile**: service-area business in India, website link, services listed.
4. **Clutch** (clutch.co) and **GoodFirms** (goodfirms.co): free company listings. Ask the first clients for reviews there.
5. **GitHub organisation** `logicandloop`: website in the profile, a pinned public repo or two.
6. **Crunchbase**, **X (Twitter)**, **Instagram**: use the posts and covers in `../marketing/`.
7. **Launch posts**: one LinkedIn post each for Minute One, Loop OS and talent assessment, linking to its page.
8. **Product Hunt** launch for Minute One once a pilot is live.
9. **College placement cells**: when you run a talent-assessment drive, ask to be listed as a partner on the college's placements page.
10. **Guest articles**: write one practical post (for example "How to stop cheating in campus online assessments") for a site like YourStory, Inc42 or a dev.to / Medium publication, linking back.

Example `lib/site.ts` once profiles exist:

```ts
sameAs: [
  "https://www.linkedin.com/company/logicandloop/",
  "https://github.com/logicandloop",
  "https://clutch.co/profile/logic-loop",
],
```

---

## 6. Ongoing rules for new pages

- Every new page needs its own `title` and `description` in `metadata`, exactly one `<h1>`, and alt text on every image (use `components/Photo.tsx`).
- New page routes are picked up by the sitemap test: if `npm test` fails after adding a page, add it to `app/sitemap.ts`.
- Use `<Link>` for anything that goes to another page; use `<button>` only for actions on the same page.
- Keep photos as WebP under 200 KB in `public/images/` and list them in `IMAGES.md`.
- When a careers role opens (`open: true` in `lib/careers.ts`), add `JobPosting` schema for it. Don't add JobPosting for closed roles.

## 7. Brand risk to check before spending

A Mumbai company called **LogicLoop** (Logicloop Ventures LLP) already exists in tech services. "Logic & Loop" is close enough to cause confusion in search results and with buyers. Get a trademark search done (classes 9, 35, 42) before printing merchandise or running paid ads.
