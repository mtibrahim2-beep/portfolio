import { tools } from "@/content/profile";
import { Section } from "./Section";

export function Tools() {
  return (
    <Section id="tools" title="Tools" note="Software I use at work, as listed on my CV.">
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
        {tools.map((g) => (
          <div key={g.group}>
            <h3 className="border-b border-ink/80 pb-2 font-semibold text-ink">{g.group}</h3>
            <ul className="mt-3 space-y-2 text-[0.9875rem]">
              {g.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
