export const site = {
  name: "AIMCORP",
  legalName: "Applied Innovation Movement",
  tagline: "Technology for social action",
  description:
    "AIMCorp is a nonprofit building public-interest initiatives and collaborating with mission-driven organizations through technology, engineering, research, and innovation.",
  url: "https://www.aimcorp.org",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@aimcorp.org",
  paypal: "https://www.paypal.me/aimcorp",
  venmoPath: "/donate",
};

import { philanthropyNavItems } from "@/lib/programs";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/join", label: "Join us" },
  { href: "/contact", label: "Contact" },
];

export const philanthropyHub = { href: "/philanthropy", label: "Philanthropy" };

/** All historical programs nested under Philanthropy in the menu. */
export const philanthropyNav = philanthropyNavItems();
