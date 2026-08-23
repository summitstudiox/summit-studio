import { useEffect, useRef, useState } from "react";
import { SectionHead } from "@/components/section-head";

const PROCESS = [
  {
    n: "01",
    title: "Discover",
    sub: "We study the emotional position of your brand before touching visuals.",
    details:
      "Deep immersion into audience psychology, market position, and competitive gaps. We uncover core strategic insights that define your brand identity before writing a single line of code or designing a single frame.",
    highlights: [
      "Competitor & Market Dissection",
      "Audience Persona Architecture",
      "Brand Positioning Blueprint",
    ],
    cadence: [
      "Scheduled kickoff call to gather requirements",
      "Written discovery brief sent for your review",
      "You sign off before anything gets locked in",
    ],
  },
  {
    n: "02",
    title: "Construct",
    sub: "Narratives, systems, motion principles, and visual tension begin to take shape.",
    details:
      "Translating strategy into visual systems. We establish typography hierarchy, custom component tokens, motion guidelines, and layout grids built to scale seamlessly across all modern screen viewports.",
    highlights: [
      "Design System & Tokens",
      "Modular Layout Wireframing",
      "Motion & Interactive Prototypes",
    ],
    cadence: [
      "Async previews as each system piece lands",
      "No waiting for one big reveal",
      "Scheduled review call before we move into build",
    ],
  },
  {
    n: "03",
    title: "Direct",
    sub: "Every interaction is refined frame-by-frame like a digital film sequence.",
    details:
      "Full-stack digital engineering meets meticulous creative direction. Sub-second page performance, micro-interactions, responsive fluid math, and robust TanStack Start SSR web architecture.",
    highlights: [
      "High-Performance SSR Build",
      "Micro-Interactions & Animation",
      "Cross-Browser Edge Testing",
    ],
    cadence: [
      "Weekly build sync calls",
      "Live staging link to watch real progress",
      "Flag changes early, before they ship",
    ],
  },
  {
    n: "04",
    title: "Release",
    sub: "A polished experience engineered to feel timeless on launch day.",
    details:
      "Zero-downtime deployment to global edge CDN infrastructure. Complete with structured SEO schema metadata, analytics hooks, conversion tracking, and post-launch optimization.",
    highlights: [
      "Global Edge CDN Deployment",
      "Schema & Technical SEO Suite",
      "Analytics & Conversion Handoff",
    ],
    cadence: [
      "Pre-launch walkthrough call",
      "Scheduled deployment window, nothing goes live unannounced",
      "Post-launch check-in to catch anything worth tuning",
    ],
  },
];

export function ProcessSection() {
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const processPinRef = useRef<HTMLDivElement>(null);

  // Drives the pinned "Our Process" card: as the tall 300vh scroll canvas
  // moves through the viewport, the active stage advances 0→3 in step with
  // scroll position (rather than only via the pill clicks).
  useEffect(() => {
    const el = processPinRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const computeStep = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;
      if (totalScrollableDistance <= 0) return;
      const scrolledAmount = -rect.top;
      const progress = Math.min(Math.max(scrolledAmount / totalScrollableDistance, 0), 0.99);
      const step = Math.min(3, Math.max(0, Math.floor(progress * 4)));
      setActiveProcessStep((prev) => (prev === step ? prev : step));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(computeStep);
      }
    };

    computeStep();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Clicking a stage pill scrolls the pin canvas to that stage's window
  // instead of just flipping local state, so it stays in sync with the
  // scroll-driven progress above.
  const scrollToProcessStep = (i: number) => {
    const el = processPinRef.current;
    if (!el) {
      setActiveProcessStep(i);
      return;
    }
    const rect = el.getBoundingClientRect();
    const totalScrollableDistance = rect.height - window.innerHeight;
    if (totalScrollableDistance <= 0) {
      setActiveProcessStep(i);
      return;
    }
    const targetProgress = (i + 0.15) / 4;
    const targetY = window.scrollY + rect.top + targetProgress * totalScrollableDistance;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const activeStage = PROCESS[activeProcessStep] ?? PROCESS[0]!;

  return (
    <section id="process" className="border-t border-hairline">
      <div className="px-6 py-16 md:px-16 md:py-24">
        {/* Pin Window with height for scroll progress. Desktop-only: on
          small screens the card must grow with its content instead of
          sticking in a viewport-height window where it clips. */}
        <div ref={processPinRef} className="relative md:min-h-[300vh]">
          <div className="z-10 md:sticky md:top-16">
            <div className="-mx-6 -mt-16 md:-mx-16 md:-mt-24">
              <SectionHead n="03" label="Our Process" />
            </div>

            <div className="mb-10 pt-8 md:mb-12 md:pt-12">
              <h2 className="display-tight max-w-2xl text-3xl font-normal leading-snug tracking-tight text-foreground md:text-5xl xl:max-w-none xl:whitespace-nowrap">
                A Clear Path From Idea to Launch.
              </h2>
              <p className="mt-5 text-xs leading-relaxed text-foreground/70 md:text-sm font-normal xl:whitespace-nowrap">
                Four stages, each with a clear goal, a defined deliverable, and no guesswork about
                what happens next.
              </p>
            </div>

            {/* MOBILE — compact stacked stages. No pinning, no
                interactive machinery: every stage is a small static card
                with just number, title, summary and deliverables. */}
            <div className="grid gap-4 md:hidden">
              {PROCESS.map((stage) => (
                <article
                  key={stage.n}
                  className="rounded-xl border border-hairline bg-card/95 p-5 shadow-sm backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-[0.65rem] text-muted-foreground">
                      [ {stage.n} ]
                    </span>
                    <span className="h-1 w-1 rounded-full bg-accent" />
                  </div>
                  <h3 className="display-tight mt-3 text-2xl font-medium tracking-tight text-foreground">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-[0.7rem] leading-relaxed text-foreground/70">
                    {stage.sub}
                  </p>
                  <ul className="mt-4 space-y-1.5 border-t border-hairline/60 pt-4">
                    {stage.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs leading-relaxed text-foreground/80"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            {/* DESKTOP — sticky stacking card timeline */}
            <div className="hidden items-center overflow-hidden rounded-2xl border border-hairline bg-card/95 p-8 shadow-2xl backdrop-blur-xl md:flex md:min-h-[560px] md:p-16">
              <div className="grid w-full gap-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16">
                {/* Badge / Stage Indicator */}
                <div className="min-w-0 space-y-6 md:space-y-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-secondary/60 px-4 py-1.5 backdrop-blur-md">
                    <span className="label-mono text-xs font-semibold text-accent">
                      STAGE 0{activeProcessStep + 1} OF 04
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  </div>
                  <h3 className="display-tight text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl transition-all duration-300">
                    {activeStage.title}
                  </h3>
                  <p className="label-mono text-xs leading-relaxed text-accent/90 transition-all duration-300 md:text-sm">
                    {activeStage.sub}
                  </p>

                  {/* Step Indicators */}
                  <div className="flex gap-2 pt-2">
                    {PROCESS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToProcessStep(i)}
                        className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                          i === activeProcessStep
                            ? "w-8 bg-accent"
                            : "w-2 bg-hairline hover:bg-muted-foreground"
                        }`}
                        aria-label={`Go to stage ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Detailed Description & Deliverables */}
                <div className="min-w-0 space-y-8 border-t border-hairline/60 pt-8 md:space-y-8 md:border-l md:border-t-0 md:pl-14 md:pt-0">
                  <p className="text-base leading-relaxed text-foreground/85 md:text-lg font-normal transition-all duration-300">
                    {activeStage.details}
                  </p>

                  <div className="border-t border-hairline/60 pt-6">
                    <h4 className="label-mono text-xs text-muted-foreground mb-4">
                      [ Stage Deliverables ]
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {activeStage.highlights.map((h) => (
                        <span
                          key={h}
                          className="label-mono rounded-lg border border-hairline/80 bg-background/80 px-4 py-2.5 text-xs text-foreground/90 shadow-sm transition-all duration-300"
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-hairline/60 pt-6">
                    <h4 className="label-mono text-xs text-muted-foreground mb-4">
                      [ How We'll Communicate ]
                    </h4>
                    <ul className="space-y-2.5">
                      {activeStage.cadence.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/75 transition-all duration-300"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
