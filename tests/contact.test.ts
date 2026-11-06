import { describe, expect, it } from "vitest";
import { DEFAULT_TOPIC, extraTopics, isTopic, limits, topicFromParam, topicLabel, validateContact } from "@/lib/contact";
import { services } from "@/lib/services";

const valid = { name: "Asha Rao", email: "asha@example.com", message: "We need a booking app for our clinic." };

describe("validateContact", () => {
  it("accepts a complete enquiry", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("trims before checking", () => {
    expect(validateContact({ name: "  Asha ", email: " asha@example.com ", message: "  A real sentence here.  " })).toEqual({});
    expect(validateContact({ ...valid, name: "   " }).name).toBeDefined();
  });

  it("requires a name, an email and a message", () => {
    expect(Object.keys(validateContact({ name: "", email: "", message: "" })).sort()).toEqual(["email", "message", "name"]);
  });

  it.each(["asha", "asha@", "asha@example", "asha@example.c", "as ha@example.com", "@example.com"])("rejects the email %s", (email) => {
    expect(validateContact({ ...valid, email }).email).toBeDefined();
  });

  it.each(["a@b.co", "first.last+tag@sub.example.in"])("accepts the email %s", (email) => {
    expect(validateContact({ ...valid, email }).email).toBeUndefined();
  });

  it("enforces the length limits", () => {
    expect(validateContact({ ...valid, message: "Too short" }).message).toBeDefined();
    expect(validateContact({ ...valid, message: "x".repeat(limits.messageMin) }).message).toBeUndefined();
    expect(validateContact({ ...valid, message: "x".repeat(limits.messageMax + 1) }).message).toBeDefined();
    expect(validateContact({ ...valid, name: "x".repeat(limits.name + 1) }).name).toBeDefined();
    expect(validateContact({ ...valid, email: `${"x".repeat(limits.email)}@example.com` }).email).toBeDefined();
  });
});

describe("topic selection", () => {
  it("preselects any service or product topic from the link", () => {
    for (const s of services) expect(topicFromParam(s.slug)).toBe(s.slug);
    for (const t of extraTopics) expect(topicFromParam(t.value)).toBe(t.value);
  });

  it("falls back to the default for a missing or unknown topic", () => {
    expect(topicFromParam(null)).toBe(DEFAULT_TOPIC);
    expect(topicFromParam(undefined)).toBe(DEFAULT_TOPIC);
    expect(topicFromParam("")).toBe(DEFAULT_TOPIC);
    expect(topicFromParam("<script>")).toBe(DEFAULT_TOPIC);
    expect(isTopic(DEFAULT_TOPIC)).toBe(true);
  });

  it("has no topic value that clashes with a service slug", () => {
    for (const t of extraTopics) expect(services.some((s) => s.slug === t.value)).toBe(false);
  });

  it("labels topics for the email", () => {
    expect(topicLabel(services[0].slug)).toBe(services[0].name);
    expect(topicLabel("call")).toBe("A 30-minute intro call");
    expect(topicLabel("something-else")).toBe("something-else");
  });
});
