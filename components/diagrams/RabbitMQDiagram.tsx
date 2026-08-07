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

type HoverKey = "publisher" | "exchange" | "payment" | "notification" | "analytics" | "none";

const consumers = [
  { id: "payment" as const, label: "Payment Service", queue: "payment.q", y: 52 },
  { id: "notification" as const, label: "Notification", queue: "notify.q", y: 130 },
  { id: "analytics" as const, label: "Analytics", queue: "analytics.q", y: 208 },
];

export default function RabbitMQDiagram() {
  const [hover, setHover] = useState<HoverKey>("none");

  const publisher = hover === "publisher";
  const exchange = hover === "exchange";
  const fanOut = exchange || consumers.some((c) => hover === c.id);

  return (
    <div>
      <DiagramShell>
        <svg
          viewBox="0 0 560 380"
          className="h-auto w-full"
          role="img"
          aria-label="RabbitMQ message flow with exchange routing"
        >
          <DiagramZone x={16} y={12} width={120} height={280} label="Publisher" />
          <DiagramZone x={148} y={12} width={196} height={280} label="Broker" />
          <DiagramZone x={360} y={12} width={184} height={280} label="Consumers" />

          {/* Publisher */}
          <DiagramNode
            x={24}
            y={130}
            width={104}
            label="Order Service"
            glow={publisher}
            onHover={(v) => setHover(v ? "publisher" : "none")}
          />
          <DiagramEdge x1={128} y1={148} x2={148} y2={148} active={publisher || exchange} />
          <DiagramLabel x={138} y={140} text="order.created" active={publisher || exchange} />

          {/* Exchange + RabbitMQ */}
          <g
            onMouseEnter={() => setHover("exchange")}
            onMouseLeave={() => setHover("none")}
            className="cursor-pointer"
          >
            <rect
              x={164}
              y={100}
              width={164}
              height={96}
              rx={14}
              fill={exchange ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.03)"}
              stroke={exchange ? "rgba(96,165,250,0.75)" : "rgba(255,255,255,0.12)"}
              strokeWidth={1.5}
            />
            <text x={246} y={124} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={600}>
              RabbitMQ
            </text>
            <DiagramChip x={176} y={134} width={68} label="Exchange" active={exchange} />
            <DiagramChip x={252} y={134} width={64} label="topic" active={exchange} />
            <text
              x={246}
              y={182}
              textAnchor="middle"
              fill="#71717a"
              fontSize={9}
              fontFamily="ui-monospace, monospace"
            >
              routing key: order.*
            </text>
          </g>

          {/* Queues + consumers */}
          {consumers.map((c) => {
            const active = hover === c.id || exchange;
            const queueY = c.y + 28;
            return (
              <g key={c.id}>
                <DiagramEdge x1={328} y1={148} x2={360} y2={queueY} active={active} />
                <DiagramNode
                  x={360}
                  y={c.y}
                  width={72}
                  height={28}
                  label={c.queue}
                  glow={hover === c.id || exchange}
                />
                <DiagramEdge x1={396} y1={c.y + 28} x2={396} y2={c.y + 36} active={active} />
                <DiagramNode
                  x={360}
                  y={c.y + 36}
                  width={130}
                  label={c.label}
                  glow={hover === c.id}
                  onHover={(v) => setHover(v ? c.id : "none")}
                />
              </g>
            );
          })}

          {/* Animations */}
          {publisher && (
            <>
              <Packet x1={128} y1={148} x2={164} y2={148} delay={0} />
              <motion.g
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <text x={24} y={180} fill="#93c5fd" fontSize={9} fontFamily="ui-monospace, monospace">
                  publish order.created
                </text>
              </motion.g>
            </>
          )}

          {exchange &&
            consumers.map((c, i) => (
              <Packet
                key={c.id}
                x1={328}
                y1={148}
                x2={360}
                y2={c.y + 28}
                delay={i * 0.25}
              />
            ))}

          {consumers.map(
            (c) =>
              hover === c.id && (
                <g key={`anim-${c.id}`}>
                  <Packet x1={328} y1={148} x2={396} y2={c.y + 46} delay={0} />
                  <motion.g
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <text x={360} y={c.y + 72} fill="#93c5fd" fontSize={9} fontFamily="ui-monospace, monospace">
                      {c.queue} → {c.label}
                    </text>
                  </motion.g>
                </g>
              )
          )}

          {fanOut && hover === "exchange" && (
            <motion.g
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.3, repeat: Infinity }}
            >
              <text x={164} y={220} fill="#93c5fd" fontSize={9} fontFamily="ui-monospace, monospace">
                exchange fans out to 3 bound queues
              </text>
            </motion.g>
          )}
        </svg>
      </DiagramShell>
      <Hint>
        Hover Order Service, the Exchange, or any consumer to see routing and
        fan-out message flow.
      </Hint>
    </div>
  );
}
