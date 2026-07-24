import { motion } from "framer-motion";
import { BentoCard, CardChip } from "./BentoCard";
import { timeline } from "../data/cv";

export default function ExperienceCard() {
  return (
    <BentoCard>
      <CardChip>My Experience</CardChip>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="relative mt-5 flex flex-col gap-5 pl-1"
      >
        {/* timeline spine — centered on the 13px dots (4px ul padding + 6.5px) */}
        <span className="absolute bottom-3 left-[10px] top-2 w-px bg-line" aria-hidden="true" />

        {timeline.map((item) => (
          <motion.li
            key={item.title}
            variants={{
              hidden: { opacity: 0, x: -12 },
              show: {
                opacity: 1,
                x: 0,
                transition: { type: "spring", stiffness: 160, damping: 18 },
              },
            }}
            className={`relative flex gap-4 ${item.faded ? "opacity-40" : ""}`}
          >
            <span
              className={`relative z-10 mt-1 size-[13px] shrink-0 rounded-full ring-4 ring-card ${
                item.faded ? "bg-ink-faint" : "bg-ink"
              }`}
            />
            <div>
              <p className="text-[15px] font-semibold leading-tight">
                {item.title}
              </p>
              <p className="mt-1 text-[13px] text-ink-muted">{item.meta}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </BentoCard>
  );
}
