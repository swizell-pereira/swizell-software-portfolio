"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import {
  desktopNavLinks,
  menuSectionLinks,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

const drawerSpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 36,
};

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const { body, documentElement: html } = document;

    body.classList.add("menu-open");
    html.classList.add("menu-open");
    body.style.top = `-${scrollY}px`;

    return () => {
      body.classList.remove("menu-open");
      html.classList.remove("menu-open");
      body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const drawer = (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[180] touch-none bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />

          <motion.nav
            id="site-nav-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={drawerSpring}
            className="fixed inset-y-0 right-0 z-[190] flex h-dvh w-1/2 flex-col bg-[#111113]/98 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-sm font-semibold tracking-wide text-white">
                Menu
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex size-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="size-5" strokeWidth={1.75} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <p className="px-2 pb-2 text-[10px] font-medium tracking-[0.2em] text-neutral-500 uppercase">
                Pages
              </p>
              <ul className="space-y-0.5">
                {desktopNavLinks.map((link) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block rounded-xl px-3 py-3 text-base font-medium transition-colors",
                          active
                            ? "bg-blue-500/10 text-white"
                            : "text-neutral-300 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 px-2 pb-2 text-[10px] font-medium tracking-[0.2em] text-neutral-500 uppercase">
                Sections
              </p>
              <ul className="space-y-0.5">
                {menuSectionLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-xl px-3 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="site-nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex size-10 items-center justify-center rounded-lg text-neutral-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        {open ? (
          <X className="size-5" strokeWidth={1.75} />
        ) : (
          <Menu className="size-5" strokeWidth={1.75} />
        )}
      </button>

      {mounted ? createPortal(drawer, document.body) : null}
    </div>
  );
}
