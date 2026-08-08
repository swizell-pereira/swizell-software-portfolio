"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Rocket, Wrench } from "lucide-react";
import type { JourneyMilestone } from "@/lib/data/journey";
import { cn } from "@/lib/utils";

type JourneyMilestoneCardProps = {
  milestone: JourneyMilestone;
};

function SectionBlock({
  icon: Icon,
  label,
  items,
  accent,
}: {
  icon: typeof BookOpen;
  label: string;
  items: string[];
  accent?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className={cn("size-4", accent ?? "text-blue-400")} strokeWidth={1.75} />
        <p className="text-[11px] font-medium tracking-[0.18em] text-neutral-500 uppercase">
          {label}
        </p>
      </div>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-[15px] leading-6 text-neutral-300 md:text-base md:leading-7"
          >
            <span className="mt-2 size-1 shrink-0 rounded-full bg-white/20" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function JourneyMilestoneCard({
  milestone,
}: JourneyMilestoneCardProps) {
  return (
    <motion.div
      key={milestone.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-w-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.06] via-transparent to-transparent" />

      <div className="relative space-y-8 px-1 py-2 md:space-y-10 md:py-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-medium tracking-[0.2em] text-blue-400 uppercase">
              {milestone.date}
            </p>
            {milestone.badge ? (
              <span
                className={cn(
                  "text-[10px] font-medium tracking-wide uppercase",
                  milestone.isPromotion
                    ? "text-amber-400/90"
                    : milestone.isFinal
                      ? "text-emerald-400/90"
                      : "text-neutral-500"
                )}
              >
                {milestone.badge}
              </span>
            ) : null}
          </div>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-4xl">
            {milestone.role}
          </h3>
          {milestone.project && milestone.project !== milestone.badge ? (
            <p className="mt-1 text-sm text-neutral-500 md:text-base">
              {milestone.project}
            </p>
          ) : null}
        </div>

        <SectionBlock icon={BookOpen} label="Learned" items={milestone.learned} />

        <div className="flex justify-center py-1">
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <SectionBlock icon={Wrench} label="Built" items={milestone.built} />

        <div className="flex justify-center py-1">
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Rocket className="size-4 text-blue-400" strokeWidth={1.75} />
            <p className="text-[11px] font-medium tracking-[0.18em] text-neutral-500 uppercase">
              Outcome
            </p>
          </div>
          <p className="mt-3 text-[15px] leading-7 text-neutral-300 md:text-lg md:leading-8">
            {milestone.outcome}
          </p>
        </div>

        <div className="flex justify-center py-1">
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <ArrowRight className="size-4 text-neutral-500" strokeWidth={1.75} />
            <p className="text-[11px] font-medium tracking-[0.18em] text-neutral-500 uppercase">
              Next Challenge
            </p>
          </div>
          <p className="mt-3 text-[15px] font-medium leading-6 text-neutral-200 md:text-base">
            {milestone.nextChallenge}
          </p>
        </div>

        {milestone.finalQuote ? (
          <blockquote className="pl-0">
            <p className="text-lg leading-8 font-medium tracking-tight text-neutral-200 md:text-xl md:leading-9">
              &ldquo;{milestone.finalQuote}&rdquo;
            </p>
          </blockquote>
        ) : null}
      </div>
    </motion.div>
  );
}
