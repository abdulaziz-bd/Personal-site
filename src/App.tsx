import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExperienceCard from "./components/ExperienceCard";
import ProjectsCard from "./components/ProjectsCard";
import TechStackCard from "./components/TechStackCard";
import MapCard from "./components/MapCard";
import ExperienceTabsCard from "./components/ExperienceTabsCard";
import PublicationsCard from "./components/PublicationsCard";
import LanguagesCard from "./components/LanguagesCard";
import { gridStagger } from "./components/BentoCard";
import { profile } from "./data/cv";

export default function App() {
  return (
    <div id="top" className="mx-auto max-w-5xl px-5 pb-20 pt-7 sm:px-8">
      <Navbar />
      <Hero />

      {/* bento grid — row 1 */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={gridStagger}
        className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
      >
        <ExperienceCard />
        <ProjectsCard />
        <TechStackCard />
      </motion.div>

      {/* bento grid — row 2 */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={gridStagger}
        className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        <MapCard />
        <ExperienceTabsCard />
      </motion.div>

      {/* bento grid — row 3 */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={gridStagger}
        className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        <PublicationsCard />
        <LanguagesCard />
      </motion.div>

      <footer className="mt-16 flex flex-col items-center gap-2 text-center text-[13px] text-ink-muted">
        <p>
          © {new Date().getFullYear()} {profile.fullLegalName} ·{" "}
          <a href={`mailto:${profile.email}`} className="underline underline-offset-4 hover:text-accent">
            {profile.email}
          </a>
        </p>
        <p className="text-ink-faint">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent">GitHub</a>
          {" · "}
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn</a>
          {" · "}
          <a href={profile.website} target="_blank" rel="noreferrer" className="hover:text-accent">azizcode.dev</a>
          {" — built with React, Tailwind & Framer Motion"}
        </p>
      </footer>
    </div>
  );
}
