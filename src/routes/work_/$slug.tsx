import { createFileRoute, Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import clubExotismImg from "@/assets/clubexotism.png";

export const Route = createFileRoute("/work_/$slug")({
  head: ({ params }) => {
    const project = PROJECTS_DATA[params.slug] || PROJECTS_DATA["club-exotism"];
    return {
      meta: [
        { title: `${project.name} - Case Study - Summit Studio` },
        { name: "description", content: project.challenge },
      ],
    };
  },
  component: CaseStudyDetail,
});

const PROJECTS_DATA: Record<
  string,
  {
    n: string;
    slug: string;
    name: string;
    client: string;
    kind: string;
    year: string;
    img: string;
    url?: string;
    stack?: string;
    challenge: string;
    solution: string;
    problemsSolved?: string[];
    stats: { k: string; v: string }[];
  }
> = {
  "club-exotism": {
    n: "01",
    slug: "club-exotism",
    name: "Club Exotism",
    client: "Club Exotism - Flagship Gaming Sanctuary & Esports Arena",
    kind: "Full Platform · Real-Time Engine · High-Octane Admin Suite",
    year: "2026",
    img: clubExotismImg,
    url: "https://clubexotism.com",
    stack: "React (TanStack Start) · Edge-State PostgreSQL · Vercel Global Edge",
    challenge:
      "Club Exotism needed a beast of a booking platform capable of managing complex physical hardware inventory (PS5 consoles, VR rigs, Sim Racing cockpits) with real-time multi-player capacity logic, instant 1-tap WhatsApp checkout, and dominant #1 Google search ranking from day zero.",
    solution:
      "Architected an ultra-slick, dark-mode digital weapon featuring real-time bin-packing inventory calculations, instant pre-filled WhatsApp VIP booking checkout, an intuitive daily visual control panel for staff, and aggressive LocalBusiness schema SEO integration.",
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
  "vanta-digital": {
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
  "campus-connect": {
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
  ascend: {
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
};

function CaseStudyDetail() {
  const { slug } = Route.useParams();
  const project = PROJECTS_DATA[slug] || PROJECTS_DATA["club-exotism"];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-hairline/60 bg-background/90 px-6 py-4 backdrop-blur-md md:px-16">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
            Summit Studio<span className="text-accent">.</span>
          </Link>
          <span className="hidden h-4 w-px bg-hairline sm:block" />
          <Link
            to="/work"
            className="label-mono text-xs text-muted-foreground transition-colors hover:text-accent"
          >
            ← Back to All Cases
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono hidden rounded-full border border-hairline bg-secondary/60 px-4 py-1.5 text-xs text-accent transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground sm:inline-flex"
            >
              Open Site ↗
            </a>
          )}
        </div>
      </header>

      {/* Case Header Banner */}
      <section className="border-b border-hairline px-6 py-5 md:px-16 md:py-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="label-mono text-[0.68rem] text-accent font-semibold">
                CASE STUDY [{project.n}] · {project.year}
              </span>
              <span className="text-muted-foreground text-xs">•</span>
              <span className="label-mono text-[0.68rem] text-muted-foreground">
                {project.kind}
              </span>
            </div>
            <h1 className="display-tight mt-1 text-2xl font-medium tracking-tight text-foreground md:text-4xl">
              {project.name}
            </h1>
          </div>

          <div className="flex items-center gap-6 border-t border-hairline/60 pt-3 md:border-t-0 md:pt-0">
            {project.stats.map((s) => (
              <div key={s.k}>
                <p className="display-tight text-lg font-medium text-accent md:text-2xl">{s.v}</p>
                <p className="label-mono mt-0.5 text-[0.6rem] text-muted-foreground">{s.k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Preview & Narrative Layout */}
      <section className="grid min-h-[calc(100vh-220px)] md:grid-cols-12">
        {/* Left Narrative Panel */}
        <div className="flex flex-col justify-between border-b border-hairline p-6 md:col-span-4 md:border-r md:border-b-0 md:p-12 space-y-8">
          <div className="space-y-8">
            <div>
              <h3 className="label-mono text-xs text-accent">[ Challenge & Scope ]</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90 md:text-base">
                {project.challenge}
              </p>
            </div>

            <div>
              <h3 className="label-mono text-xs text-accent">[ Strategic Execution ]</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80 md:text-base">
                {project.solution}
              </p>
            </div>

            {project.problemsSolved && (
              <div>
                <h3 className="label-mono text-xs text-accent">
                  [ Key Engineering Breakthroughs ]
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {project.problemsSolved.map((item, idx) => (
                    <li key={idx} className="text-xs leading-relaxed text-foreground/75 md:text-sm">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {project.stack && (
            <div className="border-t border-hairline pt-6">
              <h4 className="label-mono text-xs text-muted-foreground">[ Tech Stack ]</h4>
              <p className="label-mono mt-2 text-xs text-foreground/80">{project.stack}</p>
            </div>
          )}
        </div>

        {/* Right Full-Height Live Interactive Preview */}
        <div className="relative min-h-[600px] bg-black md:col-span-8">
          {project.url ? (
            <iframe
              src={project.url}
              title={`${project.name} live preview`}
              className="h-full w-full min-h-[650px] border-0"
            />
          ) : (
            <div className="h-full w-full overflow-y-auto p-6 flex items-center justify-center">
              <img
                src={project.img}
                alt={`${project.name} preview`}
                className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
