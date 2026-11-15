import { ArrowUpRight, Download } from "lucide-react";
import { hero, person } from "@/content/profile";
import { ReconciliationPanel } from "./ReconciliationPanel";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="on-ink ledger-ruling bg-ink text-on-ink">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-4 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-7">
          <h1 id="hero-name" className="text-lg font-medium text-on-ink">
            {person.name}
          </h1>
          <p className="mt-1 max-w-md text-base text-on-ink-muted">{hero.focus}</p>

          <p className="display mt-10 text-[2.75rem] text-on-ink sm:text-[3.75rem] lg:text-[4.5rem] xl:text-[4.875rem]">
            <span className="block">{hero.headline[0]}</span>
            <span className="block sm:pl-[1.1em]">{hero.headline[1]}</span>
          </p>

          <p className="mt-8 max-w-[60ch] text-on-ink/90">{hero.intro}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className="btn bg-gold text-ink hover:bg-on-ink">
              See my work
            </a>
            <a
              href={person.cvPath}
              download={person.cvFileName}
              className="btn border border-on-ink/30 text-on-ink hover:border-gold hover:text-gold"
            >
              <Download size={16} aria-hidden="true" />
              Download CV
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn px-0 text-on-ink-muted hover:text-on-ink sm:px-[1.125rem]"
            >
              LinkedIn
              <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <ReconciliationPanel />
        </div>
      </div>
    </section>
  );
}
