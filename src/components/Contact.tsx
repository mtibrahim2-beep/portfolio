import { ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";
import { person } from "@/content/profile";

export function Contact() {
  const rows = [
    { icon: Mail, label: "Email", value: person.email, href: `mailto:${person.email}` },
    { icon: Phone, label: "Phone", value: person.phone, href: person.phoneHref },
    { icon: ArrowUpRight, label: "LinkedIn", value: "Mohammad Tauhid Ibrahim", href: person.linkedin, external: true },
    { icon: MapPin, label: "Location", value: person.location },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="on-ink bg-ink text-on-ink">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="display text-[2.75rem] md:text-[4rem]">
            Contact
          </h2>
          <p className="mt-5 max-w-[40ch] text-on-ink-muted">
            Email is the quickest way to reach me. References are available on request.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${person.email}`} className="btn bg-gold text-ink hover:bg-on-ink">
              <Mail size={16} aria-hidden="true" />
              Email me
            </a>
            <a
              href={person.cvPath}
              download={person.cvFileName}
              className="btn border border-on-ink/30 text-on-ink hover:border-gold hover:text-gold"
            >
              <Download size={16} aria-hidden="true" />
              Download CV
            </a>
          </div>
        </div>

        <dl className="border-t border-gold/60 lg:col-span-7">
          {rows.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.label} className="grid grid-cols-[6.5rem_1fr] items-center gap-4 border-b border-ink-line py-5 sm:grid-cols-[9rem_1fr]">
                <dt className="flex items-center gap-2 text-on-ink-muted">
                  <Icon size={16} aria-hidden="true" />
                  {r.label}
                </dt>
                <dd className="min-w-0 break-words text-lg">
                  {r.href ? (
                    <a
                      href={r.href}
                      className="link-underline decoration-on-ink/30 hover:decoration-gold"
                      {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {r.value}
                      {r.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                    </a>
                  ) : (
                    r.value
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
      <footer className="border-t border-ink-line">
        <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-2 px-4 py-6 text-sm text-on-ink-muted sm:px-8">
          <p>© {person.name}</p>
          <a href="#top" className="link-underline decoration-on-ink/30 hover:text-on-ink">
            Back to top
          </a>
        </div>
      </footer>
    </section>
  );
}
