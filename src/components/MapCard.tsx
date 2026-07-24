import { motion } from "framer-motion";
import { useState } from "react";
import { BentoCard, CardChip } from "./BentoCard";
import { profile } from "../data/cv";

/** Decorative street-map illustration (Potsdam-inspired, not to scale). */
function StreetMap() {
  return (
    <svg
      viewBox="0 0 300 260"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="300" height="260" fill="#fbfaf8" />
      {/* river Havel */}
      <path
        d="M-10 200 C 60 170, 90 230, 160 210 S 260 240, 320 200 L 320 280 L -10 280 Z"
        fill="#eef1f3"
      />
      <g stroke="#dcd9d4" strokeWidth="2" fill="none">
        <path d="M-10 60 H 310" />
        <path d="M-10 120 C 80 110, 180 135, 310 115" />
        <path d="M40 -10 V 270" />
        <path d="M110 -10 C 115 80, 100 170, 120 270" />
        <path d="M190 -10 V 270" />
        <path d="M250 -10 C 245 90, 260 180, 250 270" />
      </g>
      <g stroke="#e7e4df" strokeWidth="1.1" fill="none">
        <path d="M-10 30 H 310" />
        <path d="M-10 90 C 100 82, 200 100, 310 88" />
        <path d="M-10 155 H 310" />
        <path d="M70 -10 V 270" />
        <path d="M150 -10 C 155 100, 145 180, 155 270" />
        <path d="M222 -10 V 270" />
        <path d="M280 -10 V 270" />
        <path d="M20 40 L 95 115 M 200 30 L 130 100 M 235 140 L 290 190" />
      </g>
      {/* park blocks */}
      <rect x="52" y="66" width="46" height="40" rx="4" fill="#e9efe6" />
      <rect x="200" y="128" width="40" height="34" rx="4" fill="#e9efe6" />
    </svg>
  );
}

export default function MapCard() {
  const [expanded, setExpanded] = useState(false);
  const { location } = profile;

  return (
    <BentoCard className="min-h-[320px] !p-0">
      <div className="absolute left-5 top-5 z-10">
        <CardChip>Map</CardChip>
      </div>

      <StreetMap />

      {/* location marker + animated relocation radius */}
      <div className="absolute left-1/2 top-[44%] z-[5] -translate-x-1/2 -translate-y-1/2">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full border-2 border-accent/50"
            initial={{ width: 20, height: 20, x: "-50%", y: "-50%", opacity: 0.9 }}
            animate={{ width: 150, height: 150, opacity: 0 }}
            transition={{
              duration: 3,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
        <span className="relative z-10 block size-4 rounded-full bg-accent ring-4 ring-white shadow-[0_4px_12px_rgb(244_83_11/0.5)]" />
      </div>

      {/* relocation pill — click to expand work modes */}
      <motion.button
        onClick={() => setExpanded((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="absolute left-1/2 top-[56%] z-10 -translate-x-1/2 cursor-pointer rounded-full border border-accent/25 bg-white/90 px-3.5 py-1.5 text-[12px] font-semibold text-accent shadow-card backdrop-blur"
      >
        {location.relocation} 🇩🇪
        <motion.span
          initial={false}
          animate={{
            height: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
            marginTop: expanded ? 4 : 0,
          }}
          className="block overflow-hidden text-[11px] font-medium text-ink-muted"
        >
          {location.workModes.join(" · ")}
        </motion.span>
      </motion.button>

      {/* city label */}
      <div className="absolute inset-x-0 bottom-5 z-[5] text-center">
        <p className="text-[24px] font-semibold uppercase tracking-[0.42em] text-ink/85">
          {location.city}
        </p>
        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.34em] text-ink-faint">
          {location.country}
        </p>
        <p className="mt-1 text-[10px] font-medium tracking-[0.18em] text-ink-faint">
          {location.coords}
        </p>
      </div>
    </BentoCard>
  );
}
