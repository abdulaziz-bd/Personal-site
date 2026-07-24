import { motion } from "framer-motion";
import { BentoCard, CardChip } from "./BentoCard";
import { techStack } from "../data/cv";

export default function TechStackCard() {
  return (
    <BentoCard>
      <CardChip>Tech Stack &amp; Tools</CardChip>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="mt-5 flex flex-col gap-4"
      >
        {techStack.map((group) => (
          <div key={group.label}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <motion.span
                  key={item}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      transition: { type: "spring", stiffness: 300, damping: 20 },
                    },
                  }}
                  whileHover={{
                    scale: 1.08,
                    backgroundColor: "#fff1e8",
                    borderColor: "#f4530b",
                    color: "#f4530b",
                  }}
                  className="cursor-default rounded-full border border-line bg-card-tint px-3 py-1.5 text-[12.5px] font-medium text-ink transition-colors"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </BentoCard>
  );
}
