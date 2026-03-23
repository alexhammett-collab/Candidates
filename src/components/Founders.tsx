"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const founders = [
  {
    name: "Scott Wu",
    role: "CEO",
    descriptor: "IOI Gold Medalist. Previously Lunchclub, Nuro.",
    initials: "SW",
  },
  {
    name: "Steven Hao",
    role: "CTO",
    descriptor: "IOI Gold Medalist. Previously Lunchclub, Citadel.",
    initials: "SH",
  },
  {
    name: "Walden Yan",
    role: "CPO",
    descriptor: "IOI Gold Medalist. Previously Scale AI, MIT.",
    initials: "WY",
  },
  {
    name: "Neal Wu",
    role: "Chief Scientist",
    descriptor: "IOI Gold Medalist. 2x ICPC World Finalist.",
    initials: "NW",
  },
];

export default function Founders() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, x: -15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366f1]"
          >
            Team
          </motion.span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">
            {"Built by world-class engineers.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.28em]"
                initial={{ opacity: 0, y: 30, filter: "blur(3px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(4px)" }}
              animate={inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="text-center group"
            >
              <motion.div
                className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-5 glass-panel flex items-center justify-center transition-all duration-500"
                whileHover={{ scale: 1.08, boxShadow: "0 12px 40px rgba(99,102,241,0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <span className="text-2xl font-semibold text-[#bbb] select-none">
                  {founder.initials}
                </span>
              </motion.div>
              <h3 className="text-base font-semibold">{founder.name}</h3>
              <p className="text-sm text-[#6366f1] font-medium mt-0.5">
                {founder.role}
              </p>
              <p className="text-xs text-[#555] mt-2 leading-relaxed max-w-[200px] mx-auto">
                {founder.descriptor}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
