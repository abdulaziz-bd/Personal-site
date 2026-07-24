import { motion } from "framer-motion";
import { useState } from "react";
import { BentoCard, CardChip } from "./BentoCard";
import { projects, profile } from "../data/cv";

const tileRotation = [-10, 0, 10];

export default function ProjectsCard() {
  const [active, setActive] = useState(0);

  return (
    <BentoCard className="bg-card-tint">
      <CardChip>Featured Projects</CardChip>

      {/* fanned "album cover" tiles */}
      <div className="mt-6 flex flex-1 items-center justify-center">
        <div className="flex items-center -space-x-7">
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              onHoverStart={() => setActive(i)}
              onFocus={() => setActive(i)}
              initial={{ rotate: tileRotation[i], y: i === 1 ? -10 : 6 }}
              whileHover={{
                rotate: 0,
                y: -18,
                scale: 1.12,
                zIndex: 30,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              style={{ zIndex: i === active ? 20 : 10 - i }}
              className={`relative flex size-24 items-center justify-center rounded-2xl bg-gradient-to-br sm:size-[104px] ${p.gradient} shadow-[0_14px_30px_-10px_rgb(23_21_19/0.45)] ring-4 ring-card`}
              aria-label={`${p.name} on GitHub`}
            >
              <span className="select-none text-2xl font-bold text-white/95 drop-shadow">
                {p.emblem}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <motion.p
          key={projects[active].name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[16px] font-semibold"
        >
          {projects[active].name}
        </motion.p>
        <motion.p
          key={projects[active].tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto mt-1 max-w-[240px] text-[13px] leading-snug text-ink-muted"
        >
          {projects[active].tagline}
        </motion.p>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          Explore on GitHub
        </a>
      </div>
    </BentoCard>
  );
}
