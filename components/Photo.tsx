import Image from "next/image";

/**
 * A site photo. It wipes up into view the first time it scrolls in (see
 * [data-reveal="photo"] in app/refresh.css), and is served resized by next/image.
 * Photos live in public/images; sources and licences are listed in IMAGES.md.
 */
export const photos = {
  "team-meeting": { w: 1600, h: 900, alt: "A team in a meeting room, discussing a project around a table" },
  "desk-laptop": { w: 1600, h: 1067, alt: "A laptop showing code on a wooden desk, with headphones and a phone" },
  "code-screen": { w: 1600, h: 1067, alt: "Code on a laptop screen in a dark room" },
  "computer-lab": { w: 1600, h: 900, alt: "Rows of students working at computers in a lab" },
  "friends-campus": { w: 1237, h: 1600, alt: "A group of young graduates sitting together outdoors" },
  "young-team-walking": { w: 1600, h: 898, alt: "Five young professionals walking together and laughing" },
  "exam-hall": { w: 1600, h: 1200, alt: "Candidates writing a test at a table" },
  "analytics-dashboard": { w: 1600, h: 1067, alt: "Analytics charts on a laptop screen" },
  "residential-tower": { w: 1600, h: 1202, alt: "A residential tower block under a clear sky" },
  "sea-link": { w: 1600, h: 940, alt: "The Bandra–Worli Sea Link in Mumbai with the city skyline behind it" },
  "network-cables": { w: 1600, h: 898, alt: "Network cables plugged into a server rack" },
  "city-window": { w: 1600, h: 1200, alt: "A young professional with a tablet looking out over city towers" },
  "team-laptops": { w: 1600, h: 1068, alt: "A team working on laptops around a shared table" },
  "team-whiteboard": { w: 1600, h: 900, alt: "Colleagues planning together in front of a chalk wall" },
  "whiteboard-sketch": { w: 1600, h: 1067, alt: "Hands sketching a product flow on a whiteboard" },
  "pair-coding": { w: 1600, h: 1068, alt: "Two colleagues reviewing code together on a laptop" },
  "glass-atrium": { w: 1600, h: 1067, alt: "A bright glass and steel atrium" },
} as const;

export type PhotoName = keyof typeof photos;

/**
 * Generated cover illustrations (16:9, 1600x900) in public/images/gen, made and
 * approved with Image Studio from the prompts in docs/image-prompts.md. They
 * carry their own title and labels, so they are never cropped (see .photo--cover).
 */
export const covers = {
  "web-apps-saas": "Illustration of a customer dashboard serving three separate tenants, with login, roles and an admin panel",
  "mobile-apps": "Illustration of the same booking app on two phones, built from one codebase",
  "websites-ecommerce": "Illustration of an online store on a laptop and phone, with an Add to cart button, editable content and a speed gauge",
  "apis-backend": "Illustration of a database and server connected to payments, CRM, messaging and ERP, with auth and roles",
  "custom-erp-crm": "Illustration of business modules for sales, projects, inventory, billing and HR, and a three-step approval chain",
  "mvp-for-startups": "Illustration of a timeline from scope to prototype, build and launch in 6 to 10 weeks, ending in a rocket launch",
  "ai-agents-chatbots": "Illustration of a chat agent booking a visit and triggering bookings, CRM updates, payment links and reminders",
  "llm-rag-integration": "Illustration of documents retrieved into a language model that answers with cited sources",
  "data-dashboards": "Illustration of CRM, ads, sheets and database data flowing into one warehouse and a dashboard of revenue, leads and conversion",
  "ml-computer-vision": "Illustration of fields detected on an invoice and boxes detected in a warehouse, with 97% accuracy",
  "workflow-automation": "Illustration of an automated flow from a new form entry to the CRM, WhatsApp and a sheet, with an error alert",
  "whatsapp-payments": "Illustration of a WhatsApp booking confirmation with a Pay now button, a paid receipt and a webhook updating the CRM",
  "cloud-devops": "Illustration of a code, build, test and deploy pipeline to staging and production, with 99.9% uptime",
  "legacy-modernisation": "Illustration of an old business system being moved module by module to a modern app with no downtime",
  "ui-ux-design": "Illustration of a sketch becoming wireframes and then polished mobile and desktop screens",
  "fractional-cto": "Illustration of an architecture diagram, a quarterly roadmap and a recorded decision, a few days a month",
  "qa-security-performance": "Illustration of a website under a magnifying glass, with bugs found, security checked and Core Web Vitals",
  "ai-training-workshops": "Illustration of a team in a workshop learning a prompt, draft and review routine, with a prompt library",
  "maintenance-amc": "Illustration of a monthly maintenance calendar, an all-systems-operational panel, patches, bug fixes and backups",
  "dedicated-developers": "Illustration of developers joining a team's task board within a week, with senior code review",
  "online-assessments": "Illustration of a proctored online test with aptitude, coding and technical sections, a timer and face checks",
  "hiring-drives": "Illustration of a hiring funnel from registration to assessment, interviews and offers, with a live drive dashboard",
  "minute-one": "Illustration of a lead's WhatsApp message answered within a minute and a visit booked",
  "loop-os": "Illustration of sales, ops and support agents connected to WhatsApp, CRM and sheets, with approvals and an audit trail",
  "real-estate": "Illustration of a property enquiry answered within a minute and a site visit booked, beside a residential tower",
  "clinics": "Illustration of a clinic diary filling with consultations booked by chat, with reminders sent",
  "education": "Illustration of a course enquiry turned into a booked counselling call, from enquiry to enrolment",
  "startups": "Illustration of a product launching from a laptop, with the MVP shipped, billing automated and code in the founder's name",
} as const;

export type CoverId = keyof typeof covers;
export const hasCover = (id: string): id is CoverId => id in covers;

/** A generated cover, with the same reveal and framing as a photo but kept at 16:9. */
export function Cover({ id, className = "", sizes = "(max-width: 860px) 100vw, 50vw", priority = false }: { id: CoverId; className?: string; sizes?: string; priority?: boolean }) {
  return (
    <figure className={`photo photo--cover ${className}`} data-reveal={priority ? undefined : "photo"}>
      <Image src={`/images/gen/${id}.webp`} width={1600} height={900} alt={covers[id]} sizes={sizes} priority={priority} />
    </figure>
  );
}

export default function Photo({
  name,
  className = "",
  sizes = "(max-width: 860px) 100vw, 50vw",
  priority = false,
  alt,
}: {
  name: PhotoName;
  className?: string;
  sizes?: string;
  priority?: boolean;
  alt?: string;
}) {
  const p = photos[name];
  return (
    <figure className={`photo ${className}`} data-reveal={priority ? undefined : "photo"}>
      <Image src={`/images/${name}.webp`} width={p.w} height={p.h} alt={alt ?? p.alt} sizes={sizes} priority={priority} />
    </figure>
  );
}
