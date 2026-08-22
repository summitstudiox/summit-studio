import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";
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
  { label: "Studio", href: "#studio" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const FAQ_ITEMS = [
  {
    q: "What types of companies do you partner with?",
    a: "We work with ambitious founders, scaling startups, and established brands taking market share. Whether you need a full brand overhaul or a high-converting digital platform, we design for impact and commercial growth.",
  },
  {
    q: "How does your project pricing work?",
    a: "We operate on fixed-fee project scopes or flexible monthly retainers — no hidden hourly surprise bills. Complete brand identity & digital platform packages typically start at fixed milestones tailored to your deliverables and speed-to-market.",
  },
  {
    q: "What payment schedules do you offer?",
    a: "Our standard engagement model is structured around key project milestones: a 50% deposit upon kickoff to reserve project capacity, and 50% upon final sign-off and edge deployment.",
  },
  {
    q: "How long does a typical project take from kickoff to launch?",
    a: "Most web design and brand engineering projects take 3 to 6 weeks depending on scope. We run a streamlined process with clear milestones, so you're always updated without traditional agency delays.",
  },
  {
    q: "Do you offer ongoing hosting, maintenance, and growth updates?",
    a: "Yes. Beyond launch day, we manage sub-second global edge infrastructure, analytics monitoring, performance optimization, and iterative feature releases that scale directly with your revenue.",
  },
  {
    q: "How do we get started?",
    a: "Simply reach out via our contact form or send us an email. We'll set up a 15-minute discovery call to discuss your goals, scope, and timeline.",
  },
];

const WORK = [
  {
    n: "01",
    slug: "club-exotism",
    name: "Club Exotism",
    client: "Club Exotism — Flagship Gaming Sanctuary & Esports Arena (Thrissur, Kerala)",
    kind: "Full Platform · Real-Time Engine · High-Octane Admin Suite",
    year: "2026",
    img: clubExotismImg,
    url: "https://clubexotism.com",
    stack: "React (TanStack Start) · Edge-State PostgreSQL · Vercel Global Edge",
    researchInsights: [
      "Deep Operator Infiltration: Deployed our core team on-site for 72 hours, dissecting every micro-interaction between gamers, lounge staff, and console stations.",
      "Zero-Friction Behavioral Discovery: Uncovered that high-spending gaming squads abandon traditional 3D-Secure payment forms, demanding instant, 1-tap WhatsApp VIP reservations.",
      "Hardware Capacity Matrix: Engineered custom zero-collision algorithms to resolve multi-console hardware conflicts across Sim Racing rigs, VR setups, and PS5 multiplayer hubs.",
    ],
    customerPartnership:
      "We co-engineered this platform shoulder-to-shoulder with the founders and venue operators. No corporate fluff, no generic templates — pure, bespoke digital firepower tailored to dominate their local market.",
    challenge:
      "Club Exotism needed a beast of a booking platform capable of managing complex physical hardware inventory (PS5 consoles, VR rigs, Sim Racing cockpits) with real-time multi-player capacity logic, instant 1-tap WhatsApp checkout, and dominant #1 Google search ranking from day zero.",
    solution:
      "Architected a ultra-slick, dark-mode digital weapon featuring real-time bin-packing inventory calculations, instant pre-filled WhatsApp VIP booking checkout, an intuitive daily visual control panel for staff, and aggressive LocalBusiness schema SEO integration.",
    designIdentity: [
      "The Cyber-Lounge Palette: Obsidian pitch-black base (#010102) fused with hyper-vibrant molten ember accents (#f58c04 / #e46417) — mimicking neon signs burning in a pitch-black arcade.",
      "Poster-Grade Typography: Raw, ultra-bold Anton display typography paired with crisp Inter micro-type and massive background Japanese Katakana watermarks (レーシング, プレステ, ビリヤード).",
      "Tactile Glassmorphism: Translucent glass panels, heavy backdrop blur, and neon ember radiation glows (shadow-[0_0_25px_rgba(245,140,4,0.3)]) for an unmatched futuristic feel.",
    ],
    seoDiscoverability:
      "Beyond the build, we handled the site's technical SEO foundation end-to-end: search engine crawlability, structured data so Google understands it as a real local business (hours, address, pricing), social share previews, and canonical domain configuration to keep ranking signal consolidated on one URL instead of split across variants. We also caught and fixed a cross-browser rendering bug affecting how the brand appeared in Safari — the kind of detail that's easy to miss without checking across real browsers, not just one.",
    problemsSolved: [
      "Bin-Packing Inventory Engine: Replaced primitive booking slots with real-time hardware capacity algorithms that mathematically prevent double-booking across shared physical equipment.",
      "WhatsApp Instant Conversion: Converted traditional payment drop-offs into high-converting 1-tap WhatsApp VIP confirmation streams.",
      "Sub-Millisecond Safari & SEO Fixes: Vaporized WebKit rendering bugs and locked down domain canonicalization for flawless #1 local search dominance.",
    ],
    stats: [
      { k: "Slot Utilization", v: "100%" },
      { k: "Checkout Speed", v: "< 12s" },
      { k: "Local SEO Dominance", v: "#1 RANK" },
    ],
  },
  {
    n: "02",
    slug: "vanta-digital",
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
    slug: "campus-connect",
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
    slug: "ascend",
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

const STATS = [
  { k: "Conversion rate", v: "+84%" },
  { k: "User engagement", v: "+67%" },
  { k: "Brand recall", v: "+91%" },
];

function SectionHead({ n, label }: { n: string; label: string }) {
  return (
    <div className="rule-top flex items-center justify-between px-4 py-5 md:px-8 md:py-6">
      <span className="label-mono text-muted-foreground text-[0.65rem] md:text-xs">
        <span className="text-accent">◆</span> [ {n} ]
      </span>
      <span className="label-mono text-right text-[0.65rem] md:text-xs tracking-wider">
        {label}
      </span>
    </div>
  );
}

function Index() {
  const [activeProject, setActiveProject] = useState<(typeof WORK)[number] | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openService, setOpenService] = useState<string | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const workScrollRef = useRef<HTMLDivElement>(null);
  const processPinRef = useRef<HTMLDivElement>(null);
  const activeProjectRef = useRef(activeProject);

  useEffect(() => {
    activeProjectRef.current = activeProject;
  }, [activeProject]);

  // Switches the nav to its opaque/scrolled treatment once the page has
  // moved down a bit.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    const el = workScrollRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 22; // px per second — gentle ambient drift, independent of display refresh rate
    const RESUME_DELAY = 1800; // ms of quiet before auto-scroll resumes after user interaction
    const HOVER_MAX_PAUSE = 4500; // ms — resume even if the cursor never leaves, so it never looks frozen

    let rafId: number;
    let dir = 1;
    let pos = el.scrollLeft;
    let lastFrameTime = performance.now();
    let isAutoScrolling = false;
    let isHovering = false;
    let hoverStart = 0;
    let isPointerDown = false;
    let lastInteraction = 0;

    const markInteraction = () => {
      lastInteraction = Date.now();
    };
    const onScroll = () => {
      if (!isAutoScrolling) {
        markInteraction();
        const newPos = el.scrollLeft;
        // Continue in whatever direction the user just scrolled, not
        // whatever direction the animation happened to be going before.
        if (newPos > pos) dir = 1;
        else if (newPos < pos) dir = -1;
        pos = newPos;
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
      const shouldMove =
        idleEnough && !hoverBlocking && !isPointerDown && !activeProjectRef.current;
      if (shouldMove) {
        if (!wasMoving) {
          // Just resumed — trust the DOM's actual scroll position rather
          // than our tracked `pos`, in case a scroll event from a manual
          // jump hasn't dispatched yet and `pos` is stale.
          pos = el.scrollLeft;
        }
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          pos += ((SPEED * dt) / 1000) * dir;
          if (pos >= maxScroll) {
            pos = maxScroll;
            dir = -1;
          } else if (pos <= 0) {
            pos = 0;
            dir = 1;
          }
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
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const activeStage = PROCESS[activeProcessStep] ?? PROCESS[0]!;

  return (
    <main id="top" className="min-h-screen overflow-x-clip bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-all duration-500 md:px-8 ${
          isScrolled || mobileMenuOpen
            ? "border-b border-hairline/40 bg-background/90 backdrop-blur-md py-4 shadow-sm"
            : "border-b border-transparent bg-transparent py-5 md:py-6"
        }`}
      >
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

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <a
            href="#contact"
            className="label-mono border-b border-foreground pb-1 text-xs sm:text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Talk to Us
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-foreground md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between bg-background px-6 pt-28 pb-12 md:hidden animate-in fade-in duration-300">
          <nav className="flex flex-col space-y-6">
            {NAV.map((i) => (
              <a
                key={i.label}
                href={i.href}
                onClick={() => setMobileMenuOpen(false)}
                className="display-tight text-3xl font-medium text-foreground transition-colors hover:text-accent"
              >
                {i.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-between border-t border-hairline pt-6">
            <p className="label-mono text-xs text-muted-foreground">© 2026 Summit Studio</p>
            <ThemeToggle />
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-between">
        <img
          src={heroImg}
          alt="Blurred crimson city lights at night"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
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

      {/* STUDIO */}
      <section id="studio">
        <SectionHead n="01" label="About Company" />
        <div className="px-6 py-20 md:px-16">
          <div className="mb-12">
            <h2 className="display-tight max-w-3xl text-3xl font-normal leading-snug tracking-tight text-foreground md:text-5xl">
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
                  48+
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
                  12+
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
                  150+
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
                  14+
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
                    <div
                      onClick={() => setOpenService(isOpen ? null : s.n)}
                      className="flex cursor-pointer items-start justify-between gap-6"
                    >
                      <div className="flex items-baseline gap-6 md:gap-12">
                        <span className="label-mono text-xs text-muted-foreground">[{s.n}]</span>
                        <h4 className="display-tight text-2xl font-medium text-foreground transition-colors hover:text-accent md:text-3xl">
                          {s.title}
                        </h4>
                      </div>

                      <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-lg text-foreground transition-colors hover:border-accent hover:text-accent">
                        {isOpen ? "−" : "+"}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="mt-8 max-w-2xl space-y-6 md:pl-16">
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

      {/* WORK / CASE STUDIES (Matching Screenshot 3 Layout) */}
      <section id="work" className="border-t border-hairline">
        <SectionHead n="02" label="Selected Work" />

        <div className="px-6 py-20 md:px-16">
          <div className="grid gap-12 md:grid-cols-12 md:items-start">
            {/* Left Header Column */}
            <div className="flex flex-col justify-between space-y-10 md:col-span-4 md:sticky md:top-28">
              <div>
                <h2 className="display-tight text-4xl font-normal leading-[1.1] tracking-tight text-foreground md:text-5xl md:leading-[1.08]">
                  OUR WORK SPEAKS LOUDER THAN WORDS.
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
              className="flex gap-4 md:gap-8 overflow-x-auto pb-8 md:col-span-8 no-scrollbar mask-edge-fade"
            >
              {WORK.map((w) => (
                <Link
                  key={w.n}
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

      {/* PROCESS — Sticky Stacking Card Timeline */}
      <section id="process" className="border-t border-hairline">
        <SectionHead n="03" label="Our Process" />

        <div className="px-6 py-16 md:px-16 md:py-24">
          {/* Pin Window with height for scroll progress */}
          <div ref={processPinRef} className="relative min-h-[300vh]">
            <div className="sticky top-28 z-10 py-4">
              <div className="mb-12">
                <h2 className="display-tight max-w-2xl text-3xl font-normal leading-snug tracking-tight text-foreground md:text-5xl xl:max-w-none xl:whitespace-nowrap">
                  Our Process Moves Like Production.
                </h2>
              </div>

              <div className="flex min-h-[480px] items-center overflow-hidden rounded-2xl border border-hairline bg-card/95 p-8 shadow-2xl backdrop-blur-xl md:min-h-[560px] md:p-16">
                <div className="grid w-full gap-10 md:grid-cols-12 md:gap-16">
                  {/* Badge / Stage Indicator */}
                  <div className="space-y-6 md:col-span-4 md:space-y-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-secondary/60 px-4 py-1.5 backdrop-blur-md">
                      <span className="label-mono text-xs font-semibold text-accent">
                        STAGE 0{activeProcessStep + 1} OF 04
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    </div>
                    <h3 className="display-tight text-4xl font-medium tracking-tight text-foreground md:text-6xl transition-all duration-300">
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
                  <div className="space-y-8 border-t border-hairline/60 pt-8 md:col-span-8 md:space-y-8 md:border-l md:border-t-0 md:pl-14 md:pt-0">
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

      {/* FAQ */}
      <section id="faq" className="border-t border-hairline">
        <SectionHead n="04" label="Frequently Asked Questions" />
        <div className="px-6 py-20 md:px-16">
          <div className="mb-12">
            <h2 className="display-tight max-w-3xl text-3xl font-normal leading-snug tracking-tight text-foreground md:text-5xl">
              Answers to Common Questions.
            </h2>
          </div>
          <div className="w-full">
            <div className="w-full divide-y divide-hairline border-t border-b border-hairline">
              {FAQ_ITEMS.map((faq) => (
                <details
                  key={faq.q}
                  className="group py-6 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground transition-colors group-hover:text-accent">
                    <span className="display-tight text-base md:text-lg font-normal">{faq.q}</span>
                    <span className="label-mono ml-4 text-xs text-muted-foreground transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-4xl text-sm leading-relaxed text-foreground/75 md:text-base">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-hairline">
        <SectionHead n="05" label="Let's work together" />
        <div className="grid gap-16 px-6 py-20 md:grid-cols-2 md:px-16 md:py-40">
          <div>
            <h2 className="display-tight text-5xl sm:text-[9vw] md:text-[5vw]">Contact us.</h2>
            <p className="mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-foreground/70">
              Ready to build something bold? We partner with ambitious brands to create digital
              experiences that leave a mark. Tell us what you're working on.
            </p>
            <a
              href="mailto:hello@summitstudio.co"
              className="label-mono mt-10 flex w-full max-w-sm items-center justify-between border-b border-foreground pb-3 text-xs sm:text-sm transition-colors hover:border-accent hover:text-accent"
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
                className="label-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline py-5 text-xs sm:text-sm"
              >
                <span className="text-muted-foreground">{k}</span>
                <span className="text-foreground">{v}</span>
              </div>
            ))}
          </div>
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
                  <a href="#work" className="transition-colors hover:text-accent">
                    Work
                  </a>
                </li>
                <li>
                  <a href="#process" className="transition-colors hover:text-accent">
                    Process
                  </a>
                </li>
                <li>
                  <a href="#studio" className="transition-colors hover:text-accent">
                    About
                  </a>
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

        {/* Bottom Sub-bar without inner border line */}
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
