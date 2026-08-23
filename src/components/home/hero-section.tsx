import { PredictiveArcCanvas } from "@/components/effects/predictive-arc/PredictiveArcCollection";
import "@/components/effects/predictive-arc/styles.css";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-between">
      {/* Predictive Arc (halftone-flow) authored background. pointer-events
          stay off so wheel/touch scrolling over the iframe reaches the page. */}
      <div className="absolute inset-0 pointer-events-none">
        <PredictiveArcCanvas variant="halftone-flow" hue={-30} saturation={2} brightness={1.05} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative flex min-h-[100svh] flex-col justify-between gap-12 px-5 pt-32 pb-8 md:px-8 md:pt-40 md:pb-12">
        <div className="rise ml-auto flex max-w-lg flex-col items-end text-right">
          <h1 className="text-sm leading-relaxed tracking-tight sm:text-base md:text-lg">
            Blending in is expensive.
            <br />
            <span className="text-foreground/70">
              Branding, website design and development for businesses that want to be remembered.
            </span>
          </h1>
          <a
            href="#work"
            className="label-mono mt-8 sm:mt-10 flex w-full max-w-xs sm:max-w-sm items-center justify-between border-b border-foreground pb-3 text-xs sm:text-sm transition-colors hover:border-accent hover:text-accent"
          >
            Explore our work
            <span>↗</span>
          </a>
        </div>

        <div className="overflow-hidden w-full">
          <p className="display-tight w-full text-[11vw] leading-[0.85] tracking-tight whitespace-nowrap md:text-[10.4vw]">
            Summit Studio<span className="text-accent">.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
