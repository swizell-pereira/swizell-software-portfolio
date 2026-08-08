"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { systemTabs, type SystemTabId } from "@/lib/data/systems";
import { DiagramScrollViewport } from "@/components/diagrams/primitives";
import { cn } from "@/lib/utils";

export default function DiagramContainer() {
  const [active, setActive] = useState<SystemTabId>("bff");
  const current = systemTabs.find((item) => item.id === active)!;

  return (
    <div className="min-w-0 rounded-2xl bg-white/[0.03] shadow-[0_0_80px_rgba(37,99,235,0.08)] backdrop-blur-xl lg:overflow-hidden">
      <div className="flex min-w-0 flex-col lg:grid lg:grid-cols-[280px_1fr]">
        {/* Tabs — sticky below navbar on mobile */}
        <nav className="sticky top-16 z-30 bg-[#09090B]/95 backdrop-blur-md lg:static lg:bg-transparent lg:backdrop-blur-none">
          <div className="hidden px-5 py-4 lg:block">
            <p className="text-[11px] font-medium tracking-[0.2em] text-neutral-500 uppercase">
              System Design
            </p>
            <p className="mt-1 text-sm text-neutral-400">
              Interactive architecture
            </p>
          </div>

          <ul
            className="flex gap-1.5 overflow-x-auto p-3 [-webkit-overflow-scrolling:touch] scrollbar-none lg:block lg:space-y-1 lg:overflow-visible"
            role="tablist"
          >
            {systemTabs.map((item) => {
              const selected = item.id === active;
              return (
                <li key={item.id} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(item.id)}
                    className={cn(
                      "rounded-xl px-3.5 py-2.5 text-left transition-all duration-300 lg:w-full lg:py-3",
                      selected
                        ? "bg-blue-500/15 text-white shadow-[inset_0_0_0_1px_rgba(96,165,250,0.35)]"
                        : "text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-200"
                    )}
                  >
                    <span className="block text-sm font-medium whitespace-nowrap lg:whitespace-normal">
                      <span className="lg:hidden">{item.shortLabel}</span>
                      <span className="hidden lg:inline">{item.label}</span>
                    </span>
                    <span className="mt-0.5 hidden text-xs leading-5 text-neutral-500 lg:block">
                      {item.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Diagram panel — grows with content, scrolls on mobile */}
        <div className="min-h-0 min-w-0 p-4 sm:p-6 lg:min-h-[480px] lg:p-8" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 lg:mb-5">
                <h3 className="text-lg font-semibold tracking-tight text-white lg:text-xl">
                  {current.label}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {current.description}
                </p>
              </div>

              <DiagramScrollViewport>
                <current.Component />
              </DiagramScrollViewport>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
