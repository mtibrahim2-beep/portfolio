import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  note?: ReactNode;
  tone?: "light" | "ink";
  children: ReactNode;
};

/** Caption column on the left, content on the right, like a statement note beside its figures. */
export function Section({ id, title, note, tone = "light", children }: Props) {
  const ink = tone === "ink";
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={ink ? "on-ink bg-ink text-on-ink" : "bg-ledger text-graphite"}
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-8">
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2
              id={`${id}-title`}
              className={`display text-[2.25rem] md:text-[2.875rem] ${ink ? "text-on-ink" : "text-ink"}`}
            >
              {title}
            </h2>
            {note ? (
              <p className={`mt-4 max-w-xs text-base ${ink ? "text-on-ink-muted" : "text-muted"}`}>{note}</p>
            ) : null}
          </div>
        </header>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
