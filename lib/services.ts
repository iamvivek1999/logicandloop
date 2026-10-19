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
