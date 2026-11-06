/**
 * Industry pages (/industries/[slug]). Each one leads with the routine work
 * that costs that kind of business the most, shows a sample Minute One flow,
 * and points to the services that usually follow. Sample flows are
 * illustrative and use fictional businesses.
 */
export type ChatLine = { k: "in" | "out" | "sys"; t: string };

export type Industry = {
  slug: string;
  name: string;
  short: string;
  h1: string;
  intro: string;
  photo: "residential-tower" | "glass-atrium" | "computer-lab" | "young-team-walking" | "team-meeting";
  pains: { h: string; p: string }[];
  flow: ChatLine[];
  wins: string[];
  services: string[];
  faqs: { q: string; a: string }[];
};

export const industries: Industry[] = [
  {
    slug: "real-estate",
    name: "Real estate developers",
    short: "Answer every enquiry within a minute and book more site visits.",
    h1: "Every property enquiry answered, every site visit booked.",
    intro: "Leads from portals, ads and your website arrive at all hours, and the first developer to reply usually gets the visit. We make sure that's you, then keep the follow-up and the paperwork moving behind it.",
    photo: "residential-tower",
    pains: [
      { h: "Leads go cold overnight", p: "Portal and ad enquiries land after hours and on weekends. By the time sales replies, the buyer has spoken to three other projects." },
      { h: "Sales time spent on tyre-kickers", p: "Your team answers the same price, floor plan and possession questions all day before they find the serious buyers." },
      { h: "No single view of a buyer", p: "Enquiry in one tool, site visit in another, booking forms on paper. Nobody can see where a deal is stuck." },
    ],
    flow: [
      { k: "in", t: "Saw your ad. Is the 2-bedroom still available?" },
      { k: "out", t: "Yes, 2-bedroom homes are available on floors 4–12. When are you hoping to move?" },
      { k: "in", t: "Within a year. Can I visit on Saturday?" },
      { k: "sys", t: "Site visit booked · Saturday 11 am · Sales head alerted" },
    ],
    wins: ["Replies within a minute, from approved project information", "Qualifies budget, timeline and unit type before sales steps in", "Books site visits into your team's calendars", "Logs every lead and its source in your CRM"],
    services: ["whatsapp-payments", "custom-erp-crm", "workflow-automation", "data-dashboards"],
    faqs: [
      { q: "Will it quote prices we haven't approved?", a: "No. It answers only from the price lists, floor plans and FAQs you approve, and hands the conversation to a person when it's unsure." },
      { q: "Does it work with our CRM?", a: "Usually, yes. We connect to the CRM you already use, or set up a simple one if leads currently live in spreadsheets." },
    ],
  },
  {
    slug: "clinics",
    name: "Premium clinics",
    short: "Fill the diary without a bigger front desk.",
    h1: "A fuller diary, without a bigger front desk.",
    intro: "Patients message at night, ask the same treatment and price questions, and drop off when nobody answers. We answer them from your approved information, book consultations and send the reminders that cut no-shows.",
    photo: "glass-atrium",
    pains: [
      { h: "Missed messages, missed bookings", p: "Instagram, WhatsApp and website enquiries pile up while the front desk handles patients in the clinic." },
      { h: "No-shows waste chair time", p: "Without reminders and easy rescheduling, a share of every day's consultations simply don't arrive." },
      { h: "Follow-ups that never happen", p: "Post-treatment check-ins and repeat-session nudges depend on someone remembering to send them." },
    ],
    flow: [
      { k: "in", t: "How much is a consultation for laser treatment?" },
      { k: "out", t: "A consultation is adjusted against your first session. Tomorrow 5 pm or Thursday 11 am?" },
      { k: "in", t: "Thursday works." },
      { k: "sys", t: "Booked for Thursday 11 am · Reminder set for Wednesday" },
    ],
    wins: ["Answers treatment and price questions from your approved list", "Books consultations straight into your calendar", "Sends reminders and handles rescheduling", "Hands medical questions to your team, never guesses"],
    services: ["ai-agents-chatbots", "workflow-automation", "websites-ecommerce", "data-dashboards"],
    faqs: [
      { q: "Will it give medical advice?", a: "No. It answers only approved, non-clinical questions such as prices, timings and preparation, and routes anything clinical to your team." },
      { q: "Can patients still call?", a: "Of course. Minute One adds a fast reply on WhatsApp and your website; it doesn't replace your front desk." },
    ],
  },
  {
    slug: "education",
    name: "Education & edtech",
    short: "Turn course enquiries into counselling calls.",
    h1: "Course enquiries, turned into counselling calls.",
    intro: "Admissions teams lose students in the gap between an enquiry and the first conversation. We close that gap: questions answered from your prospectus, counselling slots booked and every lead tracked to enrolment.",
    photo: "computer-lab",
    pains: [
      { h: "Peaks you can't staff for", p: "Admission season brings more enquiries than counsellors can answer, so the fastest competitor wins the student." },
      { h: "The same ten questions", p: "Fees, batches, eligibility and placements. Counsellors repeat them all day instead of counselling." },
      { h: "Leads lost between tools", p: "Form fills, WhatsApp chats and walk-ins sit in different places, with no view of which campaign actually enrols students." },
    ],
    flow: [
      { k: "in", t: "Is the data science course weekend-only?" },
      { k: "out", t: "There are weekend and weekday-evening batches. Would a 15-minute call with a counsellor help?" },
      { k: "in", t: "Yes, please." },
      { k: "sys", t: "Counselling call booked · Lead added to CRM" },
    ],
    wins: ["Answers fee, batch and eligibility questions instantly", "Books counselling calls by course and language", "Tracks each lead from enquiry to enrolment", "Reports which campaigns bring students who enrol"],
    services: ["ai-agents-chatbots", "custom-erp-crm", "data-dashboards", "web-apps-saas"],
    faqs: [
      { q: "Can it handle several courses and campuses?", a: "Yes. It learns each course, batch and campus from your prospectus and books the right counsellor for each." },
      { q: "Do you also build learning platforms?", a: "Yes. Student portals, assessments and internal tools are part of our software engineering work." },
    ],
  },
  {
    slug: "startups",
    name: "Startups",
    short: "Ship the product and the operations behind it.",
    h1: "Ship the product, and the operations behind it.",
    intro: "Early teams need a product that works and a back office that doesn't eat the founders' week. We build the MVP on a fixed price and timeline, then automate the routine work around it.",
    photo: "young-team-walking",
    pains: [
      { h: "Runway spent on rewrites", p: "A rushed first build becomes the thing you have to throw away right when users arrive." },
      { h: "Founders doing ops by hand", p: "Onboarding, invoices, reports and demo scheduling quietly take hours every week." },
      { h: "Demo requests that wait", p: "Interested prospects fill in a form and hear back days later, if at all." },
    ],
    flow: [
      { k: "in", t: "Can I see how this works for a 20-person team?" },
      { k: "out", t: "Yes. I can arrange a product demo and answer a few questions first." },
      { k: "in", t: "Tomorrow afternoon works." },
      { k: "sys", t: "Demo booked · Sales owner alerted" },
    ],
    wins: ["An MVP on a fixed price and timeline", "Code, cloud and domains in your name from day one", "Onboarding, billing and reporting automated early", "Demo requests answered and booked within a minute"],
    services: ["mvp-for-startups", "web-apps-saas", "mobile-apps", "fractional-cto"],
    faqs: [
      { q: "Will we own the code?", a: "Yes. The repository, cloud accounts and domains are in your name from the first day." },
      { q: "Can you work with our in-house developers?", a: "Yes. We often build alongside a founding engineer and hand over with full documentation." },
    ],
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
