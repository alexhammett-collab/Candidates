"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

const perkIcons: ReactNode[] = [
  <svg key="eng" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  <svg key="globe" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
  <svg key="travel" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>,
  <svg key="star" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>,
  <svg key="heart" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
  <svg key="people" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
];

export default function Culture() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-10%" });

  return (
    <section className="py-32 sm:py-40 px-6" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, x: -15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="inline-block text-xs font-medium tracking-[0.25em] uppercase text-[#6366f1] mb-4"
          >
            {t.culture.label}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl mx-auto leading-[1.1]">
            {t.culture.heading.split(" ").map((word, i) => (
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
            transition={{ delay: 0.4, duration: 0.6, ease }}
            className="mt-5 text-lg text-[#555] max-w-2xl mx-auto leading-relaxed"
          >
            {t.culture.description}
          </motion.p>
        </div>

        {/* Big quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease }}
          className="glass-panel p-8 sm:p-12 text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <p className="text-xl sm:text-2xl font-medium text-[#222] leading-relaxed tracking-tight">
            {t.culture.quote}
          </p>
        </motion.div>

        {/* Perk cards */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {t.culture.perks.map((perk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" }}
              animate={cardsInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease }}
              whileHover={{ y: -5, boxShadow: "0 12px 40px rgba(99,102,241,0.06)" }}
              className="glass-panel p-6 sm:p-7"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#6366f1]/8 flex items-center justify-center text-[#6366f1]">
                  {perkIcons[i]}
                </div>
                <h3 className="text-base font-semibold text-[#222]">
                  {perk.title}
                </h3>
              </div>
              <p className="text-sm text-[#555] leading-relaxed">
                {perk.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Locations bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {t.culture.locations.map((loc) => (
            <div key={loc.city} className="text-center">
              <p className="text-sm font-semibold text-[#333]">{loc.city}</p>
              <p className="text-[11px] text-[#999] uppercase tracking-wider mt-0.5">
                {loc.status}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
