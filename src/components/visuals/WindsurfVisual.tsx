"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const files = [
  { name: "api/routes.ts", active: true },
  { name: "lib/auth.ts", active: false },
  { name: "components/Dashboard.tsx", active: false },
  { name: "utils/helpers.ts", active: false },
];

const editorLines = [
  { num: 24, text: "export async function handleAuth(req: Request) {", highlight: false },
  { num: 25, text: '  const token = req.headers.get("Authorization");', highlight: false },
  { num: 26, text: "  if (!token) return unauthorized();", highlight: false },
  { num: 27, text: "", highlight: false },
  { num: 28, text: "  const session = await validateToken(token);", highlight: true },
  { num: 29, text: "  if (session.expired) {", highlight: true },
  { num: 30, text: "    await refreshSession(session.id);", highlight: true },
  { num: 31, text: "    return redirect('/login');", highlight: true },
  { num: 32, text: "  }", highlight: true },
  { num: 33, text: "", highlight: false },
  { num: 34, text: "  return NextResponse.next();", highlight: false },
  { num: 35, text: "}", highlight: false },
];

const panelContent = [
  "Cascade is editing api/routes.ts",
  "Added session refresh logic for expired tokens",
  "Updated 2 files across the codebase",
];

export default function WindsurfVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [cursorLine, setCursorLine] = useState(0);
  const [panelVisible, setPanelVisible] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const cursorInterval = setInterval(() => {
      setCursorLine((v) => (v < editorLines.length - 1 ? v + 1 : v));
    }, 200);
    const panelInterval = setInterval(() => {
      setPanelVisible((v) => (v < panelContent.length ? v + 1 : v));
    }, 800);
    return () => {
      clearInterval(cursorInterval);
      clearInterval(panelInterval);
    };
  }, [inView]);

  return (
    <div ref={ref} className="glass-panel overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr_180px] min-h-[280px] sm:min-h-[320px] divide-y sm:divide-y-0 sm:divide-x divide-black/5">
        <div className="p-3">
          <div className="text-[10px] uppercase tracking-wider text-[#999] mb-3 font-medium">
            Explorer
          </div>
          <div className="space-y-1">
            {files.map((file, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.1 }}
                className={`text-[11px] px-2 py-1 rounded cursor-pointer ${
                  file.active
                    ? "bg-[#6366f1]/10 text-[#6366f1]"
                    : "text-[#555] hover:text-[#888]"
                }`}
              >
                {file.name}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] text-[#888] font-mono">api/routes.ts</span>
          </div>
          <div className="font-mono text-[11px] leading-5 space-y-0">
            {editorLines.map((line, i) => (
              <div
                key={i}
                className={`flex transition-colors duration-200 ${
                  line.highlight ? "bg-[#6366f1]/5" : ""
                } ${i === cursorLine ? "bg-white/[0.03]" : ""}`}
              >
                <span className="w-7 text-right text-[#333] mr-3 select-none shrink-0 text-[10px]">
                  {line.num}
                </span>
                <span className={line.highlight ? "text-[#e8e8e8]" : "text-[#666]"}>
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-[#080808]">
          <div className="text-[10px] uppercase tracking-wider text-[#6366f1] mb-3 font-medium">
            Cascade
          </div>
          <div className="space-y-2">
            {panelContent.slice(0, panelVisible).map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] text-[#888] leading-relaxed p-2 rounded bg-white/[0.02]"
              >
                {text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
