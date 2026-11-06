/**
 * Careers at Logic & Loop. Every role below is a team we hire for; set `open: true`
 * on a role when it is actually hiring, and it shows as open with an Apply button.
 * While nothing is open, the page says so and offers the talent pool instead.
 *
 * Locations: edit `locations` to match where you really hire (add a city once
 * there is an office).
 */
import { site } from "@/lib/site";

export type DomainId = "engineering" | "ai-data" | "design" | "delivery" | "assessment" | "growth" | "early-careers";

export const domains: { id: DomainId; name: string; blurb: string }[] = [
  { id: "engineering", name: "Engineering", blurb: "Web, mobile, backend and cloud." },
  { id: "ai-data", name: "AI & data", blurb: "Agents, language models, data and ML." },
  { id: "design", name: "Design", blurb: "Research, product and interface design." },
  { id: "delivery", name: "Delivery", blurb: "Running engagements and architecture." },
  { id: "assessment", name: "Talent assessment", blurb: "Designing and running hiring assessments for clients." },
  { id: "growth", name: "Growth", blurb: "Sales, partnerships and marketing." },
  { id: "early-careers", name: "Early careers", blurb: "Internships and graduate roles." },
];

export const locations = ["Remote, India", "Hybrid, India"] as const;
export type Location = (typeof locations)[number];
export type Level = "Internship" | "Early career" | "Experienced" | "Senior";

export type Role = {
  slug: string;
  title: string;
  domain: DomainId;
  level: Level;
  location: Location[];
  type: "Full-time" | "Internship";
  open: boolean;
  summary: string;
  you: string[];
  bring: string[];
  bonus?: string[];
};

export const roles: Role[] = [
  // Engineering
  {
    slug: "full-stack-engineer", title: "Full-stack engineer", domain: "engineering", level: "Experienced",
    location: ["Remote, India", "Hybrid, India"], type: "Full-time", open: false,
    summary: "Build the web apps and portals our clients run their business on, from the database to the screen.",
    you: ["Ship features end to end in Next.js, TypeScript and Node.js", "Design data models and APIs with PostgreSQL", "Demo your work to clients every week on a live link", "Write the tests and docs that let a client's team take over"],
    bring: ["3+ years building production web apps", "Strong TypeScript and React", "Comfort talking to clients about trade-offs", "Care for performance, security and accessibility"],
    bonus: ["Multi-tenant SaaS experience", "Supabase or serverless deployments"],
  },
  {
    slug: "mobile-engineer", title: "Mobile engineer", domain: "engineering", level: "Experienced",
    location: ["Remote, India", "Hybrid, India"], type: "Full-time", open: false,
    summary: "Build iOS and Android apps from one codebase that customers keep on their home screen.",
    you: ["Build apps in React Native and Expo", "Integrate payments, maps, push and offline sync", "Own store submissions and release quality", "Work with designers on motion and detail"],
    bring: ["2+ years shipping mobile apps to both stores", "Strong React Native and TypeScript", "An eye for interaction detail"],
    bonus: ["Native modules in Swift or Kotlin", "Flutter experience"],
  },
  {
    slug: "backend-engineer", title: "Backend engineer", domain: "engineering", level: "Experienced",
    location: ["Remote, India"], type: "Full-time", open: false,
    summary: "Design the APIs, data and integrations that sit behind every product we build.",
    you: ["Build APIs and services in Node.js or Python", "Integrate CRMs, payment gateways and WhatsApp", "Model data for reliability and reporting", "Set up monitoring so problems are found before clients notice"],
    bring: ["3+ years of backend development", "Solid SQL and API design", "Experience with queues, jobs and webhooks"],
  },
  {
    slug: "devops-cloud-engineer", title: "DevOps & cloud engineer", domain: "engineering", level: "Senior",
    location: ["Remote, India"], type: "Full-time", open: false,
    summary: "Keep client systems fast, secure and affordable to run on AWS, GCP and Vercel.",
    you: ["Build CI/CD pipelines and infrastructure as code", "Plan for cost, uptime and backups", "Run security reviews and hardening", "Own on-call runbooks for the systems we manage"],
    bring: ["5+ years in DevOps or SRE", "Terraform, Docker and one major cloud in depth", "Calm, methodical incident handling"],
  },
  {
    slug: "qa-engineer", title: "QA engineer", domain: "engineering", level: "Early career",
    location: ["Remote, India", "Hybrid, India"], type: "Full-time", open: false,
    summary: "Find the bugs, holes and slow pages before our clients' customers do.",
    you: ["Write automated end-to-end tests with Playwright", "Run performance and accessibility checks", "Test releases across devices and browsers", "Report clearly, with steps and evidence"],
    bring: ["1+ year in testing or development", "Comfort with JavaScript", "A habit of asking “what if?”"],
  },
  // AI & data
  {
    slug: "ai-engineer", title: "AI engineer, agents", domain: "ai-data", level: "Experienced",
    location: ["Remote, India", "Hybrid, India"], type: "Full-time", open: false,
    summary: "Build AI agents that answer, qualify and act on real business tools, safely.",
    you: ["Build agents with Claude, GPT and Gemini APIs", "Design tools, guardrails and approval steps", "Measure quality with evaluations, not demos", "Work on Minute One and Loop OS as well as client builds"],
    bring: ["2+ years of software engineering", "Hands-on LLM application experience", "Strong Python or TypeScript", "A sceptical, test-first mindset about AI output"],
    bonus: ["Retrieval (RAG) and vector databases", "WhatsApp Business API"],
  },
  {
    slug: "data-engineer", title: "Data engineer", domain: "ai-data", level: "Experienced",
    location: ["Remote, India"], type: "Full-time", open: false,
    summary: "Turn scattered business data into pipelines and dashboards people trust.",
    you: ["Build pipelines with SQL, dbt and Python", "Model data for reporting and AI use", "Set up dashboards clients check every morning"],
    bring: ["3+ years in data engineering or analytics", "Excellent SQL", "Experience with a cloud warehouse"],
  },
  {
    slug: "ml-engineer", title: "ML engineer, vision & documents", domain: "ai-data", level: "Senior",
    location: ["Remote, India"], type: "Full-time", open: false,
    summary: "Build models that read documents, images and video for real business workflows.",
    you: ["Train and evaluate vision and document models", "Ship models behind reliable APIs", "Choose when a model is, and isn't, the right tool"],
    bring: ["4+ years in applied ML", "PyTorch and production deployment", "Clear writing about results and limits"],
  },
  // Design
  {
    slug: "product-designer", title: "Product designer", domain: "design", level: "Experienced",
    location: ["Remote, India", "Hybrid, India"], type: "Full-time", open: false,
    summary: "Design the flows, screens and systems our engineers build from, exactly.",
    you: ["Run research and map user flows", "Design in Figma, from wireframe to design system", "Prototype motion and interaction", "Sit in weekly client demos"],
    bring: ["3+ years designing web or mobile products", "A portfolio with shipped work and the reasoning behind it", "Comfort with design systems"],
  },
  // Delivery
  {
    slug: "delivery-manager", title: "Delivery manager", domain: "delivery", level: "Senior",
    location: ["Hybrid, India"], type: "Full-time", open: false,
    summary: "Run client engagements so they land on scope, on time and on the number that matters.",
    you: ["Turn briefs into written scopes and plans", "Run weekly demos and reporting", "Manage risk, change and client expectations", "Keep teams focused and unblocked"],
    bring: ["5+ years delivering software projects", "Technical enough to challenge an estimate", "Calm, clear client communication"],
  },
  {
    slug: "solutions-architect", title: "Solutions architect", domain: "delivery", level: "Senior",
    location: ["Remote, India", "Hybrid, India"], type: "Full-time", open: false,
    summary: "Shape the technical approach before the build, and the quote that goes with it.",
    you: ["Lead discovery workshops with clients", "Write architecture plans and estimates", "Review designs and code across projects"],
    bring: ["7+ years in software, several as a lead or architect", "Breadth across web, cloud, data and AI", "Strong written communication"],
  },
  // Talent assessment
  {
    slug: "assessment-designer", title: "Technical assessment designer", domain: "assessment", level: "Experienced",
    location: ["Remote, India"], type: "Full-time", open: false,
    summary: "Write the fresh, fair tests our clients use to hire engineers and graduates.",
    you: ["Design aptitude, coding and technical assessments by role", "Write new questions for every drive and review them for fairness", "Calibrate difficulty with clients' hiring teams", "Analyse results after each drive"],
    bring: ["3+ years as an engineer, trainer or assessment author", "Strong fundamentals in programming and CS", "Meticulous attention to detail"],
  },
  {
    slug: "drive-operations-lead", title: "Drive operations lead", domain: "assessment", level: "Experienced",
    location: ["Hybrid, India"], type: "Full-time", open: false,
    summary: "Run campus and off-campus hiring drives for clients, from registration to offers.",
    you: ["Plan drives with clients and college placement cells", "Run test-day help desks and candidate communication", "Schedule interviews and track offers", "Report on each drive"],
    bring: ["3+ years in campus hiring, recruitment ops or events", "Excellent organisation under pressure", "Clear communication in English and Hindi"],
  },
  {
    slug: "integrity-analyst", title: "Proctoring & integrity analyst", domain: "assessment", level: "Early career",
    location: ["Remote, India"], type: "Full-time", open: false,
    summary: "Review proctoring evidence and flag copied or AI-written answers, fairly.",
    you: ["Review proctoring flags and recordings", "Check code and answers for plagiarism and AI help", "Write evidence-backed integrity reports"],
    bring: ["A technical degree or 1+ year in a related role", "Good judgement and discretion with candidate data", "Ability to read code"],
  },
  // Growth
  {
    slug: "business-development", title: "Business development manager", domain: "growth", level: "Experienced",
    location: ["Hybrid, India"], type: "Full-time", open: false,
    summary: "Open conversations with businesses that need software, AI and hiring assessments.",
    you: ["Find and qualify new clients", "Run discovery calls with our solutions team", "Own proposals through to signature"],
    bring: ["3+ years selling technology services or SaaS", "A record of closing B2B deals", "Curiosity about how businesses actually run"],
  },
  {
    slug: "marketing-associate", title: "Marketing associate", domain: "growth", level: "Early career",
    location: ["Remote, India"], type: "Full-time", open: false,
    summary: "Tell the Logic & Loop story through content, campaigns and our own products.",
    you: ["Write posts, case studies and newsletters", "Run LinkedIn and search campaigns", "Measure what works and report on it"],
    bring: ["1+ year in B2B marketing or content", "Excellent written English", "Comfort with analytics tools"],
  },
  // Early careers
  {
    slug: "engineering-intern", title: "Software engineering intern", domain: "early-careers", level: "Internship",
    location: ["Remote, India", "Hybrid, India"], type: "Internship", open: false,
    summary: "Six months building real features alongside senior engineers, on client and product work.",
    you: ["Build and ship features with code review", "Pair with senior engineers every week", "Present your work in team demos"],
    bring: ["Final-year student or recent graduate", "Projects you can show us, in any language", "Eagerness to learn fast"],
  },
  {
    slug: "design-intern", title: "Product design intern", domain: "early-careers", level: "Internship",
    location: ["Remote, India"], type: "Internship", open: false,
    summary: "Six months designing flows and screens for live products, with mentorship.",
    you: ["Design screens and prototypes in Figma", "Join user research sessions", "Contribute to our design system"],
    bring: ["A portfolio, even with student projects", "A strong eye for type and layout"],
  },
];

export const domainName = (d: DomainId) => domains.find((x) => x.id === d)!.name;
export const openRoles = () => roles.filter((r) => r.open);

/** Email link for the talent pool (or an application, once a role is open). */
export const talentPool = (r?: Role) =>
  `mailto:${site.email}?subject=${encodeURIComponent(r ? `${r.open ? "Application" : "Talent pool"}: ${r.title}` : "Talent pool")}&body=${encodeURIComponent("Hi Logic & Loop,\n\nI'd like to be considered.\n\nLinkedIn or portfolio:\nCV attached.\n")}`;
