"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const query = "Show me revenue by region for Q4, compared to Q3";

const chartBars = [
  { label: "NA", q3: 65, q4: 82, color: "#6366f1" },
  { label: "EU", q3: 48, q4: 61, color: "#818cf8" },
  { label: "APAC", q3: 34, q4: 53, color: "#a5b4fc" },
  { label: "LATAM", q3: 22, q4: 31, color: "#c7d2fe" },
];

export default function DanaVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [typedChars, setTypedChars] = useState(0);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const typeInterval = setInterval(() => {
      setTypedChars((v) => {
        if (v >= query.length) {
          clearInterval(typeInterval);
          setTimeout(() => setShowChart(true), 400);
          return v;
        }
        return v + 1;
      });
    }, 40);
    return () => clearInterval(typeInterval);
  }, [inView]);

  return (
    <div ref={ref} className="glass-panel overflow-hidden">
      <div className="p-4 border-b border-black/5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-full bg-[#6366f1]/10 flex items-center justify-center">
            <span className="text-[9px] text-[#6366f1] font-bold">D</span>
          </div>
          <span className="text-[11px] text-[#666]">Ask Dana</span>
        </div>
        <div className="bg-[#0a0a0a] rounded-lg px-3 py-2.5 font-mono text-[12px] text-[#e8e8e8]">
          {query.slice(0, typedChars)}
          {typedChars < query.length && (
            <span className="inline-block w-[2px] h-3.5 bg-[#6366f1] animate-pulse ml-0.5 align-middle" />
          )}
        </div>
      </div>

      {showChart && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4"
        >
          <div className="text-[10px] text-[#888] mb-4 font-medium">
            Revenue by Region ($M)
          </div>
          <div className="flex items-end gap-4 h-40">
            {chartBars.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end h-32">
                  <motion.div
                    className="flex-1 rounded-t opacity-30"
                    style={{ backgroundColor: bar.color }}
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.q3}%` }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  />
                  <motion.div
                    className="flex-1 rounded-t"
                    style={{ backgroundColor: bar.color }}
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.q4}%` }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                  />
                </div>
                <span className="text-[10px] text-[#555] mt-1">{bar.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 justify-center">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#6366f1] opacity-30" />
              <span className="text-[9px] text-[#555]">Q3</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#6366f1]" />
              <span className="text-[9px] text-[#555]">Q4</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
