"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { mobileNavItems } from "@/lib/navigation";
import { RESUME_FILENAME } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 bg-[#09090B]/95 backdrop-blur-xl lg:hidden"
    >
      <ul className="flex items-stretch justify-between pb-[env(safe-area-inset-bottom)]">
        {mobileNavItems.map((item) => {
          const isActive = item.match(pathname);
          const Icon = item.icon;

          if (item.download) {
            return (
              <li key={item.label} className="min-w-0 flex-1">
                <a
                  href={item.href}
                  download={RESUME_FILENAME}
                  className={cn(
                    "relative flex min-h-14 flex-col items-center justify-center gap-0.5 py-2 text-neutral-500 transition-colors"
                  )}
                >
                  <Icon className="size-[18px] stroke-[1.75]" aria-hidden />
                  <span className="text-[9px] font-medium leading-none">
                    {item.label}
                  </span>
                </a>
              </li>
            );
          }

          return (
            <li key={item.label} className="min-w-0 flex-1">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex min-h-14 flex-col items-center justify-center gap-0.5 py-2 transition-colors",
                  isActive ? "text-white" : "text-neutral-500"
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="mobile-nav-indicator"
                    className="absolute inset-x-3 top-0 h-px bg-blue-500"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                ) : null}
                <Icon
                  className={cn(
                    "size-[18px] stroke-[1.75]",
                    isActive ? "text-blue-400" : "text-neutral-500"
                  )}
                  aria-hidden
                />
                <span className="text-[9px] font-medium leading-none">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
