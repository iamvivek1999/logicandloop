import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import LoopStage from "@/components/scenes/LoopStage";
import { Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Loop OS: your own crew of AI agents, licensed",
  description:
    "Loop OS gives your team a crew of AI agents and the harness that runs them safely on your tools and data. Licensed per team, in our cloud or yours.",
};

const harness = [
  { h: "Agents with defined jobs", p: "Research, sales briefs, content, reporting, ops and support. Each has a clear role, tools and limits, not a blank chat box." },
  { h: "Workflows, encoded once", p: "The routines your team repeats, like a pre-call brief or a weekly client news digest, written down once and run on schedule or on demand." },
  { h: "Connected to your tools", p: "Email, calendar, Drive, Sheets, CRM, Slack and WhatsApp through official connectors, so agents work on real data." },
  { h: "Permissions and approvals", p: "Decide what each agent may read, write or send. Anything sensitive waits for a person to approve it." },
  { h: "Memory and audit log", p: "Agents remember your context across runs, and every action is logged with who asked, what ran and what changed." },
  { h: "Your choice of model", p: "Works with Claude, GPT and Gemini. Switch models per agent as prices and quality change." },
];

const plans = [
  {
    name: "Team",
    who: "For teams of 5–25 who want to start fast.",
    items: ["Hosted in our cloud", "Six ready-made agents", "Standard connectors", "Email support"],
    cta: "Join early access",
  },
  {
    name: "Business",
    who: "For companies that want agents built around their own process.",
    items: ["Everything in Team", "Custom workflows built by us", "Custom connectors to your systems", "Onboarding and training", "Priority support"],
    cta: "Talk to us",
    mark: true,
  },
  {
    name: "Self-hosted",
    who: "For teams whose data can't leave their own infrastructure.",
    items: ["Licence to run the harness on your cloud or servers", "Your own model keys", "Deployment and hardening support", "Annual licence with updates"],
    cta: "Request details",
