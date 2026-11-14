# Image prompts

Source of truth for Image Studio (`image-studio/`). The server re-reads this file on every request, so editing a prompt here is enough. Generate, review and approve images at http://localhost:4400 (`node image-studio/server.mjs`).

- `## Group` groups the cards on the review page.
- `### image-id` starts one image; the first fenced block under it is its prompt. Ids use lowercase letters, digits and dashes.
- Where an id goes is set by `destFor()` in `image-studio/server.mjs`: `social-*` → `public/images/social/<id>.webp` (with the branded footer), everything else → `public/images/gen/<id>.webp` (no footer).
- The `style` block below is appended to every prompt.
- Copy comes from `lib/services.ts`, `lib/industries.ts` and the product pages. Keep on-image text short (a title plus 2–4 word labels) so it renders cleanly.

```style
Style: flat vector editorial illustration for a technology services company website, clean and modern, 16:9 landscape. Palette: deep spruce green (#12363a and #0b2622), one warm marigold yellow accent (#f0ab16), off-white chalk background (#eef0eb), soft sage tints. Lettering: bold geometric sans-serif, perfectly spelled exactly as quoted, large, high contrast and easy to read; no other text anywhere. Simple shapes, generous whitespace, soft shadows, rounded UI cards. No real company logos, no photorealism, no gibberish text, no watermarks.
```

## Build

### web-apps-saas

```
Title text at top left: "Web apps & SaaS". Centre: a large browser window showing a customer dashboard with a left sidebar, a line chart, KPI tiles and a data table; a small user avatar with a badge labelled "Admin". Behind it, three smaller copies of the same app window fanned out and labelled "Tenant A", "Tenant B", "Tenant C" to show one product serving many customers, each with its own data. Two small floating chips: "Login & roles" with a key icon and "Admin panel" with a gear icon.
```

### mobile-apps

```
Title text at top left: "Mobile apps". Two smartphones side by side showing the same booking app screen, one labelled "iOS" and one labelled "Android". Below them, a single curly-brace code symbol joined to both phones by marigold lines, labelled "One codebase". Small floating cards around the phones: a push notification card, a map pin, a camera icon and an offline cloud icon.
```

### websites-ecommerce

```
Title text at top left: "Websites & e-commerce". A laptop showing an online store product page with a product photo placeholder and a marigold "Add to cart" button. Beside it, a phone showing a checkout screen with payment options. Top right, a speedometer gauge in the green zone labelled "Fast". A pencil cursor editing a heading on the laptop, labelled "Edit content".
```

### apis-backend

```
Title text at top left: "APIs & backend". In the centre, a database cylinder stack joined to a server block. Clean connector lines run from it to four rounded tiles labelled "Payments", "CRM", "Messaging" and "ERP". A small code card shows the line "GET /orders 200 OK". A shield icon labelled "Auth & roles" sits beside the database.
```

### custom-erp-crm

```
Title text at top left: "Custom ERP & CRM". A modular business dashboard built from five large tiles labelled "Sales", "Projects", "Inventory", "Billing" and "HR", fitting together like building blocks. To the right, an approval chain: three round avatar icons joined by arrows, each with a check mark, ending in a marigold stamp labelled "Approved".
```

### mvp-for-startups

```
Title text at top left: "MVPs for startups". A horizontal timeline with four milestone dots labelled "Scope", "Prototype", "Build" and "Launch". At the "Launch" end, a small rocket lifts off from a phone screen. Above the timeline, a calendar card reading "6–10 weeks". A few sticky notes and a wireframe sketch near the "Prototype" step.
```

## AI & data

### ai-agents-chatbots

```
Title text at top left: "AI agents & chatbots". A smartphone showing a chat: a customer bubble "Is the flat available?", a reply bubble "Yes. Visit on Saturday?", and a small green confirmation chip "Visit booked". To the right, a friendly geometric agent node (a glowing rounded hexagon, not a robot face) connected by lines to four action icons labelled "Book", "CRM", "Pay link" and "Remind".
```

### llm-rag-integration

```
Title text at top left: "LLM & RAG". A left-to-right flow: a stack of documents, support tickets and a database icon flow into a magnifying glass labelled "Retrieve", then into a glowing node labelled "LLM", then into an app panel showing an answer card with two small citation chips labelled "Source 1" and "Source 2". A caption under the flow: "Answers from your data".
```

### data-dashboards

```
Title text at top left: "Data & dashboards". Four source icons on the left labelled "CRM", "Ads", "Sheets" and "DB" send pipes that merge into one warehouse block, which feeds one large dashboard screen on the right. The dashboard shows three KPI tiles labelled "Revenue", "Leads" and "Conversion" and a line chart trending up in marigold.
```

### ml-computer-vision

```
Title text at top left: "ML & computer vision". Two panels side by side. Left: a scanned invoice with its fields outlined by marigold detection boxes. Right: a camera view of warehouse boxes, each boxed with a small confidence label like "0.96". Below them, a horizontal accuracy meter labelled "Accuracy 97%". A faint neural-network node grid in the background.
```

## Automate & integrate

### workflow-automation

```
Title text at top left: "Workflow automation". A clean flowchart of four connected cards with marigold arrows: "New form entry" → "Add to CRM" → "Send WhatsApp" → "Update sheet". A side branch from the middle card leads to a bell icon labelled "Error alert". In one corner, a clock icon labelled "Hours saved".
```

### whatsapp-payments

```
Title text at top left: "WhatsApp & payments". A smartphone showing a green chat with a message "Your booking is confirmed" and a marigold button "Pay now". Beside it, a payment receipt card with a large check mark labelled "Paid". An arrow labelled "Webhook" runs from the receipt to a database icon labelled "CRM updated".
```

### cloud-devops

```
Title text at top left: "Cloud & DevOps". A pipeline of four chevrons with check marks, labelled "Code", "Build", "Test" and "Deploy". Above the pipeline, two cloud shapes, each holding a server box, labelled "Staging" and "Production". Bottom right, a monitoring card with a flat green line labelled "Uptime 99.9%".
```

### legacy-modernisation

```
Title text at top left: "Legacy modernisation". Left: an old grey boxy desktop application window with dated bevelled buttons. Right: a clean modern web app. Between them, a bridge built from blocks labelled "Data", "Users" and "Billing", moving across one at a time from old to new. Caption under the bridge: "No downtime".
```

## Design, advise & support

### ui-ux-design

```
Title text at top left: "UI/UX & product design". A left-to-right progression: a rough pencil sketch on paper, then grey wireframe screens joined by flow arrows, then polished colourful mobile and desktop screens. Below, a row of colour swatches and two component chips labelled "Button" and "Card". A play icon on the final screen labelled "Clickable prototype".
```

### fractional-cto

```
Title text at top left: "Fractional CTO". A whiteboard architecture diagram with boxes labelled "Web", "API", "Database" and "Queue" joined by arrows. Below it, a roadmap strip with four segments labelled "Q1", "Q2", "Q3" and "Q4". A decision card with a check mark reads "Decision made". A small calendar card reads "A few days a month".
```

### qa-security-performance

```
Title text at top left: "QA, security & performance". A browser window under a large magnifying glass that reveals a small bug icon. Beside it, three stacked report cards: a bug icon with "Bugs found", a shield with a check mark and "Security checked", and a speed gauge in the green zone with "Core Web Vitals".
```

### ai-training-workshops

```
Title text at top left: "AI training & workshops". A workshop room seen from behind the audience: simple flat figures with laptops facing a presenter screen showing three steps, "Prompt", "Draft" and "Review", joined by arrows. In front, a notebook card labelled "Prompt library" and a padlock card labelled "Data & privacy".
```

### maintenance-amc

```
Title text at top left: "Maintenance & AMC". A monthly calendar with a small wrench icon on one day each week. Beside it, a status panel with green dots and the heading "All systems operational". Three small cards below it labelled "Security patches", "Bug fixes" and "Backups".
```

### dedicated-developers

```
Title text at top left: "Dedicated developers". A team task board with three columns labelled "To do", "In progress" and "Done", holding task cards and small avatar circles. Two new developer avatars slide in from the right, joined to the board by a marigold arrow labelled "Joins in a week". A code card with a check mark labelled "Senior review".
```

## Talent assessment

### online-assessments

```
Title text at top left: "Online assessments". A laptop showing a test screen with section tabs labelled "Aptitude", "Coding" and "Technical", and a countdown timer reading "45:00". In the corner of the screen, a webcam proctoring box with a simple face outline and two green checks labelled "Face verified" and "No tab switch". Beside the laptop, a small bar chart card labelled "Results".
```

### hiring-drives

```
Title text at top left: "Managed hiring drives". A wide funnel with many small candidate dots entering at the top and passing four stages labelled "Register", "Assessment", "Interviews" and "Offers". Beside the funnel, a dashboard card labelled "Live drive dashboard", a calendar with booked interview slots, and an envelope labelled "Offer letter".
```

## Products

### minute-one

```
Title text at top left: "Minute One". A large stopwatch reading "0:58" next to a smartphone chat: a lead bubble "Hi, saw your ad", an instant reply bubble, two quick-reply chips labelled "Budget" and "Timeline", and a calendar confirmation card "Visit booked". Caption under the phone: "Every enquiry answered in a minute".
```

### loop-os

```
Title text at top left: "Loop OS". In the centre, a hub circle labelled "Loop OS" with three agent nodes orbiting it, labelled "Sales", "Ops" and "Support". Lines run from the hub to tool tiles labelled "WhatsApp", "CRM" and "Sheets". On the right, an approval card with a marigold button labelled "Approve", and below it an audit log list card headed "Audit trail".
```

## Industries

### real-estate

```
Title text at top left: "Real estate". A modern residential tower on the right. In front, a smartphone chat: a buyer bubble "Is the 2-bedroom available?" and a confirmation chip "Site visit booked". Two small labels with icons: a stopwatch with "Reply in 1 minute" and a database with "Every lead in CRM".
```

### clinics

```
Title text at top left: "Premium clinics". A calm clinic reception desk with a large appointment diary filling up with booked slots. A smartphone chat in front: a patient bubble "Can I book a consultation?" and a confirmation chip "Booked for Tuesday". A small bell card labelled "Reminder sent".
```

### education

```
Title text at top left: "Education & edtech". Two course cards labelled "Data Science" and "MBA Prep". A smartphone chat in front: a student bubble "What is the fee?" and a confirmation chip "Counselling call booked". Along the bottom, a three-step funnel labelled "Enquiry", "Counselling" and "Enrolled".
```

### startups

```
Title text at top left: "Startups". A rocket launching from an open laptop with a marigold flame trail. Beside it, a checklist card with three ticked items: "MVP shipped", "Billing automated" and "Code in your name". A small calendar card reads "Fixed price".
```

## Social

### social-minute-one

```
Share card for LinkedIn. Deep spruce green (#12363a) background. Left half: large bold off-white headline text on three lines, "Every enquiry answered in a minute.", with the word "minute" in marigold, and a small label above it, "Minute One". Right half: a smartphone showing a chat with a lead question, an instant reply and a "Visit booked" chip, next to a stopwatch reading "0:58". Keep the bottom 10% of the image completely empty plain background, because a footer bar is added there later.
```

### social-loop-os

```
Share card for LinkedIn. Deep spruce green (#12363a) background. Left half: large bold off-white headline text on two lines, "AI agents you can trust.", with the word "trust" in marigold, and a small label above it, "Loop OS". Right half: an approval card with a marigold "Approve" button and an audit trail list, joined by lines to three agent nodes labelled "Sales", "Ops" and "Support". Keep the bottom 10% of the image completely empty plain background, because a footer bar is added there later.
```
