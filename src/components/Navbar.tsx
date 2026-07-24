import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profile } from "../data/cv";

const links = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Website", href: profile.website },
];

function LogoMark() {
  return (
    <span className="flex items-end gap-1.5">
      {/* triangle mark, generously rounded corners */}
      <svg width="28" height="26" viewBox="0 0 32 30" aria-hidden="true">
        <path
          d="M19.9 12 L22.6 17 Q26.5 24 18.5 24 L13.5 24 Q5.5 24 9.4 17 L12.1 12 Q16 5 19.9 12 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
      </svg>
      <span className="mb-0.5 inline-block size-2 rounded-full bg-accent" />
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-20 flex items-center justify-between"
    >
      <div className="flex items-center gap-3 text-ink">
        <LogoMark />
        <a
          href={`mailto:${profile.email}`}
          className="text-[15px] font-medium underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-accent"
        >
          {profile.email}
        </a>
      </div>

      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex size-11 items-center justify-center rounded-full bg-card shadow-card"
        >
          <span className="flex w-[18px] flex-col gap-[4px]">
            <motion.span
              initial={false}
              animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="block h-[2px] w-[30%] self-end rounded-full bg-ink"
            />
            <motion.span
              initial={false}
              animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="block h-[2px] w-full rounded-full bg-ink"
            />
            <motion.span
              initial={false}
              animate={
                open
                  ? { rotate: -45, y: -3, width: "100%" }
                  : { rotate: 0, y: 0, width: "65%" }
              }
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="block h-[2px] self-start rounded-full bg-ink"
            />
          </span>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="absolute right-0 top-14 flex w-44 flex-col overflow-hidden rounded-2xl border border-line bg-card p-1.5 shadow-card-hover"
            >
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-page"
                >
                  {l.label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
