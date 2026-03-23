"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const codeLines = [
  "async function deployService(config: DeployConfig) {",
  "  const cluster = await k8s.getCluster(config.env);",
  "  const manifest = generateManifest(config);",
  "  await cluster.apply(manifest);",
  "  const status = await waitForHealthy(cluster, config.name);",
  "  return { status, url: cluster.getServiceUrl(config.name) };",
  "}",
];

const taskTree = [
  { depth: 0, text: "Deploy payment service", status: "done" },
  { depth: 1, text: "Read deployment config", status: "done" },
  { depth: 1, text: "Generate k8s manifest", status: "done" },
  { depth: 1, text: "Apply to staging cluster", status: "active" },
  { depth: 2, text: "Wait for health check", status: "pending" },
  { depth: 1, text: "Run integration tests", status: "pending" },
];

export default function DevinVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [visibleLines, setVisibleLines] = useState(0);
  const [visibleTasks, setVisibleTasks] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setVisibleLines((v) => (v < codeLines.length ? v + 1 : v));
    }, 300);
    const taskInterval = setInterval(() => {
      setVisibleTasks((v) => (v < taskTree.length ? v + 1 : v));
    }, 400);
    return () => {
      clearInterval(interval);
      clearInterval(taskInterval);
    };
  }, [inView]);

  return (
    <div ref={ref} className="glass-panel overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] min-h-[280px] sm:min-h-[320px] divide-y sm:divide-y-0 sm:divide-x divide-black/5">
        <div className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-[#999] mb-3 font-medium">
            Task Tree
          </div>
          <div className="space-y-1.5">
            {taskTree.slice(0, visibleTasks).map((task, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
                style={{ paddingLeft: task.depth * 12 }}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    task.status === "done"
                      ? "bg-emerald-400"
                      : task.status === "active"
                      ? "bg-[#6366f1] animate-pulse"
                      : "bg-black/10"
                  }`}
                />
                <span
                  className={`text-[11px] ${
                    task.status === "done"
                      ? "text-[#555]"
                      : task.status === "active"
                      ? "text-[#111]"
                      : "text-[#555]"
                  }`}
                >
                  {task.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <span className="text-[10px] text-[#555] ml-2 font-mono">
              deploy.ts
            </span>
          </div>
          <div className="font-mono text-[11px] leading-5 space-y-0.5 overflow-x-auto">
            {codeLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex"
              >
                <span className="w-6 text-right text-[#333] mr-3 select-none shrink-0">
                  {i + 1}
                </span>
                <span className="text-[#c9d1d9]">{line}</span>
              </motion.div>
            ))}
            {visibleLines < codeLines.length && (
              <div className="flex">
                <span className="w-6 mr-3" />
                <span className="w-2 h-4 bg-[#6366f1] animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
