import { person, roles } from "@/content/profile";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Four roles, one company"
      note={`${person.company}, Dhaka. Newest first.`}
    >
      <ol className="relative border-l border-rule">
        {roles.map((role, i) => {
          const current = role.end === null;
          return (
            <li key={role.title} className={`relative pl-7 sm:pl-10 ${i < roles.length - 1 ? "pb-14" : ""}`}>
              <span
                aria-hidden="true"
                className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border-2 ${
                  current ? "border-emerald bg-emerald" : "border-muted bg-ledger"
                }`}
              />
              <p className="figure text-sm text-muted">
                {role.period}
                {role.type ? <span className="font-sans"> ({role.type.toLowerCase()})</span> : null}
              </p>
              <h3 className="mt-1 text-[1.375rem] font-semibold leading-snug text-ink">{role.title}</h3>
              <p className="mt-2 max-w-[60ch] text-[1.0625rem] text-graphite">{role.summary}</p>
              <ul className="mt-5 max-w-[66ch] space-y-2.5 text-[0.9875rem] leading-relaxed text-graphite">
                {role.points.map((pt) => (
                  <li key={pt.slice(0, 32)} className="grid grid-cols-[1rem_1fr] gap-2">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 bg-gold-deep" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
