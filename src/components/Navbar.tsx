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
    <span className="flex items-center gap-1.5">
      <svg width="34" height="30" viewBox="0 0 34 30" aria-hidden="true">
        <path
          d="M17 3.5c4.5 0 13 6.5 13 12.5 0 6.5-5 10.5-13 10.5S4 22.5 4 16C4 10 12.5 3.5 17 3.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="mb-3 inline-block size-1.5 rounded-full bg-accent" />
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
          className="flex size-11 flex-col items-end justify-center gap-1.5 rounded-full bg-card shadow-card"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 4, width: 18 } : { rotate: 0, y: 0 }}
            className="block h-[2px] w-[18px] rounded bg-ink"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -4, width: 18 } : { rotate: 0, y: 0 }}
            className="mr-0 block h-[2px] w-[12px] rounded bg-ink"
          />
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
