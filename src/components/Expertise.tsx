import { expertise } from "@/content/profile";
import { Section } from "./Section";

export function Expertise() {
  return (
    <Section
      id="expertise"
      title="What I work on"
      note="Each line points to work I have done. Nothing here comes from a course outline alone."
    >
      <dl className="border-t border-ink/80">
        {expertise.map((e) => (
          <div
            key={e.name}
            className="grid gap-1 border-b border-rule py-5 transition-colors duration-200 hover:bg-paper/70 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8 sm:px-3"
          >
            <dt className="font-semibold text-ink">{e.name}</dt>
            <dd className="max-w-[58ch] text-[0.9875rem] leading-relaxed">{e.detail}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
