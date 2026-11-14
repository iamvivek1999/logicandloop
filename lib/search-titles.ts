import type { Service } from "@/lib/services";

/**
 * Page titles written the way people search, one per service.
 * The layout adds " | Logic & Loop". A service without an entry falls back to its name.
 */
export const searchTitles: Record<string, string> = {
  "web-apps-saas": "Web app and SaaS development company in India",
  "mobile-apps": "Mobile app development for iOS and Android",
  "websites-ecommerce": "Website and e-commerce development company",
  "apis-backend": "API and backend development services",
  "custom-erp-crm": "Custom ERP and CRM software development",
  "mvp-for-startups": "MVP development for startups, fixed price",
  "ai-agents-chatbots": "AI agent and chatbot development company in India",
  "llm-rag-integration": "LLM and RAG integration services",
  "data-dashboards": "Data dashboards and business reporting",
  "ml-computer-vision": "Machine learning and computer vision development",
  "workflow-automation": "Workflow automation services for business teams",
  "whatsapp-payments": "WhatsApp Business API and payment integration",
  "cloud-devops": "Cloud and DevOps services",
  "legacy-modernisation": "Legacy software modernisation services",
  "ui-ux-design": "UI/UX and product design services",
  "fractional-cto": "Fractional CTO and technology consulting",
  "qa-security-performance": "QA, security and performance audits",
  "ai-training-workshops": "AI training and workshops for teams",
  "maintenance-amc": "Software maintenance and AMC services",
  "dedicated-developers": "Hire dedicated developers in India",
  "online-assessments": "Online assessments for campus and off-campus hiring",
  "hiring-drives": "Managed campus hiring drives",
};

export const searchTitle = (s: Pick<Service, "slug" | "name">) => searchTitles[s.slug] ?? s.name;
