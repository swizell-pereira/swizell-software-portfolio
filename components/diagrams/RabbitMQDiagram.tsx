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
  | "publisher"
  | "exchange"
  | "payment"
  | "notification"
  | "analytics"
  | "none";

const queues = [
  {
    id: "payment" as const,
    queue: "payment.q",
    binding: "order.payment",
    consumer: "Payment Service",
    y: 200,
  },
  {
    id: "notification" as const,
    queue: "notify.q",
    binding: "order.notify",
    consumer: "Notification Service",
    y: 280,
  },
  {
    id: "analytics" as const,
    queue: "analytics.q",
    binding: "order.analytics",
    consumer: "Analytics Service",
    y: 360,
  },
];

export default function RabbitMQDiagram() {
  const [hover, setHover] = useState<HoverKey>("none");

  const pub = hover === "publisher";
  const exchange = hover === "exchange";
  const fanOut = exchange || queues.some((q) => hover === q.id);

  return (
    <div>
      <DiagramShell canvasWidth={720}>
        <svg
          viewBox="0 0 720 520"
          className="h-auto w-full"
          role="img"
          aria-label="RabbitMQ topic exchange routing to bound queues and consumers"
        >
          <DiagramZone x={16} y={12} width={160} height={420} label="Publisher" />
          <DiagramZone x={184} y={12} width={280} height={420} label="Broker" />
          <DiagramZone x={476} y={12} width={228} height={420} label="Consumers" />

          {/* Publisher */}
          <DiagramNode
            x={40}
            y={200}
            width={120}
            height={44}
            label="Order Service"
            sublabel="domain event"
            glow={pub}
            onHover={(v) => setHover(v ? "publisher" : "none")}
          />
          <DiagramEdge x1={160} y1={222} x2={200} y2={222} active={pub || exchange} />
          <DiagramLabel x={168} y={210} text="order.created" active={pub || exchange} />

          {/* Exchange */}
          <g
            onMouseEnter={() => setHover("exchange")}
            onMouseLeave={() => setHover("none")}
            className="cursor-pointer"
          >
            <rect
              x={200}
              y={160}
              width={248}
              height={124}
              rx={14}
              fill={exchange ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.03)"}
              stroke={exchange ? "rgba(96,165,250,0.75)" : "rgba(255,255,255,0.12)"}
              strokeWidth={1.5}
            />
            <text x={324} y={188} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={600}>
              RabbitMQ Broker
            </text>
            <DiagramChip x={216} y={200} width={80} label="Exchange" active={exchange} />
            <DiagramChip x={304} y={200} width={56} label="topic" active={exchange} />
            <text
              x={324}
              y={258}
              textAnchor="middle"
              fill="#71717a"
              fontSize={9}
              fontFamily="ui-monospace, monospace"
            >
              routes by binding key pattern
            </text>
          </g>

          {/* Queues + consumers */}
          {queues.map((q) => {
            const active = hover === q.id || exchange;
            return (
              <g key={q.id}>
                <DiagramEdge x1={448} y1={222} x2={500} y2={q.y + 14} active={active} />
                <DiagramLabel x={458} y={q.y - 4} text={q.binding} active={active} />
                <DiagramNode
                  x={500}
                  y={q.y}
                  width={88}
                  height={28}
                  label={q.queue}
                  glow={hover === q.id || exchange}
                />
                <DiagramEdge
                  x1={544}
                  y1={q.y + 28}
                  x2={544}
                  y2={q.y + 40}
                  active={active}
                />
                <DiagramNode
                  x={500}
                  y={q.y + 40}
                  width={180}
                  height={36}
                  label={q.consumer}
                  sublabel="competing consumer"
                  glow={hover === q.id}
                  onHover={(v) => setHover(v ? q.id : "none")}
                />
              </g>
            );
          })}

          {pub && (
            <>
              <Packet x1={160} y1={222} x2={200} y2={222} delay={0} />
              <motion.text
                x={40}
                y={260}
                fill="#93c5fd"
                fontSize={9}
                fontFamily="ui-monospace, monospace"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                publish after DB commit
              </motion.text>
            </>
          )}

          {exchange &&
            queues.map((q, i) => (
              <Packet
                key={q.id}
                x1={448}
                y1={222}
                x2={544}
                y2={q.y + 58}
                delay={i * 0.22}
              />
            ))}

          {fanOut && hover === "exchange" && (
            <motion.text
              x={200}
              y={310}
              fill="#93c5fd"
              fontSize={9}
              fontFamily="ui-monospace, monospace"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.3, repeat: Infinity }}
            >
              topic exchange fans out to queues by binding key
            </motion.text>
          )}

          <text
            x={360}
            y={468}
            textAnchor="middle"
            fill="#52525b"
            fontSize={10}
            fontFamily="ui-monospace, monospace"
          >
            Async · at-least-once · decouples producer from consumer scale
          </text>
        </svg>
      </DiagramShell>
      <Hint>
        Hover Order Service to publish. Hover the Exchange to see topic routing.
        Hover any consumer to trace its bound queue.
      </Hint>
    </div>
  );
}
