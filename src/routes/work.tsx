import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import clubExotismImg from "@/assets/clubexotism.png";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "All Works — Summit Studio" },
      {
        name: "description",
        content: "Explore all featured digital platforms and brand identities engineered by Summit Studio.",
      },
    ],
  }),
  component: WorkPage,
});

const ALL_WORK = [
  {
    n: "01",
    name: "Club Exotism",
    client: "Club Exotism — Flagship Gaming Sanctuary & Esports Arena",
    kind: "Full Platform · Real-Time Engine · High-Octane Admin Suite",
    year: "2026",
    img: clubExotismImg,
    url: "https://clubexotism.com",
    challenge:
      "Club Exotism needed a beast of a booking platform capable of managing complex physical hardware inventory (PS5 consoles, VR rigs, Sim Racing cockpits) with real-time multi-player capacity logic, instant 1-tap WhatsApp checkout, and dominant #1 Google search ranking.",
    solution:
      "Architected a ultra-slick, dark-mode digital weapon featuring real-time bin-packing inventory calculations, instant pre-filled WhatsApp VIP booking checkout, an intuitive daily visual control panel for staff, and aggressive LocalBusiness schema SEO integration.",
    stats: [
      { k: "Slot Utilization", v: "100%" },
      { k: "Checkout Speed", v: "< 12s" },
      { k: "Local SEO Dominance", v: "#1 RANK" },
    ],
  },
  {
    n: "02",
    name: "Vanta Digital",
    client: "Vanta Technologies",
    kind: "Web Design · High-Performance Engineering",
    year: "2025",
    img: work2,
    challenge:
      "Legacy website was suffering from slow load times, high drop-off rates on mobile, and outdated brand messaging that failed to convert enterprise leads.",
    solution:
      "Rebuilt the core architecture with modern SSR, sub-second global asset delivery, and an aggressive editorial visual identity.",
    stats: [
      { k: "Revenue Impact", v: "+140%" },
      { k: "Page Load Speed", v: "0.4s" },
      { k: "Lead Conversion", v: "+95%" },
    ],
  },
  {
    n: "03",
    name: "Campus Connect",
    client: "Campus Connect Network",
    kind: "Brand Identity · Community Web App",
    year: "2024",
    img: work1,
    challenge:
      "Fragmented digital presence across 12 university hubs led to low community retention and confusing user onboarding.",
    solution:
      "Crafted a unified brand identity system paired with an intuitive student web platform featuring instant event discovery and group portals.",
    stats: [
      { k: "Active Members", v: "50k+" },
      { k: "User Retention", v: "88%" },
      { k: "Brand Recall", v: "+76%" },
    ],
  },
  {
    n: "04",
    name: "Ascend",
    client: "Ascend Performance Lab",
    kind: "UI Design · Conversion Optimization",
    year: "2024",
    img: work3,
    challenge:
      "SaaS product had strong top-of-funnel traffic but struggled with complex user onboarding and high signup drop-off.",
    solution:
      "Redesigned user flows with micro-interactions, clear value props, and a streamlined multi-step signup experience.",
    stats: [
      { k: "Signup Rate", v: "+112%" },
      { k: "User Engagement", v: "+55%" },
      { k: "Time on Site", v: "+3.4m" },
    ],
  },
];

const CATEGORIES = [
  { id: "ALL", label: "All Projects", count: 4 },
  { id: "PLATFORM", label: "Full Platform", count: 1 },
  { id: "WEB", label: "Web Design", count: 2 },
  { id: "SYSTEMS", label: "UI/UX Systems", count: 1 },
];

function WorkPage() {
  const [activeProject, setActiveProject] = useState<(typeof ALL_WORK)[number] | null>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  const filteredWork = ALL_WORK.filter((w) => {
    if (activeFilter === "PLATFORM") return w.n === "01";
    if (activeFilter === "WEB") return w.n === "02" || w.n === "03";
    if (activeFilter === "SYSTEMS") return w.n === "04";
    return true;
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top Navbar matching Home page layout */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-hairline/60 bg-background/90 px-6 py-4 backdrop-blur-md md:px-16">
        <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
          Summit Studio<span className="text-accent">.</span>
        </Link>
        
        <nav className="hidden items-center gap-10 md:flex">
          {[
            { label: "Home", href: "/#top" },
            { label: "Studio", href: "/#studio" },
            { label: "Work", href: "/work" },
            { label: "Process", href: "/#process" },
            { label: "FAQ", href: "/#faq" },
            { label: "Contact", href: "/#contact" },
          ].map((i) => (
            <Link
              key={i.label}
              to={i.href}
              className={`label-mono text-xs transition-colors hover:text-accent ${
                i.label === "Work" ? "text-accent font-semibold" : "text-foreground/80"
              }`}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/#contact"
          className="label-mono border-b border-foreground pb-1 text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Talk to Us
        </Link>
      </header>

      {/* Case Study Live Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md md:p-8 animate-in fade-in duration-300"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-hairline bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <div>
                <h3 className="display-tight text-xl font-medium text-foreground">{activeProject.name}</h3>
                <p className="label-mono text-xs text-muted-foreground">{activeProject.kind}</p>
              </div>
              <div className="flex items-center gap-4">
                {activeProject.url && (
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono inline-flex items-center gap-1.5 text-xs text-accent transition-colors hover:underline"
                  >
                    <span>Open Live Platform</span> ↗
                  </a>
                )}
                <button
                  onClick={() => setActiveProject(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="grid flex-1 overflow-hidden md:grid-cols-12 min-h-0">
              <div className="flex flex-col justify-between overflow-y-auto border-b border-hairline p-6 md:col-span-5 md:border-r md:border-b-0 md:p-8 space-y-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="label-mono text-xs text-accent">[ Challenge & Scope ]</h4>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{activeProject.challenge}</p>
                  </div>
                  <div>
                    <h4 className="label-mono text-xs text-accent">[ Strategic Execution ]</h4>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">{activeProject.solution}</p>
                  </div>
                </div>

                <div className="border-t border-hairline pt-6">
                  <h4 className="label-mono text-xs text-muted-foreground">[ Commercial Impact ]</h4>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {activeProject.stats.map((s) => (
                      <div key={s.k}>
                        <p className="display-tight text-xl font-medium text-accent">{s.v}</p>
                        <p className="label-mono text-[0.65rem] text-muted-foreground mt-1">{s.k}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative flex h-full flex-col bg-black md:col-span-7 overflow-hidden">
                {activeProject.url ? (
                  <iframe
                    src={activeProject.url}
                    title={`${activeProject.name} preview`}
                    className="h-full w-full flex-1 border-0"
                  />
                ) : (
                  <div className="h-full w-full overflow-y-auto p-4">
                    <img
                      src={activeProject.img}
                      alt={`${activeProject.name} preview`}
                      className="w-full rounded-lg object-cover shadow-2xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Hero Banner */}
      <section className="border-b border-hairline px-6 py-20 md:px-16 md:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="label-mono text-xs text-accent">[ Archive · 2024 — 2026 ]</span>
            <h1 className="display-tight mt-3 text-4xl font-normal tracking-tight text-foreground md:text-7xl">
              Selected Works<span className="text-accent">.</span>
            </h1>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground md:text-sm">
            A comprehensive archive of custom web engines, digital platforms, and visual identity systems engineered for market leaders.
          </p>
        </div>

        {/* Working Interactive Category Pill Badges */}
        <div className="mt-12 flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`label-mono cursor-pointer rounded-full px-5 py-2 text-xs transition-all ${
                  isActive
                    ? "bg-accent text-accent-foreground font-medium shadow-md scale-[1.02]"
                    : "border border-hairline bg-secondary/30 text-muted-foreground hover:border-hairline hover:text-foreground"
                }`}
              >
                {cat.label} ({cat.count < 10 ? `0${cat.count}` : cat.count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Work Grid */}
      <section className="px-6 py-16 md:px-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {filteredWork.map((w) => (
            <article
              key={w.n}
              onClick={() => setActiveProject(w)}
              className="group cursor-pointer space-y-6"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-hairline bg-card shadow-2xl transition-all duration-500 hover:border-accent/60">
                <img
                  src={w.img}
                  alt={`${w.name} project`}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="grain-overlay pointer-events-none absolute inset-0 opacity-20" />

                {/* Number Ribbon */}
                <div className="absolute top-5 left-5 rounded-full border border-hairline bg-background/80 px-3.5 py-1.5 backdrop-blur-md">
                  <span className="label-mono text-xs text-foreground">[{w.n}]</span>
                </div>

                {/* Preview Trigger Pill */}
                <div className="absolute bottom-5 right-5 rounded-full border border-hairline bg-background/80 px-4 py-2 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                  <span className="label-mono text-xs text-foreground">Interactive Preview ↗</span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-3 px-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display-tight text-2xl font-medium text-foreground transition-colors group-hover:text-accent md:text-3xl">
                    {w.name} — {w.year}
                  </h3>
                  <span className="label-mono text-xs text-muted-foreground group-hover:text-foreground">
                    Explore ↗
                  </span>
                </div>
                <p className="label-mono text-xs text-accent">{w.kind}</p>
                <p className="text-xs leading-relaxed text-foreground/75 line-clamp-2 md:text-sm">
                  {w.challenge}
                </p>

                {/* Stats Chips */}
                <div className="flex items-center gap-6 border-t border-hairline/60 pt-4">
                  {w.stats.map((s) => (
                    <div key={s.k}>
                      <span className="display-tight text-lg font-medium text-foreground">{s.v}</span>
                      <span className="label-mono block text-[0.62rem] text-muted-foreground">{s.k}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-hairline px-6 pt-28 pb-12 md:px-16">
        <div className="flex flex-wrap items-start justify-between gap-12">
          <p className="label-mono max-w-sm text-sm leading-relaxed text-muted-foreground">
            Bold digital experiences for ambitious brands that refuse to blend in.
          </p>

          <div className="flex gap-16 md:gap-24">
            <div className="space-y-3">
              <p className="label-mono text-xs font-semibold text-foreground">Services</p>
              <ul className="label-mono space-y-2 text-xs text-muted-foreground">
                {["Branding", "Website design", "Development"].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="label-mono text-xs font-semibold text-foreground">Studio</p>
              <ul className="label-mono space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link to="/#work" className="transition-colors hover:text-accent">
                    Work
                  </Link>
                </li>
                <li>
                  <Link to="/#process" className="transition-colors hover:text-accent">
                    Process
                  </Link>
                </li>
                <li>
                  <Link to="/#studio" className="transition-colors hover:text-accent">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Big Footer Brand Display */}
        <div className="pt-24 pb-10">
          <p className="display-tight w-full text-[10.4vw] leading-[0.8] tracking-tight whitespace-nowrap">
            Summit Studio<span className="text-accent">.</span>
          </p>
        </div>

        {/* Bottom Sub-bar */}
        <div className="label-mono flex flex-col gap-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© 2026 Summit Studio. All rights reserved.</span>
          <a href="#top" className="transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
