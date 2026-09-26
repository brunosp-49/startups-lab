import { CheckCircle, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { LeadButton } from "./LeadButton";
import { site } from "@/lib/site";
import type { ServiceKey } from "@/lib/lead-form";

type Props = {
  label?: string;
  title: string;
  text: string;
  bullets?: string[];
  button?: string;
  services?: ServiceKey[];
};

export function CTASection({
  label = "Próximo passo",
  title,
  text,
  bullets,
  button = "Contar meu projeto",
  services,
}: Props) {
  return (
    <section className="relative bg-[var(--ink)] px-3 py-24 md:px-6 md:py-32">
      <div className="section-gradient relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] px-6 py-16 md:rounded-[40px] md:px-16 md:py-24">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full opacity-50 blur-[120px]"
          style={{ background: "radial-gradient(circle, #22d3ee, transparent 65%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "linear-gradient(90deg, transparent, black 60%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 60%)",
          }}
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p data-reveal className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-white/75">
              <span className="h-px w-8 bg-white/60" />
              {label}
            </p>
            <h2
              data-reveal
              className="mt-6 text-[clamp(2.4rem,5.4vw,4.8rem)] font-medium leading-[1] tracking-[-0.04em] text-white"
            >
              {title}
            </h2>
            <p data-reveal className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/85">
              {text}
            </p>
            <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
              <LeadButton services={services}>{button}</LeadButton>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/30 px-6 py-4 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <WhatsappLogo weight="fill" className="h-[18px] w-[18px]" />
                Chamar no WhatsApp
              </a>
            </div>
          </div>

          {bullets && (
            <ul className="grid gap-3">
              {bullets.map((b) => (
                <li
                  key={b}
                  data-reveal
                  className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-4 text-[15px] font-medium text-white backdrop-blur-sm"
                >
                  <CheckCircle weight="fill" className="h-5 w-5 shrink-0 text-[var(--accent)]" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
