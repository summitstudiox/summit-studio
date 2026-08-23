import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";
import { track } from "@vercel/analytics";

export type NavItem = { label: string; hash?: string; to?: "/" | "/work" };

export function SiteHeader({
  navItems,
  variant,
  activeLabel,
}: {
  navItems: NavItem[];
  /** "home": fixed + transparent-until-scrolled (overlays a full-bleed hero). "page": sticky + always solid. */
  variant: "home" | "page";
  activeLabel?: string;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (variant !== "home") return;
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const solid = variant === "page" || isScrolled || mobileMenuOpen;

  return (
    <>
      <header
        className={`${variant === "home" ? "fixed" : "sticky"} inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-all duration-500 md:px-8 ${
          solid
            ? "border-b border-hairline/40 bg-background/90 backdrop-blur-md py-4 shadow-sm"
            : "border-b border-transparent bg-transparent py-5 md:py-6"
        }`}
      >
        <Link to="/" hash="top" className="text-lg font-semibold tracking-tight text-foreground">
          Summit Studio<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navItems.map((i) => (
            <Link
              key={i.label}
              to={i.to ?? "/"}
              {...(i.hash ? { hash: i.hash } : {})}
              className={`label-mono text-xs transition-colors hover:text-accent ${
                i.label === activeLabel ? "text-accent font-semibold" : "text-foreground/80"
              }`}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle className="hidden lg:flex" />

          <Link
            to="/"
            hash="contact"
            onClick={() => track("Talk to Us Clicked", { location: "nav" })}
            className="label-mono border-b border-foreground pb-1 text-xs sm:text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Talk to Us
          </Link>

          {/* Mobile/Tablet Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-foreground lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile/Tablet Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between bg-background px-6 pt-28 pb-12 lg:hidden animate-in fade-in duration-300">
          <nav className="flex flex-col space-y-6">
            {navItems.map((i) => (
              <Link
                key={i.label}
                to={i.to ?? "/"}
                {...(i.hash ? { hash: i.hash } : {})}
                onClick={() => setMobileMenuOpen(false)}
                className={`display-tight text-3xl font-medium transition-colors hover:text-accent ${
                  i.label === activeLabel ? "text-accent" : "text-foreground"
                }`}
              >
                {i.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-between border-t border-hairline pt-6">
            <p className="label-mono text-xs text-muted-foreground">© 2026 Summit Studio</p>
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
