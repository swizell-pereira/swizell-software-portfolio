"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DiagramShell,
  DiagramNode,
  DiagramEdge,
  DiagramZone,
  DiagramLabel,
  Packet,
  Hint,
} from "./primitives";

export default function MultiTenantDiagram() {
  const [tenant, setTenant] = useState<"a" | "b" | null>(null);

  const colorA = "#60a5fa";
  const colorB = "#34d399";

  return (
    <div>
      <DiagramShell>
        <svg
          viewBox="0 0 560 400"
          className="h-auto w-full"
          role="img"
          aria-label="Multi-tenant SaaS isolation"
        >
          <DiagramZone x={16} y={12} width={120} height={300} label="Tenants" />
          <DiagramZone x={148} y={12} width={164} height={300} label="Shared Infrastructure" />
          <DiagramZone x={328} y={12} width={216} height={300} label="Isolated Schemas" />

          {/* Tenants */}
          <DiagramNode
            x={32}
            y={48}
            width={88}
            label="Tenant A"
            glow={tenant === "a"}
            onHover={(v) => setTenant(v ? "a" : null)}
          />
          <DiagramNode
            x={32}
            y={200}
            width={88}
            label="Tenant B"
            glow={tenant === "b"}
            onHover={(v) => setTenant(v ? "b" : null)}
          />

          {/* Tenant Context middleware */}
          <DiagramNode
            x={160}
            y={130}
            width={140}
            label="Tenant Context"
            sublabel="middleware"
            glow={tenant !== null}
          />

          <DiagramEdge x1={120} y1={66} x2={160} y2={140} active={tenant === "a"} />
          <DiagramEdge x1={120} y1={218} x2={160} y2={160} active={tenant === "b"} />
          <DiagramLabel x={132} y={100} text="tenant_id=A" active={tenant === "a"} />
          <DiagramLabel x={132} y={252} text="tenant_id=B" active={tenant === "b"} />

          <DiagramEdge x1={300} y1={148} x2={340} y2={148} active={tenant !== null} />

          {/* Shared DB */}
          <DiagramNode
            x={340}
            y={130}
            width={120}
            label="Shared DB"
            glow={tenant !== null}
          />

          <DiagramEdge x1={460} y1={140} x2={500} y2={66} active={tenant === "a"} />
          <DiagramEdge x1={460} y1={160} x2={500} y2={218} active={tenant === "b"} />

          {/* Schemas */}
          <DiagramNode
            x={480}
            y={48}
            width={120}
            label="Schema A"
            sublabel="isolated"
            glow={tenant === "a"}
          />
          <DiagramNode
            x={480}
            y={200}
            width={120}
            label="Schema B"
            sublabel="isolated"
            glow={tenant === "b"}
          />

          {/* Isolation boundary */}
          <motion.line
            x1={16}
            y1={130}
            x2={544}
            y2={130}
            stroke={tenant ? "rgba(96,165,250,0.35)" : "rgba(255,255,255,0.06)"}
            strokeDasharray="4 6"
            animate={tenant ? { opacity: [0.4, 0.9, 0.4] } : { opacity: 1 }}
            transition={{ duration: 1.5, repeat: tenant ? Infinity : 0 }}
          />

          {tenant === "a" && (
            <>
              <Packet x1={120} y1={66} x2={160} y2={140} delay={0} color={colorA} />
              <Packet x1={300} y1={148} x2={340} y2={148} delay={0.25} color={colorA} />
              <Packet x1={460} y1={148} x2={500} y2={66} delay={0.5} color={colorA} />
            </>
          )}
          {tenant === "b" && (
            <>
              <Packet x1={120} y1={218} x2={160} y2={160} delay={0} color={colorB} />
              <Packet x1={300} y1={158} x2={340} y2={158} delay={0.25} color={colorB} />
              <Packet x1={460} y1={168} x2={500} y2={218} delay={0.5} color={colorB} />
            </>
          )}

          {tenant && (
            <motion.text
              x={280}
              y={360}
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize={11}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              {tenant === "a"
                ? "Tenant A traffic stays in Schema A — row & schema isolation."
                : "Tenant B traffic stays in Schema B — no cross-tenant leakage."}
            </motion.text>
          )}
        </svg>
      </DiagramShell>
      <Hint>
        Hover a tenant to see tenant_id routing through middleware and schema
        isolation boundaries.
      </Hint>
    </div>
  );
}
