import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, type NavItem } from "@/components/site-header";
import { HeroSection } from "@/components/home/hero-section";
import { StudioSection } from "@/components/home/studio-section";
import { WorkSection } from "@/components/home/work-section";
import { ProcessSection } from "@/components/home/process-section";
import { FaqSection } from "@/components/home/faq-section";
import { ContactSection } from "@/components/home/contact-section";
import { SiteFooter } from "@/components/home/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Summit Studio - Branding, Web Design & Development" },
      {
        name: "description",
        content:
          "Summit Studio builds branding, websites and development for ambitious businesses that refuse to blend in. Strategy, identity, design, delivery.",
      },
      { property: "og:title", content: "Summit Studio - Branding, Web Design & Development" },
      {
        property: "og:description",
        content:
          "Summit Studio builds branding, websites and development for ambitious businesses that refuse to blend in. Strategy, identity, design, delivery.",
      },
    ],
  }),
  component: Index,
});

const NAV: NavItem[] = [
  { label: "Home", hash: "top" },
  { label: "Studio", hash: "studio" },
  { label: "Work", hash: "work" },
  { label: "Process", hash: "process" },
  { label: "FAQ", hash: "faq" },
  { label: "Contact", hash: "contact" },
];

function Index() {
  return (
    <main id="top" className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader navItems={NAV} variant="home" />
      <HeroSection />
      <StudioSection />
      <WorkSection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
