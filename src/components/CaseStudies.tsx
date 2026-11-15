import { Plus } from "lucide-react";
import { caseStudies } from "@/content/profile";
import { Section } from "./Section";

export function CaseStudies() {
  return (
    <Section
      id="work"
      title="Where numbers tell stories"
      note="Six pieces of work from my time at WeGro. Open one for the detail. No company or investor figures are shown."
    >
      <div className="border-t border-ink/80">
        {caseStudies.map((cs, i) => (
          <details key={cs.id} id={cs.id} className="group border-b border-rule" open={i === 0}>
            <summary className="grid cursor-pointer grid-cols-[1fr_auto] items-start gap-4 py-6 transition-colors duration-200 hover:bg-paper/70 sm:px-3">
              <span>
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                  <span>{cs.when}</span>
                  {cs.status ? (
                    <span className="rounded-[2px] border border-gold-deep/50 px-1.5 py-px text-[0.8125rem] text-gold-deep">
                      {cs.status}
                    </span>
                  ) : null}
                </span>
                <span className="mt-1.5 block text-[1.3125rem] font-semibold leading-snug text-ink sm:text-[1.5rem]">
                  {cs.title}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-transform duration-300 group-open:rotate-45"
              >
                <Plus size={18} />
              </span>
            </summary>

            <div className="grid gap-6 pb-8 sm:grid-cols-2 sm:px-3 sm:pb-10">
              <div>
                <h4 className="text-sm font-semibold text-ink">What it needed</h4>
                <p className="mt-1.5 text-[0.9875rem] leading-relaxed">{cs.need}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">What I did</h4>
                <p className="mt-1.5 text-[0.9875rem] leading-relaxed">{cs.approach}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Methods</h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {cs.methods.map((m) => (
                    <li key={m} className="rounded-[2px] bg-paper px-2.5 py-1 text-sm text-graphite ring-1 ring-rule">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Result</h4>
                <p className="mt-1.5 text-[0.9875rem] leading-relaxed text-emerald-dark">{cs.result}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
