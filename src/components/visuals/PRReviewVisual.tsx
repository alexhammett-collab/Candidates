"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const diffLines = [
  { type: "header", text: "src/lib/payments.ts" },
  { type: "context", text: "  async processPayment(amount: number) {" },
  { type: "removed", text: "-    const result = await stripe.charge(amount);" },
  { type: "added", text: "+    const result = await stripe.charge(amount, {" },
  { type: "added", text: "+      idempotencyKey: generateKey()," },
  { type: "added", text: "+      metadata: { source: 'api' }," },
  { type: "added", text: "+    });" },
  { type: "context", text: "    if (!result.success) {" },
  { type: "removed", text: '-      throw new Error("Payment failed");' },
  { type: "added", text: "+      throw new PaymentError(result.code, result.message);" },
  { type: "context", text: "    }" },
  { type: "context", text: "    return result;" },
];

const comments = [
  {
    line: 4,
    text: "Good addition. The idempotency key prevents duplicate charges on retry. Consider using the request ID from headers if available.",
    delay: 1500,
  },
  {
    line: 9,
    text: "Custom error type is better here. Make sure PaymentError extends from a base AppError class for consistent handling.",
    delay: 2500,
  },
];

export default function PRReviewVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [visibleDiff, setVisibleDiff] = useState(0);
  const [visibleComments, setVisibleComments] = useState<number[]>([]);

  useEffect(() => {
    if (!inView) return;
    const diffInterval = setInterval(() => {
      setVisibleDiff((v) => (v < diffLines.length ? v + 1 : v));
    }, 150);

    comments.forEach((comment) => {
      setTimeout(() => {
        setVisibleComments((prev) => [...prev, comment.line]);
      }, comment.delay);
    });

    return () => clearInterval(diffInterval);
  }, [inView]);

  return (
    <div ref={ref} className="glass-panel overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-400/20 border border-emerald-400/40" />
          <span className="text-[11px] text-[#888] font-mono">
            feat: improve payment error handling
          </span>
        </div>
        <span className="text-[10px] text-[#555]">+4 −2</span>
      </div>

      <div className="p-4 bg-[#0a0a0a] font-mono text-[11px] leading-6">
        {diffLines.slice(0, visibleDiff).map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div
              className={`px-2 -mx-2 ${
                line.type === "header"
                  ? "text-[#888] font-semibold py-1 mb-1"
                  : line.type === "added"
                  ? "bg-emerald-500/5 text-emerald-300/80"
                  : line.type === "removed"
                  ? "bg-red-500/5 text-red-300/60"
                  : "text-[#555]"
              }`}
            >
              {line.text}
            </div>

            {visibleComments.includes(i) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="my-2 ml-4 p-3 rounded-lg bg-[#6366f1]/5 border border-[#6366f1]/10"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full bg-[#6366f1]/20 flex items-center justify-center">
                    <span className="text-[8px] text-[#6366f1] font-bold">D</span>
                  </div>
                  <span className="text-[10px] text-[#6366f1] font-medium">
                    Devin
                  </span>
                </div>
                <p className="text-[10px] text-[#888] leading-relaxed">
                  {comments.find((c) => c.line === i)?.text}
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
