"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ProfilePhoto from "@/components/ProfilePhoto";
import { PROFILE_PHOTO_PATH, SITE_NAME } from "@/lib/site";

export default function ProfilePhotoButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    const scrollY = window.scrollY;
    const { body, documentElement: html } = document;

    body.classList.add("menu-open");
    html.classList.add("menu-open");
    body.style.top = `-${scrollY}px`;

    return () => {
      window.removeEventListener("keydown", onKey);
      body.classList.remove("menu-open");
      html.classList.remove("menu-open");
      body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="my-1 shrink-0 rounded-full transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        aria-label="View profile photo"
      >
        <ProfilePhoto size="lg" priority />
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <>
                  <motion.button
                    type="button"
                    aria-label="Close profile photo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[200] touch-none bg-black/80 backdrop-blur-md"
                    onClick={() => setOpen(false)}
                  />

                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${SITE_NAME} profile photo`}
                    initial={{ opacity: 0, scale: 0.94, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[210] flex items-center justify-center px-4 py-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
                  >
                    <div
                      className="relative flex max-h-[min(85dvh,720px)] w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl sm:max-w-md"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Close"
                        className="absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                      >
                        <X className="size-5" strokeWidth={1.75} />
                      </button>

                      <div className="relative aspect-[3/4] w-full max-h-[min(70dvh,560px)] shrink-0">
                        <Image
                          src={PROFILE_PHOTO_PATH}
                          alt={`${SITE_NAME} profile photo`}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 90vw, 448px"
                          className="object-cover object-[center_22%]"
                          priority
                        />
                      </div>

                      <div className="shrink-0 px-5 py-4">
                        <p className="text-lg font-semibold text-white">
                          {SITE_NAME}
                        </p>
                        <p className="mt-0.5 text-sm text-neutral-400">
                          Senior Software Engineer
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}
