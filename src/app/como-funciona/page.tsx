import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Timeline } from "@/components/ui/Timeline";
import { CTASection } from "@/components/ui/CTASection";
import { LeadButton } from "@/components/ui/LeadButton";
import { method } from "@/lib/content";

export const metadata: Metadata = {
  title: "Como funciona o desenvolvimento",
  description:
    "Como a Startups Lab desenvolve um produto digital: descobrir, validar, construir, lançar e evoluir.",
  alternates: { canonical: "/como-funciona" },
};

export default function ComoFuncionaPage() {
  return (
    <Reveal>
      <PageHero
        eyebrow="Método"
        title={["Descobrir.", "Construir.", "Colocar no ar."]}
        text="Não entregamos só código. Acompanhamos a ideia até ela virar um produto que alguém usa — e seguimos na versão seguinte."
        crumbs={[{ label: "Como funciona" }]}
        image={{ src: "/images/about-2.jpg", alt: "Time construindo um produto" }}
      >
        <LeadButton>Começar pela ideia</LeadButton>
      </PageHero>

      <section className="relative bg-[var(--ink)] py-24 md:py-36">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Timeline
            steps={method}
            aside={
              <SectionIntro
                label="O caminho do produto"
                title="Cinco etapas. Cada uma termina com algo concreto."
                text="Ideia, validação, desenvolvimento, lançamento e evolução. Você sabe em qual etapa está e o que precisa existir para passar à próxima."
              />
            }
          />
        </div>
      </section>

      <CTASection
        title="Por qual etapa a sua ideia passa agora?"
        text="Se ainda é um rascunho, começamos em descobrir. Se já existe produto, entramos em evoluir. A conversa serve para localizar isso."
        bullets={["Sem especificação pronta", "Escopo da etapa, não do produto inteiro", "O mesmo time do começo ao fim"]}
      />
    </Reveal>
  );
}
