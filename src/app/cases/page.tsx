import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Stats } from "@/components/ui/Stats";
import { CasesGrid } from "@/components/ui/CasesGrid";
import { CTASection } from "@/components/ui/CTASection";
import { Pillars } from "@/components/Pillars";

export const metadata: Metadata = {
  title: "Cases",
  description: "Apps, plataformas, marketing e projetos de IA que saíram do laboratório da Startups Lab.",
};

export default function CasesPage() {
  return (
    <Reveal>
      <PageHero
        eyebrow="Institucional · Cases"
        title={["Projetos que saíram", "do laboratório."]}
        text="Cada um começou como uma pergunta — vai funcionar? Aqui estão algumas respostas: produtos no ar, operações mais leves e negócios vendendo mais."
        crumbs={[{ label: "Institucional" }, { label: "Cases" }]}
      />

      <section className="bg-[var(--ink)] pb-24 md:pb-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Stats />
        </div>
      </section>

      <section className="relative bg-[var(--paper)] py-24 text-[var(--ink)] md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            tone="light"
            label="Portfólio"
            title="Cada projeto, um aprendizado aplicado no próximo."
            text="Filtre por frente de trabalho e veja o problema, o que construímos e o que mudou para o cliente."
            align="split"
          />
          <div className="mt-14">
            <CasesGrid />
          </div>
        </div>
      </section>

      <div className="section-gradient relative overflow-hidden pt-10">
        <Pillars />
        <div className="h-10 md:h-16" />
      </div>

      <CTASection
        title="O próximo case pode ser o seu."
        text="Conte o desafio e receba uma primeira leitura com caminhos possíveis, prazo e faixa de investimento."
        bullets={["Resposta em até 1 dia útil", "Escopo e valores às claras", "O mesmo time do começo ao fim"]}
      />
    </Reveal>
  );
}
