import type { LucideIcon } from "lucide-react";
import { BookOpen, FileText, Home, Layers, Network } from "lucide-react";
import { RESUME_PATH } from "@/lib/site";

export type NavLink = {
  href: string;
  label: string;
  external?: boolean;
  download?: boolean;
};

export const desktopNavLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/systems", label: "Systems" },
  { href: "/about", label: "About" },
];

export const resumeNavLink: NavLink = {
  href: RESUME_PATH,
  label: "Resume",
  download: true,
};

export type MenuSectionLink = {
  href: string;
  label: string;
};

/** In-page anchors surfaced in the hamburger menu */
export const menuSectionLinks: MenuSectionLink[] = [
  { href: "/#work", label: "Work Preview" },
  { href: "/about#journey", label: "Career Journey" },
  { href: "/about#ecosystem", label: "Technology Ecosystem" },
  { href: "/about#principles", label: "Engineering Philosophy" },
  { href: "/about#leadership", label: "Leadership" },
  { href: "/#contact", label: "Contact" },
];

export type MobileNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  match: (pathname: string) => boolean;
  download?: boolean;
};

export const mobileNavItems: MobileNavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    match: (pathname) => pathname === "/",
  },
  {
    href: "/work",
    label: "Work",
    icon: Layers,
    match: (pathname) => pathname.startsWith("/work"),
  },
  {
    href: "/systems",
    label: "Systems",
    icon: Network,
    match: (pathname) => pathname.startsWith("/systems"),
  },
  {
    href: "/about",
    label: "About",
    icon: BookOpen,
    match: (pathname) => pathname.startsWith("/about"),
  },
  {
    href: RESUME_PATH,
    label: "Resume",
    icon: FileText,
    match: () => false,
    download: true,
  },
];

export function isNavActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export type BackNavigation = {
  href: string;
  label: string;
};

/** Parent route for the fixed back button — hidden on home. */
export function getBackNavigation(pathname: string): BackNavigation | null {
  if (pathname === "/") return null;
  if (pathname.startsWith("/work/")) return { href: "/work", label: "Work" };
  return { href: "/", label: "Home" };
}
