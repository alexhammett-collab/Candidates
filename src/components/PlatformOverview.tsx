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
  { label: "D1", offsetAngle: -55 },
  { label: "D2", offsetAngle: -15 },
  { label: "D3", offsetAngle: 25 },
  { label: "D4", offsetAngle: 65 },
  { label: "D5", offsetAngle: 105 },
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
  const innerRadius = 180;
  const outerRadius = 310;
  const miniRadius = 65;
  const size = outerRadius * 2 + 260;
  const cx = size / 2;
  const cy = size / 2;

  const devinRad = (devinAngle * Math.PI) / 180;
  const devinX = Math.cos(devinRad) * outerRadius;
  const devinY = Math.sin(devinRad) * outerRadius;

  const isDevinActive = activeNode === "devin-master";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mx-auto hidden md:block"
      style={{ width: size, height: size, maxWidth: "100%" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="absolute"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Inner orbit ring */}
          <circle
            cx={cx}
            cy={cy}
            r={innerRadius}
            fill="none"
            stroke="rgba(99, 102, 241, 0.1)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          {/* Outer orbit ring */}
          <circle
            cx={cx}
            cy={cy}
            r={outerRadius}
            fill="none"
            stroke="rgba(99, 102, 241, 0.06)"
            strokeWidth="1"
            strokeDasharray="6 10"
          />
          {/* Lines from center to inner nodes */}
          {nodes.map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = cx + Math.cos(rad) * innerRadius;
            const y = cy + Math.sin(rad) * innerRadius;
            return (
              <line
                key={node.id}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="rgba(99, 102, 241, 0.08)"
                strokeWidth="1"
              />
            );
          })}
          {/* Line from center to Devin master */}
          <line
            x1={cx}
            y1={cy}
            x2={cx + devinX}
            y2={cy + devinY}
            stroke="rgba(99, 102, 241, 0.12)"
            strokeWidth="1.5"
          />
          {/* Mini-Devin orbit ring around Devin */}
          <circle
            cx={cx + devinX}
            cy={cy + devinY}
            r={miniRadius}
            fill="none"
            stroke="rgba(99, 102, 241, 0.08)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
          {/* Lines from Devin to mini-Devins */}
          {miniDevins.map((mini) => {
            const mRad = (mini.offsetAngle * Math.PI) / 180;
            const mx = cx + devinX + Math.cos(mRad) * miniRadius;
            const my = cy + devinY + Math.sin(mRad) * miniRadius;
            return (
              <line
                key={mini.label}
                x1={cx + devinX}
                y1={cy + devinY}
                x2={mx}
                y2={my}
                stroke="rgba(99, 102, 241, 0.08)"
                strokeWidth="1"
              />
            );
          })}
        </svg>

        <motion.div
          className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center cursor-pointer"
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

      {/* Inner product nodes */}
      {nodes.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = Math.cos(rad) * innerRadius;
        const y = Math.sin(rad) * innerRadius;
        const isActive = activeNode === node.id;

        return (
          <motion.div
            key={node.id}
            className="absolute z-10"
            style={{
              left: `calc(50% + ${x}px - 56px)`,
              top: `calc(50% + ${y}px - 56px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: isActive ? 1.15 : 1 } : {}}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 glass-panel"
              style={{
                boxShadow: isActive ? `0 0 30px ${node.color}30` : "none",
                borderColor: isActive ? `${node.color}40` : "rgba(0,0,0,0.06)",
              }}
            >
              <span
                className="text-sm font-semibold text-center leading-tight"
                style={{ color: isActive ? node.color : "#444" }}
              >
                {node.label}
              </span>
            </div>

            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-52 glass-panel p-3 text-center z-20"
              >
                <p className="text-xs text-[#666] leading-relaxed">
                  {node.description}
                </p>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Devin master node on outer ring */}
      <motion.div
        className="absolute z-10"
        style={{
          left: `calc(50% + ${devinX}px - 44px)`,
          top: `calc(50% + ${devinY}px - 44px)`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: isDevinActive ? 1.12 : 1 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
        onMouseEnter={() => setActiveNode("devin-master")}
        onMouseLeave={() => setActiveNode(null)}
      >
        <div
          className="w-[88px] h-[88px] rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
          style={{
            background: isDevinActive
              ? "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0.08) 70%, transparent 100%)"
              : "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.04) 70%, transparent 100%)",
            border: `1.5px solid ${isDevinActive ? "rgba(99,102,241,0.5)" : "rgba(99,102,241,0.2)"}`,
            boxShadow: isDevinActive ? "0 0 40px rgba(99,102,241,0.15)" : "none",
          }}
        >
          <span className="text-sm font-bold text-[#6366f1]">Devin</span>
          <span className="text-[9px] text-[#6366f1]/60 mt-0.5">Master Agent</span>
        </div>

        {isDevinActive && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-56 glass-panel p-3 text-center z-20"
          >
            <p className="text-xs text-[#666] leading-relaxed">
              A lead Devin orchestrates a fleet of autonomous Devin instances, coordinating parallel workstreams at scale.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Mini-Devin satellite nodes */}
      {miniDevins.map((mini, i) => {
        const mRad = (mini.offsetAngle * Math.PI) / 180;
        const mx = devinX + Math.cos(mRad) * miniRadius;
        const my = devinY + Math.sin(mRad) * miniRadius;

        return (
          <motion.div
            key={mini.label}
            className="absolute z-10"
            style={{
              left: `calc(50% + ${mx}px - 16px)`,
              top: `calc(50% + ${my}px - 16px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.1 + i * 0.08, duration: 0.4, type: "spring", stiffness: 250 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-default transition-all duration-300"
              style={{
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.03) 100%)",
                border: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              <span className="text-[8px] font-semibold text-[#6366f1]/70">
                {mini.label}
              </span>
            </div>
          </motion.div>
        );
      })}
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
