"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DiagramShell,
  DiagramNode,
  DiagramEdge,
  DiagramDashedEdge,
  DiagramLabel,
  Packet,
  Hint,
} from "./primitives";

type HoverKey = "gateway" | "jwt" | "oauth" | "redis" | "rabbit" | "none";

export default function BFFDiagram() {
  const [hover, setHover] = useState<HoverKey>("none");

  const gw = hover === "gateway";
  const jwt = hover === "jwt";
  const oauth = hover === "oauth";
  const redis = hover === "redis";
  const rabbit = hover === "rabbit";

  return (
    <div>
      <DiagramShell>
        <svg
          viewBox="0 0 560 520"
          className="h-auto w-full"
          role="img"
          aria-label="Backend For Frontend architecture"
        >
          <DiagramNode x={220} y={16} width={120} label="Browser" />
          <DiagramEdge x1={280} y1={52} x2={280} y2={68} active={gw || jwt || oauth} />
          <DiagramDashedEdge
            x1={280}
            y1={52}
            x2={280}
            y2={68}
            active={oauth}
            color="#fbbf24"
          />

          <DiagramNode x={200} y={68} width={160} label="React / Next.js" />
          <DiagramLabel x={280} y={128} text="HTTPS Request" active={gw || jwt} />
          <DiagramEdge x1={280} y1={134} x2={280} y2={152} active={gw || jwt || oauth} />

          {/* Gateway */}
          <g
            onMouseEnter={() => setHover("gateway")}
            onMouseLeave={() => setHover("none")}
            className="cursor-pointer"
          >
            <rect
              x={120}
              y={152}
              width={320}
              height={118}
              rx={16}
              fill={gw ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.03)"}
              stroke={gw ? "rgba(96,165,250,0.75)" : "rgba(255,255,255,0.12)"}
              strokeWidth={1.5}
            />
            <text
              x={280}
              y={176}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={13}
              fontWeight={600}
            >
              BFF API Gateway
            </text>

            {[
              { key: "oauth" as const, label: "OAuth 2.0", x: 132, w: 62 },
              { key: "jwt" as const, label: "JWT", x: 200, w: 44 },
              { key: "gateway" as const, label: "Session", x: 250, w: 58 },
              { key: "gateway" as const, label: "Auth", x: 314, w: 44 },
              { key: "gateway" as const, label: "Rate Limit", x: 364, w: 68 },
            ].map((chip, i) => (
              <g
                key={`${chip.label}-${i}`}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setHover(chip.key);
                }}
              >
                <rect
                  x={chip.x}
                  y={192}
                  width={chip.w}
                  height={22}
                  rx={6}
                  fill={
                    chip.key === "jwt" && jwt
                      ? "rgba(251,191,36,0.25)"
                      : chip.key === "oauth" && oauth
                        ? "rgba(251,191,36,0.25)"
                        : "rgba(255,255,255,0.06)"
                  }
                  stroke={
                    chip.key === "jwt" && jwt
                      ? "rgba(251,191,36,0.8)"
                      : chip.key === "oauth" && oauth
                        ? "rgba(251,191,36,0.8)"
                        : "rgba(255,255,255,0.12)"
                  }
                />
                <text
                  x={chip.x + chip.w / 2}
                  y={207}
                  textAnchor="middle"
                  fill={
                    (chip.key === "jwt" && jwt) || (chip.key === "oauth" && oauth)
                      ? "#fbbf24"
                      : "#a1a1aa"
                  }
                  fontSize={chip.label === "OAuth 2.0" ? 9 : 10}
                >
                  {chip.label}
                </text>
              </g>
            ))}

            <rect
              x={248}
              y={224}
              width={64}
              height={22}
              rx={6}
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.12)"
            />
            <text x={280} y={239} textAnchor="middle" fill="#a1a1aa" fontSize={10}>
              RBAC
            </text>
          </g>

          <DiagramEdge x1={280} y1={270} x2={280} y2={290} active={gw} />
          <DiagramEdge x1={120} y1={290} x2={440} y2={290} active={gw} />
          <DiagramEdge x1={120} y1={290} x2={120} y2={310} active={gw} />
          <DiagramEdge x1={280} y1={290} x2={280} y2={310} active={gw} />
          <DiagramEdge x1={440} y1={290} x2={440} y2={310} active={gw} />

          <DiagramLabel x={120} y={304} text="/robots" active={gw} />
          <DiagramLabel x={280} y={304} text="/users" active={gw} />
          <DiagramLabel x={440} y={304} text="/workflows" active={gw} />

          <DiagramNode x={60} y={310} width={120} label="Robot Service" />
          <DiagramNode x={220} y={310} width={120} label="User Service" />
          <DiagramNode x={380} y={310} width={120} label="Workflow Service" />

          <DiagramEdge x1={120} y1={346} x2={120} y2={382} active={redis} />
          <DiagramEdge x1={280} y1={346} x2={280} y2={382} active={rabbit} />
          <DiagramEdge x1={440} y1={346} x2={440} y2={382} active={gw} />

          <DiagramNode
            x={60}
            y={382}
            width={120}
            label="Redis"
            glow={redis}
            onHover={(v) => setHover(v ? "redis" : "none")}
          />
          <DiagramNode
            x={220}
            y={382}
            width={120}
            label="RabbitMQ"
            glow={rabbit}
            onHover={(v) => setHover(v ? "rabbit" : "none")}
          />
          <DiagramNode x={380} y={382} width={120} label="PostgreSQL" />

          {/* OAuth redirect flow */}
          {oauth && (
            <>
              <DiagramDashedEdge x1={280} y1={52} x2={280} y2={152} active color="#fbbf24" />
              <Packet x1={280} y1={52} x2={280} y2={152} delay={0} color="#fbbf24" />
              <motion.g
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              >
                <text x={300} y={100} fill="#fbbf24" fontSize={9} fontFamily="ui-monospace, monospace">
                  OAuth redirect
                </text>
              </motion.g>
            </>
          )}

          {/* JWT token travels browser → gateway */}
          {jwt && (
            <>
              <Packet x1={280} y1={104} x2={280} y2={152} delay={0} color="#fbbf24" />
              <motion.g
                animate={{ y: [0, 48, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect
                  x={300}
                  y={100}
                  width={44}
                  height={18}
                  rx={4}
                  fill="rgba(251,191,36,0.2)"
                  stroke="#fbbf24"
                />
                <text
                  x={322}
                  y={112}
                  textAnchor="middle"
                  fill="#fbbf24"
                  fontSize={9}
                  fontFamily="ui-monospace, monospace"
                >
                  JWT
                </text>
              </motion.g>
            </>
          )}

          {redis && (
            <>
              <Packet x1={120} y1={346} x2={120} y2={382} delay={0} color="#34d399" />
              <Packet x1={120} y1={400} x2={120} y2={360} delay={0.9} color="#34d399" />
            </>
          )}

          {rabbit && (
            <>
              <Packet x1={280} y1={346} x2={280} y2={382} delay={0} />
              <Packet x1={280} y1={400} x2={200} y2={400} delay={0.35} />
              <Packet x1={280} y1={400} x2={360} y2={400} delay={0.7} />
            </>
          )}

          {gw && !jwt && !oauth && !redis && !rabbit && (
            <>
              <Packet x1={280} y1={270} x2={120} y2={310} delay={0} />
              <Packet x1={280} y1={270} x2={280} y2={310} delay={0.25} />
              <Packet x1={280} y1={270} x2={440} y2={310} delay={0.5} />
            </>
          )}
        </svg>
      </DiagramShell>
      <Hint>
        Hover OAuth 2.0 · JWT · Redis · RabbitMQ · or the Gateway to animate
        routing and message flow.
      </Hint>
    </div>
  );
}
