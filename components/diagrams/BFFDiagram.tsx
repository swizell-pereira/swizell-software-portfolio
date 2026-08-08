"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DiagramShell,
  DiagramNode,
  DiagramEdge,
  DiagramDashedEdge,
  DiagramLabel,
  DiagramZone,
  DiagramChip,
  Packet,
  Hint,
} from "./primitives";

type HoverKey =
  | "bff"
  | "gateway"
  | "jwt"
  | "oauth"
  | "redis"
  | "rabbit"
  | "none";

/** Vertical spine for the synchronous request path */
const CX = 360;

export default function BFFDiagram() {
  const [hover, setHover] = useState<HoverKey>("none");

  const bff = hover === "bff";
  const gw = hover === "gateway";
  const jwt = hover === "jwt";
  const oauth = hover === "oauth";
  const redis = hover === "redis";
  const rabbit = hover === "rabbit";

  const svcY = 300;
  const svcH = 36;
  const svcA = { x: 90, cx: 150 };
  const svcB = { x: 310, cx: 370 };
  const svcC = { x: 530, cx: 590 };

  return (
    <div>
      <DiagramShell canvasWidth={720}>
        <svg
          viewBox="0 0 720 620"
          className="h-auto w-full"
          role="img"
          aria-label="Backend For Frontend architecture with separate BFF, API Gateway, domain services, and message bus"
        >
          {/* Swimlanes */}
          <DiagramZone x={16} y={12} width={688} height={76} label="Client" />
          <DiagramZone x={16} y={96} width={688} height={76} label="BFF" />
          <DiagramZone x={16} y={180} width={688} height={88} label="Edge" />
          <DiagramZone x={16} y={276} width={688} height={96} label="Domain" />
          <DiagramZone x={16} y={380} width={688} height={72} label="Messaging" />
          <DiagramZone x={16} y={460} width={688} height={88} label="Data" />

          {/* ── Client tier ── */}
          <DiagramNode x={300} y={32} width={120} label="Browser" active={oauth} />

          <DiagramNode
            x={520}
            y={28}
            width={160}
            height={40}
            label="Identity Provider"
            sublabel="OAuth 2.0"
            active={oauth}
            onHover={(v) => setHover(v ? "oauth" : "none")}
          />

          {/* Browser → BFF */}
          <DiagramEdge
            x1={CX}
            y1={68}
            x2={CX}
            y2={108}
            active={bff || jwt || gw}
          />
          <DiagramLabel
            x={CX + 8}
            y={92}
            text="HTTPS"
            active={bff || jwt}
          />

          {/* OAuth: Browser ↔ IdP */}
          <DiagramDashedEdge
            x1={420}
            y1={50}
            x2={520}
            y2={50}
            active={oauth}
            color="#fbbf24"
          />
          {oauth ? (
            <>
              <Packet x1={420} y1={50} x2={520} y2={50} delay={0} color="#fbbf24" />
              <Packet x1={520} y1={68} x2={420} y2={68} delay={0.6} color="#fbbf24" />
              <DiagramDashedEdge
                x1={600}
                y1={68}
                x2={470}
                y2={108}
                active
                color="#fbbf24"
              />
              <motion.text
                x={548}
                y={88}
                fill="#fbbf24"
                fontSize={9}
                fontFamily="ui-monospace, monospace"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                auth code callback
              </motion.text>
            </>
          ) : null}

          {/* ── BFF tier ── */}
          <DiagramNode
            x={240}
            y={112}
            width={240}
            height={44}
            label="Next.js Web BFF"
            sublabel="Route Handlers · UI DTOs"
            active={bff || jwt}
            glow={bff}
            onHover={(v) => setHover(v ? "bff" : "none")}
          />

          {/* BFF → Gateway */}
          <DiagramEdge
            x1={CX}
            y1={156}
            x2={CX}
            y2={196}
            active={gw || jwt || bff}
          />
          <DiagramLabel
            x={CX + 8}
            y={182}
            text="Bearer JWT"
            active={jwt || gw}
          />

          {/* BFF → Redis (sessions) */}
          <DiagramDashedEdge
            x1={300}
            y1={156}
            x2={180}
            y2={488}
            active={redis || bff}
            color="#34d399"
          />

          {/* ── Edge tier: API Gateway (distinct from BFF) ── */}
          <g
            onMouseEnter={() => setHover("gateway")}
            onMouseLeave={() => setHover("none")}
            className="cursor-pointer"
          >
            <rect
              x={200}
              y={196}
              width={320}
              height={64}
              rx={14}
              fill={gw ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.03)"}
              stroke={gw ? "rgba(96,165,250,0.75)" : "rgba(255,255,255,0.12)"}
              strokeWidth={1.5}
            />
            <text
              x={CX}
              y={218}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={13}
              fontWeight={600}
            >
              API Gateway
            </text>
            <text
              x={CX}
              y={232}
              textAnchor="middle"
              fill="#71717a"
              fontSize={9}
              fontFamily="ui-monospace, monospace"
            >
              TLS · Route · Enforce policy
            </text>

            {[
              { key: "jwt" as const, label: "JWT Validate", x: 212, w: 72 },
              { key: "gateway" as const, label: "Rate Limit", x: 290, w: 62 },
              { key: "gateway" as const, label: "RBAC", x: 358, w: 44 },
              { key: "gateway" as const, label: "Route", x: 408, w: 44 },
            ].map((chip) => (
              <DiagramChip
                key={chip.label}
                x={chip.x}
                y={238}
                width={chip.w}
                label={chip.label}
                active={
                  (chip.key === "jwt" && jwt) || (chip.key === "gateway" && gw)
                }
                onHover={(v) => {
                  if (v) setHover(chip.key);
                }}
              />
            ))}
          </g>

          {/* Gateway → services fan-out */}
          <DiagramEdge x1={CX} y1={260} x2={CX} y2={276} active={gw || bff} />
          <DiagramEdge
            x1={svcA.cx}
            y1={276}
            x2={svcC.cx}
            y2={276}
            active={gw || bff}
          />
          <DiagramEdge
            x1={svcA.cx}
            y1={276}
            x2={svcA.cx}
            y2={svcY}
            active={gw || bff}
          />
          <DiagramEdge
            x1={svcB.cx}
            y1={276}
            x2={svcB.cx}
            y2={svcY}
            active={gw || bff}
          />
          <DiagramEdge
            x1={svcC.cx}
            y1={276}
            x2={svcC.cx}
            y2={svcY}
            active={gw || bff}
          />

          <DiagramLabel x={svcA.cx} y={292} text="/orders" active={gw} />
          <DiagramLabel x={svcB.cx} y={292} text="/users" active={gw} />
          <DiagramLabel x={svcC.cx} y={292} text="/inventory" active={gw} />

          {/* ── Domain tier ── */}
          <DiagramNode
            x={svcA.x}
            y={svcY}
            width={120}
            label="Order Service"
            active={gw || bff || rabbit}
          />
          <DiagramNode
            x={svcB.x}
            y={svcY}
            width={120}
            label="User Service"
            active={gw || bff || rabbit}
          />
          <DiagramNode
            x={svcC.x}
            y={svcY}
            width={120}
            label="Inventory Service"
            active={gw || bff || rabbit}
          />

          {/* Services → message bus (async, not vertical ownership) */}
          <DiagramEdge
            x1={svcA.cx}
            y1={svcY + svcH}
            x2={svcA.cx}
            y2={396}
            active={rabbit}
          />
          <DiagramEdge
            x1={svcB.cx}
            y1={svcY + svcH}
            x2={svcB.cx}
            y2={396}
            active={rabbit}
          />
          <DiagramEdge
            x1={svcC.cx}
            y1={svcY + svcH}
            x2={svcC.cx}
            y2={396}
            active={rabbit}
          />
          <DiagramEdge
            x1={svcA.cx}
            y1={412}
            x2={svcC.cx}
            y2={412}
            active={rabbit}
          />

          <DiagramNode
            x={160}
            y={396}
            width={400}
            height={36}
            label="RabbitMQ Event Bus"
            sublabel="async · pub/sub"
            glow={rabbit}
            active={rabbit}
            onHover={(v) => setHover(v ? "rabbit" : "none")}
          />

          {/* Services → PostgreSQL (database-per-service) */}
          <DiagramEdge
            x1={svcA.cx}
            y1={svcY + svcH}
            x2={200}
            y2={488}
            active={gw}
          />
          <DiagramEdge
            x1={svcB.cx}
            y1={svcY + svcH}
            x2={360}
            y2={488}
            active={gw}
          />
          <DiagramEdge
            x1={svcC.cx}
            y1={svcY + svcH}
            x2={520}
            y2={488}
            active={gw}
          />

          {/* ── Data tier ── */}
          <DiagramNode
            x={120}
            y={488}
            width={120}
            label="Redis"
            sublabel="sessions · cache"
            glow={redis}
            active={redis}
            onHover={(v) => setHover(v ? "redis" : "none")}
          />
          <DiagramNode
            x={440}
            y={488}
            width={200}
            height={44}
            label="PostgreSQL"
            sublabel="database per service"
            active={gw}
          />

          {/* ── Animated flows ── */}

          {/* BFF orchestrates via gateway */}
          {bff && !jwt && !oauth && !redis && !rabbit && !gw ? (
            <>
              <Packet x1={CX} y1={68} x2={CX} y2={108} delay={0} />
              <Packet x1={CX} y1={156} x2={CX} y2={196} delay={0.2} />
              <Packet x1={CX} y1={260} x2={svcB.cx} y2={svcY} delay={0.45} />
              <Packet x1={CX} y1={260} x2={svcC.cx} y2={svcY} delay={0.65} />
              <motion.text
                x={390}
                y={140}
                fill="#93c5fd"
                fontSize={9}
                fontFamily="ui-monospace, monospace"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                aggregate · shape response
              </motion.text>
            </>
          ) : null}

          {/* JWT: BFF → Gateway */}
          {jwt ? (
            <>
              <Packet x1={CX} y1={156} x2={CX} y2={196} delay={0} color="#fbbf24" />
              <motion.g
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <text
                  x={390}
                  y={178}
                  fill="#fbbf24"
                  fontSize={9}
                  fontFamily="ui-monospace, monospace"
                >
                  Authorization: Bearer
                </text>
              </motion.g>
            </>
          ) : null}

          {/* Gateway routing */}
          {gw && !jwt && !oauth && !redis && !rabbit && !bff ? (
            <>
              <Packet x1={CX} y1={260} x2={svcA.cx} y2={svcY} delay={0} />
              <Packet x1={CX} y1={260} x2={svcB.cx} y2={svcY} delay={0.2} />
              <Packet x1={CX} y1={260} x2={svcC.cx} y2={svcY} delay={0.4} />
            </>
          ) : null}

          {/* Redis session/cache */}
          {redis ? (
            <>
              <Packet x1={300} y1={156} x2={180} y2={488} delay={0} color="#34d399" />
              <Packet x1={180} y1={488} x2={300} y2={156} delay={0.9} color="#34d399" />
            </>
          ) : null}

          {/* Async events */}
          {rabbit ? (
            <>
              <Packet
                x1={svcA.cx}
                y1={svcY + svcH}
                x2={svcA.cx}
                y2={412}
                delay={0}
                color="#a78bfa"
              />
              <Packet
                x1={svcB.cx}
                y1={svcY + svcH}
                x2={svcC.cx}
                y2={412}
                delay={0.3}
                color="#a78bfa"
              />
              <Packet
                x1={560}
                y1={412}
                x2={400}
                y2={412}
                delay={0.6}
                color="#a78bfa"
              />
            </>
          ) : null}
        </svg>
      </DiagramShell>
      <Hint>
        Hover the Web BFF · API Gateway · Identity Provider · Redis · or Event
        Bus — BFF aggregates for the UI; gateway validates and routes; services
        publish async events.
      </Hint>
    </div>
  );
}
