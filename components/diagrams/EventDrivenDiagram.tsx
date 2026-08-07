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

type HoverKey = "producer" | "topic" | "notification" | "analytics" | "billing" | "email" | "none";

const consumers = [
  { id: "notification" as const, label: "Notification", y: 52 },
  { id: "analytics" as const, label: "Analytics", y: 118 },
  { id: "billing" as const, label: "Billing", y: 184 },
  { id: "email" as const, label: "Email", y: 250 },
];

export default function EventDrivenDiagram() {
  const [hover, setHover] = useState<HoverKey>("none");

  const producer = hover === "producer";
  const topic = hover === "topic";
  const fanOut = topic || consumers.some((c) => hover === c.id);

  return (
    <div>
      <DiagramShell>
        <svg
          viewBox="0 0 560 420"
          className="h-auto w-full"
          role="img"
          aria-label="Event-driven Kafka architecture"
        >
          <DiagramZone x={16} y={12} width={148} height={320} label="Producer" />
          <DiagramZone x={178} y={12} width={164} height={320} label="Kafka" />
          <DiagramZone x={356} y={12} width={188} height={320} label="Consumers" />

          {/* Producer */}
          <DiagramNode
            x={32}
            y={140}
            width={116}
            label="User Service"
            sublabel="publisher"
            glow={producer}
            onHover={(v) => setHover(v ? "producer" : "none")}
          />

          <DiagramEdge x1={148} y1={158} x2={178} y2={158} active={producer || topic} />
          <DiagramLabel x={163} y={150} text="user.created" active={producer || topic} />

          {/* Kafka broker */}
          <g
            onMouseEnter={() => setHover("topic")}
            onMouseLeave={() => setHover("none")}
            className="cursor-pointer"
          >
            <rect
              x={194}
              y={120}
              width={132}
              height={76}
              rx={14}
              fill={topic ? "rgba(139,92,246,0.18)" : "rgba(255,255,255,0.03)"}
              stroke={topic ? "rgba(167,139,250,0.75)" : "rgba(255,255,255,0.12)"}
              strokeWidth={1.5}
              className="transition-all duration-300"
            />
            <text x={260} y={144} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={600}>
              Kafka Broker
            </text>
            <DiagramChip x={206} y={154} width={108} label="user.created" active={topic} accent="blue" />
            <text
              x={260}
              y={186}
              textAnchor="middle"
              fill="#71717a"
              fontSize={9}
              fontFamily="ui-monospace, monospace"
            >
              3 partitions
            </text>
          </g>

          {/* Consumer fan-out */}
          {consumers.map((c) => {
            const active = hover === c.id || topic;
            return (
              <g key={c.id}>
                <DiagramEdge x1={326} y1={158} x2={368} y2={c.y + 18} active={active} />
                <DiagramNode
                  x={368}
                  y={c.y}
                  width={130}
                  label={c.label}
                  sublabel="consumer"
                  glow={hover === c.id || topic}
                  onHover={(v) => setHover(v ? c.id : "none")}
                />
              </g>
            );
          })}

          {/* Animations */}
          {producer && (
            <>
              <Packet x1={148} y1={158} x2={194} y2={158} delay={0} color="#a78bfa" />
              <motion.g
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              >
                <text x={32} y={200} fill="#c4b5fd" fontSize={9} fontFamily="ui-monospace, monospace">
                  User Created event published
                </text>
              </motion.g>
            </>
          )}

          {topic &&
            consumers.map((c, i) => (
              <Packet
                key={c.id}
                x1={326}
                y1={158}
                x2={368}
                y2={c.y + 18}
                delay={i * 0.22}
                color="#a78bfa"
              />
            ))}

          {consumers.map(
            (c) =>
              hover === c.id && (
                <g key={`pkt-${c.id}`}>
                  <Packet x1={326} y1={158} x2={368} y2={c.y + 18} delay={0} color="#a78bfa" />
                  <motion.g
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <text x={368} y={c.y + 52} fill="#c4b5fd" fontSize={9} fontFamily="ui-monospace, monospace">
                      consumer group: {c.label.toLowerCase()}
                    </text>
                  </motion.g>
                </g>
              )
          )}

          {fanOut && hover === "topic" && (
            <motion.g
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <text x={194} y={220} fill="#c4b5fd" fontSize={9} fontFamily="ui-monospace, monospace">
                topic fan-out → 4 downstream services
              </text>
            </motion.g>
          )}
        </svg>
      </DiagramShell>
      <Hint>
        Hover User Service, the Kafka topic, or any consumer to see event flow
        through the pipeline.
      </Hint>
    </div>
  );
}
