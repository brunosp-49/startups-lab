import type { Metadata } from "next";
import Image from "next/image";
import {
  Brain,
  GraduationCap,
  HouseLine,
  Lightning,
  RocketLaunch,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { IconGrid } from "@/components/ui/IconGrid";
import { LeadButton } from "@/components/ui/LeadButton";
import { CareersForm } from "@/components/ui/InlineForms";

export const metadata: Metadata = {
  title: "Carreira",
  description:
    "Trabalhe na Startups Lab. Procuramos gente para construir aplicativos, software e produtos digitais com startups.",
  alternates: { canonical: "/carreira" },
};

const perks = [
  { icon: RocketLaunch, title: "Variedade de problemas", text: "Um mês é um app de saúde, no outro um SaaS B2B. Você nunca para de aprender." },
  { icon: Brain, title: "IA como ferramenta", text: "Usamos IA no fluxo real de trabalho, e você ganha tempo para o que exige critério." },
  { icon: GraduationCap, title: "Crescimento visível", text: "Feedback frequente, pares experientes e um plano claro para a sua próxima etapa." },
  { icon: HouseLine, title: "Rotina flexível", text: "Combinamos entregas, não horários. Trabalho remoto ou híbrido, conforme a função." },
  { icon: Lightning, title: "Voz ativa", text: "Achou um jeito melhor? Propõe, testa e mostra o resultado. Aqui isso é o esperado." },
  { icon: UsersThree, title: "Time misto", text: "Dev, design, marketing e negócios na mesma mesa — cada projeto é uma troca." },
];

const areas = [
  { title: "Tecnologia", text: "Front-end, back-end, mobile e infraestrutura." },
  { title: "Design", text: "UI/UX, produto e identidade de marca." },
  { title: "Marketing & Growth", text: "Performance, conteúdo, SEO e tráfego pago." },
  { title: "IA & Dados", text: "Agentes, automações e modelos preditivos." },
  { title: "Operações & Vendas", text: "Gestão de projetos, atendimento e comercial." },
];

export default function CarreiraPage() {
  return (
    <Reveal>
      <PageHero
        eyebrow="Carreira"
        title={["Construa com a", "gente o que ainda", "não existe."]}
        text="Se você gosta de resolver problemas de verdade, aprende rápido e quer ver o seu trabalho no ar, tem lugar para você no Lab."
        crumbs={[{ label: "Sobre nós", href: "/sobre" }, { label: "Carreira" }]}
      >
        <LeadButton href="#candidatura">Candidate-se</LeadButton>
      </PageHero>

      <section className="relative bg-[var(--ink)] pb-24 md:pb-36">
        <div className="mx-auto grid max-w-[1320px] items-center gap-16 px-5 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
          <div data-reveal-img className="relative aspect-[4/3.2] overflow-hidden rounded-[24px]">
            <Image src="/images/about-2.jpg" alt="Time trabalhando junto" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          </div>
          <div>
            <SectionIntro label="Cultura" title="Cultura de laboratório." />
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-white/70">
              <p data-reveal>
                Aqui, errar rápido é melhor que acertar tarde. Testamos hipóteses, compartilhamos o que
                aprendemos e confiamos uns nos outros para tomar decisões.
              </p>
              <p data-reveal>
                Valorizamos quem pergunta &ldquo;por quê?&rdquo;, quem mostra o trabalho cedo e quem se
                importa com o resultado do cliente tanto quanto com o próprio código, layout ou campanha.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-gradient relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro label="Por que a Startups Lab" title="O que você encontra por aqui." />
          <div className="mt-16 md:mt-20">
            <IconGrid items={perks} />
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--ink)] py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="Áreas"
            title="Onde você pode atuar"
            text="Sua área não está na lista? Mande seu perfil mesmo assim — gente boa a gente sempre quer conhecer."
            align="split"
          />
          <ul className="mt-14">
            {areas.map((a, i) => (
              <li
                key={a.title}
                data-reveal
                className="group relative grid grid-cols-[48px_1fr] items-baseline gap-4 overflow-hidden border-t border-white/10 py-8 last:border-b md:grid-cols-[80px_1fr_1fr] md:gap-8"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100" />
                <span className="relative text-sm tabular-nums text-white/40 transition-colors group-hover:text-[var(--accent-ink)]">
                  0{i + 1}
                </span>
                <span className="relative text-[clamp(1.9rem,3.8vw,3.4rem)] font-medium leading-none tracking-[-0.04em] text-white transition-all duration-500 group-hover:translate-x-3 group-hover:text-[var(--accent-ink)]">
                  {a.title}
                </span>
                <span className="relative col-start-2 text-[15px] text-white/60 transition-colors group-hover:text-[var(--accent-ink)] md:col-start-auto md:text-right">
                  {a.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="candidatura" className="relative bg-[var(--ink)] pb-24 md:pb-36">
        <div className="mx-auto grid max-w-[1320px] gap-14 px-5 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionIntro
              label="Candidatura"
              title="Mande seu perfil."
              text="Conte quem você é, o que já construiu e o que quer aprender. Guardamos seu contato para as próximas oportunidades."
            />
          </div>
          <div data-reveal>
            <CareersForm />
          </div>
        </div>
      </section>
    </Reveal>
  );
}
