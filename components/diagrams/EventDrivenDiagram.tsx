"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DiagramShell,
  DiagramNode,
  DiagramEdge,
  DiagramZone,
  DiagramChip,
  DiagramLabel,
  Packet,
  Hint,
} from "./primitives";

type HoverKey =
  | "producer"
  | "topic"
  | "notification"
  | "analytics"
  | "billing"
  | "audit"
  | "none";

const consumerGroups = [
  {
    id: "notification" as const,
    label: "Notification CG",
    y: 180,
  },
  {
    id: "analytics" as const,
    label: "Analytics CG",
    y: 260,
  },
  {
    id: "billing" as const,
    label: "Billing CG",
    y: 340,
  },
  {
    id: "audit" as const,
    label: "Audit CG",
    y: 420,
  },
];

export default function EventDrivenDiagram() {
  const [hover, setHover] = useState<HoverKey>("none");

  const producer = hover === "producer";
  const topic = hover === "topic";
  const fanOut = topic || consumerGroups.some((c) => hover === c.id);

  return (
    <div>
      <DiagramShell canvasWidth={720}>
        <svg
          viewBox="0 0 720 560"
          className="h-auto w-full"
          role="img"
          aria-label="Kafka event log with topic partitions and independent consumer groups"
        >
          <DiagramZone x={16} y={12} width={160} height={480} label="Producer" />
          <DiagramZone x={184} y={12} width={280} height={480} label="Kafka Cluster" />
          <DiagramZone x={476} y={12} width={228} height={480} label="Consumer Groups" />

          {/* Producer */}
          <DiagramNode
            x={32}
            y={220}
            width={128}
            height={44}
            label="Account Service"
            sublabel="event producer"
            glow={producer}
            onHover={(v) => setHover(v ? "producer" : "none")}
          />
          <DiagramEdge x1={160} y1={242} x2={200} y2={242} active={producer || topic} />
          <DiagramLabel x={168} y={228} text="account.created" active={producer || topic} />

          {/* Kafka topic + partitions */}
          <g
            onMouseEnter={() => setHover("topic")}
            onMouseLeave={() => setHover("none")}
            className="cursor-pointer"
          >
            <rect
              x={200}
              y={180}
              width={248}
              height={124}
              rx={14}
              fill={topic ? "rgba(139,92,246,0.18)" : "rgba(255,255,255,0.03)"}
              stroke={topic ? "rgba(167,139,250,0.75)" : "rgba(255,255,255,0.12)"}
              strokeWidth={1.5}
            />
            <text x={324} y={208} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={600}>
              Kafka Topic
            </text>
            <DiagramChip
              x={216}
              y={220}
              width={108}
              label="account.created"
              active={topic}
              accent="blue"
            />
            <DiagramChip x={332} y={220} width={100} label="3 partitions" active={topic} />
            <text
              x={324}
              y={278}
              textAnchor="middle"
              fill="#71717a"
              fontSize={9}
              fontFamily="ui-monospace, monospace"
            >
              append-only log · ordered per partition
            </text>
          </g>

          {/* Partition visual */}
          {[0, 1, 2].map((p) => (
            <rect
              key={p}
              x={216 + p * 76}
              y={288}
              width={68}
              height={24}
              rx={4}
              fill={topic ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)"}
              stroke="rgba(255,255,255,0.1)"
            />
          ))}
          <text x={324} y={304} textAnchor="middle" fill="#71717a" fontSize={8} fontFamily="ui-monospace, monospace">
            P0 · P1 · P2
          </text>

          {/* Consumer groups — each reads independently */}
          {consumerGroups.map((cg) => {
            const active = hover === cg.id || topic;
            return (
              <g key={cg.id}>
                <DiagramEdge
                  x1={448}
                  y1={242}
                  x2={500}
                  y2={cg.y + 18}
                  active={active}
                />
                <DiagramNode
                  x={500}
                  y={cg.y}
                  width={180}
                  height={44}
                  label={cg.label}
                  sublabel="own offset · replayable"
                  glow={hover === cg.id || topic}
                  onHover={(v) => setHover(v ? cg.id : "none")}
                />
              </g>
            );
          })}

          {producer && (
            <>
              <Packet x1={160} y1={242} x2={200} y2={242} delay={0} color="#a78bfa" />
              <motion.text
                x={32}
                y={280}
                fill="#c4b5fd"
                fontSize={9}
                fontFamily="ui-monospace, monospace"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              >
                append event after transaction
              </motion.text>
            </>
          )}

          {topic &&
            consumerGroups.map((cg, i) => (
              <Packet
                key={cg.id}
                x1={448}
                y1={242}
                x2={500}
                y2={cg.y + 22}
                delay={i * 0.2}
                color="#a78bfa"
              />
            ))}

          {fanOut && hover === "topic" && (
            <motion.text
              x={200}
              y={340}
              fill="#c4b5fd"
              fontSize={9}
              fontFamily="ui-monospace, monospace"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              each consumer group reads the full topic at its own pace
            </motion.text>
          )}

          <text
            x={360}
            y={520}
            textAnchor="middle"
            fill="#52525b"
            fontSize={10}
            fontFamily="ui-monospace, monospace"
          >
            Event log · replay · scale consumers independently per group
          </text>
        </svg>
      </DiagramShell>
      <Hint>
        Hover Account Service to produce. Hover the Kafka topic to fan out to
        all consumer groups — each maintains its own offset.
      </Hint>
    </div>
  );
}
