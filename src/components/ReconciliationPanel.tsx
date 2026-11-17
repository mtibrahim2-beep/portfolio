"use client";

import { useEffect, useRef, useState } from "react";
import { Check, RotateCcw, Shuffle, Sparkles } from "lucide-react";
import { prefersReducedMotion } from "@/hooks/useInView";

/*
 * An interactive sample bank reconciliation. Every figure is illustrative, not company data.
 * The visitor ticks the items that explain the gap between bank and book; one item per
 * scenario is a decoy that is already on both records. Difference = adjusted book − adjusted bank.
 */
type Side = "bank" | "book";
type Item = {
  id: string;
  label: string;
  amount: number;
  side: Side;
  kind: "opening" | "adjustment" | "decoy";
  why: string;
};
type Scenario = Item[];

// First scenario is fixed so server and client markup match.
// Adjusted bank = 1,284,600 + 250,000 − 84,500 = 1,450,100
// Adjusted book = 1,452,350 − 1,150 − 1,100   = 1,450,100
const FIRST: Scenario = [
  { id: "b0", side: "bank", kind: "opening", amount: 1_284_600, label: "Balance per bank statement", why: "" },
  {
    id: "b1",
    side: "bank",
    kind: "adjustment",
    amount: 250_000,
    label: "Add: deposit in transit",
    why: "Banked on the last day. The bank credits it next period, so the statement is short by this much.",
  },
  {
    id: "bx",
    side: "bank",
    kind: "decoy",
    amount: -62_000,
    label: "Less: cheque 4468, cleared",
    why: "Cheque 4468 has already cleared, so it sits on both records and doesn't explain the gap.",
  },
  {
    id: "b2",
    side: "bank",
    kind: "adjustment",
    amount: -84_500,
    label: "Less: cheque 4471 not yet presented",
    why: "Written and recorded in the books, but the payee hasn't cashed it yet.",
  },
  { id: "k0", side: "book", kind: "opening", amount: 1_452_350, label: "Balance per cash book", why: "" },
  {
    id: "k1",
    side: "book",
    kind: "adjustment",
    amount: -1_150,
    label: "Less: bank charges",
    why: "The bank deducted its fees, and we only learn the amount from the statement.",
  },
  {
    id: "k2",
    side: "book",
    kind: "adjustment",
    amount: -1_100,
    label: "Less: direct debit not yet recorded",
    why: "A standing payment left the account but hasn't been entered in the cash book yet.",
  },
];

const STEP_MS = 650;
const STORE_KEY = "recon:last";

const stamp = (d: Date) =>
  d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

/** A short confetti burst drawn on a canvas over the panel, fired from the given point. */
function burst(canvas: HTMLCanvasElement, originX: number, originY: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);
  const colors = ["#c2a066", "#5db08f", "#ece8dd", "#e2c48f"];
  const parts = Array.from({ length: 70 }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
    const speed = 4 + Math.random() * 6;
    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: 4 + Math.random() * 4,
      h: 6 + Math.random() * 6,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      c: colors[Math.floor(Math.random() * colors.length)],
    };
  });
  const DURATION = 1800;
  const t0 = performance.now();
  let raf = 0;
  const frame = (t: number) => {
    const p = (t - t0) / DURATION;
    ctx.clearRect(0, 0, width, height);
    if (p >= 1) return;
    ctx.globalAlpha = p < 0.7 ? 1 : 1 - (p - 0.7) / 0.3;
    for (const q of parts) {
      q.vy += 0.22;
      q.vx *= 0.985;
      q.x += q.vx;
      q.y += q.vy;
      q.r += q.vr;
      ctx.save();
      ctx.translate(q.x, q.y);
      ctx.rotate(q.r);
      ctx.fillStyle = q.c;
      ctx.fillRect(-q.w / 2, -q.h / 2, q.w, Math.cos(q.r * 2) * q.h);
      ctx.restore();
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => {
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, width, height);
  };
}

const fmt = (n: number) => {
  const s = Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return n < 0 ? `(${s})` : s;
};

const between = (min: number, max: number, step: number) =>
  Math.round((min + Math.random() * (max - min)) / step) * step;

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Builds a fresh scenario whose correct adjustments always balance to zero. */
function makeScenario(): Scenario {
  const chqNo = between(4100, 4900, 1);
  const bankOpen = between(900_000, 1_700_000, 100);
  const dit = between(80_000, 320_000, 1000);
  const chq = between(25_000, 140_000, 500);
  const charges = between(400, 2_500, 50);
  const interest = Math.random() < 0.5;
  const second = interest ? between(1_500, 9_000, 50) : -between(800, 6_000, 50);

  const bankAdj: Item[] = [
    {
      id: "b1",
      side: "bank",
      kind: "adjustment",
      amount: dit,
      label: "Add: deposit in transit",
      why: "Banked on the last day. The bank credits it next period, so the statement is short by this much.",
    },
    {
      id: "b2",
      side: "bank",
      kind: "adjustment",
      amount: -chq,
      label: `Less: cheque ${chqNo} not yet presented`,
      why: "Written and recorded in the books, but the payee hasn't cashed it yet.",
    },
  ];
  const bookAdj: Item[] = [
    {
      id: "k1",
      side: "book",
      kind: "adjustment",
      amount: -charges,
      label: "Less: bank charges",
      why: "The bank deducted its fees, and we only learn the amount from the statement.",
    },
    interest
      ? {
          id: "k2",
          side: "book",
          kind: "adjustment",
          amount: second,
          label: "Add: interest credited by bank",
          why: "The bank paid interest into the account. It appears on the statement before it reaches the books.",
        }
      : {
          id: "k2",
          side: "book",
          kind: "adjustment",
          amount: second,
          label: "Less: direct debit not yet recorded",
          why: "A standing payment left the account but hasn't been entered in the cash book yet.",
        },
  ];

  const decoyOnBank = Math.random() < 0.5;
  const decoy: Item = decoyOnBank
    ? {
        id: "bx",
        side: "bank",
        kind: "decoy",
        amount: -between(20_000, 90_000, 500),
        label: `Less: cheque ${chqNo - between(3, 12, 1)}, cleared`,
        why: "That cheque has already cleared, so it sits on both records and doesn't explain the gap.",
      }
    : {
        id: "kx",
        side: "book",
        kind: "decoy",
        amount: between(15_000, 80_000, 500),
        label: "Add: customer deposit, already credited",
        why: "The bank and the books both show this deposit, so it isn't a reconciling item.",
      };

  const adjustedBank = bankOpen + dit - chq;
  const bookOpen = adjustedBank - bookAdj.reduce((s, i) => s + i.amount, 0);

  const bankItems = shuffle(decoyOnBank ? [...bankAdj, decoy] : bankAdj);
  const bookItems = shuffle(decoyOnBank ? bookAdj : [...bookAdj, decoy]);
  return [
    { id: "b0", side: "bank", kind: "opening", amount: bankOpen, label: "Balance per bank statement", why: "" },
    ...bankItems,
    { id: "k0", side: "book", kind: "opening", amount: bookOpen, label: "Balance per cash book", why: "" },
    ...bookItems,
  ];
}

function totals(items: Scenario, posted: Set<string>) {
  let bank = 0;
  let book = 0;
  for (const i of items) {
    if (i.kind !== "opening" && !posted.has(i.id)) continue;
    if (i.side === "bank") bank += i.amount;
    else book += i.amount;
  }
  return { bank, book, diff: book - bank };
}

/** Eases a displayed number toward its target so the difference visibly moves. */
function useTween(target: number, ms = 450) {
  const [shown, setShown] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (prefersReducedMotion()) {
      from.current = target;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShown(target);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const e = 1 - Math.pow(1 - p, 4);
      const v = Math.round((a + (target - a) * e) * 100) / 100;
      from.current = v;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return shown;
}

export function ReconciliationPanel() {
  const [items, setItems] = useState<Scenario>(FIRST);
  const [posted, setPosted] = useState<Set<string>>(new Set());
  const [note, setNote] = useState<{ text: string; tone: "good" | "bad" | "plain" }>({
    text: "Tick the items that explain the difference. One of them is a decoy.",
    tone: "plain",
  });
  const [touched, setTouched] = useState(false);
  const [solving, setSolving] = useState(false);
  const [lastRecon, setLastRecon] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  const figureRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  // A returning visitor sees when they last reconciled. Storage may be blocked, so fail quietly.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setLastRecon(saved);
    } catch {}
  }, []);

  const { bank, book, diff } = totals(items, posted);
  const balanced = diff === 0;

  // Celebrate each time the statement moves into balance.
  useEffect(() => {
    if (!balanced) return;
    const when = stamp(new Date());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLastRecon(when);
    try {
      window.localStorage.setItem(STORE_KEY, when);
    } catch {}
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    const fig = figureRef.current;
    const badge = badgeRef.current;
    if (!canvas || !fig || !badge) return;
    const f = fig.getBoundingClientRect();
    const b = badge.getBoundingClientRect();
    return burst(canvas, b.left - f.left + b.width / 2, b.top - f.top);
  }, [balanced]);
  const shownDiff = useTween(diff);
  const adjustments = items.filter((i) => i.kind === "adjustment");
  const firstHint = adjustments[0]?.id;

  const toggle = (item: Item) => {
    setTouched(true);
    const next = new Set(posted);
    const adding = !next.has(item.id);
    if (adding) next.add(item.id);
    else next.delete(item.id);
    setPosted(next);

    const after = totals(items, next).diff;
    if (after === 0) {
      setNote({ text: `Reconciled. Both sides agree at ${fmt(totals(items, next).bank)}.`, tone: "good" });
    } else if (!adding) {
      setNote({ text: "Removed. Difference updated.", tone: "plain" });
    } else if (item.kind === "decoy") {
      setNote({ text: `Not this one. ${item.why}`, tone: "bad" });
    } else {
      setNote({ text: item.why, tone: "plain" });
    }
  };

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setSolving(false);
  };

  const reset = (next?: Scenario) => {
    clearTimers();
    if (next) setItems(next);
    setPosted(new Set());
    setNote({
      text: next
        ? "New figures. Tick the items that explain the difference."
        : "Tick the items that explain the difference. One of them is a decoy.",
      tone: "plain",
    });
  };

  const solve = () => {
    clearTimers();
    setTouched(true);
    const order = items.filter((i) => i.kind === "adjustment");
    const finalBank = totals(items, new Set(order.map((i) => i.id))).bank;
    if (prefersReducedMotion()) {
      setPosted(new Set(order.map((i) => i.id)));
      setNote({ text: `Reconciled. Both sides agree at ${fmt(finalBank)}.`, tone: "good" });
      return;
    }
    setSolving(true);
    setPosted(new Set());
    setNote({ text: "Posting each reconciling item in turn…", tone: "plain" });
    order.forEach((item, step) => {
      timers.current.push(
        window.setTimeout(() => {
          setPosted((prev) => new Set(prev).add(item.id));
          setNote({ text: item.why, tone: "plain" });
        }, STEP_MS * (step + 1)),
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setSolving(false);
        setNote({ text: `Reconciled. The decoy stays unticked. Both sides agree at ${fmt(finalBank)}.`, tone: "good" });
      }, STEP_MS * (order.length + 1)),
    );
  };

  const block = (side: Side, heading: string, adjusted: number) => (
    <div>
      <p className="mb-1 text-sm text-on-ink-muted">{heading}</p>
      <ul>
        {items.map((l) => {
          if (l.side !== side) return null;
          if (l.kind === "opening") {
            return (
              <li key={l.id} className="flex items-start justify-between gap-4 py-2 pl-7 text-sm">
                <span className="min-w-0">{l.label}</span>
                <span className="figure shrink-0 text-on-ink">{fmt(l.amount)}</span>
              </li>
            );
          }
          const on = posted.has(l.id);
          const wrong = on && l.kind === "decoy";
          return (
            <li key={l.id}>
              <button
                type="button"
                aria-pressed={on}
                disabled={solving}
                onClick={() => toggle(l)}
                className={`group -mx-2 flex min-h-11 w-[calc(100%+1rem)] cursor-pointer items-center justify-between gap-4 rounded-[2px] px-2 py-1.5 text-left text-sm transition-colors duration-200 hover:bg-ink-line/50 disabled:cursor-default ${
                  !touched && l.id === firstHint ? "recon-nudge" : ""
                } ${wrong ? "bg-loss-bright/10" : ""}`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`inline-flex size-4 shrink-0 items-center justify-center rounded-[2px] border transition-colors duration-200 ${
                      on
                        ? wrong
                          ? "border-loss-bright bg-loss-bright text-ink"
                          : "border-emerald-bright bg-emerald-bright text-ink"
                        : "border-on-ink-muted/70 group-hover:border-on-ink"
                    }`}
                  >
                    {on ? <Check size={12} strokeWidth={3} /> : null}
                  </span>
                  <span className={`min-w-0 transition-opacity duration-200 ${on ? "opacity-100" : "opacity-70"}`}>
                    {l.label}
                  </span>
                </span>
                <span
                  className={`figure shrink-0 transition-opacity duration-200 ${on ? "opacity-100" : "opacity-60"} ${
                    l.amount < 0 ? "text-loss-bright" : "text-on-ink"
                  }`}
                >
                  {fmt(l.amount)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-1 flex items-baseline justify-between gap-4 pl-7 text-sm">
        <span className="font-medium text-on-ink">Adjusted balance</span>
        <span className="figure total-rule px-1 text-gold">{fmt(adjusted)}</span>
      </div>
    </div>
  );

  const control =
    "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-[2px] px-2 text-sm text-on-ink-muted transition-colors duration-200 hover:text-on-ink disabled:cursor-default disabled:opacity-50";

  return (
    <figure
      ref={figureRef}
      className="relative rounded-[3px] border border-ink-line bg-ink-2/80 p-5 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.6)] sm:p-7"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 size-full"
      />
      <figcaption className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-medium text-on-ink">Try a bank reconciliation</span>
        <span className="text-sm text-on-ink-muted">Sample figures in BDT</span>
      </figcaption>

      <div className="grid grid-cols-1 gap-5">
        {block("bank", "Bank side", bank)}
        {block("book", "Book side", book)}
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-3 border-t border-ink-line pt-5">
        <div>
          <p className="text-sm text-on-ink-muted">Difference</p>
          <p
            className={`figure text-[2rem] leading-none transition-colors duration-500 sm:text-[2.5rem] ${
              balanced ? "text-emerald-bright" : "text-on-ink"
            }`}
          >
            {fmt(shownDiff)}
          </p>
        </div>
        <p
          ref={badgeRef}
          className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 text-sm transition-colors duration-500 ${
            balanced ? "border-emerald-bright/60 text-emerald-bright" : "border-ink-line text-on-ink-muted"
          }`}
        >
          {balanced ? <Check size={14} strokeWidth={2.5} aria-hidden="true" /> : null}
          {balanced ? "Reconciled" : "Unreconciled"}
        </p>
      </div>

      <p
        aria-live="polite"
        className={`mt-4 min-h-[3em] text-sm leading-snug ${
          note.tone === "good" ? "text-emerald-bright" : note.tone === "bad" ? "text-loss-bright" : "text-on-ink-muted"
        }`}
      >
        {note.text}
      </p>

      <p className="mt-1 text-xs text-on-ink-muted">
        Last reconciled:{" "}
        <span className="figure text-on-ink">{lastRecon ?? "not yet"}</span>
      </p>

      <div className="-mx-2 mt-2 flex flex-wrap gap-x-2">
        <button type="button" className={control} onClick={solve} disabled={solving}>
          <Sparkles size={14} aria-hidden="true" /> Show me
        </button>
        <button type="button" className={control} onClick={() => reset(makeScenario())} disabled={solving}>
          <Shuffle size={14} aria-hidden="true" /> New figures
        </button>
        <button type="button" className={control} onClick={() => reset()}>
          <RotateCcw size={14} aria-hidden="true" /> Reset
        </button>
      </div>
    </figure>
  );
}
