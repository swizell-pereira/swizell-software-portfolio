"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function DiagramShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08),transparent_55%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function DiagramNode({
  x,
  y,
  width = 120,
  height = 36,
  label,
  active,
  glow,
  onHover,
  sublabel,
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  label: string;
  active?: boolean;
  glow?: boolean;
  onHover?: (v: boolean) => void;
  sublabel?: string;
}) {
  return (
    <g
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className="cursor-pointer"
    >
      {(active || glow) && (
        <rect
          x={x - 4}
          y={y - 4}
          width={width + 8}
          height={height + 8}
          rx={12}
          fill="rgba(37,99,235,0.15)"
          stroke="rgba(96,165,250,0.35)"
          strokeWidth={1}
        />
      )}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={10}
        fill={active || glow ? "rgba(37,99,235,0.25)" : "rgba(255,255,255,0.04)"}
        stroke={active || glow ? "rgba(96,165,250,0.7)" : "rgba(255,255,255,0.12)"}
        strokeWidth={1.5}
        className="transition-all duration-300"
      />
      <text
        x={x + width / 2}
        y={y + height / 2 + (sublabel ? -4 : 4)}
        textAnchor="middle"
        fill={active || glow ? "#fff" : "#d4d4d8"}
        fontSize={12}
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        fontWeight={500}
      >
        {label}
      </text>
      {sublabel ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 12}
          textAnchor="middle"
          fill="#71717a"
          fontSize={9}
          fontFamily="var(--font-geist-mono), monospace"
        >
          {sublabel}
        </text>
      ) : null}
    </g>
  );
}

export function DiagramEdge({
  x1,
  y1,
  x2,
  y2,
  active,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={active ? "rgba(96,165,250,0.7)" : "rgba(255,255,255,0.15)"}
      strokeWidth={active ? 2 : 1.5}
      className="transition-all duration-300"
    />
  );
}

export function Packet({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
  color = "#60a5fa",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  color?: string;
}) {
  return (
    <motion.circle
      r={3.5}
      fill={color}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        cx: [x1, x2],
        cy: [y1, y2],
      }}
      transition={{
        duration: 1.6,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 px-1 text-xs leading-5 text-neutral-500">{children}</p>
  );
}

export function DiagramZone({
  x,
  y,
  width,
  height,
  label,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={14}
        fill="rgba(255,255,255,0.02)"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={1}
      />
      <text
        x={x + 14}
        y={y + 18}
        fill="#52525b"
        fontSize={10}
        fontWeight={500}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.12em"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

export function DiagramLabel({
  x,
  y,
  text,
  active,
}: {
  x: number;
  y: number;
  text: string;
  active?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill={active ? "#93c5fd" : "#52525b"}
      fontSize={9}
      fontFamily="ui-monospace, monospace"
      className="transition-all duration-300"
    >
      {text}
    </text>
  );
}

export function DiagramDashedEdge({
  x1,
  y1,
  x2,
  y2,
  active,
  color = "rgba(52,211,153,0.6)",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
  color?: string;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={active ? color : "rgba(255,255,255,0.12)"}
      strokeWidth={active ? 2 : 1.5}
      strokeDasharray="6 4"
      className="transition-all duration-300"
    />
  );
}

export function DiagramChip({
  x,
  y,
  width,
  label,
  active,
  accent,
  onHover,
}: {
  x: number;
  y: number;
  width: number;
  label: string;
  active?: boolean;
  accent?: "gold" | "blue";
  onHover?: (v: boolean) => void;
}) {
  const fill =
    active && accent === "gold"
      ? "rgba(251,191,36,0.25)"
      : active
        ? "rgba(37,99,235,0.35)"
        : "rgba(255,255,255,0.06)";
  const stroke =
    active && accent === "gold"
      ? "rgba(251,191,36,0.8)"
      : active
        ? "rgba(96,165,250,0.8)"
        : "rgba(255,255,255,0.12)";
  const textFill =
    active && accent === "gold" ? "#fbbf24" : active ? "#fff" : "#a1a1aa";

  return (
    <g
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className="cursor-pointer"
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={22}
        rx={6}
        fill={fill}
        stroke={stroke}
        className="transition-all duration-300"
      />
      <text
        x={x + width / 2}
        y={y + 15}
        textAnchor="middle"
        fill={textFill}
        fontSize={10}
        fontFamily="ui-sans-serif, system-ui"
        className="transition-all duration-300"
      >
        {label}
      </text>
    </g>
  );
}
