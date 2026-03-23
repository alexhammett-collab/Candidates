"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import CognitionLogo from "./CognitionLogo";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Devin", href: "#devin" },
  { label: "Team", href: "#cta" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.06]);

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
          <CognitionLogo height={22} />
        </a>
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
            View Roles
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
