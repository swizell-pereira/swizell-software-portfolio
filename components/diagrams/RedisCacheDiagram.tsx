"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DiagramShell,
  DiagramNode,
  DiagramEdge,
  DiagramZone,
  DiagramChip,
  DiagramDashedEdge,
  DiagramLabel,
  Packet,
  Hint,
} from "./primitives";

export default function RedisCacheDiagram() {
  const [mode, setMode] = useState<"miss" | "hit" | null>(null);

  return (
    <div>
      <DiagramShell>
        <svg
          viewBox="0 0 560 400"
          className="h-auto w-full"
          role="img"
          aria-label="Redis cache flow with hit and miss paths"
        >
          <DiagramZone x={16} y={12} width={260} height={120} label="Request Path" />
          <DiagramZone x={16} y={148} width={528} height={240} label="Cache Layer" />

          {/* Flow labels */}
          <text x={32} y={48} fill="#71717a" fontSize={10} fontFamily="ui-monospace, monospace">
            1st request → Database (MISS)
          </text>
          <text x={32} y={64} fill="#71717a" fontSize={10} fontFamily="ui-monospace, monospace">
            2nd request → Redis (HIT)
          </text>
          <DiagramChip x={32} y={76} width={48} label="TTL" active={mode === "hit"} accent="gold" />

          {/* Client → API */}
          <DiagramNode x={40} y={180} width={100} label="Client" />
          <DiagramEdge x1={140} y1={198} x2={180} y2={198} active={!!mode} />
          <DiagramNode x={180} y={180} width={100} label="API" />

          {/* API → Redis (hit path) */}
          <DiagramEdge x1={280} y1={190} x2={320} y2={120} active={mode === "hit"} />
          <DiagramLabel x={296} y={148} text="cache lookup" active={mode === "hit"} />

          {/* API → Database (miss path) */}
          <DiagramEdge x1={280} y1={206} x2={320} y2={280} active={mode === "miss"} />
          <DiagramLabel x={296} y={248} text="cache miss" active={mode === "miss"} />

          {/* Redis */}
          <g onMouseEnter={() => setMode("hit")} onMouseLeave={() => setMode(null)}>
            <DiagramNode
              x={320}
              y={102}
              width={120}
              label="Redis"
              sublabel="TTL 300s"
              glow={mode === "hit"}
            />
          </g>

          {/* Database */}
          <g onMouseEnter={() => setMode("miss")} onMouseLeave={() => setMode(null)}>
            <DiagramNode
              x={320}
              y={262}
              width={120}
              label="Database"
              glow={mode === "miss"}
            />
          </g>

          {/* Write-back on miss */}
          <DiagramDashedEdge
            x1={380}
            y1={262}
            x2={380}
            y2={138}
            active={mode === "miss"}
            color="rgba(248,113,113,0.6)"
          />
          <DiagramLabel x={392} y={200} text="write-back" active={mode === "miss"} />

          {/* Return paths to client */}
          <DiagramEdge x1={320} y1={198} x2={140} y2={198} active={mode === "hit"} />
          <DiagramEdge x1={320} y1={198} x2={140} y2={198} active={mode === "miss"} />

          {mode === "miss" && (
            <>
              <Packet x1={280} y1={206} x2={320} y2={280} delay={0} color="#f87171" />
              <Packet x1={380} y1={280} x2={380} y2={138} delay={0.5} color="#f87171" />
              <Packet x1={380} y1={138} x2={230} y2={198} delay={0.9} color="#f87171" />
              <motion.g
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <text x={460} y={288} fill="#f87171" fontSize={11} fontWeight={600}>
                  MISS
                </text>
              </motion.g>
            </>
          )}

          {mode === "hit" && (
            <>
              <Packet x1={280} y1={190} x2={320} y2={120} delay={0} color="#34d399" />
              <Packet x1={380} y1={120} x2={230} y2={198} delay={0.6} color="#34d399" />
              <motion.g
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <text x={460} y={126} fill="#34d399" fontSize={11} fontWeight={600}>
                  HIT
                </text>
              </motion.g>
            </>
          )}
        </svg>
      </DiagramShell>
      <Hint>
        Hover Redis for a cache hit. Hover Database for a cache miss — includes
        write-back to Redis on first request.
      </Hint>
    </div>
  );
}
