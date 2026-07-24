import { motion } from "framer-motion";
import { BentoCard, CardChip } from "./BentoCard";
import { publications } from "../data/cv";

export default function PublicationsCard() {
  return (
    <BentoCard className="md:col-span-2">
      <div className="flex items-center justify-between">
        <CardChip>Publications</CardChip>
        <span className="text-[12px] font-semibold text-ink-faint">
          {publications.length} peer-reviewed papers
        </span>
      </div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mt-4 flex flex-1 flex-col justify-center divide-y divide-line"
      >
        {publications.map((pub) => {
          const row = (
            <div className="flex items-center gap-5 py-4">
              <span className="shrink-0 text-[20px] font-bold tabular-nums text-ink-faint transition-colors group-hover:text-accent">
                {pub.year}
              </span>
              <p
                className="min-w-0 flex-1 truncate text-[15px] font-semibold transition-colors group-hover:text-accent"
                title={pub.fullTitle}
              >
                {pub.shortTitle}
              </p>
              <span className="shrink-0 rounded-full bg-card-tint px-3 py-1 text-[11.5px] font-semibold text-ink-muted">
                {pub.venue}
              </span>
            </div>
          );

          return (
            <motion.li
              key={pub.shortTitle}
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
                  {row}
                </a>
              ) : (
                <div className="group">{row}</div>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
    </BentoCard>
  );
}
