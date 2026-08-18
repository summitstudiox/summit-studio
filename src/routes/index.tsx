import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import clubExotismImg from "@/assets/clubexotism.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Summit Studio — Branding, Web Design & Development" },
      {
        name: "description",
        content:
          "Summit Studio builds branding, websites and development for ambitious businesses that refuse to blend in. Strategy, identity, design, delivery.",
      },
      { property: "og:title", content: "Summit Studio — Branding, Web Design & Development" },
      {
        property: "og:description",
        content:
          "Summit Studio builds branding, websites and development for ambitious businesses that refuse to blend in. Strategy, identity, design, delivery.",
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

const WORK = [
  {
    n: "01",
    name: "Club Exotism",
    kind: "Full Platform · Slot Booking · Admin Dashboards",
    year: "2026",
    img: clubExotismImg,
    url: "https://clubexotism.com",
    stats: [
      { k: "Conversion Rate", v: "+84%" },
      { k: "User Engagement", v: "+67%" },
      { k: "Brand Recall", v: "+91%" },
    ],
  },
  {
    n: "02",
    name: "Vanta Digital",
    kind: "Web Design · Development",
    year: "2025",
    img: work2,
    stats: [
      { k: "Revenue Impact", v: "+140%" },
      { k: "Page Load Speed", v: "0.4s" },
      { k: "Lead Conversion", v: "+95%" },
    ],
  },
  {
    n: "03",
    name: "Campus Connect",
    kind: "Brand Identity · Web",
    year: "2024",
    img: work1,
    stats: [
      { k: "Active Members", v: "50k+" },
      { k: "User Retention", v: "88%" },
      { k: "Brand Recall", v: "+76%" },
    ],
  },
  {
    n: "04",
    name: "Ascend",
    kind: "UI Design · Development",
    year: "2024",
    img: work3,
    stats: [
      { k: "Signup Rate", v: "+112%" },
      { k: "User Engagement", v: "+55%" },
      { k: "Time on Site", v: "+3.4m" },
    ],
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Strategy",
    tag: "Find the sharp angle",
    body: "Clarify your offer, audience, and competitive edge. Map the visitor journey before designing screens.",
  },
  {
    n: "02",
    title: "Brand",
    tag: "Shape the language",
    body: "Logo, type, color — a system that works beyond the homepage and scales with your growth.",
  },
  {
    n: "03",
    title: "Design",
    tag: "Experience architecture",
    body: "High-converting page layouts for mobile and desktop. Prototyped interactions, nothing guessed.",
  },
  {
    n: "04",
    title: "Delivery",
    tag: "Build, test, launch",
    body: "Clean code, hosting, and launch QA. No agency maze — just your website going live.",
  },
];

const STATS = [
  { k: "Conversion rate", v: "+84%" },
  { k: "User engagement", v: "+67%" },
  { k: "Brand recall", v: "+91%" },
];

function SectionHead({ n, label }: { n: string; label: string }) {
  return (
    <div className="rule-top grid grid-cols-3 items-center px-5 py-6 md:px-8">
      <span className="label-mono text-muted-foreground">
        <span className="text-accent">◆</span> [ {n} ]
      </span>
      <span className="label-mono text-center">{label}</span>
      <span className="label-mono text-right text-muted-foreground">© 2026</span>
    </div>
  );
}

function Index() {
  const [activeProject, setActiveProject] = useState<(typeof WORK)[number] | null>(null);

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* IFRAME / PROJECT PREVIEW MODAL */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md md:p-8"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-hairline bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <div>
                <h3 className="display-tight text-xl font-bold">{activeProject.name}</h3>
                <p className="label-mono text-xs text-muted-foreground">{activeProject.kind}</p>
              </div>
              <div className="flex items-center gap-4">
                {activeProject.url && (
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono text-xs text-accent hover:underline"
                  >
                    Open live site ↗
                  </a>
                )}
                <button
                  onClick={() => setActiveProject(null)}
                  className="label-mono rounded-full border border-hairline px-3 py-1 text-xs transition-colors hover:bg-secondary"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Modal Body / Preview */}
            <div className="relative flex-1 bg-black">
              {activeProject.url ? (
                <iframe
                  src={activeProject.url}
                  title={`${activeProject.name} preview`}
                  className="h-full w-full border-0"
                />
              ) : (
                <img
                  src={activeProject.img}
                  alt={`${activeProject.name} preview`}
                  className="h-full w-full object-contain"
                />
              )}
            </div>

            {/* Modal Footer / Per-Project Impact Stats */}
            <div className="grid gap-px border-t border-hairline bg-hairline md:grid-cols-3">
              {activeProject.stats.map((s) => (
                <div key={s.k} className="bg-card px-6 py-4">
                  <p className="display-tight text-3xl text-accent">{s.v}</p>
                  <p className="label-mono text-xs text-muted-foreground">{s.k}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-8">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          Summit Studio<span className="text-accent">.</span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((i) => (
            <a
              key={i.label}
              href={i.href}
              className="label-mono text-foreground/80 transition-colors hover:text-accent"
            >
              {i.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="label-mono border-b border-foreground pb-1 text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Start a project
        </a>
      </header>

      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Blurred crimson city lights at night"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative flex h-full flex-col justify-between gap-16 px-5 pt-36 pb-10 md:px-8 md:pt-40 md:pb-12">
          <div className="rise ml-auto flex max-w-lg flex-col items-end text-right">
            <h1 className="text-base leading-loose tracking-tight md:text-lg">
              Blending in is expensive.
              <br />
              <span className="text-foreground/70">
                Branding, website design and development for businesses that want to be
                remembered.
              </span>
            </h1>
            <a
              href="#work"
              className="label-mono mt-10 flex w-full max-w-sm items-center justify-between border-b border-foreground pb-3 transition-colors hover:border-accent hover:text-accent"
            >
              Explore our work
              <span>↗</span>
            </a>
          </div>

          <div>
            <div className="mb-10 flex flex-wrap justify-end gap-3">
              {[
                { label: "Strategy", href: "#process" },
                { label: "Identity", href: "#studio" },
                { label: "Development", href: "#work" },
              ].map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="label-mono inline-flex items-center gap-2 rounded-full border border-hairline bg-background/40 px-4 py-3 backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <span className="text-muted-foreground">[0{i + 1}]</span>
                  {s.label}
                </a>
              ))}
            </div>
            <p className="display-tight w-full text-[10.4vw] leading-[0.8] whitespace-nowrap">
              Summit Studio<span className="text-accent">.</span>
            </p>
          </div>
        </div>
      </section>

      {/* STUDIO */}
      <section id="studio">
        <SectionHead n="01" label="About us" />
        <div className="px-5 pt-16 pb-24 md:px-8">
          <h2 className="display-tight max-w-4xl text-3xl font-normal leading-snug tracking-tight text-foreground/90 md:text-5xl md:leading-tight">
            Summit Studio is a brand and web partner for ambitious companies. We build{" "}
            <span className="text-foreground font-medium">positioning</span>,{" "}
            <span className="text-foreground font-medium">identity</span> and sites that{" "}
            <span className="text-accent underline decoration-accent/40 underline-offset-8">
              convert attention into revenue
            </span>
            .
          </h2>

          <div className="mt-24 grid gap-14 md:gap-12 md:grid-cols-12">
            <div className="md:col-span-3">
              <img
                src={work4}
                alt="Portrait lit in deep red light"
                loading="lazy"
                width={1000}
                height={1200}
                className="w-full object-cover"
              />
            </div>
            <div className="space-y-20 md:col-span-9">
              {[
                {
                  k: "[ Context ]",
                  v: "Most studios ship websites that look good in a portfolio: a polished logo, a tidy style guide… and no measurable impact once it's live. Pretty brands with no engagement don't grow.",
                },
                {
                  k: "[ Our take ]",
                  v: "We design for attention. Strategy first, identity second, and a site engineered to convert — so the work keeps paying after launch day.",
                },
              ].map((r) => (
                <div key={r.k} className="grid gap-4 md:grid-cols-2">
                  <span className="label-mono text-muted-foreground">{r.k}</span>
                  <p className="max-w-md text-sm leading-relaxed text-foreground/80">{r.v}</p>
                </div>
              ))}

              <div className="grid gap-4 md:grid-cols-2">
                <span className="label-mono text-muted-foreground">[ Our offer ]</span>
                <div className="max-w-md">
                  {[
                    ["Brand", "Strategy — Identity"],
                    ["Website", "Design — Build"],
                    ["Growth", "Hosting — Iteration"],
                  ].map(([a, b]) => (
                    <div
                      key={a}
                      className="label-mono flex items-center justify-between border-b border-hairline py-4"
                    >
                      <span>{a}</span>
                      <span className="text-muted-foreground">{b}</span>
                    </div>
                  ))}
                  <a
                    href="#contact"
                    className="label-mono mt-10 flex items-center justify-between border-b border-foreground pb-2 transition-colors hover:border-accent hover:text-accent"
                  >
                    Start a project
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* marquee */}
        <div className="overflow-hidden border-y border-hairline py-5">
          <div className="marquee-track flex w-max gap-16 pr-16">
            {Array.from({ length: 2 }).map((_, r) => (
              <div key={r} className="flex gap-16">
                {[
                  "Fast turnarounds",
                  "100% satisfaction",
                  "Exponential growth",
                  "Senior-only team",
                  "No agency maze",
                ].map((t) => (
                  <span key={t} className="label-mono text-foreground/60">
                    ✳ {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <SectionHead n="02" label="Some of the brands we made money for ↓" />
        <div className="grid gap-px bg-hairline md:grid-cols-2">
          {WORK.map((w) => (
            <article
              key={w.n}
              onClick={() => setActiveProject(w)}
              className="group cursor-pointer bg-background p-6 md:p-8"
            >
              <div className="relative overflow-hidden">
                <img
                  src={w.img}
                  alt={`${w.name} project`}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="grain-overlay pointer-events-none absolute inset-0 opacity-25" />
                <div className="absolute right-3 top-3 rounded-full border border-hairline bg-background/80 px-3 py-1 text-xs backdrop-blur-sm transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  Preview Live ↗
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="label-mono text-muted-foreground">[ {w.n} ]</span>
                <span className="label-mono text-muted-foreground">© {w.year}</span>
              </div>

              <h3 className="display-tight mt-2 flex items-center justify-between text-3xl transition-colors group-hover:text-accent">
                <span>{w.name}</span>
                <span className="text-xl">↗</span>
              </h3>
              <p className="label-mono mt-2 text-muted-foreground">{w.kind}</p>

              {/* Per-project performance highlights */}
              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-hairline pt-4">
                {w.stats.map((s) => (
                  <div key={s.k}>
                    <p className="display-tight text-lg text-accent">{s.v}</p>
                    <p className="label-mono text-[0.65rem] text-muted-foreground">{s.k}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process">
        <SectionHead n="03" label="How we work" />
        <div className="px-5 py-20 md:px-8">
          <h2 className="display-tight max-w-4xl text-[7vw] md:text-[4vw]">
            From idea to launch, in four moves.
          </h2>
          <div className="mt-16">
            {PROCESS.map((p) => (
              <div
                key={p.n}
                className="group grid gap-4 border-t border-hairline py-10 transition-colors hover:bg-secondary/40 md:grid-cols-12"
              >
                <span className="label-mono text-muted-foreground md:col-span-1">[{p.n}]</span>
                <h3 className="display-tight text-3xl md:col-span-3">{p.title}</h3>
                <p className="max-w-md text-sm leading-relaxed text-foreground/70 md:col-span-5">
                  {p.body}
                </p>
                <span className="label-mono text-muted-foreground transition-colors group-hover:text-accent md:col-span-3 md:text-right">
                  {p.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <SectionHead n="04" label="Let's work together" />
        <div className="grid gap-16 px-5 py-24 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="display-tight text-[9vw] md:text-[5vw]">Contact us.</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/70">
              Ready to build something bold? We partner with ambitious brands to create digital
              experiences that leave a mark. Tell us what you're working on.
            </p>
            <a
              href="mailto:hello@summitstudio.co"
              className="label-mono mt-10 flex w-full max-w-sm items-center justify-between border-b border-foreground pb-2 transition-colors hover:border-accent hover:text-accent"
            >
              Send a message
              <span>↗</span>
            </a>
          </div>
          <div className="md:pt-4">
            {[
              ["Email", "hello@summitstudio.co"],
              ["Instagram", "@summitstudios"],
              ["Twitter / X", "@summitstudios"],
              ["LinkedIn", "Summit Studio"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="label-mono flex items-center justify-between border-b border-hairline py-4"
              >
                <span className="text-muted-foreground">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-hairline px-5 pt-14 pb-8 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="label-mono max-w-xs text-muted-foreground">
            Bold digital experiences for ambitious brands that refuse to blend in.
          </p>
          <div className="flex gap-12">
            <ul className="label-mono space-y-2 text-muted-foreground">
              <li className="text-foreground">Services</li>
              {["Branding", "Website design", "Development"].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <ul className="label-mono space-y-2 text-muted-foreground">
              <li className="text-foreground">Studio</li>
              <li>
                <a href="#work" className="hover:text-accent">
                  Work
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-accent">
                  Process
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-accent">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="display-tight mt-14 w-full text-[10.4vw] leading-[0.8] whitespace-nowrap">
          Summit Studio
        </p>
        <div className="label-mono mt-6 flex justify-between text-muted-foreground">
          <span>© 2026 Summit Studio</span>
          <a href="#top" className="hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
