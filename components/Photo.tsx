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
