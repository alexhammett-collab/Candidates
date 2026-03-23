"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const leftCommands = [
  { prompt: "$ devin run migrate-database", type: "command" },
  { prompt: "→ Analyzing schema changes...", type: "output" },
  { prompt: "→ Generating migration: 003_add_user_roles.sql", type: "output" },
  { prompt: "→ Applying to staging...", type: "output" },
  { prompt: "✓ Migration complete (2.3s)", type: "success" },
];

const rightCommands = [
  { prompt: "$ devin run update-api-types", type: "command" },
  { prompt: "→ Scanning OpenAPI spec...", type: "output" },
  { prompt: "→ Regenerating TypeScript types...", type: "output" },
  { prompt: "→ Updating 14 files...", type: "output" },
  { prompt: "✓ Types updated (1.8s)", type: "success" },
];

function TerminalPane({
  commands,
  delay,
  inView,
}: {
  commands: typeof leftCommands;
  delay: number;
  inView: boolean;
}) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setVisible((v) => (v < commands.length ? v + 1 : v));
      }, 350);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inView, delay, commands.length]);

  return (
    <div className="p-4 bg-[#0a0a0a] font-mono text-[11px] leading-6 min-h-[200px]">
      {commands.slice(0, visible).map((cmd, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={
            cmd.type === "command"
              ? "text-[#e8e8e8]"
              : cmd.type === "success"
              ? "text-emerald-400"
              : "text-[#555]"
          }
        >
          {cmd.prompt}
        </motion.div>
      ))}
      {visible < commands.length && (
        <span className="inline-block w-2 h-3.5 bg-[#6366f1] animate-pulse" />
      )}
    </div>
  );
}

export default function CLIVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="glass-panel overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-black/5">
        <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="text-[10px] text-[#555] ml-2 font-mono">Terminal: devin</span>
      </div>
      <div className="grid grid-cols-2 divide-x divide-black/5">
        <TerminalPane commands={leftCommands} delay={0} inView={inView} />
        <TerminalPane commands={rightCommands} delay={600} inView={inView} />
      </div>
    </div>
  );
}
