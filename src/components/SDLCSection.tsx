"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

const dimIds = ["cost", "speed", "risk"];
const dimColors = ["#10b981", "#6366f1", "#f59e0b"];
const dimIcons = [
  <svg key="cost" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>,
  <svg key="speed" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  <svg key="risk" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
];

export default function SDLCSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [activeLever, setActiveLever] = useState<string | null>(null);

  const pipelineRef = useRef(null);
  const pipelineInView = useInView(pipelineRef, { once: true, margin: "-10%" });

  return (
    <section id="sdlc" className="py-20 sm:py-24 px-6" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.span
            initial={{ opacity: 0, x: -15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="inline-block text-xs font-medium tracking-[0.25em] uppercase text-[#6366f1] mb-4"
          >
            {t.sdlc.label}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight max-w-4xl mx-auto leading-[1.1]">
            {t.sdlc.heading.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.28em]"
                initial={{ opacity: 0, y: 35, filter: "blur(3px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.65, ease }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.5, duration: 0.6, ease }}
            className="mt-5 text-lg text-[#555] max-w-2xl mx-auto leading-relaxed"
          >
            {t.sdlc.description}
          </motion.p>
        </div>

        {/* Three levers */}
        <div className="mt-16 sm:mt-20 grid md:grid-cols-3 gap-5 sm:gap-6">
          {t.sdlc.dims.map((dim, i) => {
            const id = dimIds[i];
            const color = dimColors[i];
            const icon = dimIcons[i];
            const isActive = activeLever === id;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" }}
                animate={inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.7, ease }}
                onMouseEnter={() => setActiveLever(id)}
                onMouseLeave={() => setActiveLever(null)}
                whileHover={{ y: -6 }}
                className="glass-panel p-6 sm:p-7 cursor-pointer transition-colors duration-300"
                style={{
                  borderColor: isActive ? `${color}40` : undefined,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${color}10`,
                      color: color,
                    }}
                  >
                    {icon}
                  </div>
                  <span
                    className="text-sm font-bold uppercase tracking-wider"
                    style={{ color: color }}
                  >
                    {dim.lever}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-[#222] mb-4 leading-snug">
                  {dim.headline}
                </h3>

                <ul className="space-y-2.5">
                  {dim.points.map((point, pi) => (
                    <motion.li
                      key={pi}
                      initial={{ opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.9 + i * 0.15 + pi * 0.08, duration: 0.5, ease }}
                      className="flex items-start gap-2.5 text-sm text-[#555] leading-relaxed"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* SDLC pipeline */}
        <div ref={pipelineRef} className="mt-20 sm:mt-28">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="text-center text-sm font-medium tracking-[0.2em] uppercase text-[#999] mb-10"
          >
            {t.sdlc.pipelineLabel}
          </motion.h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {t.sdlc.stages.map((stage, i) => (
              <motion.div
                key={stage.phase}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={pipelineInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  delay: 0.15 + i * 0.08,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(99,102,241,0.06)" }}
                className="glass-panel p-4 text-center"
              >
                <motion.div
                  className="w-8 h-8 rounded-lg bg-[#6366f1]/8 flex items-center justify-center mx-auto mb-2.5"
                  initial={{ scale: 0 }}
                  animate={pipelineInView ? { scale: 1 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  <span className="text-xs font-bold text-[#6366f1]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
                <h4 className="text-sm font-semibold text-[#333] mb-1">
                  {stage.phase}
                </h4>
                <p className="text-[10px] text-[#888] leading-relaxed">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
