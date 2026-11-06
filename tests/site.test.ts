import { describe, expect, it } from "vitest";
import { bookingHref, bookingReady, site, whatsappHref } from "@/lib/site";

describe("WhatsApp links", () => {
  it("uses an international number with digits only", () => {
    expect(site.whatsappNumber).toMatch(/^\d{11,15}$/);
  });

  it("builds a wa.me link with the default message", () => {
    const url = new URL(whatsappHref());
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe(`/${site.whatsappNumber}`);
    expect(url.searchParams.get("text")).toBe(site.whatsappMessage);
  });

  it("encodes a custom message so it arrives intact", () => {
    const text = "Hi! Pricing for 5 & 10 users? 50% off / ₹2 lakh #urgent";
    const url = new URL(whatsappHref(text));
    expect(url.searchParams.get("text")).toBe(text);
    // Raw spaces, "&" or "#" in the text would cut the message short.
    expect(whatsappHref(text).split("?text=")[1]).not.toMatch(/[ &#?]/);
  });
});

describe("booking link", () => {
  it("sends visitors to the call request page until a real booking URL is set", () => {
    if (bookingReady) expect(bookingHref).toBe(site.bookingUrl);
    else expect(bookingHref).toBe("/book");
  });
});
