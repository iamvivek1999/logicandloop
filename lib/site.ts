/* ================================================================
   Logic & Loop — site settings. Edit these, commit, Vercel redeploys.
   ================================================================ */
export const site = {
  name: "Logic & Loop",
  url: "https://logicandloop.vivekbhange.tech",
  description:
    "Logic & Loop is a small senior engineering studio building web apps, mobile apps, AI agents and the automations that tie them together.",
  email: "logicandloophq@gmail.com",
  // International format, digits only: 91 + 10-digit number.
  whatsappNumber: "918766008893",
  whatsappMessage: "Hi Logic & Loop, I'd like to talk about a project.",
  // Your Calendly / Google Calendar appointment link. While it still contains
  // "your-link", every "Book a call" button opens the contact page instead.
  bookingUrl: "https://calendly.com/your-link",
  replyPromise: "within one working day",
  // Other spellings people type when they search for the studio.
  alternateNames: ["LogicAndLoop", "Logic and Loop", "Logic & Loop"],
  // Add the studio's own profile URLs here once they exist (LinkedIn company page,
  // GitHub organisation, Clutch, Crunchbase, X). Search engines use them to
  // connect those profiles to this site as one organisation.
  sameAs: [] as string[],
};

export const whatsappHref = (text = site.whatsappMessage) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const bookingReady = !/your-link/.test(site.bookingUrl);
export const bookingHref = bookingReady ? site.bookingUrl : "/contact?topic=call";
