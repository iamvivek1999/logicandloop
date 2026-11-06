# UI components: what we took and why

Picked from six free libraries on 6 Nov 2026. Each one has a job on the page; anything that was only decoration was left out. All are rebuilt in plain CSS + `motion`, without Tailwind, and all respect reduced motion.

| Where | Component | Source (licence) | Why it earns its place |
|---|---|---|---|
| Buttons, nav links | Text roll | Skiper UI skiper58 (free, attribution) | Hover feedback with character, no arrow chips |
| Secondary links | Drawn underline | Skiper UI skiper40 | Replaces outline pills |
| Services strip | Progressive blur edges | Skiper UI skiper41 | Edges fade instead of hard cut |
| Three kinds of agents | Expand on hover | Skiper UI skiper52 | One idea at a time, detail on demand |
| How it works | Card stack scroll | Skiper UI skiper16 | Steps read as a sequence |
| Closing headline | Letters converge on scroll | Skiper UI skiper31 | One memorable moment before the CTA |
| Minute One card | Animated list | Magic UI (MIT) | Shows the product working: enquiry to booked visit |
| Loop OS card | Animated beam | Magic UI (MIT) | Shows tools → agents → your approval |
| Why us | Text reveal on scroll | Magic UI (MIT) | Our honest pitch, read at the pace of the scroll |
| Service tabs | Animated background | Motion Primitives (MIT) | The highlight slides to the chosen tab |
| Hours calculator | Sliding number | Motion Primitives (MIT) | The result visibly rolls as inputs change |
| Main CTAs | Magnetic | Motion Primitives (MIT) | Small pull toward the cursor on the one action that matters |
| FAQs (home, products, services) | Accordion | Vengeance UI (MIT) | Smooth open/close, marigold rule on the open answer |
| Closing section | Dot grid | React Bits (MIT + Commons Clause) | Quiet texture that reacts to the cursor; loads only near the section, on a mouse |

## Considered and left out

- **Aceternity UI**: not open source on GitHub (copy from site only). Its spotlight, beam and 3D-card effects are also the most copied on the web, the look we're moving away from.
- **Cult UI**: mostly app UI (dynamic island, toolbars, polls) and Apple device mockups. Worth revisiting for Loop OS's product UI.
- **Animata**: large set of text effects and cards; nothing needed that the above don't already cover. Its bento grids could suit a future case-studies page.
- **Border beams, shimmer and rainbow buttons, aurora and gradient backgrounds, meteors, sparkles, cursor trails**: decoration that reads as templated.
- **Animmaster Lib**: paid only.

Code lives in `components/fx/`; styles in `app/refresh.css`. The vendored React Bits file is in `components/fx/vendor/` and is excluded from lint.
