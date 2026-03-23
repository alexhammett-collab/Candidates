"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const logos = [
  "Goldman Sachs",
  "Ramp",
  "Nubank",
  "Stripe",
  "Dell",
  "Cisco",
  "Mercado Libre",
  "Quora",
  "LG",
  "Replit",
  "Weights & Biases",
  "Perplexity",
];

const statValues = [
  { value: 14, suffix: "B", prefix: "$" },
  { value: 500, suffix: "+", prefix: "" },
  { value: 12, suffix: "M+", prefix: "" },
  { value: 100, suffix: "K+", prefix: "" },
];

function AnimatedNumber({
  value,
  prefix,
  suffix,
  inView,
}: {
  value: number;
  prefix: string;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function Traction() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const scrollRef = useRef(null);
  const y = useMotionValue(0);
  const parallaxY = useTransform(y, [0, 1], [0, -20]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const el = scrollRef.current as HTMLElement;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      y.set(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [y]);

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
            {t.traction.label}
          </motion.span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">
            {t.traction.heading.split(" ").map((word, i) => (
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

        <motion.div
          ref={scrollRef}
          style={{ y: parallaxY }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-20"
        >
          {logos.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="glass-panel flex items-center justify-center h-20 px-4 hover:border-black/10 transition-colors duration-300 cursor-default"
            >
              <span className="text-[13px] text-[#666] font-medium tracking-wide">
                {logo}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statValues.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(4px)" }}
              animate={inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(99,102,241,0.08)" }}
              className="glass-panel p-6 text-center transition-shadow duration-500"
            >
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111]">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <div className="mt-2 text-xs text-[#666] uppercase tracking-wider font-medium">
                {t.traction.statLabels[i]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
