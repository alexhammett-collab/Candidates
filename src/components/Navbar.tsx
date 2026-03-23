"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CognitionLogo from "./CognitionLogo";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageLabels, languageNames } from "@/i18n";
import type { Language } from "@/i18n";

const allLangs: Language[] = ["en", "fr", "de", "it"];

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.06]);
  const { language, setLanguage, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const links = [
    { label: t.nav.platform, href: "#platform" },
    { label: t.nav.devin, href: "#devin" },
    { label: t.nav.team, href: "#cta" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(255, 255, 255, ${v})`),
        borderBottom: useTransform(
          borderOpacity,
          (v) => `1px solid rgba(0, 0, 0, ${v})`
        ),
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="shrink-0">
          <CognitionLogo height={36} />
        </a>
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="hidden sm:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-[#666] hover:text-[#111] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://cognition.ai/careers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium px-4 py-2 bg-black/[0.03] border border-black/10 rounded-full hover:bg-black/[0.06] transition-colors duration-200"
            >
              {t.nav.viewRoles}
            </a>
          </div>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#666] hover:text-[#111] border border-black/10 rounded-full hover:bg-black/[0.03] transition-colors duration-200"
            >
              {languageLabels[language]}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-36 bg-white border border-black/10 rounded-xl shadow-lg overflow-hidden z-50"
                >
                  {allLangs.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors duration-150 flex items-center justify-between ${
                        lang === language
                          ? "bg-[#6366f1]/5 text-[#6366f1]"
                          : "text-[#555] hover:bg-black/[0.02]"
                      }`}
                    >
                      <span>{languageNames[lang]}</span>
                      <span className="text-[10px] text-[#999]">{languageLabels[lang]}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
