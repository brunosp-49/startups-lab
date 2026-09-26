import type { Metadata } from "next";
import Image from "next/image";
import { Browser, DeviceMobile, Plugs, SquaresFour } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { IconGrid } from "@/components/ui/IconGrid";
import { Timeline } from "@/components/ui/Timeline";
import { TechStack } from "@/components/ui/TechStack";
import { CasesGrid } from "@/components/ui/CasesGrid";
import { CTASection } from "@/components/ui/CTASection";
import { LeadButton } from "@/components/ui/LeadButton";

export const metadata: Metadata = {
  title: "Apps & Softwares",
  description:
    "Apps para Android e iOS, plataformas web e sistemas sob medida — da primeira tela ao produto no ar, com entregas curtas e processo aberto.",
};

const highlights = [
  {
    title: "Primeira entrega em semanas",
    text: "Começamos pelo que gera valor mais cedo. Em poucas semanas você já tem algo clicável nas mãos para testar e opinar.",
  },
  {
    title: "Você acompanha tudo",
    text: "Quadro de tarefas compartilhado, demonstrações frequentes e um canal direto com quem está construindo. Sem surpresas no fim.",
  },
  {
    title: "Um time completo",
    text: "Produto, design, engenharia e qualidade trabalhando juntos, do primeiro rascunho à manutenção depois do lançamento.",
  },
];

const steps = [
  {
    tag: "Entender",
    title: "Descoberta",
    text: "Conversamos com quem vai usar e com quem vai pagar. Mapeamos objetivos, riscos e o menor escopo capaz de gerar resultado.",
  },
  {
    tag: "Desenhar",
    title: "Protótipo",
    text: "Telas navegáveis que parecem o produto final. Testamos com usuários e ajustamos antes de escrever uma linha de código.",
  },
  {
    tag: "Construir",
    title: "Desenvolvimento em ciclos",
    text: "Entregas curtas, cada uma com algo funcionando. Você valida, a gente ajusta, e o produto vai ganhando forma sem retrabalho.",
  },
  {
    tag: "Evoluir",
    title: "Lançamento e evolução",
    text: "Publicamos, monitoramos o uso e seguimos melhorando com base em dados — com suporte e novas funcionalidades no ritmo do negócio.",
  },
];

const kinds = [
  { icon: DeviceMobile, title: "Apps mobile", text: "Aplicativos para Android e iOS, com publicação nas lojas e acompanhamento pós-lançamento." },
  { icon: Browser, title: "Plataformas web", text: "Portais, marketplaces e SaaS que carregam rápido e aguentam crescer." },
  { icon: SquaresFour, title: "Sistemas internos", text: "Painéis, CRMs e ferramentas que substituem planilhas e processos manuais." },
  { icon: Plugs, title: "Integrações com IA", text: "Seus sistemas conversando entre si e com modelos de IA, por meio de APIs e automações." },
];

export default function DesenvolvimentoPage() {
  return (
    <Reveal>
      <PageHero
        eyebrow="O que fazemos · Apps & Softwares"
        title={["Da primeira tela", "ao produto no ar."]}
        text="Desenhamos, construímos e evoluímos apps e softwares com entregas curtas e processo aberto. Você vê o produto crescer semana a semana."
        crumbs={[{ label: "O que fazemos" }, { label: "Apps & Softwares" }]}
        image={{ src: "/images/apps.jpg", alt: "Desenvolvimento de aplicativos" }}
      >
        <LeadButton services={["app", "software"]}>Pedir estimativa</LeadButton>
      </PageHero>

      <section className="relative bg-[var(--ink)] pb-24 md:pb-32">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 md:grid-cols-3 md:gap-8 md:px-10 lg:gap-12">
          {highlights.map((h, i) => (
            <div key={h.title} data-reveal className="group">
              <span className="block text-[clamp(4rem,7vw,6rem)] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.2px_rgba(255,255,255,0.35)] transition-colors duration-500 group-hover:[-webkit-text-stroke-color:var(--accent)]">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-[clamp(1.6rem,2.3vw,2rem)] font-medium leading-tight text-white">{h.title}</h3>
              <div className="relative mt-6 h-px w-full bg-white/15">
                <span data-reveal-line className="absolute inset-0 bg-white/40" />
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-white/65">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-[var(--ink)] py-24 md:py-36">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Timeline
            steps={steps}
            aside={
              <SectionIntro
                label="Como desenvolvemos"
                title="Processo aberto, sem caixa-preta."
                text="Quatro etapas, cada uma com um objetivo claro e algo concreto para você avaliar. A IA acelera o trabalho do time; as decisões continuam com vocês e com a gente."
              />
            }
          />
        </div>
      </section>

      <section className="section-gradient relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto grid max-w-[1320px] items-start gap-16 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32">
            <SectionIntro
              label="Sob medida"
              title="O que construímos."
              text="Se é digital e resolve um problema do seu negócio ou dos seus clientes, provavelmente sabemos como construir — e como manter depois."
            />
            <div data-reveal-img className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[24px]">
              <Image src="/images/software.jpg" alt="Time de engenharia" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:pt-6">
            <IconGrid items={kinds} columns={2} />
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--ink)] py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="Nossa especialidade"
            title="A tecnologia certa para o seu produto."
            text="Escolhemos a stack pelo que o projeto precisa — performance, prazo e custo — nunca por modismo."
            align="split"
          />
          <div className="mt-14">
            <TechStack />
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--paper)] py-24 text-[var(--ink)] md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro tone="light" label="Cases" title="Produtos que já estão rodando." align="split" text="Apps, plataformas e automações que saíram do protótipo e hoje fazem parte do dia a dia de alguém." />
          <div className="mt-14">
            <CasesGrid only={["apps", "ia", "startups"]} />
          </div>
        </div>
      </section>

      <CTASection
        title="Quanto custa tirar seu produto do papel?"
        text="Descreva a ideia em poucas linhas. Devolvemos uma estimativa de escopo, prazo e investimento para a primeira versão."
        bullets={["Estimativa sem compromisso", "Primeira versão enxuta", "Entregas a cada ciclo", "Time sênior"]}
        button="Pedir estimativa"
        services={["app", "software"]}
      />
    </Reveal>
  );
}
