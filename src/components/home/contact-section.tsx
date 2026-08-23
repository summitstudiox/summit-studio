import { track } from "@vercel/analytics";
import { SectionHead } from "@/components/section-head";

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-hairline">
      <SectionHead n="05" label="Let's work together" />
      <div className="grid gap-16 px-6 py-20 md:grid-cols-2 md:px-16 md:py-40">
        <div>
          <h2 className="display-tight text-3xl font-normal leading-snug tracking-tight text-foreground md:text-5xl">
            Contact us.
          </h2>
          <p className="mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-foreground/70">
            Ready to build something bold? We partner with ambitious brands to create digital
            experiences that leave a mark. Tell us what you're working on.
          </p>
          <a
            href="mailto:summitstudiox@gmail.com"
            onClick={() => track("Send a Message Clicked", { location: "contact-section" })}
            className="label-mono mt-10 flex w-full max-w-sm items-center justify-between border-b border-foreground pb-3 text-xs sm:text-sm transition-colors hover:border-accent hover:text-accent"
          >
            Send a message
            <span>↗</span>
          </a>
        </div>
        <div className="md:pt-4">
          {[
            ["Email", "summitstudiox@gmail.com"],
            ["Instagram", "@summitstudiox"],
            ["Twitter / X", "@summitstudiox"],
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
  );
}
