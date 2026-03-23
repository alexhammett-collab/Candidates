"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CognitionLogo from "./CognitionLogo";
import dynamic from "next/dynamic";
import { useLanguage } from "@/i18n/LanguageContext";

const NodeNetwork = dynamic(() => import("./NodeNetwork"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const networkScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.15]);

  const words = t.hero.title.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ scale: networkScale }}
      >
        <NodeNetwork className="absolute inset-0" />
      </motion.div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-white" />

      <motion.div
        className="relative z-10 max-w-[1200px] mx-auto px-6 text-center"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease }}
          className="mb-10"
        >
          <CognitionLogo height={64} className="mx-auto" />
        </motion.div>

        {/* Word-by-word headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] max-w-4xl mx-auto">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.28em]"
              initial={{ opacity: 0, y: 50, rotateX: 40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.4 + i * 0.07,
                duration: 0.8,
                ease,
              }}
              style={{ perspective: 400 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.1, duration: 0.8, ease }}
          className="mt-8 text-lg sm:text-xl text-[#666] max-w-2xl mx-auto leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6, ease }}
          className="mt-12 flex gap-4 justify-center"
        >
          <motion.a
            href="#platform"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium bg-[#111] text-white rounded-full"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {t.hero.explorePlatform}
          </motion.a>
          <motion.a
            href="#cta"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium border border-black/10 rounded-full"
            whileHover={{
              scale: 1.04,
              borderColor: "rgba(0,0,0,0.2)",
              backgroundColor: "rgba(0,0,0,0.02)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {t.hero.joinTeam}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-black/15 rounded-full flex items-start justify-center p-1"
        >
          <motion.div
            className="w-1 h-2 bg-black/30 rounded-full"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
