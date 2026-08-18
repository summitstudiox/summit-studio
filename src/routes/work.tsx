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

function WorkPage() {
  const [activeProject, setActiveProject] = useState<(typeof ALL_WORK)[number] | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-hairline bg-background/95 px-6 py-4 backdrop-blur-md md:px-16">
        <Link to="/" className="display-tight text-xl font-medium tracking-tight text-foreground">
          Summit Studio<span className="text-accent">.</span>
        </Link>
        <Link
          to="/"
          className="label-mono inline-flex items-center gap-2 rounded-full border border-hairline bg-secondary/50 px-5 py-2 text-xs transition-colors hover:border-accent hover:text-accent"
        >
          <span>←</span> Back to Studio
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

        {/* Category Pill Badges */}
        <div className="mt-12 flex flex-wrap gap-2.5">
          {["All Projects (04)", "Full Platform (01)", "Web Design (02)", "UI/UX Systems (01)"].map((tag, idx) => (
            <span
              key={tag}
              className={`label-mono cursor-pointer rounded-full px-5 py-2 text-xs transition-all ${
                idx === 0
                  ? "bg-accent text-accent-foreground font-medium shadow-md"
                  : "border border-hairline bg-secondary/30 text-muted-foreground hover:border-hairline hover:text-foreground"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Work Grid */}
      <section className="px-6 py-16 md:px-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {ALL_WORK.map((w) => (
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

                {/* Live Status Pill */}
                {w.url && (
                  <div className="absolute top-5 right-5 rounded-full border border-accent/40 bg-accent/20 px-3.5 py-1.5 backdrop-blur-md">
                    <span className="label-mono text-[0.65rem] text-accent animate-pulse">● LIVE PLATFORM</span>
                  </div>
                )}

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

      {/* Footer */}
      <footer className="border-t border-hairline px-6 py-12 text-center md:px-16 md:py-16">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link to="/" className="display-tight text-xl font-medium text-foreground">
            Summit Studio<span className="text-accent">.</span>
          </Link>
          <p className="label-mono text-xs text-muted-foreground">
            © 2026 Summit Studio. All rights reserved.
          </p>
          <Link to="/" className="label-mono text-xs text-accent hover:underline">
            Back to top ↑
          </Link>
        </div>
      </footer>
    </main>
  );
}
