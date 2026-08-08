"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import NavMenu from "@/components/NavMenu";
import ProfilePhotoButton from "@/components/ProfilePhotoButton";
import {
  desktopNavLinks,
  getBackNavigation,
  isNavActive,
  resumeNavLink,
} from "@/lib/navigation";
import { RESUME_FILENAME } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const back = getBackNavigation(pathname);

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/20 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-6 py-2.5 md:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <ProfilePhotoButton />
          {back ? (
            <Link
              href={back.href}
              className={cn(
                "inline-flex shrink-0 items-center gap-0.5 rounded-lg py-1.5 pr-2 text-sm text-neutral-400 transition-colors hover:text-white",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              )}
              aria-label={`Back to ${back.label}`}
            >
              <ChevronLeft className="size-5" aria-hidden />
              <span>{back.label}</span>
            </Link>
          ) : null}
          <Link
            href="/"
            className={cn(
              "truncate text-lg font-semibold tracking-wide",
              back && "hidden sm:block"
            )}
          >
            Swizell Pereira
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden shrink-0 items-center gap-7 text-sm text-neutral-300 lg:flex">
          {desktopNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative transition-colors hover:text-white",
                isNavActive(link.href, pathname) && "text-white"
              )}
            >
              {link.label}
              {isNavActive(link.href, pathname) ? (
                <span className="absolute inset-x-0 -bottom-1 h-px bg-blue-500" />
              ) : null}
            </Link>
          ))}
          <a
            href={resumeNavLink.href}
            download={RESUME_FILENAME}
            className="rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white transition hover:shadow-[0_0_40px_rgba(37,99,235,0.45)]"
          >
            Resume
          </a>
          </div>
          <NavMenu />
        </div>
      </div>
    </nav>
  );
}
