"use client";

import { useState } from "react";
import {
  DiagramShell,
  DiagramNode,
  DiagramEdge,
  Packet,
  Hint,
} from "./primitives";

export const ARCHITECTURE_PATTERNS = {
  gateway: [
    "Frontend",
    "API Gateway",
    "Authentication",
    "Business Services",
    "Message Broker",
    "Database",
  ],
  microservices: [
    "Browser",
    "Backend API",
    "Microservices",
    "Cache",
    "Message Queue",
    "Database",
  ],
  fullstack: [
    "Browser",
    "Frontend",
    "Backend API",
    "Business Services",
    "Database",
  ],
} as const;

type PatternKey = keyof typeof ARCHITECTURE_PATTERNS;

type GenericArchitectureDiagramProps = {
  pattern?: PatternKey;
  steps?: string[];
  hint?: string;
  packetColor?: string;
};

export default function GenericArchitectureDiagram({
  pattern = "gateway",
  steps,
  hint = "Hover to animate the request flow — generic pattern, no proprietary details.",
  packetColor = "#60a5fa",
}: GenericArchitectureDiagramProps) {
  const [active, setActive] = useState(false);
  const layers = steps ?? ARCHITECTURE_PATTERNS[pattern];

  const nodeWidth = 200;
  const nodeHeight = 40;
  const centerX = 280;
  const startX = centerX - nodeWidth / 2;
  const gap = 56;
  const startY = 24;
  const viewHeight = startY + layers.length * (nodeHeight + gap) + 16;

  return (
    <div>
      <DiagramShell>
        <svg
          viewBox={`0 0 560 ${viewHeight}`}
          className="h-auto w-full"
          role="img"
          aria-label="Generic system architecture pattern"
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          {layers.map((label, i) => {
            const y = startY + i * (nodeHeight + gap);
            return (
              <g key={`${label}-${i}`}>
                <DiagramNode
                  x={startX}
                  y={y}
                  width={nodeWidth}
                  height={nodeHeight}
                  label={label}
                  glow={active}
                />
                {i < layers.length - 1 ? (
                  <DiagramEdge
                    x1={centerX}
                    y1={y + nodeHeight}
                    x2={centerX}
                    y2={y + nodeHeight + gap}
                    active={active}
                  />
                ) : null}
              </g>
            );
          })}

          {active &&
            layers.slice(0, -1).map((label, i) => {
              const y = startY + i * (nodeHeight + gap);
              return (
                <Packet
                  key={label}
                  x1={centerX}
                  y1={y + nodeHeight}
                  x2={centerX}
                  y2={y + nodeHeight + gap}
                  delay={i * 0.22}
                  color={packetColor}
                />
              );
            })}
        </svg>
      </DiagramShell>
      <Hint>{hint}</Hint>
    </div>
  );
}
