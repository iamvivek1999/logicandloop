/* ================================================================
   Logic & Loop — site settings. Edit these, commit, Vercel redeploys.
   ================================================================ */
export const site = {
  name: "Logic & Loop",
  url: "https://logicandloop.vivekbhange.tech",
  description:
    "Logic & Loop is a technology services company. We engineer web and mobile platforms, AI agents and business automation, and run the systems our clients' operations depend on.",
  email: "logicandloophq@gmail.com",
  // International format, digits only: 91 + 10-digit number.
  whatsappNumber: "918766008893",
  whatsappMessage: "Hi Logic & Loop, I'd like to talk about a project.",
  // Your Calendly / Google Calendar appointment link. While it still contains
  // "your-link", every "Book a call" button opens the contact page instead.
  bookingUrl: "https://calendly.com/your-link",
  replyPromise: "within one working day",
  // Other spellings people type when they search for the company.
  alternateNames: ["LogicAndLoop", "Logic and Loop", "Logic & Loop"],
  // Add the company's own profile URLs here once they exist (LinkedIn company page,
  // GitHub organisation, Clutch, Crunchbase, X). Search engines use them to
  // connect those profiles to this site as one organisation.
  sameAs: [] as string[],
  // Leadership on the About page, and the founders in the organisation's structured data.
  // Portraits: public/team/<slug>.webp (or .jpg/.png); without one, a monogram shows.
  // `message`: a short note from each founder (DRAFT: edit in your own words).
  // `socials`: add more as profiles go live, e.g. { kind: "x", url: "https://x.com/..." }.
  leaders: [
    {
      slug: "harshita-kadam",
      name: "Harshita Kadam",
      role: "Founder",
      linkedin: "https://www.linkedin.com/in/harshitarajpalkadam/",
      message:
        "I started Logic & Loop because too many good businesses lose their best hours to work a system should do. We take on that work, agree the one number that matters, and answer for it every week.",
      socials: [{ kind: "linkedin", url: "https://www.linkedin.com/in/harshitarajpalkadam/" }],
    },
    {
      slug: "vivek-bhange",
      name: "Vivek Bhange",
      role: "Co-founder",
      linkedin: "https://www.linkedin.com/in/viveksainathbhange/",
      message:
        "We build software the way we'd want it built for us: a fixed scope, a demo every week, and code that's yours from day one. If it doesn't run reliably on a Monday morning, it isn't finished.",
      socials: [{ kind: "linkedin", url: "https://www.linkedin.com/in/viveksainathbhange/" }],
    },
  ] as { slug: string; name: string; role: string; linkedin: string; message: string; socials: { kind: "linkedin" | "x" | "github" | "instagram" | "email"; url: string }[] }[],
};

// Shared Open Graph fields. A page that sets its own `openGraph` replaces the
// layout's whole object, so spread this first to keep these.
export const baseOpenGraph = {
  type: "website",
  siteName: site.name,
  locale: "en_IN",
} as const;

export const whatsappHref = (text = site.whatsappMessage) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;

// Remembers that the visitor closed the announcement bar. Change the value when
// the announcement changes, so everyone sees the new one.
export const NOTE_KEY = "ll-note-loop-os";

export const bookingReady =!/your-link/.test(site.bookingUrl);
export const bookingHref = bookingReady ? site.bookingUrl : "/book";
