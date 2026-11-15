"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { nav, person } from "@/content/profile";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Highlight the section currently in the reading band.
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="on-ink sticky top-0 z-50 border-b border-ink-line bg-ink/95 text-on-ink backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-4 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2 font-medium text-on-ink" aria-label={`${person.name}, back to top`}>
          <span className="display text-xl leading-none">M. T. Ibrahim</span>
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.9375rem]">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  className={`relative py-2 transition-colors duration-200 hover:text-on-ink ${
                    active === item.id ? "text-on-ink" : "text-on-ink-muted"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px bg-gold transition-transform duration-300 ${
                      active === item.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={person.cvPath}
            download={person.cvFileName}
            className="btn hidden border border-gold/70 text-on-ink hover:bg-gold hover:text-ink sm:inline-flex"
          >
            <Download size={16} aria-hidden="true" />
            Download CV
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-[2px] text-on-ink hover:bg-ink-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-ink-line bg-ink px-4 pb-6 pt-2 sm:px-8 lg:hidden"
      >
        <nav aria-label="Sections (mobile)">
          <ul className="divide-y divide-ink-line">
            {nav.map((item, i) => (
              <li key={item.id}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "location" : undefined}
                  className="flex min-h-12 items-center text-lg text-on-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={person.cvPath}
          download={person.cvFileName}
          onClick={() => setOpen(false)}
          className="btn mt-4 w-full justify-center bg-gold text-ink hover:bg-on-ink"
        >
          <Download size={16} aria-hidden="true" />
          Download CV
        </a>
      </div>
    </header>
  );
}
