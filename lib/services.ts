export type GroupId = "build" | "ai" | "automate" | "advise";

export const groups: { id: GroupId; name: string; blurb: string }[] = [
  { id: "build", name: "Build", blurb: "Products your customers and team use every day." },
  { id: "ai", name: "AI & data", blurb: "Agents, language models and the data underneath them." },
  { id: "automate", name: "Automate & integrate", blurb: "Connect your tools so the routine work runs itself." },
  { id: "advise", name: "Design, advise & support", blurb: "The thinking before the build and the care after it." },
];

export type Service = {
  slug: string;
  name: string;
  group: GroupId;
  short: string;
  intro: string;
  deliverables: string[];
  stack: string[];
  timeline: string;
  engagement: string;
  faqs: { q: string; a: string }[];
  related: string[];
};

export const services: Service[] = [
  // ---------------------------------------------------------------- Build
  {
    slug: "web-apps-saas",
    name: "Web apps & SaaS",
    group: "build",
    short: "Customer portals, dashboards and multi-tenant SaaS products.",
    intro:
      "Booking systems, customer portals, internal dashboards and full SaaS products with billing and team accounts. We build them to load fast, stay secure and be easy for your team to run.",
    deliverables: [
      "Clickable prototype signed off before development starts",
      "Production web app with login, roles and permissions",
      "Admin panel for your team to manage content, users and data",
      "Multi-tenant setup with per-customer data isolation, when you need it",
      "Automated tests, error monitoring and a deployment pipeline",
      "Handover docs and a recorded walkthrough",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Supabase"],
    timeline: "6–12 weeks for a first release",
    engagement: "Fixed scope and quote per phase",
    faqs: [
      { q: "Can you take over an app someone else started?", a: "Yes. We start with a one-week code and infrastructure review, tell you plainly what to keep and what to fix, then quote the work." },
      { q: "Who owns the code?", a: "You do. The repository, cloud accounts and domains are in your name from day one." },
    ],
    related: ["apis-backend", "ui-ux-design", "cloud-devops"],
  },
  {
    slug: "mobile-apps",
    name: "Mobile apps",
    group: "build",
    short: "iOS and Android apps from one codebase.",
    intro:
      "Apps your customers keep on their home screen: bookings, loyalty, ordering, member areas and field-team tools. One codebase ships to both stores, which saves time and budget without feeling second-rate.",
    deliverables: [
      "iOS and Android apps built cross-platform",
      "Push notifications, deep links and offline support where it matters",
      "Payments, maps, camera and other device features",
      "App Store and Play Store listings and submission",
      "Crash reporting and analytics from the first release",
    ],
    stack: ["React Native", "Expo", "Flutter", "Firebase", "Supabase"],
    timeline: "8–14 weeks to store launch",
    engagement: "Fixed scope and quote per phase",
    faqs: [
      { q: "Do I need a web app as well?", a: "Often the same backend serves both. We plan them together so you pay for it once." },
      { q: "What if the store rejects the app?", a: "We handle submission and any rework the review asks for. It's part of the quote." },
    ],
    related: ["web-apps-saas", "apis-backend", "whatsapp-payments"],
  },
  {
    slug: "websites-ecommerce",
    name: "Websites & e-commerce",
    group: "build",
    short: "Fast marketing sites and online stores your team can edit.",
    intro:
      "Company sites, project microsites, landing pages and online stores. They're quick to load and built to rank, and your team can update them without calling a developer.",
    deliverables: [
      "Design and build of every page, mobile-first",
      "Content management your team can use",
      "Store setup with catalogue, checkout and Indian payment methods",
      "SEO basics: metadata, sitemaps, structured data and speed",
      "Lead forms connected to your CRM, email or WhatsApp",
    ],
    stack: ["Next.js", "Sanity", "Shopify", "WordPress (headless)", "Vercel"],
    timeline: "3–6 weeks",
    engagement: "Fixed quote",
    faqs: [
      { q: "Can I edit the site myself?", a: "Yes. Every text, image and page you'd normally change is editable from a simple dashboard." },
      { q: "Do you write the content?", a: "We can draft it with you, or work from yours. Either way it's written for your buyers, not for search engines." },
    ],
    related: ["ui-ux-design", "whatsapp-payments", "qa-security-performance"],
  },
  {
    slug: "apis-backend",
    name: "APIs & backend",
    group: "build",
    short: "Clean APIs, solid databases and real integrations.",
    intro:
      "The part nobody sees and everybody depends on. We design the API, model the data, wire up third-party services and make sure it holds up when traffic grows.",
    deliverables: [
      "API design with documentation your other teams can follow",
      "Database schema, migrations and access rules",
      "Authentication, roles and audit logs",
      "Integrations with payment, messaging, CRM and ERP systems",
      "Background jobs, queues and scheduled tasks",
      "Load testing and monitoring",
    ],
    stack: ["Node.js", "Python", "PostgreSQL", "Redis", "REST", "GraphQL"],
    timeline: "4–10 weeks",
    engagement: "Fixed scope, or monthly for ongoing work",
    faqs: [
      { q: "Can you work alongside my in-house frontend team?", a: "Yes. We agree the API contract first, so both sides can build in parallel." },
      { q: "Do you write tests?", a: "Every endpoint ships with automated tests that run before each deploy." },
    ],
    related: ["web-apps-saas", "cloud-devops", "legacy-modernisation"],
  },
  {
    slug: "custom-erp-crm",
    name: "Custom ERP & CRM",
    group: "build",
    short: "Business systems shaped around how you actually work.",
    intro:
      "When off-the-shelf software forces your team into spreadsheets on the side, we build the system around your process instead: projects, inventory, billing, approvals, sales pipelines and the reports you actually read.",
    deliverables: [
      "Process mapping workshop with the people who'll use it",
      "Modules for your workflows: sales, projects, inventory, billing, HR",
      "Role-based permissions and approval chains",
      "Dashboards and exports for owners and finance",
      "Data migration from spreadsheets or your old system",
      "Training for your team",
    ],
    stack: ["React", "Next.js", "PostgreSQL", "Supabase", "Row-level security"],
    timeline: "10–20 weeks, released module by module",
    engagement: "Fixed quote per module",
    faqs: [
      { q: "Why not just use Zoho or Salesforce?", a: "Often you should, and we'll say so. Custom pays off when your process is your advantage, or when licence costs per seat get heavy." },
      { q: "Can it serve several companies or branches?", a: "Yes. We build multi-tenant systems where each branch or client company only ever sees its own data." },
    ],
    related: ["data-dashboards", "legacy-modernisation", "workflow-automation"],
  },
  {
    slug: "mvp-for-startups",
    name: "MVPs for startups",
    group: "build",
    short: "From idea to a launched product in fixed weeks.",
    intro:
      "You have an idea and a deadline. We cut it to the smallest version real users will pay for, build it in a fixed number of weeks, and launch it with analytics so you learn from day one.",
    deliverables: [
      "Scoping sprint: users, core flow and what to leave out",
      "Clickable prototype to test with real users",
      "Launched web or mobile MVP with payments if needed",
      "Analytics and feedback loop set up from launch",
      "Investor-ready demo and technical write-up",
    ],
    stack: ["Next.js", "React Native", "Supabase", "Stripe / Razorpay", "PostHog"],
    timeline: "6–10 weeks",
    engagement: "Fixed price, fixed timeline",
    faqs: [
      { q: "Do you take equity?", a: "No. We work for a fixed fee so you keep your cap table clean." },
      { q: "What happens after launch?", a: "You can keep us on a monthly plan to iterate, or hand over to your own hires with full docs." },
    ],
    related: ["ui-ux-design", "web-apps-saas", "fractional-cto"],
  },

  // ---------------------------------------------------------------- AI & data
  {
    slug: "ai-agents-chatbots",
    name: "AI agents & chatbots",
    group: "ai",
    short: "Agents that answer, qualify, book and follow up.",
    intro:
      "Agents that work on WhatsApp, web chat, email or voice. They answer from your own documents, qualify enquiries, book appointments and hand the warm ones to a human, so nothing waits until Monday.",
    deliverables: [
      "Agent design: what it may say, do and never do",
      "Knowledge base built from your approved documents",
      "Channels: WhatsApp, website chat, email, Instagram",
      "Actions: booking, CRM updates, payment links, reminders",
      "Human hand-off with alerts and escalation",
      "Weekly report on conversations and outcomes",
    ],
    stack: ["Claude", "OpenAI", "LangGraph", "WhatsApp Cloud API", "Supabase pgvector"],
    timeline: "3–6 weeks to go live",
    engagement: "Setup fee plus monthly running",
    faqs: [
      { q: "Will it make things up?", a: "It answers only from approved information. When it isn't sure, it says so and hands over to your team." },
      { q: "Does it speak Hindi or other Indian languages?", a: "Yes. Agents reply in the language the customer writes in, and we test each language on real conversations before launch." },
    ],
    related: ["llm-rag-integration", "whatsapp-payments", "workflow-automation"],
  },
  {
    slug: "llm-rag-integration",
    name: "LLM & RAG integration",
    group: "ai",
    short: "Add GPT or Claude to the products you already have.",
    intro:
      "Search that understands questions, copilots inside your app, document summaries and drafting tools. We connect language models to your data safely and measure whether the answers are any good.",
    deliverables: [
      "Use-case review: where AI saves real time, and where it doesn't",
      "Retrieval pipeline over your documents, database or tickets",
      "In-app AI features: search, summaries, drafting, classification",
      "Evaluation set to measure answer quality before launch",
      "Cost controls, caching and usage dashboards",
    ],
    stack: ["Claude", "OpenAI", "pgvector", "Pinecone", "LlamaIndex", "Python"],
    timeline: "3–8 weeks",
    engagement: "Fixed scope per feature",
    faqs: [
      { q: "Is our data used to train the model?", a: "No. We use enterprise API terms where your data isn't used for training, and keep sensitive data in your own cloud." },
      { q: "Which model do you use?", a: "Whichever does your task best for the cost. We test a few on your own examples before choosing." },
    ],
    related: ["ai-agents-chatbots", "data-dashboards", "ml-computer-vision"],
  },
  {
    slug: "data-dashboards",
    name: "Data & dashboards",
    group: "ai",
    short: "One place to see the numbers that run your business.",
    intro:
      "Sales, marketing spend, operations and finance live in different tools. We pull them into one place and build dashboards that answer the questions you ask every Monday.",
    deliverables: [
      "Metric definitions agreed with you, written down",
      "Data pipelines from your CRM, ads, sheets and databases",
      "A clean warehouse your team can query",
      "Dashboards for owners, sales and operations",
      "Scheduled reports by email or WhatsApp",
    ],
    stack: ["PostgreSQL", "BigQuery", "dbt", "Metabase", "Looker Studio", "Python"],
    timeline: "3–6 weeks",
    engagement: "Fixed quote, optional monthly upkeep",
    faqs: [
      { q: "We only use Excel. Is that enough to start?", a: "Yes. Most projects start with spreadsheets. We automate what you already track first." },
      { q: "Can we see ad spend against sales?", a: "Yes. Connecting Meta and Google ads to your CRM to show cost per booked visit or sale is a common first dashboard." },
    ],
    related: ["custom-erp-crm", "workflow-automation", "llm-rag-integration"],
  },
  {
    slug: "ml-computer-vision",
    name: "ML & computer vision",
    group: "ai",
    short: "Custom models for documents, images and video.",
    intro:
      "Reading invoices and IDs, checking product photos, counting stock from a camera, predicting demand. When a general model isn't enough, we train or tune one on your data.",
    deliverables: [
      "Feasibility check on a sample of your real data",
      "Data labelling plan and training set",
      "Trained model with accuracy measured on held-out data",
      "API or on-device deployment",
      "Monitoring for drift once it's live",
    ],
    stack: ["Python", "PyTorch", "OpenCV", "YOLO", "Cloud OCR"],
    timeline: "4–12 weeks",
    engagement: "Paid feasibility sprint, then fixed quote",
    faqs: [
      { q: "How much data do we need?", a: "It depends on the task. The feasibility sprint tells you, with your own data, before you commit to the full build." },
      { q: "Can it run without internet?", a: "Yes. Models can run on a phone or an edge device when connectivity is poor." },
    ],
    related: ["llm-rag-integration", "data-dashboards", "apis-backend"],
  },

  // ---------------------------------------------------------------- Automate & integrate
  {
    slug: "workflow-automation",
    name: "Workflow automation",
    group: "automate",
    short: "Connect your CRM, sheets, forms and inboxes.",
    intro:
      "Leads copied from portals by hand, follow-ups that depend on someone remembering, reports built every Friday. We connect your tools so the repetitive work happens on its own, and nothing falls through.",
    deliverables: [
      "Audit of the manual steps costing your team the most hours",
      "Automations across CRM, email, sheets, forms and WhatsApp",
      "Error alerts so a failed step never goes unnoticed",
      "A simple map of every automation and what it does",
      "Before-and-after report on hours saved",
    ],
    stack: ["n8n", "Make", "Zapier", "Google Apps Script", "Node.js"],
    timeline: "1–4 weeks",
    engagement: "Fixed quote, optional monthly care",
    faqs: [
      { q: "Do we need to change our tools?", a: "Usually not. We connect what you already use." },
      { q: "What if an automation breaks?", a: "Every flow alerts us and you when a step fails, and our care plan covers fixes." },
    ],
    related: ["whatsapp-payments", "ai-agents-chatbots", "custom-erp-crm"],
  },
  {
    slug: "whatsapp-payments",
    name: "WhatsApp API & payments",
    group: "automate",
    short: "WhatsApp Business API, Razorpay, Stripe, SMS and maps.",
    intro:
      "Your customers live on WhatsApp and pay by UPI. We set up the official WhatsApp Business API, payment gateways and messaging so confirmations, reminders and receipts go out on their own.",
    deliverables: [
      "WhatsApp Business API setup and template approval",
      "Automated confirmations, reminders and broadcasts",
      "Razorpay, Stripe or Cashfree checkout and payment links",
      "Webhooks that update your CRM or database on payment",
      "Refunds, invoices and reconciliation reports",
    ],
    stack: ["WhatsApp Cloud API", "Razorpay", "Stripe", "Cashfree", "MSG91", "Google Maps"],
    timeline: "1–3 weeks",
    engagement: "Fixed quote",
    faqs: [
      { q: "Will our number get banned?", a: "We use the official API with approved templates and opt-ins, which is how you avoid bans." },
      { q: "Can customers pay inside WhatsApp?", a: "Yes. We send payment links or use WhatsApp Pay where it's available for your business." },
    ],
    related: ["ai-agents-chatbots", "workflow-automation", "mobile-apps"],
  },
  {
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    group: "automate",
    short: "Cloud setup, CI/CD, monitoring and cost control.",
    intro:
      "Deploys that need one person and a prayer, surprise cloud bills, no backups. We set up your infrastructure so releases are routine, outages are rare and costs are predictable.",
    deliverables: [
      "Cloud accounts set up properly, in your name",
      "Automated build, test and deploy pipelines",
      "Backups, monitoring, uptime alerts and logs",
