import { philosophy } from "@/content/profile";

export function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="bg-paper">
      <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-8 md:py-32">
        <h2 id="philosophy-title" className="sr-only">
          How I think about finance
        </h2>
        <blockquote className="lg:ml-[33.333%] lg:pl-8">
          <p className="display max-w-[28ch] text-[1.75rem] text-ink sm:text-[2.25rem] lg:text-[2.5rem]">
            {philosophy.statement}
          </p>
          <p className="mt-8 max-w-[56ch] text-lg text-graphite">{philosophy.support}</p>
        </blockquote>
      </div>
    </section>
  );
}
