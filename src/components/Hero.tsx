import { motion } from "framer-motion";
import { profile } from "../data/cv";

const line = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 110, damping: 16 },
  },
};

function AvatarChip() {
  return (
    <motion.span
      whileHover={{ rotate: -6, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="relative -top-[0.3em] mx-3 inline-flex size-[1.5em] items-center justify-center overflow-hidden rounded-[0.24em] bg-ink align-middle shadow-[0_8px_24px_rgb(23_21_19/0.35)] ring-4 ring-white"
    >
      <img
        src={profile.avatar}
        alt={profile.fullLegalName}
        className="size-full object-cover object-center"
      />
    </motion.span>
  );
}

export default function Hero() {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } } }}
      className="mt-14 sm:mt-20"
    >
      <h1 className="text-[clamp(2.1rem,5.8vw,3.8rem)] font-medium leading-[1.1] tracking-tight">
        <motion.span variants={line} className="block">
          Hi, I&rsquo;m
          <AvatarChip />
          {profile.name}!
        </motion.span>
        <motion.span variants={line} className="block">
          <span className="text-ink-faint">I&rsquo;m {profile.roleArticle} </span>
          <span className="text-ink">{profile.roleTop}</span>
        </motion.span>
        <motion.span variants={line} className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="text-accent">{profile.roleMain}.</span>
          {profile.openToWork && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="relative top-[0.2em] inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-5 py-2.5 text-[15px] font-medium tracking-normal text-ink shadow-card"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
              </span>
              Open to work
            </motion.span>
          )}
        </motion.span>
      </h1>

      <motion.div
        variants={line}
        className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8"
      >
        <motion.a
          href={`mailto:${profile.email}?subject=Let's connect`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 320, damping: 16 }}
          className="rounded-full bg-ink px-8 py-4 text-[16px] font-medium text-white shadow-[0_16px_32px_-12px_rgb(23_21_19/0.5)]"
        >
          Book a call
        </motion.a>
        <p className="max-w-md text-[17px] leading-snug text-ink">
          {profile.blurb}
        </p>
      </motion.div>
    </motion.section>
  );
}
