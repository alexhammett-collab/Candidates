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

const devinAngle = 36;
const miniDevins = [
  { label: "Devin", angle: -20 },
  { label: "Devin", angle: 16 },
  { label: "Devin", angle: 52 },
  { label: "Devin", angle: 88 },
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
  const radius = 165;
  const miniRadius = 70;
  const size = 580;
  const cx = size / 2;
  const cy = size / 2;

  const devinRad = (devinAngle * Math.PI) / 180;
  const devinCx = cx + Math.cos(devinRad) * radius;
  const devinCy = cy + Math.sin(devinRad) * radius;

  const isDevinActive = activeNode === "devin-master";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mx-auto hidden md:block"
      style={{ width: size, height: size + 40, maxWidth: "100%", overflow: "visible" }}
    >
      <div className="absolute inset-0 flex items-center justify-center" style={{ top: 0, height: size }}>
        <svg
          className="absolute"
          width={size + 120}
          height={size + 120}
          viewBox={`-60 -60 ${size + 120} ${size + 120}`}
          style={{ overflow: "visible" }}
        >
          {/* Main orbit ring */}
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="1" strokeDasharray="4 8" />

          {/* Lines from center to product nodes */}
          {nodes.map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            return (
              <line key={node.id} x1={cx} y1={cy} x2={cx + Math.cos(rad) * radius} y2={cy + Math.sin(rad) * radius} stroke="rgba(99,102,241,0.08)" strokeWidth="1" />
            );
          })}

          {/* Line from center to Devin */}
          <line x1={cx} y1={cy} x2={devinCx} y2={devinCy} stroke="rgba(99,102,241,0.15)" strokeWidth="1.5" />

          {/* Mini-Devin orbit arc around Devin */}
          <circle cx={devinCx} cy={devinCy} r={miniRadius} fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="1" strokeDasharray="3 6" />

          {/* Lines from Devin to mini-Devins */}
          {miniDevins.map((mini) => {
            const mRad = (mini.angle * Math.PI) / 180;
            return (
              <line key={mini.angle} x1={devinCx} y1={devinCy} x2={devinCx + Math.cos(mRad) * miniRadius} y2={devinCy + Math.sin(mRad) * miniRadius} stroke="rgba(99,102,241,0.12)" strokeWidth="1" />
            );
          })}
        </svg>

        {/* Center: Cognition */}
        <motion.div
          className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.05) 70%, transparent 100%)",
            border: "1px solid rgba(99,102,241,0.3)",
          }}
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="text-sm font-semibold text-[#6366f1]">Cognition</span>
        </motion.div>
      </div>

      {/* Product nodes on the ring */}
      {nodes.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        const isActive = activeNode === node.id;
        return (
          <motion.div
            key={node.id}
            className="absolute z-10"
            style={{ left: `calc(50% + ${x}px - 48px)`, top: `calc(${size / 2}px + ${y}px - 48px)` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: isActive ? 1.12 : 1 } : {}}
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
              <span className="text-xs font-semibold text-center leading-tight" style={{ color: isActive ? node.color : "#444" }}>
                {node.label}
              </span>
            </div>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-48 glass-panel p-3 text-center z-20"
              >
                <p className="text-[10px] text-[#666] leading-relaxed">{node.description}</p>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Devin Lead on the ring */}
      <motion.div
        className="absolute z-20"
        style={{
          left: `calc(50% + ${Math.cos(devinRad) * radius}px - 48px)`,
          top: `calc(${size / 2}px + ${Math.sin(devinRad) * radius}px - 48px)`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: isDevinActive ? 1.1 : 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        onMouseEnter={() => setActiveNode("devin-master")}
        onMouseLeave={() => setActiveNode(null)}
      >
        <div
          className="w-24 h-24 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)",
            boxShadow: isDevinActive
              ? "0 0 50px rgba(99,102,241,0.4), 0 0 80px rgba(99,102,241,0.12)"
              : "0 0 25px rgba(99,102,241,0.2), 0 0 50px rgba(99,102,241,0.06)",
            border: "2px solid rgba(255,255,255,0.3)",
          }}
        >
          <span className="text-sm font-bold text-white">Devin</span>
          <span className="text-[9px] text-white/60 mt-0.5 font-medium">Lead</span>
        </div>
        {isDevinActive && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-52 glass-panel p-3 text-center z-30"
          >
            <p className="text-[10px] text-[#666] leading-relaxed">
              A lead Devin orchestrates a fleet of autonomous agents, coordinating parallel workstreams like a virtual engineering pod.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Mini-Devin agents spawning off Devin */}
      {miniDevins.map((mini, i) => {
        const mRad = (mini.angle * Math.PI) / 180;
        const baseX = Math.cos(devinRad) * radius;
        const baseY = Math.sin(devinRad) * radius;
        const mx = baseX + Math.cos(mRad) * miniRadius;
        const my = baseY + Math.sin(mRad) * miniRadius;
        return (
          <motion.div
            key={i}
            className="absolute z-10"
            style={{
              left: `calc(50% + ${mx}px - 19px)`,
              top: `calc(${size / 2}px + ${my}px - 19px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.0 + i * 0.1, duration: 0.4, type: "spring", stiffness: 250 }}
          >
            <div
              className="w-[38px] h-[38px] rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(129,140,248,0.15) 100%)",
                border: "1.5px solid rgba(99,102,241,0.3)",
                boxShadow: "0 0 14px rgba(99,102,241,0.1)",
              }}
            >
              <span className="text-[8px] font-bold text-[#6366f1]">{mini.label}</span>
            </div>
          </motion.div>
        );
      })}

      {/* Pod label near mini-devins */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute z-10"
        style={{
          left: `calc(50% + ${Math.cos(devinRad) * radius + miniRadius + 28}px)`,
          top: `calc(${size / 2}px + ${Math.sin(devinRad) * radius + 8}px)`,
        }}
      >
        <span className="text-[9px] font-semibold tracking-[0.15em] uppercase text-[#6366f1]/50 whitespace-nowrap">
          Engineering Pod
        </span>
      </motion.div>
    </motion.div>
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
