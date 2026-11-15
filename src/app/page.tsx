import { About } from "@/components/About";
import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Expertise } from "@/components/Expertise";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Numbers } from "@/components/Numbers";
import { Philosophy } from "@/components/Philosophy";
import { Tools } from "@/components/Tools";
import { person } from "@/content/profile";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  worksFor: { "@type": "Organization", name: person.company },
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  email: `mailto:${person.email}`,
  sameAs: [person.linkedin],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Bangladesh University of Professionals" },
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-[2px] bg-gold px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <CaseStudies />
        <Expertise />
        <Numbers />
        <Tools />
        <Education />
        <Philosophy />
        <Contact />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
