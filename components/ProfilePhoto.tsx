"use client";

import Image from "next/image";
import { useState } from "react";
import { PROFILE_INITIALS, PROFILE_PHOTO_PATH, SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

const sizeMap = {
  xs: { box: "size-9", text: "text-[10px]", px: 36 },
  sm: { box: "size-12", text: "text-xs", px: 48 },
  md: { box: "size-16", text: "text-sm", px: 64 },
  lg: { box: "size-24", text: "text-lg", px: 96 },
  xl: { box: "size-32", text: "text-xl", px: 128 },
} as const;

type ProfilePhotoProps = {
  size?: keyof typeof sizeMap;
  className?: string;
  priority?: boolean;
};

export default function ProfilePhoto({
  size = "md",
  className,
  priority = false,
}: ProfilePhotoProps) {
  const [error, setError] = useState(false);
  const { box, text, px } = sizeMap[size];

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-neutral-800 ring-2 ring-white/15",
        box,
        className
      )}
    >
      {!error ? (
        <Image
          src={PROFILE_PHOTO_PATH}
          alt={`${SITE_NAME} profile photo`}
          fill
          priority={priority}
          unoptimized
          sizes={`${px}px`}
          className="object-cover object-[center_22%]"
          onError={() => setError(true)}
        />
      ) : (
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/25 to-cyan-400/10 font-semibold tracking-wide text-white",
            text
          )}
        >
          {PROFILE_INITIALS}
        </span>
      )}
    </div>
  );
}
