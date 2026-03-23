"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const ease = [0.22, 1, 0.36, 1] as const;

const NodeNetwork = dynamic(() => import("./NodeNetwork"), { ssr: false });

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="cta"
      className="relative min-h-[70vh] flex items-center justify-center px-6 overflow-hidden"
      ref={ref}
    >
      <NodeNetwork className="absolute inset-0 z-0 opacity-30" />

      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white via-transparent to-white" />

      <div className="relative z-10 text-center max-w-2xl">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
          {"Join the Frontier.".split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.28em]"
              initial={{ opacity: 0, y: 40, rotateX: 35 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease }}
              style={{ perspective: 300 }}
            >
              {word}
            </motion.span>
          ))}
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.4, duration: 0.7, ease }}
          className="mt-6 text-lg text-[#666] leading-relaxed"
        >
          We&apos;re building the most ambitious AI engineering team in the world.
          If you want to work on problems that matter, we want to talk to you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease }}
          className="mt-10 flex gap-4 justify-center flex-wrap"
        >
          <motion.a
            href="https://cognition.ai/careers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium bg-[#6366f1] text-white rounded-full"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 35px rgba(99,102,241,0.25)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            View Roles
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
          <motion.a
            href="https://cognition.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium border border-black/10 rounded-full"
            whileHover={{ scale: 1.05, borderColor: "rgba(0,0,0,0.2)", backgroundColor: "rgba(0,0,0,0.02)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
