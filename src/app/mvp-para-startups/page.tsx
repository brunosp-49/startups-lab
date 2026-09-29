import type { Metadata } from "next";
import Link from "next/link";
import { Code, Lightbulb, RocketLaunch, Stack, TreeStructure, Wrench } from "@phosphor-icons/react/dist/ssr";
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
  title: "Desenvolvimento de MVP para startups",
  description:
    "Desenvolvimento de MVP para startups: da ideia ao protótipo e à primeira versão no ar, sem montar um time de tecnologia.",
  alternates: { canonical: "/mvp-para-startups" },
};

const offer = [
  { icon: Lightbulb, title: "Validação da ideia", text: "O problema, quem usaria e o que fica de fora antes de escrever o produto inteiro." },
  { icon: Stack, title: "Definição do MVP", text: "A lista curta do que o produto inicial precisa fazer para alguém usar de verdade." },
  { icon: TreeStructure, title: "Protótipo", text: "Telas navegáveis para ver o produto antes de investir no código todo." },
  { icon: Code, title: "Arquitetura", text: "Como app, API e dados se organizam nesta versão e na próxima." },
  { icon: RocketLaunch, title: "Primeira versão no ar", text: "O MVP construído e publicado nas lojas ou na web." },
  { icon: Wrench, title: "Evolução", text: "O que os primeiros usuários fizeram vira a lista da versão seguinte." },
];

const faqs = [
  {
    q: "O que entra no desenvolvimento de um MVP?",
    a: "O menor produto que alguém consegue usar: o fluxo principal, a conta se precisar, e o que for necessário para aprender com o uso. O resto fica para depois.",
  },
  {
    q: "Preciso chegar com uma especificação?",
    a: "Não. Uma ideia escrita em poucas linhas já serve. O recorte do MVP é parte do trabalho.",
  },
  {
    q: "Vocês fazem o protótipo antes do código?",
    a: "Quando isso evita construir a coisa errada, sim. O protótipo serve para ver o fluxo. Em seguida vem a primeira versão de verdade.",
  },
  {
    q: "Dá para lançar só a primeira versão?",
    a: "Sim. O combinado pode ser só o MVP. Evoluir depois é uma etapa seguinte, não uma obrigação escondida no escopo.",
  },
  {
    q: "Vocês trabalham com startup em estágio inicial?",
    a: "Sim. Não é preciso ter empresa de tecnologia, squad ou investidor. É preciso um problema que valha testar com um produto.",
  },
  {
    q: "Quanto custa criar um MVP?",
    a: "Depende do recorte. Um fluxo simples custa menos do que um produto com pagamento, app nas duas lojas e várias integrações. O orçamento sai depois da primeira conversa.",
  },
];

export default function MvpPage() {
  return (
    <Reveal>
      <JsonLd
        data={serviceJsonLd(
          "Desenvolvimento de MVP para startups",
          "Validação, protótipo e desenvolvimento da primeira versão de um produto digital.",
          "/mvp-para-startups",
        )}
      />
      <PageHero
        eyebrow="Soluções · MVP"
        title={["Desenvolvimento", "de MVP."]}
        text="Você não precisa ter uma empresa de tecnologia para tirar a startup do papel. A Startups Lab recorta a ideia, prototipa e constrói o produto inicial."
        crumbs={[
          { label: "Soluções", href: "/desenvolvimento-de-aplicativos" },
          { label: "MVP" },
        ]}
        image={{ src: "/images/startups.jpg", alt: "Desenvolvimento de MVP para startups" }}
      >
        <LeadButton services={["startup"]}>Contar minha ideia</LeadButton>
      </PageHero>

      <section className="section-gradient relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="Como entramos"
            title="A ideia vira um produto inicial."
            text="Não precisa chegar com especificação pronta. Precisa de um problema que valha testar e de vontade de ver essa primeira versão funcionando."
            align="split"
          />
          <div className="mt-16 md:mt-20">
            <IconGrid items={offer} />
          </div>
          <p data-reveal className="mt-16 max-w-xl text-[15px] leading-relaxed text-white/70">
            Se o MVP é um aplicativo, seguimos em{" "}
            <Link href="/desenvolvimento-de-aplicativos" className="text-white underline decoration-white/30 underline-offset-4">
              desenvolvimento de aplicativos
            </Link>
            . Se é um sistema web, em{" "}
            <Link href="/desenvolvimento-de-software" className="text-white underline decoration-white/30 underline-offset-4">
              software sob medida
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="relative bg-[var(--ink)] py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="O caminho"
            title="Descobrir, validar, construir, lançar."
            text="É assim que um MVP anda aqui. Evoluir vem depois, com o que a primeira versão ensinou."
            align="split"
          />
          <Link
            href="/como-funciona"
            className="mt-10 inline-flex text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]"
          >
            Ver como funciona
          </Link>
        </div>
      </section>

      <Faq items={faqs} />

      <CTASection
        title="Em que ponto está a ideia?"
        text="Pode ser um parágrafo ou um protótipo parado. A gente lê e devolve o que faria sentido construir primeiro."
        bullets={["Recorte da primeira versão", "O que fica para depois", "Prazo e escopo na primeira conversa"]}
        services={["startup"]}
      />
    </Reveal>
  );
}
