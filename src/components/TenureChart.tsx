"use client";

import { useEffect, useState } from "react";
import { roles } from "@/content/profile";

const AXIS_START = "2024-10";

const toIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};
const nowYm = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

/** Horizontal timeline of each role's tenure, in months. Bars are drawn with CSS; the labels carry the data as text. */
export function TenureChart({ builtAt }: { builtAt: string }) {
  // Start from the build month so server and client markup match, then move to the visitor's month.
  const [current, setCurrent] = useState(builtAt);
  useEffect(() => {
    // Reading the clock is only safe after hydration; this sync runs once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(nowYm(new Date()));
  }, []);

  const start = toIndex(AXIS_START);
  const end = toIndex(current) + 1;
  const span = Math.max(1, end - start);
  const ordered = [...roles].reverse(); // oldest first, reading left to right
  const years = [2025, 2026, 2027].filter((y) => y * 12 >= start && y * 12 < end);

  return (
    <figure className="mt-16">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-medium text-on-ink">Time in each role</span>
        <span className="text-sm text-on-ink-muted">Months, October 2024 to today</span>
      </figcaption>

      <div className="relative mt-6">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {years.map((y) => (
            <div
              key={y}
              className="absolute inset-y-0 border-l border-dashed border-ink-line"
              style={{ left: `${((y * 12 - start) / span) * 100}%` }}
            >
              <span className="figure absolute -top-5 -translate-x-1/2 text-xs text-on-ink-muted">{y}</span>
            </div>
          ))}
        </div>

        <ul className="relative space-y-3 pt-2">
          {ordered.map((r) => {
            const s = toIndex(r.start);
            const e = r.end ? toIndex(r.end) + 1 : end;
            const months = e - s;
            const left = ((s - start) / span) * 100;
            const width = (months / span) * 100;
            const isCurrent = r.end === null;
            return (
              <li key={r.title} className="relative">
                <div className="h-8 w-full">
                  <div
                    aria-hidden="true"
                    className={`absolute top-0 h-8 rounded-[2px] ${isCurrent ? "bg-emerald-bright" : "bg-gold/80"}`}
                    style={{ left: `${left}%`, width: `${width}%` }}
                  />
                </div>
                <p className="mt-1 flex flex-wrap justify-between gap-x-4 text-sm">
                  <span className="text-on-ink">{r.title}</span>
                  <span className="figure text-on-ink-muted">
                    {months} {months === 1 ? "month" : "months"}
                    {isCurrent ? ", ongoing" : ""}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </figure>
  );
}
