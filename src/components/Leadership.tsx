import { leadership } from "@/content/profile";
import { Section } from "./Section";

export function Leadership() {
  return (
    <Section id="leadership" title="Leadership" note="Student societies and events I helped run.">
      <ul className="divide-y divide-rule border-t border-ink/80">
        {leadership.map((l) => (
          <li key={l.title} className="grid grid-cols-1 gap-1 py-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
            <div className="min-w-0">
              <h3 className="font-semibold text-ink">{l.title}</h3>
              {l.period ? <p className="figure text-sm text-muted">{l.period}</p> : null}
            </div>
            <p className="max-w-[58ch] text-[0.9875rem] leading-relaxed">{l.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
