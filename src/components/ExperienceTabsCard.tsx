import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BentoCard, CardChip } from "./BentoCard";
import { experienceTabs } from "../data/cv";

export default function ExperienceTabsCard() {
  const [activeId, setActiveId] = useState(experienceTabs[0].id);
  const active = experienceTabs.find((t) => t.id === activeId)!;

  return (
    <BentoCard className="md:col-span-2">
      <CardChip>What I Have Experienced</CardChip>

      {/* content */}
      <div className="mt-5 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-[18px] font-bold">
                {active.step}&ensp;{active.heading}
              </h3>
            </div>
            <p className="mt-0.5 text-[13px] font-medium text-ink-faint">
              {active.period}
            </p>
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-muted">
              {active.summary}
            </p>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } } }}
              className="mt-4 flex flex-col gap-2.5"
            >
              {active.highlights.map((h) => (
                <motion.li
                  key={h}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { type: "spring", stiffness: 200, damping: 20 },
                    },
                  }}
                  className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-muted"
                >
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{h}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {active.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-accent-soft px-2.5 py-1 text-[11.5px] font-semibold text-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* tab pills */}
      <div className="mt-6 flex gap-1.5 overflow-x-auto rounded-full bg-page p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {experienceTabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                isActive ? "text-white" : "text-ink-muted hover:text-ink"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-ink"
                />
              )}
              <span className="relative z-10">
                <span className={isActive ? "" : "text-ink-faint"}>{tab.step}</span>
                &ensp;{tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </BentoCard>
  );
}
