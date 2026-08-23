import { SectionHead } from "@/components/section-head";

const FAQ_ITEMS = [
  {
    q: "What types of companies do you partner with?",
    a: "We work with ambitious founders, scaling startups, and established brands taking market share. Whether you need a full brand overhaul or a high-converting digital platform, we design for impact and commercial growth.",
  },
  {
    q: "How does your project pricing work?",
    a: "We operate on fixed-fee project scopes or flexible monthly retainers with no hidden hourly surprise bills. Complete brand identity & digital platform packages typically start at fixed milestones tailored to your deliverables and speed-to-market.",
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

export function FaqSection() {
  return (
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
  );
}
