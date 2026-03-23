"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

const channelMeta: { platform: string; handle: string; url: string; color: string; icon: ReactNode }[] = [
  {
    platform: "YouTube", handle: "@CognitionAI", url: "https://www.youtube.com/@CognitionAI", color: "#FF0000",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
  },
  {
    platform: "LinkedIn", handle: "Cognition", url: "https://www.linkedin.com/company/cognition-ai/", color: "#0A66C2",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
];

const contentMeta = [
  { type: "video", thumbnail: "🎬", url: "https://www.youtube.com/@CognitionAI", platform: "YouTube", platformColor: "#FF0000" },
  { type: "video", thumbnail: "📊", url: "https://www.youtube.com/@CognitionAI", platform: "YouTube", platformColor: "#FF0000" },
  { type: "article", thumbnail: "📝", url: "https://www.linkedin.com/company/cognition-ai/", platform: "LinkedIn", platformColor: "#0A66C2" },
  { type: "video", thumbnail: "🧠", url: "https://www.youtube.com/@CognitionAI", platform: "YouTube", platformColor: "#FF0000" },
  { type: "article", thumbnail: "🏗️", url: "https://www.linkedin.com/company/cognition-ai/", platform: "LinkedIn", platformColor: "#0A66C2" },
  { type: "video", thumbnail: "🤖", url: "https://www.youtube.com/@CognitionAI", platform: "YouTube", platformColor: "#FF0000" },
];

export default function MediaHub() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-8%" });

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
            {t.media.label}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl mx-auto leading-[1.1]">
            {t.media.heading.split(" ").map((word, i) => (
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
            {t.media.description}
          </motion.p>
        </div>

        {/* Channel links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 sm:mb-20">
          {channelMeta.map((channel, i) => (
            <motion.a
              key={channel.platform}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease }}
              whileHover={{ y: -3, boxShadow: `0 12px 40px ${channel.color}15` }}
              className="glass-panel px-6 py-4 flex items-center gap-4 w-full sm:w-auto min-w-[280px] cursor-pointer group"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                style={{ backgroundColor: `${channel.color}10`, color: channel.color }}
              >
                {channel.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#222]">{channel.platform}</span>
                  <span className="text-[10px] text-[#999]">{channel.handle}</span>
                </div>
                <p className="text-xs text-[#666] mt-0.5">{t.media.channelDescs[i]}</p>
              </div>
              <svg
                className="w-4 h-4 text-[#ccc] group-hover:text-[#999] transition-colors shrink-0 ml-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </motion.a>
          ))}
        </div>

        {/* Content previews */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {contentMeta.map((item, i) => (
            <motion.a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25, scale: 0.96, filter: "blur(3px)" }}
              animate={cardsInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease }}
              whileHover={{ y: -5, boxShadow: "0 16px 48px rgba(0,0,0,0.06)" }}
              className="glass-panel overflow-hidden group cursor-pointer block"
            >
              {/* Thumbnail area */}
              <div className="relative h-36 sm:h-40 flex items-center justify-center bg-gradient-to-br from-[#f8f8fa] to-[#f0f0f5] border-b border-black/5">
                <span className="text-4xl">{item.thumbnail}</span>
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-[#333] ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: item.platformColor }}
                  >
                    {item.platform}
                  </span>
                  <span className="text-[10px] text-[#ccc]">
                    {item.type === "video" ? t.media.video : t.media.article}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#222] leading-snug mb-2 group-hover:text-[#6366f1] transition-colors duration-200">
                  {t.media.content[i]?.title}
                </h3>
                <p className="text-xs text-[#666] leading-relaxed">
                  {t.media.content[i]?.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
