import { metrics, siteUpdated } from "@/content/profile";
import { CountUp } from "./CountUp";
import { Section } from "./Section";
import { TenureChart } from "./TenureChart";

// Fallback month for the server render; the chart moves to the visitor's month after hydration.
const builtAt = siteUpdated;

export function Numbers() {
  return (
    <Section
      id="numbers"
      tone="ink"
      title="By the numbers"
      note="Only figures stated on my CV. No company financials."
    >
      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((m, i) => (
          <li key={m.label} className={`border-t border-gold/60 pt-4 ${i === 0 ? "sm:col-span-2 xl:col-span-1" : ""}`}>
            <p className="text-[3rem] leading-none text-on-ink sm:text-[3.5rem]">
              <CountUp value={m.value} decimals={m.decimals} suffix={m.suffix} />
            </p>
            <p className="mt-3 max-w-[30ch] text-[0.9375rem] text-on-ink-muted">{m.label}</p>
          </li>
        ))}
      </ul>
      <TenureChart builtAt={builtAt} />
    </Section>
  );
}
