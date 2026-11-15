import { about } from "@/content/profile";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid grid-cols-1 gap-12 xl:grid-cols-8 xl:gap-8">
        <div className="space-y-6 xl:col-span-5">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-[64ch] text-lg leading-[1.65]">
              {p}
            </p>
          ))}
        </div>
        <dl className="self-start border-t border-ink/80 xl:col-span-3">
          {about.facts.map((f) => (
            <div key={f.label} className="grid grid-cols-[7rem_1fr] gap-3 border-b border-rule py-3 text-[0.9375rem]">
              <dt className="text-muted">{f.label}</dt>
              <dd className="text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
