"use client";

import { motion } from "framer-motion";

type EngineerAvatarProps = {
  className?: string;
  walking?: boolean;
};

/** Minimal flat engineer avatar — modern, not cartoon */
export default function EngineerAvatar({
  className,
  walking = false,
}: EngineerAvatarProps) {
  return (
    <motion.div
      className={className}
      animate={walking ? { y: [0, -3, 0] } : { y: 0 }}
      transition={
        walking
          ? { duration: 0.45, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      <svg
        width="48"
        height="64"
        viewBox="0 0 48 64"
        fill="none"
        aria-hidden
      >
        {/* Hair */}
        <path
          d="M14 18c0-6 5-11 10-11s10 5 10 11v4H14v-4z"
          fill="#3f3f46"
        />
        <path
          d="M12 22c2-8 10-12 12-12s10 4 12 12v2H12v-2z"
          fill="#52525b"
        />
        {/* Face */}
        <ellipse cx="24" cy="24" rx="9" ry="10" fill="#fde8d7" />
        {/* Neck */}
        <rect x="21" y="32" width="6" height="4" fill="#fde8d7" />
        {/* Laptop / torso */}
        <path
          d="M10 38h28l-2 18H12L10 38z"
          fill="#2563EB"
          opacity={0.9}
        />
        <path d="M8 56h32l2 2H6l2-2z" fill="#1e40af" />
        {/* Screen glow */}
        <rect x="14" y="42" width="20" height="12" rx="1" fill="#09090B" opacity={0.35} />
        <rect x="15" y="43" width="18" height="10" rx="0.5" fill="#60a5fa" opacity={0.4} />
        {/* Arms */}
        <path
          d="M10 40 L4 48 L6 50 L12 42 Z"
          fill="#2563EB"
        />
        <path
          d="M38 40 L44 48 L42 50 L36 42 Z"
          fill="#2563EB"
        />
      </svg>
    </motion.div>
  );
}
