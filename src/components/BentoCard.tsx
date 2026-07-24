import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function CardChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-line bg-card px-3.5 py-1.5 text-[13px] font-medium text-ink shadow-[0_1px_2px_rgb(23_21_19/0.05)]">
      {children}
    </span>
  );
}

const reveal = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

export function BentoCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={reveal}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`relative flex flex-col overflow-hidden rounded-bento border border-line bg-card p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover ${className}`}
    >
      {children}
    </motion.div>
  );
}

export const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
