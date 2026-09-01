import { useState } from "react";
import { SectionHead } from "@/components/section-head";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import clubExotismImg from "@/assets/clubexotism.jpg";

const SERVICES = [
  {
    n: "01",
    title: "Brand Strategy & Positioning",
    desc: "Every memorable brand begins with clarity. We define the visual and strategic foundations that shape how your audience sees, feels, and remembers you.",
    tags: ["Identity Systems", "Art Direction", "Visual Language"],
    images: [work1, work2],
  },
  {
    n: "02",
    title: "Digital Engineering & Web Design",
    desc: "We create immersive digital experiences where storytelling, interaction, and technology come together to turn visitors into engaged, high-value audiences.",
    tags: ["Custom UI/UX", "High-Performance SSR", "Conversion Architecture"],
    images: [work3, clubExotismImg],
  },
  {
    n: "03",
    title: "Creative Systems & Scalability",
    desc: "A flexible framework that keeps your brand consistent across every touchpoint while leaving room for growth, evolution, and continuous experimentation.",
    tags: ["Design Systems", "Component Libraries", "Brand Guidelines"],
    images: [work4, work1],
  },
  {
    n: "04",
    title: "Growth & Infrastructure",
    desc: "Movement brings emotion to design. Through thoughtful transitions, analytics monitoring, and edge infrastructure, we build digital assets that scale.",
    tags: ["Edge Hosting", "Analytics & Conversion", "Iterative Releases"],
    images: [work2, work3],
  },
];

export function StudioSection() {
  const [openService, setOpenService] = useState<string | null>(null);

  return (
    <section id="studio">
      <SectionHead n="01" label="About Company" />
      <div className="px-6 py-20 md:px-16">
        <div className="mb-12">
          <h2 className="display-tight max-w-3xl text-3xl font-normal leading-snug tracking-tight text-foreground md:text-5xl xl:max-w-none xl:whitespace-nowrap">
            We Craft Digital Identities Built for Impact.
          </h2>
        </div>

        {/* 4-Card Bento Row (Stacked on Mobile, 2x2 on Tablet, 4-Cols on Desktop) */}
        <div className="grid gap-px bg-hairline grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {/* Card 1: Global Collaborations */}
          <div className="group flex flex-col justify-between bg-background p-5 sm:p-6 md:p-8 transition-colors duration-300 hover:bg-secondary">
            <div>
              <span className="label-mono text-[0.65rem] sm:text-xs text-accent">
                [ Global Network ]
              </span>
              <p className="mt-3 text-[0.68rem] sm:text-xs leading-relaxed text-foreground/75">
                Partnering remotely with ambitious teams across major tech hubs.
              </p>
            </div>
            <div className="mt-8 sm:mt-12">
              <p className="display-tight text-3xl sm:text-4xl md:text-5xl font-medium text-foreground">
                6+
              </p>
              <p className="label-mono mt-1.5 text-[0.65rem] sm:text-xs text-muted-foreground">
                Global Collaborations
              </p>
            </div>
          </div>

          {/* Card 2: Industry Authority */}
          <div className="group flex flex-col justify-between bg-background p-5 sm:p-6 md:p-8 transition-colors duration-300 hover:bg-secondary">
            <div>
              <span className="label-mono text-[0.65rem] sm:text-xs text-accent">
                [ Authority & Awards ]
              </span>
              <p className="mt-3 text-[0.68rem] sm:text-xs leading-relaxed text-foreground/75">
                Featured and celebrated for high-octane engineering & positioning.
              </p>
            </div>
            <div className="mt-8 sm:mt-12">
              <p className="display-tight text-3xl sm:text-4xl md:text-5xl font-medium text-foreground">
                3+
              </p>
              <p className="label-mono mt-1.5 text-[0.65rem] sm:text-xs text-muted-foreground">
                Industry Recognitions
              </p>
            </div>
          </div>

          {/* Card 3: Projects Delivered */}
          <div className="group flex flex-col justify-between bg-background p-5 sm:p-6 md:p-8 transition-colors duration-300 hover:bg-secondary">
            <div>
              <span className="label-mono text-[0.65rem] sm:text-xs text-accent">
                [ Execution ]
              </span>
              <p className="mt-3 text-[0.68rem] sm:text-xs leading-relaxed text-foreground/75">
                From emerging startups to market leaders, crafted as unique digital worlds.
              </p>
            </div>
            <div className="mt-8 sm:mt-12">
              <p className="display-tight text-3xl sm:text-4xl md:text-5xl font-medium text-foreground">
                10+
              </p>
              <p className="label-mono mt-1.5 text-[0.65rem] sm:text-xs text-muted-foreground">
                Projects Delivered
              </p>
            </div>
          </div>

          {/* Card 4: Countries Reached */}
          <div className="group flex flex-col justify-between bg-background p-5 sm:p-6 md:p-8 transition-colors duration-300 hover:bg-secondary">
            <div>
              <span className="label-mono text-[0.65rem] sm:text-xs text-accent">[ Reach ]</span>
              <p className="mt-3 text-[0.68rem] sm:text-xs leading-relaxed text-foreground/75">
                Collaborating with visionary brands driving global impact.
              </p>
            </div>
            <div className="mt-8 sm:mt-12">
              <p className="display-tight text-3xl sm:text-4xl md:text-5xl font-medium text-foreground">
                4+
              </p>
              <p className="label-mono mt-1.5 text-[0.65rem] sm:text-xs text-muted-foreground">
                Countries Reached
              </p>
            </div>
          </div>
        </div>

        {/* Collapsible Services Accordion Block */}
        <div className="mt-24">
          <div className="mb-12">
            <h3 className="display-tight text-3xl font-medium text-foreground md:text-5xl">
              Our Services.
            </h3>
          </div>

          <div className="divide-y divide-hairline border-t border-b border-hairline">
            {SERVICES.map((s) => {
              const isOpen = openService === s.n;
              return (
                <div
                  key={s.n}
                  onMouseEnter={() => setOpenService(s.n)}
                  onMouseLeave={() => setOpenService(null)}
                  className="py-8 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenService(isOpen ? null : s.n)}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${s.n}`}
                    className="flex w-full cursor-pointer items-start justify-between gap-6 text-left"
                  >
                    <div className="flex items-baseline gap-6 md:gap-12">
                      <span className="label-mono text-xs text-muted-foreground">[{s.n}]</span>
                      <h4 className="display-tight text-2xl font-medium text-foreground transition-colors hover:text-accent md:text-3xl">
                        {s.title}
                      </h4>
                    </div>

                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-lg text-foreground transition-colors"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div id={`service-panel-${s.n}`} className="mt-8 max-w-2xl space-y-6 md:pl-16">
                      <p className="text-sm leading-relaxed text-foreground/80 md:text-base">
                        {s.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="label-mono rounded-full border border-hairline bg-secondary/40 px-3.5 py-1.5 text-[0.68rem] text-foreground/90"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
