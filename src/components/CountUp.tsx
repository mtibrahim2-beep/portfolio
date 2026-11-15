"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "@/hooks/useInView";

type Props = {
  value: number;
  decimals?: number;
  suffix?: string;
  durationMs?: number;
};

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Server-renders the final figure (correct without JS and for crawlers).
 * On the client, a figure that starts below the fold counts up once when it scrolls into view.
 */
export function CountUp({ value, decimals = 0, suffix = "", durationMs = 1400 }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  // Arm only when the figure is still off-screen on mount, so nothing visible ever jumps to zero.
  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    const rect = node.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      setArmed(true);
      setDisplay(0);
    }
  }, [ref]);

  useEffect(() => {
    if (!armed || !inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [armed, inView, value, durationMs]);

  return (
    <span ref={ref} className="figure">
      <span aria-hidden="true">
        {format(display, decimals)}
        {suffix}
      </span>
      <span className="sr-only">
        {format(value, decimals)}
        {suffix}
      </span>
    </span>
  );
}
