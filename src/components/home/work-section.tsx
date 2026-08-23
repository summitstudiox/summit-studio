import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { SectionHead } from "@/components/section-head";
import clubExotismImg from "@/assets/clubexotism.jpg";
import ascendImg from "@/assets/ascend.jpg";
import campusConnectImg from "@/assets/campus-connect.jpg";
import sableEstatesImg from "@/assets/sable-estates.jpg";

const WORK = [
  {
    n: "01",
    slug: "club-exotism",
    name: "Club Exotism",
    kind: "Full Platform · Real-Time Engine · High-Octane Admin Suite",
    img: clubExotismImg,
  },
  {
    n: "03",
    slug: "campus-connect",
    name: "Campus Connect",
    kind: "Brand Identity · Community Web App",
    img: campusConnectImg,
  },
  {
    n: "04",
    slug: "ascend",
    name: "Ascend",
    kind: "UI Design · Conversion Optimization",
    img: ascendImg,
  },
  {
    n: "05",
    slug: "sable-estates",
    name: "Sable Estates",
    kind: "Web Design · Luxury Real Estate Marketing",
    img: sableEstatesImg,
  },
];

export function WorkSection() {
  const workScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = workScrollRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 22; // px per second — gentle ambient drift, independent of display refresh rate
    const RESUME_DELAY = 1800; // ms of quiet before auto-scroll resumes after user interaction
    const HOVER_MAX_PAUSE = 4500; // ms — resume even if the cursor never leaves, so it never looks frozen

    // The track renders two identical copies of WORK back to back. Wrapping
    // the scroll position by the width of one copy lands on a pixel-identical
    // frame, so the carousel can loop forever in one direction instead of
    // bouncing back once it hits an end.
    let singleSetWidth = el.scrollWidth / 2;
    const wrap = (value: number) => {
      if (singleSetWidth <= 0) return value;
      const wrapped = value % singleSetWidth;
      return wrapped < 0 ? wrapped + singleSetWidth : wrapped;
    };

    let rafId: number;
    let pos = el.scrollLeft;
    let lastFrameTime = performance.now();
    let isAutoScrolling = false;
    let isHovering = false;
    let hoverStart = 0;
    let isPointerDown = false;
    let lastInteraction = 0;

    const onResize = () => {
      singleSetWidth = el.scrollWidth / 2;
    };

    const markInteraction = () => {
      lastInteraction = Date.now();
    };
    const onScroll = () => {
      if (isAutoScrolling) return;
      markInteraction();
      pos = el.scrollLeft;
      // A manual drag/fling past either end of a single copy — snap back
      // into the equivalent spot in the other copy, invisibly.
      if (singleSetWidth > 0 && (pos >= singleSetWidth || pos < 0)) {
        isAutoScrolling = true;
        pos = wrap(pos);
        el.scrollLeft = pos;
      }
    };
    const onEnter = () => {
      isHovering = true;
      hoverStart = Date.now();
    };
    const onLeave = () => {
      isHovering = false;
      markInteraction();
    };
    const onPointerDown = () => {
      isPointerDown = true;
      markInteraction();
    };
    const onPointerUp = () => {
      isPointerDown = false;
      markInteraction();
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", onResize);

    let wasMoving = false;

    const step = (now: number) => {
      // The native "scroll" event from last frame's assignment below dispatches
      // asynchronously, so isAutoScrolling has to stay true until it's had a
      // frame to fire — otherwise it's misread as user interaction and the
      // animation pauses itself on every single frame.
      isAutoScrolling = false;

      const dt = now - lastFrameTime;
      lastFrameTime = now;
      const idleEnough = Date.now() - lastInteraction > RESUME_DELAY;
      const hoverBlocking = isHovering && Date.now() - hoverStart < HOVER_MAX_PAUSE;
      const shouldMove = idleEnough && !hoverBlocking && !isPointerDown;
      if (shouldMove) {
        if (!wasMoving) {
          // Just resumed — trust the DOM's actual scroll position rather
          // than our tracked `pos`, in case a scroll event from a manual
          // jump hasn't dispatched yet and `pos` is stale.
          pos = el.scrollLeft;
        }
        if (singleSetWidth > 0) {
          // Always forward, wrapping around the duplicated track — the
          // carousel never has to reverse direction to avoid "ending".
          pos = wrap(pos + (SPEED * dt) / 1000);
          isAutoScrolling = true;
          el.scrollLeft = pos;
        }
      }
      wasMoving = shouldMove;
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="work" className="border-t border-hairline">
      <SectionHead n="02" label="Selected Work" />

      <div className="px-6 py-20 md:px-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:items-start">
          {/* Left Header Column */}
          <div className="flex flex-col justify-between space-y-10 md:sticky md:top-28">
            <div>
              <h2 className="display-tight text-3xl font-normal leading-snug tracking-tight text-foreground md:text-5xl">
                Our Work Speaks Louder Than Words.
              </h2>
              <p className="mt-5 text-xs leading-relaxed text-foreground/70 md:text-sm font-normal">
                A curated collection of digital weapons, bespoke platforms, and identity systems
                engineered for dominant commercial growth.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <Link
                  to="/work"
                  className="label-mono inline-flex items-center gap-3 rounded-full border border-hairline bg-secondary/60 px-7 py-3.5 text-xs font-medium backdrop-blur-md transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <span>→</span> View All Cases
                </Link>
              </div>

              <div className="flex items-center gap-8 border-t border-hairline/60 pt-8">
                <div>
                  <span className="display-tight text-2xl font-medium text-foreground">04</span>
                  <span className="label-mono mt-1 block text-[0.68rem] text-muted-foreground">
                    Featured Cases
                  </span>
                </div>
                <div className="h-8 w-px bg-hairline/60" />
                <div>
                  <span className="display-tight text-2xl font-medium text-accent">100%</span>
                  <span className="label-mono mt-1 block text-[0.68rem] text-muted-foreground">
                    Bespoke Build
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Laptop Screen Widescreen Cards Carousel */}
          <div
            ref={workScrollRef}
            className="flex min-w-0 gap-4 md:gap-8 overflow-x-auto pb-8 no-scrollbar mask-edge-fade"
          >
            {[...WORK, ...WORK].map((w, i) => (
              <Link
                key={`${w.n}-${i}`}
                to="/work/$slug"
                params={{ slug: w.slug }}
                className="group relative flex aspect-[4/3] sm:aspect-[16/10.5] w-[84vw] max-w-[780px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-xl md:rounded-2xl border border-hairline bg-card p-5 shadow-2xl transition-all duration-500 hover:border-accent/50 md:p-10"
              >
                {/* Background Image */}
                <img
                  src={w.img}
                  alt={`${w.name} project`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />
                <div className="grain-overlay pointer-events-none absolute inset-0 opacity-20" />

                {/* Bottom Title overlay */}
                <div className="relative z-10 space-y-2">
                  <h3 className="display-tight text-2xl font-medium text-white transition-colors group-hover:text-accent sm:text-3xl md:text-5xl">
                    {w.name}
                  </h3>
                  <p className="label-mono line-clamp-1 text-xs text-accent/90">{w.kind}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
