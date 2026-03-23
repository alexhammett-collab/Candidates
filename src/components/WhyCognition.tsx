"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Software teams don't scale linearly.",
    highlight: "10× engineers cost 10×. Output rarely follows.",
    description:
      "Every additional engineer adds communication overhead, onboarding cost, and coordination debt. The industry has optimized the wrong variable for decades.",
    stat: "70%",
    statLabel: "of engineering time spent on maintenance, not creation",
  },
  {
    num: "02",
    title: "AI changes the unit of work.",
    highlight: "From headcount to intelligence.",
    description:
      "When an AI system can reason across an entire codebase, plan multi-step implementations, and execute autonomously, the bottleneck moves from people to capability.",
    stat: "1",
    statLabel: "Devin session replaces hours of repetitive engineering",
  },
  {
    num: "03",
    title: "Foundation models crossed the threshold.",
    highlight: "Not copilots. Engineers.",
    description:
      "Reasoning capability, long-context understanding, and tool use have converged. For the first time, it's possible to build AI that doesn't just suggest code. It engineers solutions.",
    stat: "∞",
    statLabel: "parallel workstreams, zero coordination overhead",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div ref={ref} className="relative">
      {/* Connecting line between steps */}
      {index < steps.length - 1 && (
        <motion.div
          className="absolute left-8 top-full w-px h-16 md:h-20 origin-top"
          style={{ background: "linear-gradient(to bottom, #6366f1, transparent)" }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="grid md:grid-cols-[1fr_280px] gap-8 md:gap-16 items-start"
      >
        <div className="flex gap-6">
          {/* Step number */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{
              delay: 0.2,
              duration: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="shrink-0 w-16 h-16 rounded-2xl glass-panel flex items-center justify-center"
          >
            <span className="text-lg font-bold text-[#6366f1]">{step.num}</span>
          </motion.div>

          <div>
            {/* Title with word-by-word reveal */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3 leading-[1.15]">
              {step.title.split(" ").map((word, wi) => (
                <motion.span
                  key={wi}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={
                    inView
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : {}
                  }
                  transition={{
                    delay: 0.3 + wi * 0.05,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h3>

            {/* Highlight phrase */}
            <motion.p
              initial={{ opacity: 0, width: 0 }}
              animate={inView ? { opacity: 1, width: "auto" } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-[#6366f1] font-semibold text-lg mb-4 overflow-hidden whitespace-nowrap"
            >
              {step.highlight}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-[#666] text-base sm:text-lg leading-relaxed max-w-xl"
            >
              {step.description}
            </motion.p>
          </div>
        </div>

        {/* Stat card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{
            delay: 0.5,
            duration: 0.7,
            type: "spring",
            stiffness: 150,
            damping: 18,
          }}
          className="glass-panel p-6 text-center self-start"
        >
          <motion.span
            className="block text-4xl sm:text-5xl font-bold text-[#6366f1] tracking-tight"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              delay: 0.8,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
          >
            {step.stat}
          </motion.span>
          <motion.span
            className="block mt-2 text-xs text-[#999] leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {step.statLabel}
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function WhyCognition() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const headerWords = "The way software gets built is about to change.".split(" ");

  return (
    <section ref={sectionRef} className="relative py-32 sm:py-40 px-6 overflow-hidden">
      {/* Subtle animated background gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#6366f1]/[0.03] blur-[120px]" />
      </motion.div>

      <div className="relative max-w-[1200px] mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="mb-24 sm:mb-32 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-xs font-medium tracking-[0.25em] uppercase text-[#6366f1] mb-6"
          >
            Why Cognition
          </motion.span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
            {headerWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.28em]"
                initial={{ opacity: 0, y: 40, rotateX: 45 }}
                animate={
                  headerInView
                    ? { opacity: 1, y: 0, rotateX: 0 }
                    : {}
                }
                transition={{
                  delay: 0.15 + i * 0.06,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ perspective: 200 }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-20 md:space-y-28">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
