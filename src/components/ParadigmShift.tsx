"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    label: "Skills & Expertise",
    description:
      "Full-stack engineering capability across languages, frameworks, and infrastructure, deployed on demand.",
  },
  {
    label: "Organisational Context",
    description:
      "Persistent understanding of your architecture, conventions, dependencies, and decision history.",
  },
  {
    label: "Governance & Controls",
    description:
      "Operates within your permission model, audit trail, approval gates, and compliance requirements.",
  },
  {
    label: "Fleet Orchestration",
    description:
      "A single Devin can coordinate and direct other Devins, scaling capacity across workstreams in parallel.",
  },
];

export default function ParadigmShift() {
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

  const bigStatement =
    "Devin is not a tool for developers.";
  const subStatement =
    "It's an institutionalised engineering capacity.";

  return (
    <section
      ref={sectionRef}
      className="relative py-40 sm:py-52 px-6 overflow-hidden"
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
            The Paradigm Shift
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
            Imagine a strategic engineering resource: PMO-aligned, programme-aware,
            with skills, organisational understanding, permissions, and governance controls,
            brought to bear as a lever for{" "}
            <span className="font-semibold text-[#333]">cost</span>,{" "}
            <span className="font-semibold text-[#333]">speed</span>, and{" "}
            <span className="font-semibold text-[#333]">risk of delivery</span>.
            Not a copilot. Not an assistant. A virtual engineering resource that
            can be considered for the same strategic programmes traditionally
            reserved for human teams and technology budgets.
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
              Devin Orchestrating Devins
            </h3>
          </div>
          <p className="text-[#555] leading-relaxed">
            A single Devin can decompose large initiatives, spin up parallel Devin
            instances, allocate work across them, review their output, and integrate
            the results, operating as a lead engineer directing a fleet of autonomous
            teammates. This is how engineering capacity scales without coordination overhead.
          </p>
        </motion.div>

        {/* Four pillars */}
        <div ref={pillarsRef} className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {pillars.map((pillar, i) => (
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
