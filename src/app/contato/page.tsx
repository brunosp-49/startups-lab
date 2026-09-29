import type { Metadata } from "next";
import {
  ArrowUpRight,
  EnvelopeSimple,
  // InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { WordMarquee } from "@/components/ui/WordMarquee";
import { ContactForm } from "@/components/ui/InlineForms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Startups Lab sobre o aplicativo, o software ou o MVP que você quer construir. Respondemos em até 1 dia útil.",
  alternates: { canonical: "/contato" },
};

const channels = [
  { icon: WhatsappLogo, label: "WhatsApp", value: "Resposta rápida", href: site.whatsapp, external: true },
  { icon: EnvelopeSimple, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Telefone", value: site.phone, href: site.phoneHref },
];

export default function ContatoPage() {
  return (
    <Reveal>
      <PageHero
        eyebrow="Contato"
        title={["Conta pra gente", "o que você", "quer construir."]}
        text="Uma ideia nova, um produto que precisa evoluir ou uma parceria — escreva do seu jeito. Uma pessoa do time lê e responde em até 1 dia útil."
        crumbs={[{ label: "Contato" }]}
      />

      <section className="relative bg-[var(--ink)] pb-24 md:pb-36">
        <div className="mx-auto grid max-w-[1320px] gap-14 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            {channels.map(({ icon: IconCmp, label, value, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                data-reveal
                className="group relative flex items-center gap-5 overflow-hidden rounded-[22px] border border-white/10 bg-[var(--ink-2)] p-5 transition-colors duration-500 hover:border-[var(--accent)]/50 md:p-6"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100" />
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[var(--accent)] transition-colors duration-500 group-hover:bg-[var(--accent-ink)]">
                  <IconCmp weight="fill" className="h-6 w-6" />
                </span>
                <span className="relative flex-1">
                  <span className="block text-xs font-medium uppercase tracking-[0.22em] text-white/45 transition-colors duration-500 group-hover:text-[var(--accent-ink)]/70">
                    {label}
                  </span>
                  <span className="mt-1 block text-lg font-medium text-white transition-colors duration-500 group-hover:text-[var(--accent-ink)]">
                    {value}
                  </span>
                </span>
                <ArrowUpRight className="relative h-6 w-6 text-white/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-[var(--accent-ink)]" />
              </a>
            ))}

            <div data-reveal className="rounded-[22px] border border-white/10 p-6">
              <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-white/45">
                <MapPin weight="fill" className="h-4 w-4 text-[var(--accent)]" />
                Endereço
              </div>
              <p className="mt-4 text-lg font-medium text-white">{site.address.city}</p>
              <p className="text-white/60">{site.address.street}</p>
            </div>

            <div data-reveal className="flex items-center justify-between rounded-[22px] border border-white/10 p-6">
              <span className="text-sm text-white/60">Siga o Lab</span>
              <div className="flex gap-2">
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2f5bf0] text-white transition hover:-translate-y-1 hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
                >
                  <LinkedinLogo weight="fill" className="h-5 w-5" />
                </a>
                {/* Instagram desativado até existir conta
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2f5bf0] text-white transition hover:-translate-y-1 hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
                >
                  <InstagramLogo weight="bold" className="h-5 w-5" />
                </a>
                */}
              </div>
            </div>
          </div>

          <div data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section-gradient relative overflow-hidden">
        <WordMarquee words={["hipótese", "protótipo", "produto", "tração", "escala"]} />
      </section>
    </Reveal>
  );
}
