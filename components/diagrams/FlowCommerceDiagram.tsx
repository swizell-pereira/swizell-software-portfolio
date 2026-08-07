"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DiagramShell,
  DiagramNode,
  DiagramEdge,
  DiagramDashedEdge,
  DiagramZone,
  DiagramLabel,
  DiagramChip,
  Packet,
  Hint,
} from "./primitives";

type HoverKey =
  | "tenant"
  | "frontend"
  | "domains"
  | "payments"
  | "rabbit"
  | "redis"
  | "postgres"
  | "platform"
  | "none";

export default function FlowCommerceDiagram() {
  const [hover, setHover] = useState<HoverKey>("none");

  const tenant = hover === "tenant";
  const fe = hover === "frontend";
  const domains = hover === "domains";
  const payments = hover === "payments";
  const rabbit = hover === "rabbit";
  const redis = hover === "redis";
  const pg = hover === "postgres";
  const platform = hover === "platform";

  return (
    <div>
      <DiagramShell>
        <svg
          viewBox="0 0 900 620"
          className="h-auto w-full"
          role="img"
          aria-label="FlowCommerce multi-tenant gym SaaS architecture"
        >
          {/* Swimlanes */}
          <DiagramZone x={16} y={12} width={210} height={96} label="Clients" />
          <DiagramZone x={240} y={12} width={420} height={110} label="Next.js Frontend" />
          <DiagramZone x={16} y={132} width={210} height={218} label="Multi-Tenant" />
          <DiagramZone x={244} y={132} width={416} height={218} label="NestJS Modular Monolith" />
          <DiagramZone x={16} y={364} width={868} height={112} label="Event-Driven Messaging" />
          <DiagramZone x={16} y={490} width={640} height={108} label="Data Layer" />
          <DiagramZone x={668} y={490} width={216} height={108} label="Platform" />

          {/* ── Clients ── */}
          <DiagramNode
            x={36}
            y={48}
            width={150}
            label="Gym Admin"
            glow={fe || tenant}
          />
          <DiagramNode
            x={36}
            y={88}
            width={150}
            label="Member Portal"
            glow={fe}
          />

          <DiagramEdge x1={186} y1={66} x2={240} y2={66} active={fe} />
          <DiagramEdge x1={186} y1={106} x2={240} y2={90} active={fe} />
          <DiagramLabel x={213} y={58} text="SSR / API" active={fe} />

          {/* ── Next.js Frontend ── */}
          <g
            onMouseEnter={() => setHover("frontend")}
            onMouseLeave={() => setHover("none")}
            className="cursor-pointer"
          >
            <rect
              x={258}
              y={38}
              width={384}
              height={72}
              rx={14}
              fill={fe ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.03)"}
              stroke={fe ? "rgba(96,165,250,0.75)" : "rgba(255,255,255,0.12)"}
              strokeWidth={1.5}
              className="transition-all duration-300"
            />
            <text
              x={450}
              y={58}
              textAnchor="middle"
              fill="#fff"
              fontSize={13}
              fontWeight={600}
            >
              Next.js App Router
            </text>
            <DiagramChip x={278} y={68} width={72} label="Dashboard" active={fe} />
            <DiagramChip x={358} y={68} width={80} label="Analytics" active={fe} />
            <DiagramChip x={446} y={68} width={72} label="Billing" active={fe} />
            <DiagramChip x={526} y={68} width={80} label="Attendance" active={fe} />
          </g>

          <DiagramEdge x1={450} y1={110} x2={450} y2={132} active={fe || domains} />
          <DiagramLabel x={470} y={124} text="REST" active={fe} />

          {/* ── Multi-Tenant ── */}
          <DiagramNode
            x={36}
            y={162}
            width={130}
            label="Tenant A"
            sublabel="Gym Chain"
            glow={tenant}
            onHover={(v) => setHover(v ? "tenant" : "none")}
          />
          <DiagramNode
            x={36}
            y={218}
            width={130}
            label="Tenant B"
            sublabel="Studio"
            glow={tenant}
            onHover={(v) => setHover(v ? "tenant" : "none")}
          />
          <DiagramNode
            x={36}
            y={288}
            width={170}
            height={44}
            label="RBAC"
            sublabel="Roles · Permissions"
            glow={tenant}
            onHover={(v) => setHover(v ? "tenant" : "none")}
          />

          <DiagramDashedEdge
            x1={166}
            y1={180}
            x2={290}
            y2={192}
            active={tenant}
            color="rgba(96,165,250,0.7)"
          />
          <DiagramDashedEdge
            x1={166}
            y1={236}
            x2={290}
            y2={252}
            active={tenant}
            color="rgba(96,165,250,0.7)"
          />
          <DiagramLabel x={220} y={200} text="isolated" active={tenant} />

          {/* ── NestJS Domain Modules ── */}
          <g
            onMouseEnter={() => setHover("domains")}
            onMouseLeave={() => setHover("none")}
            className="cursor-pointer"
          >
            <rect
              x={268}
              y={152}
              width={380}
              height={188}
              rx={14}
              fill={domains ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.02)"}
              stroke={domains ? "rgba(96,165,250,0.5)" : "rgba(255,255,255,0.08)"}
              strokeWidth={1.5}
              className="transition-all duration-300"
            />
            <text
              x={458}
              y={172}
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize={10}
              fontFamily="ui-monospace"
              letterSpacing="0.1em"
            >
              DDD · MODULAR MONOLITH
            </text>
          </g>

          <DiagramNode
            x={290}
            y={184}
            width={118}
            label="Auth"
            glow={domains || tenant}
          />
          <DiagramNode
            x={420}
            y={184}
            width={118}
            label="Membership"
            glow={domains}
          />
          <DiagramNode
            x={550}
            y={184}
            width={118}
            label="Subscriptions"
            glow={domains || payments}
            onHover={(v) => setHover(v ? "payments" : "none")}
          />

          <DiagramNode
            x={290}
            y={244}
            width={118}
            label="Payments"
            glow={domains || payments}
            onHover={(v) => setHover(v ? "payments" : "none")}
          />
          <DiagramNode
            x={420}
            y={244}
            width={118}
            label="Invoicing"
            glow={domains || payments}
            onHover={(v) => setHover(v ? "payments" : "none")}
          />
          <DiagramNode
            x={550}
            y={244}
            width={118}
            label="Attendance"
            glow={domains}
          />

          <DiagramNode
            x={420}
            y={304}
            width={118}
            label="Analytics"
            glow={domains || redis}
          />

          {/* Frontend → NestJS */}
          <DiagramEdge x1={450} y1={132} x2={450} y2={152} active={fe || domains} />

          {/* Domains → Messaging */}
          <DiagramEdge x1={349} y1={262} x2={349} y2={364} active={rabbit || payments} />
          <DiagramEdge x1={479} y1={262} x2={450} y2={400} active={rabbit || payments} />
          <DiagramEdge x1={609} y1={262} x2={550} y2={400} active={rabbit} />
          <DiagramEdge x1={479} y1={322} x2={450} y2={400} active={rabbit} />

          {/* Domains → Data */}
          <DiagramEdge x1={349} y1={220} x2={255} y2={490} active={redis || pg} />
          <DiagramEdge x1={479} y1={262} x2={665} y2={490} active={pg || payments} />
          <DiagramEdge x1={609} y1={220} x2={665} y2={490} active={pg} />

          {/* ── RabbitMQ ── */}
          <DiagramNode
            x={390}
            y={400}
            width={120}
            label="RabbitMQ"
            glow={rabbit}
            onHover={(v) => setHover(v ? "rabbit" : "none")}
          />

          {/* Event consumers */}
          <DiagramEdge x1={510} y1={418} x2={580} y2={418} active={rabbit} />
          <DiagramNode
            x={560}
            y={340}
            width={110}
            label="Event Handlers"
            glow={rabbit}
            sublabel="async"
          />

          <DiagramNode
            x={80}
            y={400}
            width={130}
            label="Domain Events"
            glow={rabbit}
            sublabel="pub/sub"
          />
          <DiagramEdge x1={210} y1={418} x2={390} y2={418} active={rabbit} />

          {/* ── Data Layer ── */}
          <DiagramNode
            x={200}
            y={530}
            width={110}
            label="Redis"
            glow={redis}
            onHover={(v) => setHover(v ? "redis" : "none")}
          />
          <DiagramNode
            x={590}
            y={530}
            width={150}
            label="PostgreSQL"
            sublabel="Prisma ORM"
            glow={pg || payments}
            onHover={(v) => setHover(v ? "postgres" : "none")}
          />

          {/* Audit / immutable records */}
          <DiagramNode
            x={380}
            y={530}
            width={130}
            label="Audit Logs"
            sublabel="immutable"
            glow={pg || payments}
          />

          {/* ── Platform ── */}
          <DiagramNode
            x={688}
            y={530}
            width={80}
            label="Docker"
            glow={platform}
            onHover={(v) => setHover(v ? "platform" : "none")}
          />
          <DiagramNode
            x={778}
            y={530}
            width={90}
            label="Swagger"
            glow={platform}
            onHover={(v) => setHover(v ? "platform" : "none")}
          />

          <g
            onMouseEnter={() => setHover("platform")}
            onMouseLeave={() => setHover("none")}
            className="cursor-pointer"
          >
            <rect
              x={688}
              y={400}
              width={180}
              height={72}
              rx={12}
              fill={platform ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.02)"}
              stroke={platform ? "rgba(96,165,250,0.5)" : "rgba(255,255,255,0.08)"}
            />
            <text x={778} y={424} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={500}>
              Health / Readiness
            </text>
            <text x={778} y={442} textAnchor="middle" fill="#71717a" fontSize={9} fontFamily="ui-monospace">
              CI/CD Ready
            </text>
            <text x={778} y={458} textAnchor="middle" fill="#71717a" fontSize={9} fontFamily="ui-monospace">
              Unit · E2E Tests
            </text>
          </g>

          {/* ── Animations ── */}

          {tenant && (
            <>
              <Packet x1={166} y1={180} x2={290} y2={192} delay={0} />
              <Packet x1={166} y1={236} x2={290} y2={252} delay={0.35} color="#60a5fa" />
              <motion.g
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <text x={36} y={340} fill="#93c5fd" fontSize={9} fontFamily="ui-monospace">
                  Tenant-scoped data · no cross-gym leakage
                </text>
              </motion.g>
            </>
          )}

          {fe && (
            <>
              <Packet x1={186} y1={66} x2={258} y2={74} delay={0} />
              <Packet x1={450} y1={110} x2={450} y2={184} delay={0.3} />
            </>
          )}

          {domains && !payments && (
            <>
              <Packet x1={450} y1={152} x2={349} y2={184} delay={0} />
              <Packet x1={450} y1={152} x2={479} y2={184} delay={0.15} />
              <Packet x1={450} y1={152} x2={609} y2={184} delay={0.3} />
            </>
          )}

          {payments && (
            <>
              <Packet x1={479} y1={184} x2={479} y2={244} delay={0} color="#fbbf24" />
              <Packet x1={479} y1={262} x2={450} y2={400} delay={0.3} color="#fbbf24" />
              <Packet x1={479} y1={262} x2={665} y2={530} delay={0.6} color="#fbbf24" />
              <motion.g
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <text x={500} y={290} fill="#fbbf24" fontSize={9} fontFamily="ui-monospace">
                  Subscription → Invoice → Payment
                </text>
              </motion.g>
            </>
          )}

          {rabbit && (
            <>
              <Packet x1={349} y1={262} x2={450} y2={400} delay={0} />
              <Packet x1={479} y1={262} x2={450} y2={400} delay={0.2} />
              <Packet x1={510} y1={418} x2={615} y2={364} delay={0.45} />
              <motion.g
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              >
                <text x={80} y={385} fill="#93c5fd" fontSize={9} fontFamily="ui-monospace">
                  SubCreated · PaymentProcessed · AttendanceLogged
                </text>
              </motion.g>
            </>
          )}

          {redis && (
            <>
              <Packet x1={479} y1={322} x2={255} y2={530} delay={0} color="#34d399" />
              <Packet x1={255} y1={530} x2={479} y2={322} delay={0.7} color="#34d399" />
            </>
          )}

          {pg && (
            <>
              <Packet x1={479} y1={262} x2={665} y2={530} delay={0} />
              <Packet x1={609} y1={220} x2={665} y2={530} delay={0.25} />
              <Packet x1={445} y1={530} x2={590} y2={548} delay={0.5} color="#a78bfa" />
            </>
          )}

          {platform && (
            <>
              <Packet x1={450} y1={340} x2={778} y2={400} delay={0} color="#22d3ee" />
              <Packet x1={778} y1={472} x2={728} y2={530} delay={0.4} color="#22d3ee" />
            </>
          )}
        </svg>
      </DiagramShell>
      <Hint>
        Hover Tenant, Frontend, Domain modules, Payments, RabbitMQ, Redis, or
        PostgreSQL to explore each flow.
      </Hint>
    </div>
  );
}
