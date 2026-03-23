"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const founderData = [
  { name: "Scott Wu", image: "https://github.com/ScottSWu.png" },
  { name: "Steven Hao", image: "https://github.com/stevenhao.png" },
  { name: "Walden Yan", image: "https://github.com/walnutwaldo.png" },
  { name: "Russell Kaplan", image: "https://github.com/rkaplan.png" },
  { name: "Neal Wu", image: "https://github.com/nealwu.png" },
];

export default function Founders() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 sm:py-24 px-6" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, x: -15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366f1]"
          >
            {t.founders.label}
          </motion.span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">
            {t.founders.heading.split(" ").map((word, i) => (
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {founderData.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(4px)" }}
              animate={inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="text-center group"
            >
              <motion.div
                className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-5 glass-panel transition-all duration-500"
                whileHover={{ scale: 1.08, boxShadow: "0 12px 40px rgba(99,102,241,0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h3 className="text-base font-semibold">{founder.name}</h3>
              <p className="text-sm text-[#6366f1] font-medium mt-0.5">
                {t.founders.roles[i]}
              </p>
              <p className="text-xs text-[#555] mt-2 leading-relaxed max-w-[200px] mx-auto">
                {t.founders.descriptors[i]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
