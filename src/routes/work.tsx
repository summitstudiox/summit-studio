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
    <main className="min-h-screen bg-background text-foreground px-6 py-20 md:px-16 md:py-28">
      {/* Modal Header */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md md:p-8"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-hairline bg-card shadow-2xl"
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
                    className="label-mono text-xs text-foreground transition-colors hover:text-accent"
                  >
                    Open site ↗
                  </a>
                )}
                <button
                  onClick={() => setActiveProject(null)}
                  className="text-base text-muted-foreground transition-colors hover:text-foreground p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="grid flex-1 overflow-hidden md:grid-cols-12 min-h-0">
              <div className="flex flex-col justify-between overflow-y-auto border-b border-hairline p-6 md:col-span-5 md:border-r md:border-b-0 md:p-8 space-y-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="label-mono text-xs text-accent">Overview</h4>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{activeProject.challenge}</p>
                  </div>
                  <div>
                    <h4 className="label-mono text-xs text-accent">What We Built</h4>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">{activeProject.solution}</p>
                  </div>
                </div>

                <div className="border-t border-hairline pt-6">
                  <h4 className="label-mono text-xs text-muted-foreground">Impact</h4>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {activeProject.stats.map((s) => (
                      <div key={s.k}>
                        <p className="display-tight text-lg text-accent">{s.v}</p>
                        <p className="label-mono text-[0.6rem] text-muted-foreground mt-0.5">{s.k}</p>
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
                  <div className="h-full w-full overflow-y-auto">
                    <img
                      src={activeProject.img}
                      alt={`${activeProject.name} preview`}
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-hairline pb-12 md:flex-row md:items-end">
        <div>
          <Link to="/" className="label-mono text-xs text-accent hover:underline">
            ← Back to Home
          </Link>
          <h1 className="display-tight mt-4 text-4xl font-medium tracking-tight md:text-6xl">
            All Selected Works.
          </h1>
        </div>
        <p className="max-w-xs label-mono text-xs text-muted-foreground">
          Showing 04 of 04 Case Stories
        </p>
      </div>

      {/* Work Grid */}
      <div className="mt-16 grid gap-px bg-hairline md:grid-cols-2">
        {ALL_WORK.map((w) => (
          <article
            key={w.n}
            onClick={() => setActiveProject(w)}
            className="group cursor-pointer bg-background p-8 md:p-12 transition-all duration-300 hover:bg-secondary/40"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={w.img}
                alt={`${w.name} project`}
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
              <div className="grain-overlay pointer-events-none absolute inset-0 opacity-20" />
            </div>

            <div className="mt-8 flex items-baseline justify-between">
              <h3 className="display-tight text-3xl font-medium text-foreground transition-colors group-hover:text-accent md:text-4xl">
                {w.name}
              </h3>
              <span className="label-mono text-xs text-muted-foreground group-hover:text-foreground">
                View Case
              </span>
            </div>
            <p className="label-mono mt-2 text-xs text-accent/90">{w.kind}</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/75 line-clamp-2">
              {w.challenge}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
