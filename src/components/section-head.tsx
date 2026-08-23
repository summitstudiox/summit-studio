export function SectionHead({ n, label }: { n: string; label: string }) {
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
