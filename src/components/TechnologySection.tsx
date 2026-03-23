"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

interface TechnologySectionProps {
  id?: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  visual: ReactNode;
  reversed?: boolean;
}

export default function TechnologySection({
  id,
  label,
  title,
  description,
  bullets,
  visual,
  reversed = false,
}: TechnologySectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const titleWords = title.split(" ");

  return (
    <section id={id} className="py-16 sm:py-20 px-6" ref={ref}>
      <div
        className={`max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
          reversed ? "md:[direction:rtl]" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: reversed ? 60 : -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className={reversed ? "md:[direction:ltr]" : ""}
        >
          <motion.span
            initial={{ opacity: 0, x: -15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366f1]"
          >
            {label}
          </motion.span>

          <h3 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.15]">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.28em]"
                initial={{ opacity: 0, y: 25, filter: "blur(3px)" }}
                animate={
                  inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
                }
                transition={{
                  delay: 0.15 + i * 0.05,
                  duration: 0.6,
                  ease,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h3>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6, ease }}
            className="mt-4 text-[#666] text-lg leading-relaxed"
          >
            {description}
          </motion.p>

          <ul className="mt-6 space-y-3">
            {bullets.map((bullet, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.5 + i * 0.08,
                  duration: 0.5,
                  ease,
                }}
                className="flex items-start gap-3 text-sm text-[#555]"
              >
                <motion.span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6366f1] shrink-0"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    delay: 0.6 + i * 0.08,
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                  }}
                />
                {bullet}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
          animate={
            inView
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : {}
          }
          transition={{ duration: 0.9, delay: 0.25, ease }}
          style={{ y: visualY }}
          className={`${reversed ? "md:[direction:ltr]" : ""}`}
        >
          {visual}
        </motion.div>
      </div>
    </section>
  );
}
