import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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
    offset: "0px",
  },
  {
    n: "02",
    title: "Construct",
    sub: "Narratives, systems, motion principles, and visual tension begin to take shape.",
    offset: "36px",
  },
  {
    n: "03",
    title: "Direct",
    sub: "Every interaction is refined frame-by-frame like a digital film sequence.",
    offset: "72px",
  },
  {
    n: "04",
    title: "Release",
    sub: "A polished experience engineered to feel timeless on launch day.",
    offset: "108px",
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [openService, setOpenService] = useState<string | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const processEl = document.getElementById("process");
      if (processEl) {
        const rect = processEl.getBoundingClientRect();
        const stickyHeaderHeight = 64;
        const totalScrollableDistance = rect.height - window.innerHeight;
        
        if (totalScrollableDistance > 0) {
          // Progress is 0 when processEl top hits sticky header, and 1 when bottom reaches viewport end
          const scrolledAmount = stickyHeaderHeight - rect.top;
          const progress = Math.min(Math.max(scrolledAmount / totalScrollableDistance, 0), 0.99);
          const step = Math.floor(progress * 4);
          setActiveProcessStep(step);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* IFRAME / CASE STUDY MODAL */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md md:p-8"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-hairline bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
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

            {/* Modal Body / Case Story & Live Preview */}
            <div className="grid flex-1 overflow-hidden md:grid-cols-12 min-h-0">
              {/* Left Column: Simple & Neat Case Story */}
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
                  {activeProject.problemsSolved && activeProject.problemsSolved.length > 0 && (
                    <div>
                      <h4 className="label-mono text-xs text-accent">Key Highlights</h4>
                      <ul className="mt-2 space-y-2 text-xs text-foreground/80">
                        {activeProject.problemsSolved.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-accent">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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

              {/* Right Column: Independently Scrollable Live Web Preview / Image */}
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
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-all duration-500 md:px-8 ${
          isScrolled
            ? "border-b border-hairline/40 bg-background/80 backdrop-blur-md py-4 shadow-sm"
            : "border-b border-transparent bg-transparent py-6"
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
            </a>          </div>

          <div>
            <p className="display-tight w-full text-[10.4vw] leading-[0.8] whitespace-nowrap">
              Summit Studio<span className="text-accent">.</span>
            </p>
          </div>
        </div>
      </section>

      {/* STUDIO */}
      <section id="studio">
        <SectionHead n="01" label="About Company" />
        <div className="px-6 py-20 md:px-16">

          {/* 4-Card Bento Row (Matching Screenshot Structure) */}
          <div className="grid gap-px bg-hairline md:grid-cols-4">
            {/* Card 1: Global Collaborations */}
            <div className="group flex flex-col justify-between bg-background p-8 transition-colors duration-300 hover:bg-secondary">
              <div>
                <span className="label-mono text-xs text-accent">[ Global Network ]</span>
                <p className="mt-4 text-xs leading-relaxed text-foreground/75">
                  Partnering remotely with ambitious teams across major tech hubs.
                </p>
              </div>
              <div className="mt-12">
                <p className="display-tight text-4xl font-medium text-foreground md:text-5xl">48+</p>
                <p className="label-mono mt-2 text-xs text-muted-foreground">Global Collaborations</p>
              </div>
            </div>

            {/* Card 2: Industry Authority */}
            <div className="group flex flex-col justify-between bg-background p-8 transition-colors duration-300 hover:bg-secondary">
              <div>
                <span className="label-mono text-xs text-accent">[ Authority & Awards ]</span>
                <p className="mt-4 text-xs leading-relaxed text-foreground/75">
                  Featured and celebrated for high-octane engineering & positioning.
                </p>
              </div>
              <div className="mt-12">
                <p className="display-tight text-4xl font-medium text-foreground md:text-5xl">12+</p>
                <p className="label-mono mt-2 text-xs text-muted-foreground">Industry Recognitions</p>
              </div>
            </div>

            {/* Card 3: Projects Delivered */}
            <div className="group flex flex-col justify-between bg-background p-8 transition-colors duration-300 hover:bg-secondary">
              <div>
                <span className="label-mono text-xs text-accent">[ Execution ]</span>
                <p className="mt-4 text-xs leading-relaxed text-foreground/75">
                  From emerging startups to market leaders, crafted as unique digital worlds.
                </p>
              </div>
              <div className="mt-12">
                <p className="display-tight text-4xl font-medium text-foreground md:text-5xl">150+</p>
                <p className="label-mono mt-2 text-xs text-muted-foreground">Projects Delivered</p>
              </div>
            </div>

            {/* Card 4: Countries Reached */}
            <div className="group flex flex-col justify-between bg-background p-8 transition-colors duration-300 hover:bg-secondary">
              <div>
                <span className="label-mono text-xs text-accent">[ Reach ]</span>
                <p className="mt-4 text-xs leading-relaxed text-foreground/75">
                  Collaborating with visionary brands driving global impact.
                </p>
              </div>
              <div className="mt-12">
                <p className="display-tight text-4xl font-medium text-foreground md:text-5xl">14+</p>
                <p className="label-mono mt-2 text-xs text-muted-foreground">Countries Reached</p>
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
                      <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-center">
                        <div className="md:col-span-6 md:pl-16 space-y-6">
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

                        <div className="flex gap-4 md:col-span-6 md:justify-end">
                          {s.images.map((imgSrc, idx) => (
                            <div
                              key={idx}
                              className={`relative overflow-hidden border border-hairline shadow-lg ${
                                idx === 0 ? "h-36 w-36 rounded-full" : "h-36 w-36 rounded-2xl"
                              }`}
                            >
                              <img
                                src={imgSrc}
                                alt={`${s.title} preview ${idx}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
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
            <div className="flex flex-col justify-between space-y-12 md:col-span-4 md:sticky md:top-28">
              <div>
                <h2 className="display-tight text-4xl font-normal leading-tight tracking-tight text-foreground md:text-5xl">
                  OUR WORK SPEAKS THAN WORDS
                </h2>
              </div>

              <div>
                <Link
                  to="/work"
                  className="label-mono inline-flex items-center gap-2.5 rounded-full border border-hairline bg-secondary/50 px-6 py-3 text-xs font-medium backdrop-blur-md transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <span>→</span> View All
                </Link>
              </div>
            </div>

            {/* Full-Width Laptop Screen Widescreen Cards Carousel */}
            <div className="flex gap-8 overflow-x-auto pb-8 md:col-span-8 no-scrollbar scroll-smooth">
              {WORK.map((w) => (
                <article
                  key={w.n}
                  onClick={() => setActiveProject(w)}
                  className="group relative flex aspect-[16/9.5] w-[90vw] max-w-[780px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-card p-6 shadow-2xl transition-all duration-500 hover:border-accent/50 md:p-10"
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
                    <h3 className="display-tight text-3xl font-medium text-white transition-colors group-hover:text-accent md:text-5xl">
                      {w.name} — {w.year}
                    </h3>
                    <p className="label-mono text-xs text-accent/90">{w.kind}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS — Pin-Based Scroll-Driven Production Timeline */}
      <section id="process" className="relative min-h-[450vh] border-t border-hairline">
        <div className="sticky top-16 z-10 bg-background/95 pb-12 backdrop-blur-md">
          <SectionHead n="03" label="Our Process" />
          <div className="px-6 py-12 md:px-16">
            {/* Header */}
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <h2 className="display-tight max-w-2xl text-3xl font-normal leading-snug tracking-tight text-foreground md:text-5xl">
                Our Process Moves Like Production.
              </h2>
              <div className="flex items-center gap-4">
                <span className="label-mono text-xs text-accent font-semibold">
                  STAGE 0{activeProcessStep + 1} OF 04
                </span>
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-6 rounded-full transition-colors duration-500 ${
                        i <= activeProcessStep ? "bg-accent" : "bg-hairline"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Stepped Timeline Production Grid */}
            <div className="mt-12 space-y-4">
              {/* Top Stepped Ribbon Columns */}
              <div className="grid gap-px bg-hairline md:grid-cols-4">
                {PROCESS.map((p, idx) => {
                  const isActive = idx <= activeProcessStep;
                  const isCurrent = idx === activeProcessStep;
                  return (
                    <div
                      key={p.n}
                      onClick={() => setActiveProcessStep(idx)}
                      className={`group flex h-64 cursor-pointer flex-col justify-between p-6 transition-all duration-500 md:p-8 ${
                        isCurrent
                          ? "bg-secondary/90 ring-1 ring-accent"
                          : isActive
                          ? "bg-background/90"
                          : "bg-background/40 opacity-30 hover:opacity-70"
                      }`}
                    >
                      {/* Floating Black/White Indicator Ribbon */}
                      <div
                        className={`w-full rounded px-4 py-3 text-xs font-medium tracking-wider transition-all duration-500 ${
                          isCurrent
                            ? "bg-accent text-accent-foreground shadow-xl scale-[1.02]"
                            : isActive
                            ? "bg-foreground text-background"
                            : "bg-muted/80 text-muted-foreground"
                        }`}
                        style={{ marginTop: p.offset }}
                      >
                        {p.title}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`label-mono text-xs ${isCurrent ? "text-accent font-bold" : "text-muted-foreground"}`}>
                          {p.n}
                        </span>
                        {isCurrent && (
                          <span className="label-mono text-[0.65rem] text-accent animate-pulse">
                            ● ACTIVE
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Step Content Description Cards */}
              <div className="grid gap-px bg-hairline md:grid-cols-4">
                {PROCESS.map((p, idx) => {
                  const isActive = idx <= activeProcessStep;
                  const isCurrent = idx === activeProcessStep;
                  return (
                    <div
                      key={p.n}
                      onClick={() => setActiveProcessStep(idx)}
                      className={`group cursor-pointer p-6 space-y-3 transition-all duration-500 md:p-8 ${
                        isCurrent
                          ? "bg-secondary/90 border-t-2 border-accent"
                          : isActive
                          ? "bg-background"
                          : "bg-background/30 opacity-30 hover:opacity-70"
                      }`}
                    >
                      <h3 className={`display-tight text-xl font-medium transition-colors ${isCurrent ? "text-accent" : "text-foreground"}`}>
                        {p.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-foreground/80">
                        {p.sub}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-hairline">
        <SectionHead n="04" label="Frequently Asked Questions" />
        <div className="px-6 py-20 md:px-16">
          <div className="w-full">
            <h2 className="display-tight w-full max-w-none text-3xl font-normal leading-snug tracking-tight text-foreground md:text-5xl">
              Everything you need to know.
            </h2>
            <div className="mt-16 w-full divide-y divide-hairline border-t border-b border-hairline">
              {FAQ_ITEMS.map((faq) => (
                <details
                  key={faq.q}
                  className="group py-6 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground transition-colors group-hover:text-accent">
                    <span className="display-tight text-lg md:text-2xl">{faq.q}</span>
                    <span className="label-mono ml-4 text-sm text-muted-foreground transition-transform duration-300 group-open:rotate-45">
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
        <div className="grid gap-20 px-6 py-32 md:grid-cols-2 md:px-16 md:py-40">
          <div>
            <h2 className="display-tight text-[9vw] md:text-[5vw]">Contact us.</h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-foreground/70">
              Ready to build something bold? We partner with ambitious brands to create digital
              experiences that leave a mark. Tell us what you're working on.
            </p>
            <a
              href="mailto:hello@summitstudio.co"
              className="label-mono mt-14 flex w-full max-w-sm items-center justify-between border-b border-foreground pb-3 text-sm transition-colors hover:border-accent hover:text-accent"
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
                className="label-mono flex items-center justify-between border-b border-hairline py-6 text-sm"
              >
                <span className="text-muted-foreground">{k}</span>
                <span>{v}</span>
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
