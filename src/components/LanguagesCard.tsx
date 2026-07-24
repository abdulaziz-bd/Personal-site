import { motion } from "framer-motion";
import { BentoCard, CardChip } from "./BentoCard";
import { cefrLevels, spokenLanguages, languagesFootnote } from "../data/cv";

export default function LanguagesCard() {
  return (
    <BentoCard className="bg-card-tint">
      <CardChip>Languages</CardChip>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
        className="mt-5 flex flex-1 flex-col justify-center gap-6"
      >
        {spokenLanguages.map((lang) => {
          const reached = lang.cefr ? cefrLevels.indexOf(lang.cefr) : -1;
          return (
            <motion.div
              key={lang.name}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 180, damping: 18 },
                },
              }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[16px] font-semibold">{lang.name}</p>
                <p className="text-[12px] font-semibold text-ink-muted">
                  {lang.level}
                </p>
              </div>

              {lang.cefr && (
                <div className="mt-2.5 grid grid-cols-6 gap-1">
                  {cefrLevels.map((level, i) => (
                    <motion.span
                      key={level}
                      variants={{
                        hidden: { opacity: 0, scaleX: 0.6 },
                        show: {
                          opacity: 1,
                          scaleX: 1,
                          transition: {
                            type: "spring",
                            stiffness: 240,
                            damping: 20,
                            delay: i * 0.06,
                          },
                        },
                      }}
                      className={`rounded-md py-1 text-center text-[10px] font-bold ${
                        i <= reached
                          ? "bg-accent text-white"
                          : "border border-line bg-card text-ink-faint"
                      }`}
                    >
                      {level}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}

        <motion.p
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delay: 0.3 } },
          }}
          className="border-t border-line pt-4 text-[12.5px] italic leading-relaxed text-ink-muted"
        >
          {languagesFootnote}
        </motion.p>
      </motion.div>
    </BentoCard>
  );
}
