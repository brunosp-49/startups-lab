import type { Metadata } from "next";
import Image from "next/image";
import {
  Brain,
  ChartLineUp,
  Code,
  Compass,
  GearSix,
  Layout,
  PenNib,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ScrollText } from "@/components/ui/ScrollText";
import { CTASection } from "@/components/ui/CTASection";
import Link from "next/link";
import { LeadButton } from "@/components/ui/LeadButton";
import { Pillars } from "@/components/Pillars";
import { team, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "Empresa de desenvolvimento de software",
  description:
    "A Startups Lab é uma empresa de desenvolvimento de software e aplicativos para startups. Um laboratório que tira ideias do papel e coloca produtos no ar.",
  alternates: { canonical: "/sobre" },
};

const roleIcons: Record<string, Icon> = {
  "Direção executiva": Compass,
  Operações: GearSix,
  Tecnologia: Code,
  "Marketing & Growth": ChartLineUp,
  "IA & Automação": Brain,
  "Design UI/UX": Layout,
  "Design de marca": PenNib,
  Financeiro: Wallet,
};

export default function SobrePage() {
  return (
    <Reveal>
      <PageHero
        eyebrow="O Lab"
        title={["Negócios nascem", "de bons experimentos."]}
        text="Experimentar, aprender, construir, lançar e evoluir. Somos um time de produto e tecnologia para quem tem uma ideia e precisa vê-la no ar."
        crumbs={[{ label: "Sobre nós" }]}
        image={{ src: "/images/about-1.jpg", alt: "Time da Startups Lab reunido" }}
      >
        <LeadButton>Fale com a gente</LeadButton>
      </PageHero>

      <section className="relative bg-[var(--ink)] py-24 md:py-36">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 md:px-10 lg:grid-cols-[0.35fr_1fr] lg:gap-16">
          <p
            data-reveal
            className="flex h-fit items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[var(--accent)] lg:sticky lg:top-32"
          >
            <span className="h-px w-8 bg-[var(--accent)]" />
            Manifesto
          </p>
          <ScrollText
            text="Uma ideia entra como experimento. A gente aprende o suficiente para construir, coloca no ar e evolui com o uso. O que não se sustenta fica para trás. O que se sustenta vira produto."
            highlight={["experimento", "construir", "ar", "produto"]}
          />
        </div>
      </section>

      <section className="relative bg-[var(--ink)] pb-24 md:pb-36">
        <div className="mx-auto grid max-w-[1320px] items-center gap-16 px-5 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          <div>
            <SectionIntro label="Nossa história" title="Um time que já esteve do seu lado da mesa." />
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-white/70">
              <p data-reveal>
                Antes de ajudar outros negócios, montamos os nossos. Erramos escopo, gastamos onde não
                devia e aprendemos na prática o valor de validar antes de construir.
              </p>
              <p data-reveal>
                A Startups Lab nasceu para encurtar esse caminho: um só time cuidando de estratégia,
                produto, tecnologia e marketing, com um jeito de trabalhar que prioriza evidência,
                entregas curtas e conversas francas.
              </p>
            </div>
          </div>
          <div className="relative pb-20 pl-10 md:pb-24 md:pl-24">
            <div data-reveal-img className="relative aspect-[4/3.3] overflow-hidden rounded-[24px]">
              <Image src="/images/software.jpg" alt="Desenvolvimento de produto" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 w-[46%] max-w-[280px]">
              <div
                data-reveal-img
                className="relative aspect-[3/4] overflow-hidden rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
              >
                <Image src="/images/about-2.jpg" alt="Time em reunião" fill sizes="280px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-[1320px] px-5 md:mt-32 md:px-10">
          <p data-reveal className="text-sm font-medium uppercase tracking-[0.25em] text-white/50">
            O jeito do Lab
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-5">
            {["Experimentar", "Aprender", "Construir", "Lançar", "Evoluir"].map((step, i) => (
              <li key={step} data-reveal className="border-t border-white/15 pt-5">
                <span className="text-xs tabular-nums text-[var(--accent)]">0{i + 1}</span>
                <p className="mt-3 text-xl font-medium text-white">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="section-gradient relative overflow-hidden">
        <section className="relative py-24 md:py-32">
          <div className="mx-auto max-w-[1320px] px-5 md:px-10">
            <SectionIntro label="Propósito" title="Por que fazemos o que fazemos" />

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {[
                {
                  title: "Missão",
                  text: "Diminuir a distância entre uma boa ideia e um negócio que funciona, com método, tecnologia e um time que se compromete com o resultado.",
                },
                {
                  title: "Visão",
                  text: "Ser o primeiro lugar em que empreendedores e empresas pensam quando querem tirar algo novo do papel — e o parceiro que continua junto quando esse algo cresce.",
                },
              ].map((b) => (
                <div
                  key={b.title}
                  data-reveal
                  className="rounded-[24px] border border-white/20 bg-white/[0.07] p-8 backdrop-blur-sm md:p-12"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-[var(--accent)]">{b.title}</p>
                  <p className="mt-6 text-[clamp(1.25rem,1.9vw,1.6rem)] leading-[1.35] text-white">{b.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <p data-reveal className="text-sm font-medium uppercase tracking-[0.25em] text-white/70">
                Valores
              </p>
              <ul className="mt-6">
                {values.map((v, i) => (
                  <li
                    key={v.title}
                    data-reveal
                    className="group grid grid-cols-[48px_1fr] items-baseline gap-4 border-t border-white/25 py-7 last:border-b md:grid-cols-[80px_1fr_1.2fr] md:gap-8"
                  >
                    <span className="text-sm tabular-nums text-white/50">0{i + 1}</span>
                    <span className="text-[clamp(1.8rem,3.4vw,3rem)] font-medium leading-none tracking-[-0.035em] text-white transition-transform duration-500 group-hover:translate-x-3">
                      {v.title}
                    </span>
                    <span className="col-start-2 text-[15px] leading-relaxed text-white/75 md:col-start-auto">
                      {v.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <Pillars />
        <div className="h-12 md:h-20" />
      </div>

      <section className="relative bg-[var(--ink)] py-24 md:py-36">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="Experts"
            title="Gente especialista, com IA como ferramenta."
            text="Cada área tem alguém que vive aquilo todos os dias. A IA entra para acelerar o trabalho — o critério continua com as pessoas."
            align="split"
          />
          <div className="mt-16 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
            {team.map((m, i) => {
              const RoleIcon = roleIcons[m.role] ?? Compass;
              return (
                <div
                  key={m.role}
                  data-reveal
                  className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-[var(--ink-2)] p-5 transition-colors duration-500 hover:border-white/25 md:p-7"
                >
                  <span
                    className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-30 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
                    style={{ background: i % 2 ? "#22d3ee" : "#3b82f6" }}
                  />
                  <span className="relative text-xs tabular-nums text-white/40">0{i + 1}</span>
                  <RoleIcon
                    weight="thin"
                    className="relative h-20 w-20 self-center text-white/80 transition-all duration-700 group-hover:scale-110 group-hover:text-[var(--accent)] md:h-28 md:w-28"
                  />
                  <div className="relative">
                    <p className="text-lg font-medium leading-tight text-white md:text-xl">{m.role}</p>
                    <p className="mt-1 text-sm text-white/45">{m.area}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p data-reveal className="mt-10 text-[15px] text-white/60">
            Quer construir com a gente?{" "}
            <Link href="/carreira" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              Veja a página de carreira
            </Link>
            .
          </p>
        </div>
      </section>

      <CTASection
        title="Tem uma ideia rondando a cabeça?"
        text="Conte em poucas linhas o que você quer construir. Respondemos em até 1 dia útil com uma primeira leitura e os próximos passos."
        bullets={["Primeira conversa sem custo", "Produto e tecnologia no centro", "Entregas curtas e visíveis", "IA onde faz sentido"]}
      />
    </Reveal>
  );
}
