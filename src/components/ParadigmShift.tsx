"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ParadigmShift() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });
  const pillarsRef = useRef(null);
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const bigStatement = t.paradigm.bigStatement;
  const subStatement = t.paradigm.subStatement;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-[#6366f1]/[0.04] blur-[150px]" />
      </motion.div>

      <div className="relative max-w-[1100px] mx-auto">
        {/* Big statement */}
        <div ref={headerRef} className="text-center mb-20 sm:mb-28">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="inline-block text-xs font-medium tracking-[0.25em] uppercase text-[#6366f1] mb-8"
          >
            {t.paradigm.label}
          </motion.span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08]">
            {bigStatement.split(" ").map((word, i) => (
              <motion.span
                key={`a-${i}`}
                className="inline-block mr-[0.28em]"
                initial={{ opacity: 0, y: 50, rotateX: 40 }}
                animate={
                  headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}
                }
                transition={{
                  delay: 0.15 + i * 0.06,
                  duration: 0.75,
                  ease,
                }}
                style={{ perspective: 300 }}
              >
                {word}
              </motion.span>
            ))}
            <br className="hidden sm:block" />
            {subStatement.split(" ").map((word, i) => (
              <motion.span
                key={`b-${i}`}
                className="inline-block mr-[0.28em] text-[#6366f1]"
                initial={{ opacity: 0, y: 50, rotateX: 40 }}
                animate={
                  headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}
                }
                transition={{
                  delay: 0.6 + i * 0.06,
                  duration: 0.75,
                  ease,
                }}
                style={{ perspective: 300 }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={
              headerInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : {}
            }
            transition={{ delay: 1.2, duration: 0.8, ease }}
            className="mt-10 text-lg sm:text-xl text-[#555] max-w-3xl mx-auto leading-relaxed"
          >
            {t.paradigm.bodyStart}{" "}
            <span className="font-semibold text-[#333]">{t.paradigm.cost}</span>,{" "}
            <span className="font-semibold text-[#333]">{t.paradigm.speed}</span>, and{" "}
            <span className="font-semibold text-[#333]">{t.paradigm.risk}</span>.
            {" "}{t.paradigm.bodyEnd}
          </motion.p>
        </div>

        {/* Fleet orchestration callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
          animate={
            headerInView
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : {}
          }
          transition={{ delay: 1.5, duration: 0.8, ease }}
          className="glass-panel p-8 sm:p-10 mb-20 sm:mb-28 max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#6366f1]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#333]">
              {t.paradigm.fleetTitle}
            </h3>
          </div>
          <p className="text-[#555] leading-relaxed">
            {t.paradigm.fleetBody}
          </p>
        </motion.div>

        {/* Four pillars */}
        <div ref={pillarsRef} className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {t.paradigm.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" }}
              animate={
                pillarsInView
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : {}
              }
              transition={{
                delay: 0.15 + i * 0.12,
                duration: 0.7,
                ease,
              }}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(99,102,241,0.08)" }}
              className="glass-panel p-6 sm:p-7"
            >
              <h4 className="text-base font-semibold text-[#333] mb-2">
                {pillar.label}
              </h4>
              <p className="text-sm text-[#666] leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
