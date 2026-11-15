"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { prefersReducedMotion } from "@/hooks/useInView";

/*
 * A sample bank reconciliation. Every figure is illustrative, not company data.
 * Adjusted bank = 1,284,600 + 250,000 − 84,500 = 1,450,100
 * Adjusted book = 1,452,350 − 1,150 − 1,100   = 1,450,100
 * Each adjustment that posts moves the difference closer to zero.
 */
type Line = { label: string; amount: number; side: "bank" | "book"; kind: "opening" | "adjustment" };

const LINES: Line[] = [
  { label: "Balance per bank statement", amount: 1_284_600, side: "bank", kind: "opening" },
  { label: "Add: deposit in transit", amount: 250_000, side: "bank", kind: "adjustment" },
  { label: "Less: cheque 4471 not yet presented", amount: -84_500, side: "bank", kind: "adjustment" },
  { label: "Balance per cash book", amount: 1_452_350, side: "book", kind: "opening" },
  { label: "Less: bank charges", amount: -1_150, side: "book", kind: "adjustment" },
  { label: "Less: direct debit not yet recorded", amount: -1_100, side: "book", kind: "adjustment" },
];

// Order in which adjustments post during the sequence (indexes into LINES).
const POST_ORDER = [1, 2, 4, 5];
const STEP_MS = 900;
const START_DELAY_MS = 700;

const fmt = (n: number) => {
  const s = Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return n < 0 ? `(${s})` : s;
};

function totals(posted: Set<number>) {
  let bank = 0;
  let book = 0;
  LINES.forEach((l, i) => {
    if (l.kind === "opening" || posted.has(i)) {
      if (l.side === "bank") bank += l.amount;
      else book += l.amount;
    }
  });
  return { bank, book, diff: book - bank };
}

const ALL_POSTED = new Set(POST_ORDER);

export function ReconciliationPanel() {
  // Server render shows the finished, balanced statement. The client replays the sequence once.
  const [posted, setPosted] = useState<Set<number>>(ALL_POSTED);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPosted(new Set()), 0));
    POST_ORDER.forEach((lineIndex, step) => {
      timers.push(
        window.setTimeout(
          () => setPosted((prev) => new Set(prev).add(lineIndex)),
          START_DELAY_MS + STEP_MS * (step + 1),
        ),
      );
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const { bank, book, diff } = totals(posted);
  const balanced = diff === 0;

  const block = (side: "bank" | "book", heading: string, adjusted: number) => (
    <div>
      <p className="mb-2 text-sm text-on-ink-muted">{heading}</p>
      <ul>
        {LINES.map((l, i) => {
          if (l.side !== side) return null;
          const isPosted = l.kind === "opening" || posted.has(i);
          return (
            <li
              key={l.label}
              className={`flex items-start justify-between gap-4 py-1.5 text-sm transition-opacity duration-500 ${
                isPosted ? "opacity-100" : "opacity-35"
              }`}
            >
              <span className="flex min-w-0 items-start gap-2">
                <span className="mt-[3px] inline-flex w-4 shrink-0 justify-center text-emerald-bright" aria-hidden="true">
                  {l.kind === "adjustment" && isPosted ? <Check size={14} strokeWidth={2.5} /> : null}
                </span>
                <span className="min-w-0">{l.label}</span>
              </span>
              <span className={`figure shrink-0 ${l.amount < 0 ? "text-loss-bright" : "text-on-ink"}`}>
                {fmt(l.amount)}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-1 flex items-baseline justify-between gap-4 pl-6 text-sm">
        <span className="font-medium text-on-ink">Adjusted balance</span>
        <span className="figure total-rule px-1 text-gold">{fmt(adjusted)}</span>
      </div>
    </div>
  );

  return (
    <figure className="relative rounded-[3px] border border-ink-line bg-ink-2/80 p-5 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.6)] sm:p-7">
      <figcaption className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-medium text-on-ink">Bank reconciliation</span>
        <span className="text-sm text-on-ink-muted">Sample figures in BDT, for illustration</span>
      </figcaption>

      <div aria-hidden="true" className="grid grid-cols-1 gap-6">
        {block("bank", "Bank side", bank)}
        {block("book", "Book side", book)}
      </div>

      <div
        aria-hidden="true"
        className="mt-7 flex items-end justify-between gap-4 border-t border-ink-line pt-5"
      >
        <div>
          <p className="text-sm text-on-ink-muted">Difference</p>
          <p
            className={`figure text-[2rem] leading-none transition-colors duration-500 sm:text-[2.5rem] ${
              balanced ? "text-emerald-bright" : "text-on-ink"
            }`}
          >
            {fmt(diff)}
          </p>
        </div>
        <p
          className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 text-sm transition-colors duration-500 ${
            balanced ? "border-emerald-bright/60 text-emerald-bright" : "border-ink-line text-on-ink-muted"
          }`}
        >
          {balanced ? <Check size={14} strokeWidth={2.5} /> : null}
          {balanced ? "Reconciled" : "Unreconciled"}
        </p>
      </div>

      <p className="sr-only">
        Sample bank reconciliation with illustrative figures. Adjusted bank balance 1,450,100.00 and adjusted book
        balance 1,450,100.00, so the difference is zero and the account is reconciled.
      </p>
    </figure>
  );
}
