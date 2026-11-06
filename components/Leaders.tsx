import fs from "node:fs";
import path from "node:path";
import { site } from "@/lib/site";

/**
 * Leadership on the About page: a small portrait on the left with social links
 * under it, and a short note from each founder on the right. Portraits come
 * from public/team/<slug>.(webp|jpg|jpeg|png); without one, a monogram shows.
 */
function portrait(slug: string) {
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "team", `${slug}.${ext}`))) return `/team/${slug}.${ext}`;
  }
  return null;
}

const initials = (name: string) => name.split(" ").map((w) => w[0]).join("").slice(0, 2);

const icons = {
  linkedin: <path d="M6.5 8.5h-3v11h3v-11Zm-1.5-5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM20.5 13c0-2.9-1.6-4.7-4-4.7-1.4 0-2.4.7-2.9 1.6V8.5h-3v11h3v-6c0-1.4.7-2.3 1.9-2.3 1.1 0 1.8.8 1.8 2.3v6h3.2V13Z" fill="currentColor" />,
  x: <path d="M17.7 3.5h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4-5.6 6.4H2.1l7.3-8.3L1.7 3.5h6.4l4.4 5.8 5.2-5.8Zm-1.1 16.2h1.7L7.2 5.2H5.4l11.2 14.5Z" fill="currentColor" />,
  github: <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.7c-2.6.6-3.2-1.2-3.2-1.2-.4-1.1-1-1.4-1-1.4-.9-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.7 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.6 0 3.7-2.2 4.5-4.4 4.7.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" fill="currentColor" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></>,
  email: <><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" /></>,
} as const;

const label = { linkedin: "LinkedIn", x: "X", github: "GitHub", instagram: "Instagram", email: "Email" } as const;

export default function Leaders() {
  return (
    <ul className="leaders">
      {site.leaders.map((l) => {
        const src = portrait(l.slug);
        return (
          <li key={l.slug} className="leader">
            <div className="leader__side">
              <div className={`leader__photo${src ? "" : " leader__photo--mono"}`}>
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={`${l.name}, ${l.role} of Logic & Loop`} loading="lazy" width="960" height="1200" />
                ) : (
                  <span className="leader__mono" aria-hidden="true">{initials(l.name)}</span>
                )}
              </div>
              <ul className="leader__social" aria-label={`${l.name} on social media`}>
                {l.socials.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer me" aria-label={`${l.name} on ${label[s.kind]}`}>
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">{icons[s.kind]}</svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="leader__body">
              <blockquote className="leader__msg">
                <p>&ldquo;{l.message}&rdquo;</p>
              </blockquote>
              <figcaption>
                <span className="leader__name">{l.name}</span>
                <span className="leader__role">{l.role}, Logic &amp; Loop</span>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
