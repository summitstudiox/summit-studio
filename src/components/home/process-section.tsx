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
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const compute = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 0.999);
      setActiveStep(Math.min(3, Math.floor(progress * 4)));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const stage = PROCESS[activeStep]!;

  return (
    <section id="process" className="border-t border-hairline">
      <SectionHead n="03" label="Our Process" />

      <div className="px-6 md:px-16">
        {/* Section header */}
        <div className="pt-10 pb-16 md:pt-14 md:pb-20 md:flex md:items-end md:justify-between">
          <h2 className="display-tight max-w-xl text-3xl font-normal leading-snug tracking-tight text-foreground md:text-5xl">
            A Clear Path From Idea to Launch.
          </h2>
          <p className="mt-5 max-w-xs text-xs leading-relaxed text-foreground/60 md:mt-0 md:text-sm">
            Four stages. Each with a clear goal, a defined deliverable, and no guesswork.
          </p>
        </div>
      </div>

      {/* Mobile — static stacked */}
      <div className="grid gap-px border-t border-hairline md:hidden">
        {PROCESS.map((s) => (
          <article key={s.n} className="border-b border-hairline px-6 py-8">
            <span className="label-mono text-[0.65rem] text-muted-foreground">{s.n}</span>
            <h3 className="display-tight mt-3 text-2xl font-medium tracking-tight text-foreground">
              {s.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-foreground/60">{s.sub}</p>
            <ul className="mt-5 space-y-2 border-t border-hairline/50 pt-5">
              {s.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-xs text-foreground/75">
                  <span className="h-px w-3 shrink-0 bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Desktop — sticky giant number + scrolling right panel */}
      <div ref={pinRef} className="relative hidden pb-24 md:block md:min-h-[400vh]">
        <div className="sticky top-0 h-screen">
          <div className="grid h-full grid-cols-[minmax(0,5fr)_minmax(0,7fr)] border-t border-hairline">
            {/* LEFT — giant step number, fills the column */}
            <div className="relative flex flex-col justify-between border-r border-hairline px-10 py-14 overflow-hidden">
              {/* Foreground content */}
              <div className="relative z-10">
                <span className="label-mono text-xs text-muted-foreground">
                  STAGE {stage.n} / 04
                </span>

                {/* Step pills */}
                <div className="mt-8 flex flex-col gap-3">
                  {PROCESS.map((s, i) => (
                    <div
                      key={s.n}
                      className={`flex items-center gap-3 transition-all duration-300 ${
                        i === activeStep ? "opacity-100" : "opacity-25"
                      }`}
                    >
                      <span
                        className={`h-px transition-all duration-500 ${
                          i === activeStep ? "w-8 bg-accent" : "w-3 bg-hairline"
                        }`}
                      />
                      <span
                        className={`label-mono text-xs transition-colors duration-300 ${
                          i === activeStep ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current title — bottom left */}
              <div className="relative z-10">
                <h3
                  key={stage.title}
                  className="display-tight flex items-baseline gap-4 text-4xl font-medium tracking-tight text-foreground transition-all duration-500 xl:text-5xl"
                >
                  <span className="label-mono text-lg text-muted-foreground">{stage.n}</span>
                  {stage.title}
                  <span className="text-accent">.</span>
                </h3>
                <p className="label-mono mt-3 text-xs leading-relaxed text-foreground/50 md:text-sm">
                  {stage.sub}
                </p>
              </div>
            </div>

            {/* RIGHT — details panel */}
            <div className="flex flex-col justify-center px-14 py-14 xl:px-20">
              <div key={stage.n + "-detail"} className="space-y-10 transition-all duration-500">
                <p className="text-lg leading-relaxed text-foreground/80 font-normal xl:text-xl">
                  {stage.details}
                </p>

                <div className="border-t border-hairline/60 pt-8">
                  <p className="label-mono mb-6 text-xs text-muted-foreground">[ Deliverables ]</p>
                  <ul className="space-y-4">
                    {stage.highlights.map((h, i) => (
                      <li key={h} className="flex items-center gap-4">
                        <span className="label-mono text-xs text-accent/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px flex-1 bg-hairline/40" />
                        <span className="label-mono text-sm text-foreground/80">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
