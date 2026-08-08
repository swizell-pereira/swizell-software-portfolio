"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import EngineerAvatar from "@/components/journey/EngineerAvatar";
import JourneyMilestoneCard from "@/components/journey/JourneyMilestoneCard";
import {
  journeyCount,
  journeyMilestones,
  type JourneyMilestone,
} from "@/lib/data/journey";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 380, damping: 32 };

function MilestoneNode({
  milestone,
  index,
  isActive,
  isPast,
  onSelect,
  nodeRef,
}: {
  milestone: JourneyMilestone;
  index: number;
  isActive: boolean;
  isPast: boolean;
  onSelect: () => void;
  nodeRef: (el: HTMLButtonElement | null) => void;
}) {
  const isFinal = milestone.isFinal;

  return (
    <button
      ref={nodeRef}
      type="button"
      onClick={onSelect}
      aria-label={`${milestone.date} — ${milestone.role}`}
      aria-current={isActive ? "step" : undefined}
      className="group relative flex shrink-0 flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
    >
      <motion.div
        animate={{
          scale: isActive ? 1.35 : isPast ? 1 : 0.85,
          opacity: isActive ? 1 : isPast ? 0.85 : 0.35,
        }}
        transition={spring}
        className="relative flex size-8 items-center justify-center md:size-9"
      >
        {isFinal ? (
          <Star
            className={cn(
              "size-4 transition-colors md:size-5",
              isActive
                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.55)]"
                : isPast
                  ? "fill-blue-400/80 text-blue-400/80"
                  : "fill-none text-neutral-600"
            )}
            strokeWidth={1.5}
          />
        ) : (
          <>
            {isActive ? (
              <motion.span
                layoutId="journey-node-glow"
                className="absolute inset-0 rounded-full bg-blue-500/25 blur-md"
                transition={spring}
              />
            ) : null}
            <span
              className={cn(
                "relative block rounded-full transition-colors",
                isActive
                  ? "size-3.5 bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.65)] md:size-4"
                  : isPast
                    ? "size-2.5 bg-blue-400/70 md:size-3"
                    : "size-2.5 bg-neutral-600/50 md:size-3",
                milestone.isPromotion &&
                  !isActive &&
                  "bg-amber-500/30"
              )}
            />
          </>
        )}
      </motion.div>

      <motion.span
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 4,
          height: isActive ? "auto" : 0,
        }}
        transition={{ duration: 0.25 }}
        className="mt-2 hidden overflow-hidden text-[10px] font-medium tracking-wide text-neutral-500 uppercase md:block"
      >
        {milestone.date.split(" ")[0]}
      </motion.span>
    </button>
  );
}

export default function PromotionJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [walking, setWalking] = useState(false);
  const [avatarX, setAvatarX] = useState(0);
  const [pathWidth, setPathWidth] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);

  const milestone = journeyMilestones[activeIndex];

  const measure = useCallback(() => {
    const track = trackRef.current;
    const path = pathRef.current;
    const node = nodeRefs.current[activeIndex];
    if (!track || !node) return;

    const trackRect = track.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    setAvatarX(nodeRect.left - trackRect.left + nodeRect.width / 2);

    if (path) {
      const pathRect = path.getBoundingClientRect();
      const firstNode = nodeRefs.current[0];
      const activeNode = nodeRefs.current[activeIndex];
      if (firstNode && activeNode) {
        const firstRect = firstNode.getBoundingClientRect();
        const activeRect = activeNode.getBoundingClientRect();
        const start =
          firstRect.left - pathRect.left + firstRect.width / 2;
        const end =
          activeRect.left - pathRect.left + activeRect.width / 2;
        setPathWidth(Math.max(0, end - start));
      }
    }
  }, [activeIndex]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const scrollToIndex = useCallback((index: number) => {
    const node = nodeRefs.current[index];
    const scroller = scrollRef.current;
    if (!node || !scroller) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const offset =
      nodeRect.left -
      scrollerRect.left -
      scrollerRect.width / 2 +
      nodeRect.width / 2;
    scroller.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(journeyCount - 1, index));
      if (next === activeIndex) return;
      setWalking(true);
      setActiveIndex(next);
      scrollToIndex(next);
      window.setTimeout(() => setWalking(false), 520);
    },
    [activeIndex, scrollToIndex]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      if (e.deltaY > 0) goNext();
      else goPrev();
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    return () => scroller.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) < 48) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  return (
    <section
      id="journey"
      className="relative flex min-h-[100dvh] flex-col px-4 py-16 md:min-h-0 md:px-8 md:py-28"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.12),transparent)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-10 md:mb-16"
        >
          <p className="text-[11px] font-medium tracking-[0.22em] text-blue-400 uppercase">
            Career Growth
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            The Journey Behind Every Promotion
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500 md:text-base">
            Follow the path from trainee to senior engineer — one milestone at a
            time.
          </p>
        </motion.div>

        {/* Journey path */}
        <div ref={trackRef} className="relative mb-6 md:mb-10">
          <div
            ref={scrollRef}
            className="scrollbar-none -mx-4 snap-x snap-mandatory overflow-x-auto px-4 pb-2 md:mx-0 md:overflow-visible md:px-0 md:snap-none"
            onScroll={() => {
              const scroller = scrollRef.current;
              if (!scroller || window.innerWidth >= 768) return;
              const center = scroller.scrollLeft + scroller.clientWidth / 2;
              let closest = activeIndex;
              let minDist = Infinity;
              nodeRefs.current.forEach((node, i) => {
                if (!node) return;
                const nodeCenter =
                  node.offsetLeft + node.offsetWidth / 2;
                const dist = Math.abs(center - nodeCenter);
                if (dist < minDist) {
                  minDist = dist;
                  closest = i;
                }
              });
              if (closest !== activeIndex) {
                setWalking(true);
                setActiveIndex(closest);
                window.setTimeout(() => setWalking(false), 520);
              }
            }}
          >
            <div
              ref={pathRef}
              className="relative mx-auto flex min-w-max items-center gap-0 px-[38vw] md:min-w-0 md:justify-between md:px-0"
            >
              {/* Base path line */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-4 right-[38vw] left-[38vw] h-px bg-neutral-800 md:right-0 md:left-0"
              />

              {/* Glowing progress path */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute top-4 left-[38vw] h-px origin-left bg-gradient-to-r from-blue-500/20 via-blue-400 to-blue-300 shadow-[0_0_16px_rgba(96,165,250,0.45)] md:left-0"
                animate={{ width: pathWidth }}
                transition={spring}
                style={{ maxWidth: "100%" }}
              />

              {journeyMilestones.map((m, i) => (
                <div
                  key={m.id}
                  className="flex w-[76vw] shrink-0 snap-center items-center md:w-auto md:flex-1 md:justify-center"
                >
                  {i > 0 ? (
                    <div
                      aria-hidden
                      className="hidden h-px flex-1 bg-transparent md:block"
                    />
                  ) : null}
                  <MilestoneNode
                    milestone={m}
                    index={i}
                    isActive={i === activeIndex}
                    isPast={i < activeIndex}
                    onSelect={() => goTo(i)}
                    nodeRef={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                  />
                  {i < journeyCount - 1 ? (
                    <div
                      aria-hidden
                      className="hidden h-px flex-1 bg-transparent md:block"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Walking avatar */}
          <motion.div
            className="pointer-events-none absolute top-9 z-10 -translate-x-1/2 md:top-10"
            animate={{ left: avatarX }}
            transition={spring}
            onAnimationComplete={measure}
          >
            <EngineerAvatar walking={walking} />
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="mb-5 flex items-center justify-center gap-1.5 md:mb-8">
          {journeyMilestones.map((m, i) => (
            <button
              key={m.id}
              type="button"
              aria-label={`Go to ${m.date}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-6 bg-blue-400"
                  : i < activeIndex
                    ? "w-1.5 bg-blue-400/50"
                    : "w-1.5 bg-neutral-800"
              )}
            />
          ))}
        </div>

        {/* Single content card */}
        <div className="relative min-h-0 flex-1 overflow-y-auto md:min-h-[420px] md:overflow-visible">
          <AnimatePresence mode="wait">
            <JourneyMilestoneCard key={milestone.id} milestone={milestone} />
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4 md:mt-12">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-25"
          >
            <ChevronLeft className="size-4" strokeWidth={1.75} />
            Previous
          </button>

          <p className="text-xs font-medium tracking-widest text-neutral-600 uppercase">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(journeyCount).padStart(2, "0")}
          </p>

          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex === journeyCount - 1}
            className="flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-25"
          >
            Next
            <ChevronRight className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}
