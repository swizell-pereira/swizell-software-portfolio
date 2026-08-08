"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DiagramShell,
  DiagramNode,
  DiagramEdge,
  DiagramZone,
  DiagramDashedEdge,
  DiagramLabel,
  Packet,
  Hint,
} from "./primitives";

type Tenant = "a" | "b" | null;

export default function MultiTenantDiagram() {
  const [tenant, setTenant] = useState<Tenant>(null);

  const colorA = "#60a5fa";
  const colorB = "#34d399";

  return (
    <div>
      <DiagramShell canvasWidth={720}>
        <svg
          viewBox="0 0 720 560"
          className="h-auto w-full"
          role="img"
          aria-label="Multi-tenant SaaS with tenant context middleware and schema isolation"
        >
          <DiagramZone x={16} y={12} width={688} height={88} label="Tenants" />
          <DiagramZone x={16} y={108} width={688} height={88} label="Edge" />
          <DiagramZone x={16} y={204} width={688} height={88} label="Application" />
          <DiagramZone x={16} y={300} width={688} height={120} label="Data" />

          {/* Tenants */}
          <DiagramNode
            x={80}
            y={36}
            width={100}
            label="Tenant A"
            sublabel="org acme"
            glow={tenant === "a"}
            onHover={(v) => setTenant(v ? "a" : null)}
          />
          <DiagramNode
            x={80}
            y={120}
            width={100}
            label="Tenant B"
            sublabel="org globex"
            glow={tenant === "b"}
            onHover={(v) => setTenant(v ? "b" : null)}
          />

          {/* Edge — tenant resolution */}
          <DiagramEdge x1={180} y1={58} x2={260} y2={132} active={tenant === "a"} />
          <DiagramEdge x1={180} y1={142} x2={260} y2={148} active={tenant === "b"} />
          <DiagramLabel x={200} y={88} text="JWT tenant claim" active={tenant === "a"} />
          <DiagramLabel x={200} y={168} text="JWT tenant claim" active={tenant === "b"} />

          <DiagramNode
            x={260}
            y={132}
            width={200}
            height={44}
            label="API Gateway"
            sublabel="extract tenant_id"
            glow={tenant !== null}
          />

          {/* Application — tenant context */}
          <DiagramEdge x1={360} y1={176} x2={360} y2={220} active={tenant !== null} />
          <DiagramNode
            x={240}
            y={220}
            width={240}
            height={44}
            label="Tenant Context Middleware"
            sublabel="SET search_path · row filter"
            glow={tenant !== null}
          />

          {/* Data tier */}
          <DiagramEdge x1={360} y1={264} x2={360} y2={316} active={tenant !== null} />

          <DiagramNode
            x={280}
            y={316}
            width={160}
            height={44}
            label="PostgreSQL"
            sublabel="shared cluster"
            glow={tenant !== null}
          />

          <DiagramEdge x1={440} y1={338} x2={520} y2={338} active={tenant !== null} />

          {/* Schema isolation */}
          <DiagramNode
            x={520}
            y={300}
            width={120}
            height={44}
            label="Schema A"
            sublabel="tenant_a.*"
            glow={tenant === "a"}
          />
          <DiagramNode
            x={520}
            y={372}
            width={120}
            height={44}
            label="Schema B"
            sublabel="tenant_b.*"
            glow={tenant === "b"}
          />

          <DiagramEdge
            x1={520}
            y1={344}
            x2={520}
            y2={372}
            active={tenant === "b"}
          />
          <DiagramEdge
            x1={580}
            y1={344}
            x2={580}
            y2={300}
            active={tenant === "a"}
          />

          {/* Isolation boundary */}
          <DiagramDashedEdge
            x1={500}
            y1={288}
            x2={660}
            y2={288}
            active={tenant !== null}
            color="rgba(96,165,250,0.5)"
          />
          <DiagramDashedEdge
            x1={500}
            y1={428}
            x2={660}
            y2={428}
            active={tenant !== null}
            color="rgba(96,165,250,0.5)"
          />

          {tenant === "a" && (
            <>
              <Packet x1={180} y1={58} x2={360} y2={132} delay={0} color={colorA} />
              <Packet x1={360} y1={176} x2={360} y2={242} delay={0.25} color={colorA} />
              <Packet x1={440} y1={338} x2={580} y2={322} delay={0.5} color={colorA} />
            </>
          )}
          {tenant === "b" && (
            <>
              <Packet x1={180} y1={142} x2={360} y2={148} delay={0} color={colorB} />
              <Packet x1={360} y1={176} x2={360} y2={242} delay={0.25} color={colorB} />
              <Packet x1={440} y1={338} x2={580} y2={394} delay={0.5} color={colorB} />
            </>
          )}

          {tenant && (
            <motion.text
              x={360}
              y={480}
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize={11}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              {tenant === "a"
                ? "Tenant A queries scoped to schema_a — no cross-tenant reads."
                : "Tenant B queries scoped to schema_b — isolation enforced at connection."}
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
            Schema-per-tenant · tenant_id in JWT · middleware sets DB context
          </text>
        </svg>
      </DiagramShell>
      <Hint>
        Hover Tenant A or B to trace tenant_id from JWT through gateway middleware
        to isolated PostgreSQL schemas.
      </Hint>
    </div>
  );
}
