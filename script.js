/* ================================================================
   Logic & Loop — EDIT THESE THREE VALUES, then redeploy.
   ================================================================ */
const CONFIG = {
  // WhatsApp number in international format, digits only (91 + 10-digit number).
  whatsappNumber: "918766008893",
  whatsappMessage: "Hi Logic & Loop, I'd like to talk about a project.",
  // Your Calendly / Google Calendar booking page link.
  bookingUrl: "https://calendly.com/your-link",
  // Where contact-form messages and the email link go.
  email: "logicandloophq@gmail.com",
};
/* ================================================================ */

(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const waReady = /^\d{10,15}$/.test(CONFIG.whatsappNumber);
  const bookReady = !/your-link/.test(CONFIG.bookingUrl);

  // Links: WhatsApp, booking, email. Until configured they fall back to the contact form.
  $$("[data-wa]").forEach(a => {
    if (waReady) {
      a.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
      a.target = "_blank"; a.rel = "noopener";
    } else a.href = "#contact";
  });
  $$("[data-book]").forEach(a => {
    if (bookReady) { a.href = CONFIG.bookingUrl; a.target = "_blank"; a.rel = "noopener"; }
    else a.href = "#contact";
  });
  $$("[data-email]").forEach(a => (a.href = `mailto:${CONFIG.email}`));
  $$("[data-email-text]").forEach(el => (el.textContent = CONFIG.email));

  // Pre-select the form topic from buttons like "Ask about a pilot".
  $$("[data-topic]").forEach(a => a.addEventListener("click", () => {
    const sel = $("#topic");
    if (sel) sel.value = a.dataset.topic;
  }));

  // Mobile nav
  const toggle = $(".nav__toggle"), menu = $("#nav-menu");
  const setMenu = open => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  // Nav border on scroll
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  // Reveal on scroll
  const items = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(el => io.observe(el));
  } else items.forEach(el => el.classList.add("is-in"));

  // Year
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  // Contact form → FormSubmit (emails each message to CONFIG.email; no backend needed)
  const form = $("#contact-form"), status = $(".form__status", form);
  form.addEventListener("submit", async e => {
    e.preventDefault();
    status.className = "form__status"; status.textContent = "";
    let ok = true;
    $$("[required]", form).forEach(f => {
      const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle("is-invalid", bad); if (bad) ok = false;
    });
    if (!ok) { status.classList.add("err"); status.textContent = "Please fill in your name, a valid email and a short message."; return; }
    if (form._honey.value) return; // bot

    const btn = $("button[type=submit]", form);
    btn.disabled = true; btn.textContent = "Sending…";
    const data = Object.fromEntries(new FormData(form));
    delete data._honey;
    data._subject = `New enquiry: ${data.topic} — ${data.name}`;
    data._template = "table";
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONFIG.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.classList.add("ok");
      status.textContent = "Thanks! Your message is on its way — we'll reply within one working day.";
    } catch {
      status.classList.add("err");
      status.innerHTML = `Something went wrong. Please email us at <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>.`;
    } finally {
      btn.disabled = false; btn.textContent = "Send message";
    }
  });
  $$("input, textarea", form).forEach(f => f.addEventListener("input", () => f.classList.remove("is-invalid")));
})();
