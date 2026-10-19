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
