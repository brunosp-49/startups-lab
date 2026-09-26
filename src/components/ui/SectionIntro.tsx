type Props = {
  label: string;
  title: string;
  text?: string;
  tone?: "dark" | "light";
  align?: "left" | "split";
};

export function SectionIntro({ label, title, text, tone = "dark", align = "left" }: Props) {
  const light = tone === "light";
  return (
    <div className={align === "split" ? "grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16" : ""}>
      <div>
        <p
          data-reveal
          className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] ${
            light ? "text-[#2f5bf0]" : "text-[var(--accent)]"
          }`}
        >
          <span className={`h-px w-8 ${light ? "bg-[#2f5bf0]" : "bg-[var(--accent)]"}`} />
          {label}
        </p>
        <h2
          data-reveal
          className={`mt-6 max-w-[18ch] text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1.02] ${
            light ? "text-[var(--ink)]" : "text-white"
          }`}
        >
          {title}
        </h2>
      </div>
      {text && (
        <p
          data-reveal
          className={`max-w-xl text-[17px] leading-relaxed ${align === "split" ? "" : "mt-7"} ${
            light ? "text-[var(--ink)]/65" : "text-white/70"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}
