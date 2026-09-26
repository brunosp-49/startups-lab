import type { Metadata } from "next";
import { Brain, ChartLineUp, Code, Handshake, Lightbulb } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { IconGrid } from "@/components/ui/IconGrid";
import { Timeline } from "@/components/ui/Timeline";
import { CasesGrid } from "@/components/ui/CasesGrid";
import { CTASection } from "@/components/ui/CTASection";
import { LeadButton } from "@/components/ui/LeadButton";

export const metadata: Metadata = {
  title: "Startups",
  description:
    "Validação, MVP e aceleração de startups. Da hipótese ao primeiro cliente pagante — e daí para a escala — com um só time.",
};

const offer = [
  { icon: Lightbulb, title: "Validação & MVP", text: "Entrevistas, protótipos e testes de demanda para descobrir o que construir primeiro." },
  { icon: Code, title: "Produto digital", text: "App ou plataforma com base sólida, pronta para receber os próximos mil usuários." },
  { icon: Brain, title: "IA & Automação", text: "Operação enxuta desde o dia um, com tarefas repetitivas no automático." },
  { icon: ChartLineUp, title: "Aquisição & Growth", text: "Canais testados um a um até encontrar os que trazem clientes com bom custo." },
  { icon: Handshake, title: "Estratégia & Captação", text: "Modelo de negócio, métricas e narrativa prontos para conversar com investidores." },
];

const stages = [
  {
    tag: "Validar",
    title: "Provar antes de investir",
    text: "Mapeamos o problema, conversamos com potenciais clientes e colocamos protótipos na mão deles. Só seguimos para o desenvolvimento quando há sinais claros de que a solução resolve uma dor real.",
  },
  {
    tag: "Lançar",
    title: "Primeira versão no ar",
    text: "Construímos o essencial — nada além — e lançamos rápido. Medimos o uso desde o primeiro dia, ativamos os primeiros canais de aquisição e ajustamos o produto com base no que os usuários fazem.",
  },
  {
    tag: "Escalar",
    title: "Crescer com previsibilidade",
    text: "Com tração comprovada, organizamos a operação para crescer: mais canais, automação, time de dados e os indicadores que investidores e sócios querem acompanhar.",
  },
];

export default function StartupsPage() {
  return (
    <Reveal>
      <PageHero
        eyebrow="O que fazemos · Startups"
        title={["Do rascunho", "ao primeiro", "cliente pagante."]}
        text="Seja uma ideia anotada no celular ou um produto que precisa de tração, entramos como parte do time fundador — com método para reduzir risco e velocidade para não perder o timing."
        crumbs={[{ label: "O que fazemos" }, { label: "Startups" }]}
        image={{ src: "/images/startups.jpg", alt: "Fundadores trabalhando em uma startup" }}
      >
        <LeadButton services={["startup"]}>Contar minha ideia</LeadButton>
      </PageHero>

      <section className="section-gradient relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="O que fazemos"
            title="Tudo o que uma startup precisa, sem montar dez fornecedores."
            text="Produto, tecnologia, marketing e estratégia conversando entre si — e com você — toda semana."
            align="split"
          />
          <div className="mt-16 md:mt-20">
            <IconGrid items={offer} />
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--ink)] py-24 md:py-36">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Timeline
            steps={stages}
            aside={
              <SectionIntro
                label="Nosso método"
                title="Validar, lançar, escalar."
                text="Cada fase tem uma pergunta para responder e um critério para seguir em frente. Assim, o investimento acompanha o que já foi provado."
              />
            }
          />
        </div>
      </section>

      <section className="relative bg-[var(--paper)] py-24 text-[var(--ink)] md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro tone="light" label="Cases" title="Startups que passaram pelo Lab." align="split" text="Projetos que começaram como hipótese e hoje têm usuários, receita e próximos passos claros." />
          <div className="mt-14">
            <CasesGrid only={["startups", "apps"]} />
          </div>
        </div>
      </section>

      <CTASection
        title="Em que fase está a sua startup?"
        text="Conte onde você está e aonde quer chegar. Voltamos com uma leitura honesta do momento e um plano para a próxima fase."
        bullets={["Leitura do estágio atual", "Próximos passos com metas", "Produto e marketing no mesmo time"]}
        services={["startup"]}
      />
    </Reveal>
  );
}
