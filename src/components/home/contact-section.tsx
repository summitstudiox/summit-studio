import { useForm, ValidationError } from "@formspree/react";
import { SectionHead } from "@/components/section-head";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function ContactSection() {
  const [state, handleSubmit] = useForm("moeazkvv");

  return (
    <section id="contact" className="border-t border-hairline">
      <SectionHead n="05" label="Let's work together" />

      {/* Success pop-up */}
      <Dialog open={state.succeeded}>
        <DialogContent className="border border-hairline bg-background p-10 max-w-lg shadow-2xl [&>button]:hidden">
          <DialogTitle className="display-tight text-3xl font-normal leading-snug tracking-tight text-foreground md:text-4xl">
            We'll be in touch<span className="text-accent">.</span>
          </DialogTitle>
          <div className="mt-6 border-l-2 border-accent pl-4">
            <p className="text-xs text-muted-foreground">
              Thanks for reaching out — we usually respond within 24 hours.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid gap-16 px-6 py-20 md:grid-cols-2 md:px-16 md:py-40">
        {/* Left — Form */}
        <div>
          <h2 className="display-tight text-3xl font-normal leading-snug tracking-tight text-foreground md:text-5xl">
            Contact us.
          </h2>
          <p className="mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-foreground/70">
            Ready to build something bold? We partner with ambitious brands to create digital
            experiences that leave a mark. Tell us what you're working on.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="label-mono block text-xs text-muted-foreground">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full border-b border-foreground/30 bg-transparent pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-accent"
              />
              <ValidationError
                field="name"
                prefix="Name"
                errors={state.errors}
                className="text-xs text-red-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="label-mono block text-xs text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full border-b border-foreground/30 bg-transparent pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-accent"
              />
              <ValidationError
                field="email"
                prefix="Email"
                errors={state.errors}
                className="text-xs text-red-500"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="label-mono block text-xs text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full resize-none border-b border-foreground/30 bg-transparent pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-accent"
              />
              <ValidationError
                field="message"
                prefix="Message"
                errors={state.errors}
                className="text-xs text-red-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={state.submitting}
              className="label-mono flex w-full max-w-sm items-center justify-between border-b border-foreground pb-3 text-xs sm:text-sm transition-colors hover:border-accent hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Sending..." : "Send a message"}
              <span>↗</span>
            </button>
          </form>
        </div>

        {/* Right — Social links */}
        <div className="md:self-center">
          {[
            ["Email", "summitstudiox@gmail.com"],
            ["Instagram", "@summitstudiox"],
            ["Twitter / X", "@summitstudiox"],
            ["LinkedIn", "Summit Studio"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline py-5 text-xs sm:text-sm"
            >
              <span className="label-mono text-muted-foreground">{k}</span>
              <span className="text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
