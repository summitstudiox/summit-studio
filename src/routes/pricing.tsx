import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, type NavItem } from "@/components/site-header";
import { SectionHead } from "@/components/section-head";
import { SiteFooter } from "@/components/home/site-footer";
import { Check } from "lucide-react";
import { track } from "@vercel/analytics";

type PricingSearch = {
  currency?: "usd" | "inr";
};

export const Route = createFileRoute("/pricing")({
  validateSearch: (search: Record<string, unknown>): PricingSearch => {
    const currency =
      typeof search.currency === "string" ? search.currency.toLowerCase() : undefined;
    if (currency === "usd" || currency === "inr") {
      return { currency };
    }
    return {};
  },
  head: () => ({
    meta: [
      { title: "Pricing & Investment Packages - Summit Studio" },
      {
        name: "description",
        content:
          "Transparent website design and development pricing packages from Summit Studio: Starter, Business, Signature, and bespoke web platforms engineered for ambitious brands.",
      },
      { property: "og:title", content: "Pricing & Investment Packages - Summit Studio" },
      {
        property: "og:description",
        content:
          "Transparent website design and development pricing packages from Summit Studio: Starter, Business, Signature, and bespoke web platforms engineered for ambitious brands.",
      },
      { property: "og:url", content: "https://summitstudio.in/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://summitstudio.in/pricing" }],
  }),
  component: PricingPage,
});

const NAV: NavItem[] = [
  { label: "Home", hash: "top" },
  { label: "Studio", hash: "studio" },
  { label: "Work", to: "/work" },
  { label: "Pricing", to: "/pricing" },
  { label: "Process", hash: "process" },
  { label: "FAQ", hash: "faq" },
  { label: "Contact", hash: "contact" },
];

type PackageTier = {
  n: string;
  name: string;
  priceInr: string;
  priceUsd: string;
  tagline: string;
  description: string;
  deliverables: string[];
  recommended?: boolean;
  tierParam: string;
};

const PACKAGES: PackageTier[] = [
  {
    n: "01",
    name: "STARTER",
    priceInr: "From ₹30,000",
    priceUsd: "From $599",
    tagline: "Start with a strong foundation.",
    description:
      "A thoughtfully designed website for businesses that are ready to establish their presence online — without overcomplicating it.",
    deliverables: [
      "Up to 5 pages",
      "Custom design",
      "Responsive development",
      "Google Maps & social links",
      "Basic SEO",
    ],
    recommended: false,
    tierParam: "starter",
  },
  {
    n: "02",
    name: "BUSINESS",
    priceInr: "From ₹60,000",
    priceUsd: "From $1,199",
    tagline: "Turn your website into a brand experience.",
    description:
      "For growing businesses that need their website to do more than provide information. A more considered digital presence, shaped around your brand, audience, and goals.",
    deliverables: [
      "Up to 10 pages",
      "Custom UI/UX",
      "Animations & interactions",
      "Responsive development",
      "Advanced SEO",
      "Analytics integration",
    ],
    recommended: true,
    tierParam: "business",
  },
  {
    n: "03",
    name: "SIGNATURE",
    priceInr: "From ₹1,00,000",
    priceUsd: "From $2,499",
    tagline: "Make your digital presence unforgettable.",
    description:
      "For brands that want something truly their own. Every element is crafted around the identity, story, and experience you want to create.",
    deliverables: [
      "Bespoke UI/UX",
      "Distinctive visual direction",
      "Advanced animations & interactions",
      "Custom components",
      "CMS & third-party integrations",
      "Performance optimization",
      "Advanced SEO",
      "Analytics & tracking",
      "Post-launch support",
    ],
    recommended: false,
    tierParam: "signature",
  },
];

const PRICING_FAQS = [
  {
    q: "How does project billing and payment work?",
    a: "We structure project fees around transparent milestones: a 50% deposit upon kickoff to reserve calendar capacity, and 50% upon final sign-off and production deployment. No surprise hourly charges.",
  },
  {
    q: "What if my website requires more pages or specialized integrations?",
    a: "Our packages provide starting baseline pricing. During our discovery consultation, we scope your exact architecture, page count, and API integrations to provide a fixed-fee quote before any contract is signed.",
  },
  {
    q: "How long does it take from kickoff to launch day?",
    a: "Starter packages typically launch in 1 to 2 weeks. Business packages average 2 to 3 weeks, and bespoke Signature builds take 3 to 5 weeks depending on custom motion, third-party APIs, and asset readiness.",
  },
  {
    q: "Are domain, hosting, and deployment costs included?",
    a: "Domain names, web hosting infrastructure, and third-party SaaS subscriptions (such as CMS or email services) are separate and handled directly by the client. We guide and execute the full technical setup, DNS configuration, and edge deployment on your behalf.",
  },
];

function PricingPage() {
  const search = Route.useSearch();

  const [isIndia, setIsIndia] = useState<boolean>(() => {
    if (search.currency === "usd") return false;
    if (search.currency === "inr") return true;
    return true;
  });

  useEffect(() => {
    if (search.currency === "usd") {
      setIsIndia(false);
      return;
    }
    if (search.currency === "inr") {
      setIsIndia(true);
      return;
    }

    try {
      const params = new URLSearchParams(window.location.search);
      const paramCurrency = params.get("currency")?.toLowerCase();
      if (paramCurrency === "usd") {
        setIsIndia(false);
        return;
      }
      if (paramCurrency === "inr") {
        setIsIndia(true);
        return;
      }

      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const isIndianTz = tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("India");
      const lang = navigator.language || "";
      const isIndianLang = lang.endsWith("-IN") || lang.startsWith("hi");
      setIsIndia(isIndianTz || isIndianLang);
    } catch {
      setIsIndia(true);
    }
  }, [search.currency]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader navItems={NAV} variant="page" activeLabel="Pricing" />

      {/* Hero Intro Header */}
      <section className="border-b border-hairline px-6 py-20 md:px-16 md:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="label-mono text-xs text-accent">[ Scope &amp; Investment ]</span>
            <h1 className="display-tight mt-3 text-4xl font-normal tracking-tight text-foreground md:text-7xl">
              Built for where your brand is going<span className="text-accent">.</span>
            </h1>
          </div>
          <div className="max-w-md space-y-4">
            <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
              Not every business needs the same website. Some need a strong place to start. Some are
              ready to grow. And some are ready to build something people remember.
            </p>
            <p className="label-mono text-xs text-foreground/80">
              Choose the starting point that fits your ambition.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Core Packages Grid */}
      <section className="px-6 py-16 md:px-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.n}
              className={`relative flex flex-col justify-between rounded-2xl border p-8 md:p-10 transition-all duration-500 ${
                pkg.recommended
                  ? "border-accent/40 bg-card shadow-2xl ring-1 ring-accent/20"
                  : "border-hairline bg-card hover:border-foreground/30"
              }`}
            >
              {/* Optional Recommended Badge */}
              {pkg.recommended && (
                <div className="absolute -top-3.5 right-6 rounded-full bg-accent px-3.5 py-1">
                  <span className="label-mono text-[0.62rem] font-semibold text-accent-foreground tracking-widest">
                    Recommended
                  </span>
                </div>
              )}

              <div>
                {/* Header Block */}
                <div className="border-b border-hairline pb-6">
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-xs text-muted-foreground">[{pkg.n}]</span>
                    <span className="label-mono text-[0.65rem] text-muted-foreground uppercase tracking-widest">
                      Package
                    </span>
                  </div>

                  <h2 className="display-tight mt-4 text-2xl font-normal tracking-tight text-foreground md:text-3xl">
                    {pkg.name}
                  </h2>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="display-tight text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                      {isIndia ? pkg.priceInr : pkg.priceUsd}
                    </span>
                  </div>
                </div>

                {/* Narrative & Tagline */}
                <div className="py-6 space-y-2">
                  <p className="text-sm font-medium text-foreground">{pkg.tagline}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{pkg.description}</p>
                </div>

                {/* Deliverables */}
                <div className="border-t border-hairline pt-6">
                  <p className="label-mono mb-4 text-[0.68rem] text-muted-foreground uppercase tracking-widest">
                    Included Scope
                  </p>
                  <ul className="space-y-3">
                    {pkg.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-xs md:text-sm text-foreground/90"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 border-t border-hairline pt-6">
                <Link
                  to="/"
                  hash="contact"
                  onClick={() => track("Pricing Tier Selected", { tier: pkg.name })}
                  className={`label-mono flex w-full items-center justify-between rounded-lg border px-5 py-3 text-xs transition-all ${
                    pkg.recommended
                      ? "border-accent bg-accent text-accent-foreground hover:bg-accent/90"
                      : "border-hairline bg-secondary/30 text-foreground hover:border-foreground/40 hover:text-accent"
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CUSTOM Banner (Full Width) */}
        <div className="mt-12 rounded-2xl border border-hairline bg-card p-8 md:p-12 transition-all hover:border-foreground/30">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="space-y-4 lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="label-mono text-xs text-accent">[ Custom Engineering ]</span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="label-mono text-xs text-muted-foreground">
                  Custom scope &amp; pricing
                </span>
              </div>

              <h2 className="display-tight text-2xl font-normal tracking-tight text-foreground md:text-4xl">
                Your idea. Built without a template<span className="text-accent">.</span>
              </h2>

              <p className="text-sm font-medium text-foreground">
                Some projects don’t belong in a package.
              </p>

              <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                Whether you’re imagining an e-commerce experience, booking platform, dashboard, web
                application, or something entirely new, we’ll work with you to shape the idea and
                build what it needs.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-hairline lg:pl-10">
              <div>
                <p className="label-mono mb-3 text-[0.68rem] text-muted-foreground uppercase tracking-widest">
                  Specialized Capabilities
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "E-Commerce Experiences",
                    "Booking Platforms",
                    "SaaS & Dashboards",
                    "Web Applications",
                    "Custom APIs & DB",
                    "Bespoke Architecture",
                  ].map((cap) => (
                    <span
                      key={cap}
                      className="label-mono rounded-md border border-hairline bg-secondary/40 px-3 py-1.5 text-[0.65rem] text-foreground/80"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to="/"
                hash="contact"
                onClick={() => track("Custom Project Inquired", { location: "pricing-banner" })}
                className="label-mono flex w-full items-center justify-between rounded-lg border border-hairline bg-secondary/40 px-5 py-3 text-xs text-foreground transition-all hover:border-accent hover:text-accent"
              >
                <span>Discuss Custom Scope</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Separate Costs Notice */}
        <div className="mt-8 rounded-xl border border-hairline bg-secondary/15 px-6 py-4 text-xs text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Note:</span> Domain, hosting, and
            deployment costs are separate and handled by the client.
          </p>
        </div>
      </section>

      {/* Pricing FAQ Section */}
      <section className="border-t border-hairline">
        <SectionHead n="05" label="Frequently Asked Questions" />
        <div className="px-6 py-20 md:px-16">
          <div className="mb-12">
            <h2 className="display-tight max-w-3xl text-3xl font-normal leading-snug tracking-tight text-foreground md:text-5xl">
              Common Questions on Scope &amp; Pricing<span className="text-accent">.</span>
            </h2>
          </div>

          <div className="w-full divide-y divide-hairline border-t border-b border-hairline">
            {PRICING_FAQS.map((faq) => (
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
      </section>

      {/* Direct Contact CTA Strip */}
      <section className="border-t border-hairline px-6 py-20 md:px-16 md:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="label-mono text-xs text-accent">[ Get in Touch ]</span>
            <h2 className="display-tight mt-3 text-3xl font-normal tracking-tight text-foreground md:text-5xl">
              Ready to build something unforgettable<span className="text-accent">?</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              hash="contact"
              className="label-mono inline-flex items-center justify-center rounded-lg border border-accent bg-accent px-6 py-3 text-xs font-semibold text-accent-foreground transition-all hover:bg-accent/90"
            >
              Start a Conversation ↗
            </Link>
            <a
              href="mailto:summitstudiox@gmail.com"
              className="label-mono inline-flex items-center justify-center rounded-lg border border-hairline bg-secondary/30 px-6 py-3 text-xs text-foreground transition-all hover:border-foreground/40 hover:text-accent"
            >
              summitstudiox@gmail.com
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
