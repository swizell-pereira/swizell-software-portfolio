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

type HoverKey = "login" | "oauth" | "auth" | "token" | "none";

export default function AuthDiagram() {
  const [hover, setHover] = useState<HoverKey>("none");

  const login = hover === "login";
  const oauth = hover === "oauth";
  const auth = hover === "auth";
  const token = hover === "token";

  return (
    <div>
      <DiagramShell>
        <svg
          viewBox="0 0 560 480"
          className="h-auto w-full"
          role="img"
          aria-label="Authentication with JWT and OAuth 2.0"
        >
          <DiagramZone x={16} y={12} width={240} height={148} label="Credentials" />
          <DiagramZone x={272} y={12} width={272} height={148} label="OAuth 2.0" />

          {/* Credentials path */}
          <DiagramNode
            x={32}
            y={48}
            width={80}
            label="User"
            glow={login}
            onHover={(v) => setHover(v ? "login" : "none")}
          />
          <DiagramEdge x1={112} y1={66} x2={140} y2={66} active={login || auth} />
          <DiagramNode
            x={140}
            y={48}
            width={80}
            label="Login"
            glow={login}
            onHover={(v) => setHover(v ? "login" : "none")}
          />
          <DiagramEdge x1={220} y1={66} x2={248} y2={120} active={login || auth} />
          <DiagramLabel x={228} y={88} text="password" active={login} />

          {/* OAuth path */}
          <DiagramNode
            x={288}
            y={48}
            width={80}
            label="User"
            glow={oauth}
            onHover={(v) => setHover(v ? "oauth" : "none")}
          />
          <DiagramDashedEdge x1={368} y1={66} x2={396} y2={66} active={oauth || auth} color="#fbbf24" />
          <DiagramNode
            x={396}
            y={48}
            width={100}
            label="OAuth Provider"
            sublabel="Google / GitHub"
            glow={oauth}
            onHover={(v) => setHover(v ? "oauth" : "none")}
          />
          <DiagramDashedEdge x1={446} y1={84} x2={446} y2={100} active={oauth || auth} color="#fbbf24" />
          <DiagramNode
            x={396}
            y={100}
            width={100}
            label="Callback"
            glow={oauth}
            onHover={(v) => setHover(v ? "oauth" : "none")}
          />
          <DiagramDashedEdge x1={396} y1={118} x2={320} y2={148} active={oauth || auth} color="#fbbf24" />
          <DiagramLabel x={350} y={128} text="auth code" active={oauth} />

          {/* Auth Service — convergence */}
          <g
            onMouseEnter={() => setHover("auth")}
            onMouseLeave={() => setHover("none")}
            className="cursor-pointer"
          >
            <rect
              x={180}
              y={148}
              width={200}
              height={72}
              rx={14}
              fill={auth ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.03)"}
              stroke={auth ? "rgba(96,165,250,0.75)" : "rgba(255,255,255,0.12)"}
              strokeWidth={1.5}
            />
            <text x={280} y={172} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={600}>
              Auth Service
            </text>
            <DiagramChip x={196} y={184} width={48} label="JWT" active={auth || token} accent="gold" />
            <DiagramChip x={252} y={184} width={56} label="OAuth" active={auth || oauth} accent="gold" />
            <DiagramChip x={316} y={184} width={48} label="RBAC" active={auth} />
          </g>

          <DiagramEdge x1={280} y1={220} x2={280} y2={248} active={auth || login || oauth || token} />

          {/* Shared token path */}
          <DiagramNode
            x={200}
            y={248}
            width={160}
            label="JWT Issued"
            glow={token || auth}
            onHover={(v) => setHover(v ? "token" : "none")}
          />
          <DiagramEdge x1={280} y1={284} x2={280} y2={308} active={token} />
          <DiagramNode
            x={200}
            y={308}
            width={160}
            label="Browser Store"
            glow={token}
            onHover={(v) => setHover(v ? "token" : "none")}
          />
          <DiagramEdge x1={280} y1={344} x2={280} y2={368} active={token} />
          <DiagramNode
            x={200}
            y={368}
            width={160}
            label="Protected Route"
            glow={token}
            onHover={(v) => setHover(v ? "token" : "none")}
          />
          <DiagramEdge x1={280} y1={404} x2={280} y2={428} active={token} />
          <DiagramNode
            x={200}
            y={428}
            width={160}
            label="API validates JWT"
            glow={token}
            onHover={(v) => setHover(v ? "token" : "none")}
          />

          {/* Animations — credentials */}
          {login && (
            <>
              <Packet x1={112} y1={66} x2={140} y2={66} delay={0} />
              <Packet x1={220} y1={66} x2={248} y2={120} delay={0.25} />
              <Packet x1={280} y1={148} x2={280} y2={248} delay={0.5} color="#60a5fa" />
            </>
          )}

          {/* Animations — OAuth */}
          {oauth && (
            <>
              <Packet x1={368} y1={66} x2={396} y2={66} delay={0} color="#fbbf24" />
              <Packet x1={446} y1={84} x2={446} y2={100} delay={0.2} color="#fbbf24" />
              <Packet x1={446} y1={118} x2={320} y2={148} delay={0.4} color="#fbbf24" />
              <Packet x1={280} y1={148} x2={280} y2={248} delay={0.65} color="#fbbf24" />
              <motion.g
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              >
                <text x={288} y={36} fill="#fbbf24" fontSize={9} fontFamily="ui-monospace, monospace">
                  redirect → authorize → callback
                </text>
              </motion.g>
            </>
          )}

          {/* Auth service — both paths */}
          {auth && (
            <>
              <Packet x1={220} y1={66} x2={248} y2={120} delay={0} color="#60a5fa" />
              <Packet x1={396} y1={118} x2={320} y2={148} delay={0.2} color="#fbbf24" />
              <motion.g
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <text x={180} y={232} fill="#93c5fd" fontSize={9} fontFamily="ui-monospace, monospace">
                  both paths converge → JWT issued
                </text>
              </motion.g>
            </>
          )}

          {/* Token travels downstream */}
          {token && (
            <>
              <Packet x1={280} y1={284} x2={280} y2={308} delay={0} color="#fbbf24" />
              <Packet x1={280} y1={344} x2={280} y2={368} delay={0.25} color="#fbbf24" />
              <Packet x1={280} y1={404} x2={280} y2={428} delay={0.5} color="#fbbf24" />
              <motion.g
                animate={{ y: [248, 428] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect
                  x={372}
                  y={0}
                  width={56}
                  height={22}
                  rx={6}
                  fill="rgba(251,191,36,0.2)"
                  stroke="#fbbf24"
                />
                <text
                  x={400}
                  y={15}
                  textAnchor="middle"
                  fill="#fbbf24"
                  fontSize={10}
                  fontFamily="ui-monospace, monospace"
                >
                  token
                </text>
              </motion.g>
            </>
          )}
        </svg>
      </DiagramShell>
      <Hint>
        Hover Login for credentials, OAuth Provider for the OAuth 2.0 path, Auth
        Service for convergence, or JWT Issued to watch the token travel.
      </Hint>
    </div>
  );
}
