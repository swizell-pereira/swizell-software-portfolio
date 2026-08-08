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

type Mode = "hit" | "miss" | null;

export default function RedisCacheDiagram() {
  const [mode, setMode] = useState<Mode>(null);

  const hit = mode === "hit";
  const miss = mode === "miss";

  return (
    <div>
      <DiagramShell canvasWidth={720}>
        <svg
          viewBox="0 0 720 520"
          className="h-auto w-full"
          role="img"
          aria-label="Cache-aside pattern with Redis hit and miss paths"
        >
          <DiagramZone x={16} y={12} width={688} height={72} label="Client" />
          <DiagramZone x={16} y={92} width={688} height={88} label="Application" />
          <DiagramZone x={16} y={188} width={688} height={120} label="Cache" />
          <DiagramZone x={16} y={316} width={688} height={88} label="Data" />

          {/* Client */}
          <DiagramNode x={300} y={32} width={120} label="Client" active={!!mode} />

          {/* Application tier */}
          <DiagramEdge x1={360} y1={68} x2={360} y2={108} active={!!mode} />
          <DiagramNode
            x={260}
            y={108}
            width={200}
            height={44}
            label="API / Service Layer"
            sublabel="cache-aside logic"
            active={!!mode}
          />

          {/* Cache lookup */}
          <DiagramEdge x1={360} y1={152} x2={360} y2={200} active={!!mode} />
          <DiagramLabel x={372} y={182} text="GET cache key" active={!!mode} />

          <g onMouseEnter={() => setMode("hit")} onMouseLeave={() => setMode(null)}>
            <DiagramNode
              x={240}
              y={200}
              width={240}
              height={44}
              label="Redis"
              sublabel="in-memory · TTL 300s"
              glow={hit}
              active={hit}
            />
            <DiagramChip x={260} y={252} width={56} label="HIT" active={hit} accent="gold" />
            <DiagramChip x={324} y={252} width={72} label="cache key" active={hit} />
          </g>

          {/* Miss → database */}
          <g onMouseEnter={() => setMode("miss")} onMouseLeave={() => setMode(null)}>
            <DiagramEdge
              x1={360}
              y1={244}
              x2={360}
              y2={332}
              active={miss}
            />
            <DiagramLabel x={372} y={292} text="MISS → read DB" active={miss} />
            <DiagramNode
              x={260}
              y={332}
              width={200}
              height={44}
              label="PostgreSQL"
              sublabel="source of truth"
              glow={miss}
              active={miss}
            />
            <DiagramChip x={260} y={384} width={64} label="MISS" active={miss} accent="gold" />
          </g>

          {/* Write-back on miss */}
          <DiagramDashedEdge
            x1={460}
            y1={354}
            x2={460}
            y2={244}
            active={miss}
            color="#f87171"
          />
          <DiagramLabel x={472} y={300} text="write-back + TTL" active={miss} />

          {/* Response paths */}
          <DiagramEdge
            x1={240}
            y1={222}
            x2={180}
            y2={130}
            active={hit}
          />
          <DiagramEdge
            x1={260}
            y1={332}
            x2={180}
            y2={130}
            active={miss}
          />
          <DiagramEdge
            x1={180}
            y1={130}
            x2={300}
            y2={68}
            active={!!mode}
          />
          <DiagramLabel x={188} y={108} text="200 OK" active={!!mode} />

          {miss && (
            <>
              <Packet x1={360} y1={152} x2={360} y2={332} delay={0} color="#f87171" />
              <Packet x1={460} y1={354} x2={460} y2={244} delay={0.45} color="#f87171" />
              <Packet x1={360} y1={244} x2={180} y2={130} delay={0.85} color="#f87171" />
              <motion.text
                x={480}
                y={370}
                fill="#f87171"
                fontSize={11}
                fontWeight={600}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                MISS — populate cache for next request
              </motion.text>
            </>
          )}

          {hit && (
            <>
              <Packet x1={360} y1={152} x2={360} y2={222} delay={0} color="#34d399" />
              <Packet x1={240} y1={222} x2={300} y2={68} delay={0.5} color="#34d399" />
              <motion.text
                x={480}
                y={230}
                fill="#34d399"
                fontSize={11}
                fontWeight={600}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                HIT — skip database
              </motion.text>
            </>
          )}

          <text
            x={360}
            y={468}
            textAnchor="middle"
            fill="#52525b"
            fontSize={10}
            fontFamily="ui-monospace, monospace"
          >
            Pattern: cache-aside · app owns consistency · TTL bounds staleness
          </text>
        </svg>
      </DiagramShell>
      <Hint>
        Hover Redis for a cache HIT (fast path). Hover PostgreSQL for a MISS —
        read DB, write-back to Redis, then respond.
      </Hint>
    </div>
  );
}
