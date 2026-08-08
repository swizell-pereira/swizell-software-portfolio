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

type HoverKey =
  | "oauth"
  | "credentials"
  | "auth"
  | "token"
  | "api"
  | "none";

export default function AuthDiagram() {
  const [hover, setHover] = useState<HoverKey>("none");

  const oauth = hover === "oauth";
  const credentials = hover === "credentials";
  const auth = hover === "auth";
  const token = hover === "token";
  const api = hover === "api";

  return (
    <div>
      <DiagramShell canvasWidth={720}>
        <svg
          viewBox="0 0 720 580"
          className="h-auto w-full"
          role="img"
          aria-label="JWT authentication with OAuth authorization code flow and API validation"
        >
          <DiagramZone x={16} y={12} width={688} height={100} label="Client" />
          <DiagramZone x={16} y={120} width={688} height={140} label="Authentication" />
          <DiagramZone x={16} y={268} width={688} height={88} label="Token" />
          <DiagramZone x={16} y={364} width={688} height={120} label="Resource" />

          {/* Client */}
          <DiagramNode x={300} y={36} width={120} label="Browser / SPA" active={oauth || credentials} />

          {/* Identity Provider — OAuth path */}
          <DiagramNode
            x={520}
            y={32}
            width={160}
            height={44}
            label="Identity Provider"
            sublabel="OAuth 2.0 · OIDC"
            glow={oauth}
            onHover={(v) => setHover(v ? "oauth" : "none")}
          />

          <DiagramDashedEdge
            x1={420}
            y1={58}
            x2={520}
            y2={58}
            active={oauth}
            color="#fbbf24"
          />
          <DiagramDashedEdge
            x1={600}
            y1={76}
            x2={600}
            y2={108}
            active={oauth}
            color="#fbbf24"
          />
          <DiagramDashedEdge
            x1={600}
            y1={108}
            x2={400}
            y2={148}
            active={oauth}
            color="#fbbf24"
          />
          <DiagramLabel x={548} y={96} text="redirect" active={oauth} />
          <DiagramLabel x={500} y={132} text="auth code" active={oauth} />

          {/* Credentials path (optional) */}
          <DiagramNode
            x={80}
            y={148}
            width={120}
            label="Login Form"
            glow={credentials}
            onHover={(v) => setHover(v ? "credentials" : "none")}
          />
          <DiagramEdge x1={200} y1={166} x2={280} y2={166} active={credentials || auth} />
          <DiagramLabel x={228} y={154} text="email + password" active={credentials} />

          {/* Auth Service */}
          <g
            onMouseEnter={() => setHover("auth")}
            onMouseLeave={() => setHover("none")}
            className="cursor-pointer"
          >
            <rect
              x={280}
              y={148}
              width={240}
              height={80}
              rx={14}
              fill={auth ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.03)"}
              stroke={auth ? "rgba(96,165,250,0.75)" : "rgba(255,255,255,0.12)"}
              strokeWidth={1.5}
            />
            <text x={400} y={172} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={600}>
              Auth Service
            </text>
            <DiagramChip x={296} y={184} width={64} label="OAuth" active={auth || oauth} accent="gold" />
            <DiagramChip x={368} y={184} width={48} label="JWT" active={auth || token} accent="gold" />
            <DiagramChip x={424} y={184} width={48} label="RBAC" active={auth} />
            <text
              x={400}
              y={218}
              textAnchor="middle"
              fill="#71717a"
              fontSize={9}
              fontFamily="ui-monospace, monospace"
            >
              issue · sign · embed claims
            </text>
          </g>

          {/* Token tier */}
          <DiagramEdge x1={400} y1={228} x2={400} y2={288} active={auth || token || oauth || credentials} />
          <DiagramNode
            x={300}
            y={288}
            width={200}
            height={44}
            label="JWT Access Token"
            sublabel="exp · sub · roles · tenant_id"
            glow={token || auth}
            onHover={(v) => setHover(v ? "token" : "none")}
          />

          {/* Resource tier */}
          <DiagramEdge x1={400} y1={332} x2={400} y2={388} active={token || api} />
          <DiagramLabel x={412} y={364} text="Authorization: Bearer" active={token} />

          <DiagramNode
            x={280}
            y={388}
            width={240}
            height={44}
            label="API Gateway"
            sublabel="validate JWT · check RBAC"
            glow={api || token}
            onHover={(v) => setHover(v ? "api" : "none")}
          />

          <DiagramEdge x1={400} y1={432} x2={400} y2={468} active={api} />
          <DiagramNode
            x={300}
            y={468}
            width={200}
            height={44}
            label="Protected API"
            sublabel="business logic"
            glow={api}
          />

          {oauth && (
            <>
              <Packet x1={420} y1={58} x2={520} y2={58} delay={0} color="#fbbf24" />
              <Packet x1={600} y1={76} x2={600} y2={108} delay={0.25} color="#fbbf24" />
              <Packet x1={600} y1={108} x2={400} y2={148} delay={0.5} color="#fbbf24" />
              <motion.text
                x={520}
                y={24}
                fill="#fbbf24"
                fontSize={9}
                fontFamily="ui-monospace, monospace"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              >
                authorization code flow
              </motion.text>
            </>
          )}

          {credentials && (
            <>
              <Packet x1={200} y1={166} x2={280} y2={166} delay={0} />
              <Packet x1={400} y1={166} x2={400} y2={228} delay={0.3} />
            </>
          )}

          {auth && (
            <motion.text
              x={280}
              y={248}
              fill="#93c5fd"
              fontSize={9}
              fontFamily="ui-monospace, monospace"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              both paths converge → signed JWT issued
            </motion.text>
          )}

          {token && (
            <>
              <Packet x1={400} y1={332} x2={400} y2={388} delay={0} color="#fbbf24" />
              <Packet x1={400} y1={432} x2={400} y2={468} delay={0.35} color="#fbbf24" />
            </>
          )}

          {api && (
            <motion.text
              x={280}
              y={540}
              fill="#93c5fd"
              fontSize={9}
              fontFamily="ui-monospace, monospace"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              gateway validates signature · expiry · claims before routing
            </motion.text>
          )}

          <text
            x={360}
            y={560}
            textAnchor="middle"
            fill="#52525b"
            fontSize={10}
            fontFamily="ui-monospace, monospace"
          >
            Stateless auth · JWT on every request · OAuth for federated login
          </text>
        </svg>
      </DiagramShell>
      <Hint>
        Hover Identity Provider for OAuth. Hover Login Form for credentials.
        Hover Auth Service, JWT, or API Gateway to trace token issuance and
        validation.
      </Hint>
    </div>
  );
}
