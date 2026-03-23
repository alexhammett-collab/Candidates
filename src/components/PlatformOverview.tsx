"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface PlatformNode {
  id: string;
  label: string;
  description: string;
  angle: number;
  color: string;
}

const nodes: PlatformNode[] = [
  {
    id: "windsurf",
    label: "Windsurf",
    description: "AI-native IDE with deep codebase understanding and multi-file editing.",
    angle: 0,
    color: "#38bdf8",
  },
  {
    id: "cli",
    label: "Devin CLI",
    description: "Terminal-native interface for dispatching and managing autonomous tasks.",
    angle: 72,
    color: "#a78bfa",
  },
  {
    id: "pr-review",
    label: "PR Review",
    description: "Automated code review with deep contextual understanding of your codebase.",
    angle: 144,
    color: "#34d399",
  },
  {
    id: "dana",
    label: "Dana",
    description: "AI data analyst that transforms questions into insights and visualizations.",
    angle: 216,
    color: "#fb923c",
  },
  {
    id: "deepwiki",
    label: "DeepWiki",
    description: "AI-generated documentation and knowledge base for any codebase.",
    angle: 288,
    color: "#f472b6",
  },
];

const miniDevins = [
  { label: "Devin", offsetAngle: 0 },
  { label: "Devin", offsetAngle: 72 },
  { label: "Devin", offsetAngle: 144 },
  { label: "Devin", offsetAngle: 216 },
  { label: "Devin", offsetAngle: 288 },
];

function OrbitalDiagram({
  inView,
  activeNode,
  setActiveNode,
}: {
  inView: boolean;
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
}) {
  const radius = 160;
  const orbSize = radius * 2 + 180;

  return (
    <div className="hidden md:flex items-start justify-center gap-0 lg:gap-8 relative">
      {/* Platform orbital */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative shrink-0"
        style={{ width: orbSize, height: orbSize }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="absolute"
            width={orbSize}
            height={orbSize}
            viewBox={`0 0 ${orbSize} ${orbSize}`}
          >
            <circle
              cx={orbSize / 2}
              cy={orbSize / 2}
              r={radius}
              fill="none"
              stroke="rgba(99, 102, 241, 0.1)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            {nodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = orbSize / 2 + Math.cos(rad) * radius;
              const y = orbSize / 2 + Math.sin(rad) * radius;
              return (
                <line
                  key={node.id}
                  x1={orbSize / 2}
                  y1={orbSize / 2}
                  x2={x}
                  y2={y}
                  stroke="rgba(99, 102, 241, 0.08)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
          <motion.div
            className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.05) 70%, transparent 100%)",
              border: "1px solid rgba(99,102,241,0.3)",
            }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-sm font-semibold text-[#6366f1]">Cognition</span>
          </motion.div>
        </div>
        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const isActive = activeNode === node.id;
          return (
            <motion.div
              key={node.id}
              className="absolute z-10"
              style={{
                left: `calc(50% + ${x}px - 48px)`,
                top: `calc(50% + ${y}px - 48px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: isActive ? 1.15 : 1 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 glass-panel"
                style={{
                  boxShadow: isActive ? `0 0 30px ${node.color}30` : "none",
                  borderColor: isActive ? `${node.color}40` : "rgba(0,0,0,0.06)",
                }}
              >
                <span
                  className="text-xs font-semibold text-center leading-tight"
                  style={{ color: isActive ? node.color : "#444" }}
                >
                  {node.label}
                </span>
              </div>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-48 glass-panel p-3 text-center z-20"
                >
                  <p className="text-[10px] text-[#666] leading-relaxed">
                    {node.description}
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Connector line between orbital and pod */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="hidden lg:flex items-center self-center"
        style={{ originX: 0 }}
      >
        <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366f1]/20 to-[#6366f1]/40" />
        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#6366f1]/40" />
      </motion.div>

      {/* Devin Engineering Pod */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="self-center relative"
        style={{ width: 320, height: 320 }}
      >
        {/* Pod label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#6366f1]/60">
            Virtual Engineering Pod
          </span>
        </motion.div>

        {/* Pod SVG */}
        <svg className="absolute inset-0" width={320} height={320} viewBox="0 0 320 320">
          <circle cx={160} cy={160} r={110} fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="1" strokeDasharray="4 6" />
          {miniDevins.map((mini) => {
            const rad = (mini.offsetAngle * Math.PI) / 180;
            const mx = 160 + Math.cos(rad) * 110;
            const my = 160 + Math.sin(rad) * 110;
            return (
              <line key={mini.offsetAngle} x1={160} y1={160} x2={mx} y2={my} stroke="rgba(99,102,241,0.12)" strokeWidth="1" />
            );
          })}
        </svg>

        {/* Center Devin master */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="w-[100px] h-[100px] rounded-full flex flex-col items-center justify-center z-10"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)",
              boxShadow: "0 0 40px rgba(99,102,241,0.25), 0 0 80px rgba(99,102,241,0.1)",
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          >
            <span className="text-sm font-bold text-white">Devin</span>
            <span className="text-[9px] text-white/70 mt-0.5 font-medium">Lead</span>
          </motion.div>
        </div>

        {/* Mini-Devin agents */}
        {miniDevins.map((mini, i) => {
          const rad = (mini.offsetAngle * Math.PI) / 180;
          const mx = Math.cos(rad) * 110;
          const my = Math.sin(rad) * 110;
          return (
            <motion.div
              key={i}
              className="absolute z-10"
              style={{
                left: `calc(50% + ${mx}px - 24px)`,
                top: `calc(50% + ${my}px - 24px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.4, type: "spring", stiffness: 250 }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(129,140,248,0.12) 100%)",
                  border: "1.5px solid rgba(99,102,241,0.3)",
                  boxShadow: "0 0 16px rgba(99,102,241,0.1)",
                }}
              >
                <span className="text-[8px] font-bold text-[#6366f1]">
                  {mini.label}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Pod description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-64 text-center"
        >
          <p className="text-[11px] text-[#888] leading-relaxed">
            A lead Devin orchestrates a fleet of agents, coordinating parallel workstreams like a virtual engineering team.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MobileGrid({ inView }: { inView: boolean }) {
  return (
    <div className="md:hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.05) 70%, transparent 100%)",
            border: "1px solid rgba(99,102,241,0.3)",
          }}
        >
          <span className="text-sm font-semibold text-[#6366f1]">Cognition</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
            className="glass-panel p-4 text-center"
          >
            <div
              className="w-3 h-3 rounded-full mx-auto mb-2"
              style={{ backgroundColor: node.color, opacity: 0.6 }}
            />
            <h4 className="text-base font-semibold mb-1" style={{ color: node.color }}>
              {node.label}
            </h4>
            <p className="text-[10px] text-[#666] leading-relaxed">
              {node.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Devin master agent + fleet on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6 p-5 rounded-2xl text-center"
        style={{
          background: "linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)",
          boxShadow: "0 0 30px rgba(99,102,241,0.2)",
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-base font-bold text-white">Devin</span>
          <span className="text-[10px] text-white/70 font-medium bg-white/15 px-2 py-0.5 rounded-full">
            Lead Agent
          </span>
        </div>
        <p className="text-xs text-white/80 leading-relaxed mb-4">
          A lead Devin orchestrates a fleet of autonomous Devin instances, coordinating parallel workstreams at scale.
        </p>
        <div className="flex items-center justify-center gap-2">
          {miniDevins.map((mini, i) => (
            <motion.div
              key={mini.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.06, type: "spring", stiffness: 300 }}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <span className="text-[9px] font-bold text-white">{mini.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function PlatformOverview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section id="platform" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, x: -15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366f1]"
          >
            Platform
          </motion.span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">
            {"One intelligence. Many surfaces.".split(" ").map((word, i) => (
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
          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-[#666] text-lg max-w-xl mx-auto"
          >
            Devin&apos;s reasoning engine powers every product in the Cognition ecosystem.
          </motion.p>
        </div>

        <OrbitalDiagram
          inView={inView}
          activeNode={activeNode}
          setActiveNode={setActiveNode}
        />
        <MobileGrid inView={inView} />
      </div>
    </section>
  );
}
