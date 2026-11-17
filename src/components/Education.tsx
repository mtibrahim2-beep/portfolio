import { education } from "@/content/profile";
import { Section } from "./Section";

export function Education() {
  const [degree, ...school] = education;
  return (
    <Section id="education" title="Education">
      <article className="border-t border-ink/80 pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="text-[1.5rem] font-semibold leading-snug text-ink">{degree.title}</h3>
          <p className="figure text-sm text-muted">{degree.period}</p>
        </div>
        <p className="mt-1">{degree.school}</p>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
          <span>
            <span className="figure text-[1.375rem] text-ink">3.71</span>{" "}
            <span className="text-muted">CGPA</span>
          </span>
          <span className="text-emerald-dark">{degree.note}</span>
        </p>
        {degree.courses ? (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-ink">Relevant courses</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {degree.courses.map((c) => (
                <li key={c} className="rounded-[2px] bg-paper px-2.5 py-1 text-sm ring-1 ring-rule">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {school.map((e) => (
          <li key={e.title} className="border-t border-rule pt-4">
            <h3 className="font-semibold text-ink">{e.title}</h3>
            <p className="text-[0.9375rem]">{e.school}</p>
            <p className="mt-1 text-sm text-muted">
              <span className="figure">{e.period}</span>, {e.result}
            </p>
          </li>
        ))}
      </ul>

    </Section>
  );
}
