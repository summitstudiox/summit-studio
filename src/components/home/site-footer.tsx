import logoImg from "@/assets/logo.png";

export function SiteFooter() {
  return (
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
      <div className="pt-24 pb-10 flex items-center gap-6">
        {/* Logo mark beside the wordmark */}
        <img
          src={logoImg}
          alt="Summit Studio logo mark"
          className="h-[7.5vw] w-[7.5vw] shrink-0 mix-blend-multiply dark:mix-blend-normal dark:invert"
        />
        <p className="display-tight text-[8vw] leading-[0.85] tracking-tight whitespace-nowrap">
          Summit Studio<span className="text-accent">.</span>
        </p>
      </div>

      {/* Bottom Sub-bar without inner border line */}
      <div className="label-mono flex flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>
          © 2026 Summit Studio.<span className="hidden sm:inline"> All rights reserved.</span>
        </span>
        <a href="#top" className="shrink-0 transition-colors hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
