import { motion } from "framer-motion";
import { BentoCard, CardChip } from "./BentoCard";
import { languages } from "../data/cv";

export default function LanguagesCard() {
  return (
    <BentoCard className="bg-card-tint">
      <CardChip>Languages I Speak</CardChip>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="mt-5 flex flex-1 flex-col justify-between gap-4"
      >
        {languages.map((lang) => (
          <motion.li
            key={lang.name}
            variants={{
              hidden: { opacity: 0, x: -10 },
              show: {
                opacity: 1,
                x: 0,
                transition: { type: "spring", stiffness: 180, damping: 18 },
              },
            }}
            className="group"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[14px] font-semibold">
                <span className="mr-1.5">{lang.flag}</span>
                {lang.name}
              </p>
              <p className="text-[11.5px] font-semibold text-ink-muted">
                {lang.level}
              </p>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.pct}%` }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.2 }}
                className="h-full rounded-full bg-accent"
              />
            </div>
            <p className="mt-1 text-[11.5px] italic text-ink-faint transition-colors group-hover:text-accent">
              {lang.joke}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </BentoCard>
  );
}
