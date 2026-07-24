import { motion } from "framer-motion";
import { BentoCard, CardChip } from "./BentoCard";
import { publications, profile } from "../data/cv";

export default function PublicationsCard() {
  return (
    <BentoCard className="md:col-span-2">
      <CardChip>Publications</CardChip>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mt-5 flex flex-col divide-y divide-line"
      >
        {publications.map((pub) => {
          const inner = (
            <div className="flex items-start gap-4 py-3.5 first:pt-0 last:pb-0">
              <span className="mt-0.5 shrink-0 rounded-lg bg-accent-soft px-2.5 py-1 text-[12px] font-bold text-accent">
                {pub.year}
              </span>
              <div className="min-w-0">
                <p className="text-[14.5px] font-semibold leading-snug group-hover:text-accent">
                  {pub.title}
                  {pub.url && (
                    <span className="ml-1.5 inline-block text-[12px] text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
                      ↗
                    </span>
                  )}
                </p>
                <p className="mt-1 truncate text-[12.5px] text-ink-muted">
                  {pub.authors.split(profile.name).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <strong className="font-semibold text-ink">{profile.name}</strong>
                      )}
                    </span>
                  ))}
                  <span className="text-ink-faint"> · {pub.venue}</span>
                </p>
              </div>
            </div>
          );

          return (
            <motion.li
              key={pub.title}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 160, damping: 18 },
                },
              }}
            >
              {pub.url ? (
                <a href={pub.url} target="_blank" rel="noreferrer" className="group block">
                  {inner}
                </a>
              ) : (
                <div className="group">{inner}</div>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
    </BentoCard>
  );
}
