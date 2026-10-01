import type { Metadata } from "next";
import { Brain, FlowArrow, Plugs } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { IconGrid } from "@/components/ui/IconGrid";
import { Faq } from "@/components/ui/Faq";
import { CTASection } from "@/components/ui/CTASection";
import { LeadButton } from "@/components/ui/LeadButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Desenvolvimento de IA e automação",
  description:
    "IA e automação dentro do produto: agentes, integrações e fluxos quando isso resolve uma tarefa real da startup ou da empresa.",
  alternates: { canonical: "/ia-e-automacao" },
};

const items = [
  {
    icon: Brain,
    title: "Agentes no produto",
    text: "Um recurso que classifica, resume, responde ou sugere, ligado ao que a pessoa já faz no app ou no sistema.",
  },
  {
    icon: FlowArrow,
    title: "Automação",
    text: "O passo repetido entre dois sistemas, ou entre o time e o cliente, deixa de ser manual.",
  },
  {
    icon: Plugs,
    title: "Integração com IA",
    text: "O modelo entra na API do produto, com os dados e as regras do negócio, não num chat solto.",
  },
];

const faqs = [
  {
    q: "Vocês colocam IA em qualquer projeto?",
    a: "Não. A IA entra quando uma tarefa do produto fica melhor com ela. Se uma regra ou um formulário resolve, a gente diz isso.",
  },
  {
    q: "O que é um agente de IA dentro do produto?",
    a: "É uma função que usa um modelo para fazer um pedaço do trabalho: responder, classificar, extrair ou encaminhar. Ela usa os dados do seu sistema, não um chat genérico.",
  },
  {
    q: "Dá para automatizar sem um modelo de IA?",
    a: "Sim. Muita automação é integração e regra. O modelo só aparece se a tarefa não tem uma resposta fixa.",
  },
  {
    q: "A IA substitui o desenvolvimento do aplicativo?",
    a: "Não. Ela é uma capacidade do produto. O aplicativo, o software e o backend continuam sendo construídos.",
  },
];

export default function IaPage() {
  return (
    <Reveal>
      <JsonLd
        data={serviceJsonLd(
          "Desenvolvimento de IA e automação",
          "Agentes de IA, automações e integrações como parte de um produto digital.",
          "/ia-e-automacao",
        )}
      />
      <PageHero
        eyebrow="Soluções · IA"
        title={["IA e", "automação."]}
        text="Agentes, automações e integrações entram no produto que estamos construindo. Não são um serviço solto, e não substituem o aplicativo ou o software."
        crumbs={[
          { label: "Soluções", href: "/desenvolvimento-de-produtos-digitais" },
          { label: "IA e automação" },
        ]}
        image={{ src: "/images/ia.jpg", alt: "Desenvolvimento de IA e automação em um produto" }}
      >
        <LeadButton services={["ia"]}>Ver se faz sentido</LeadButton>
      </PageHero>

      <section className="section-gradient relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="Onde entra"
            title="Uma parte do produto, não o produto inteiro."
            text="O caminho continua sendo descobrir, construir e lançar. A IA aparece na tarefa em que ela encurta o trabalho de verdade."
            align="split"
          />
          <div className="mt-16 md:mt-20">
            <IconGrid items={items} />
          </div>
        </div>
      </section>

      <Faq items={faqs} />

      <CTASection
        title="Tem uma tarefa que o produto deveria fazer sozinho?"
        text="Conta qual é. A gente diz se vale um modelo, uma automação ou só uma função bem feita."
        bullets={["Encaixa no app, no software ou no MVP", "Sem IA por obrigação", "O mesmo time que constrói o resto"]}
        services={["ia"]}
      />
    </Reveal>
  );
}
