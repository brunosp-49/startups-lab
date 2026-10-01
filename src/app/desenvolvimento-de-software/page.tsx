import type { Metadata } from "next";
import Link from "next/link";
import { Browser, Cloud, Database, Plugs, SquaresFour, Stack } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { IconGrid } from "@/components/ui/IconGrid";
import { TechStack } from "@/components/ui/TechStack";
import { Faq } from "@/components/ui/Faq";
import { CTASection } from "@/components/ui/CTASection";
import { LeadButton } from "@/components/ui/LeadButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Desenvolvimento de Software e SaaS",
  description:
    "Empresa de desenvolvimento de software: sistemas sob medida, sistema web, plataforma digital, SaaS, backend e APIs para startups e empresas.",
  alternates: { canonical: "/desenvolvimento-de-software" },
};

const kinds = [
  { icon: Browser, title: "Sistema web", text: "O processo que hoje está espalhado em abas e mensagens ganha um lugar só, com login e o fluxo do dia a dia." },
  { icon: Stack, title: "SaaS", text: "Produto com cadastro, plano e área logada, pronto para receber os primeiros clientes pagantes." },
  { icon: SquaresFour, title: "Plataforma digital", text: "Mais de um tipo de usuário no mesmo produto: quem compra, quem opera e quem administra." },
  { icon: Database, title: "Backend e API", text: "Regras, banco e endpoints. É a camada que o aplicativo, o painel e as integrações compartilham." },
  { icon: SquaresFour, title: "Painel administrativo", text: "Quem opera o produto enxerga usuários, pedidos e conteúdo sem abrir o banco." },
  { icon: Plugs, title: "Integrações", text: "Pagamento, ERP, planilha ou o sistema que a operação já usa." },
  { icon: Cloud, title: "Infraestrutura", text: "Ambiente, deploy e o básico para o software permanecer no ar." },
];

const faqs = [
  {
    q: "O que é software sob medida?",
    a: "É um sistema feito para o seu processo, em vez de adaptar a operação a uma ferramenta genérica. Pode ser um SaaS, um portal, um painel ou a API por trás de um aplicativo.",
  },
  {
    q: "Vocês desenvolvem SaaS e sistema web?",
    a: "Sim. Produto no navegador, com cadastro, área logada e o fluxo principal. Se também precisar de app, isso entra como outra frente do mesmo produto.",
  },
  {
    q: "Vocês fazem backend e API?",
    a: "Sim. Autenticação, dados, endpoints e integrações fazem parte do desenvolvimento, não de um fornecedor separado.",
  },
  {
    q: "Dá para integrar com um sistema que já existe?",
    a: "Sim, quando esse sistema oferece uma API, um arquivo ou um acesso estável. Na descoberta a gente vê o que dá para conectar e o que precisa ser refeito.",
  },
  {
    q: "Vocês fazem só o software ou também o aplicativo?",
    a: "Os dois. Esta página é a frente de software. Aplicativos Android e iOS ficam na página de desenvolvimento de aplicativos, com o mesmo time.",
  },
];

export default function SoftwarePage() {
  return (
    <Reveal>
      <JsonLd
        data={serviceJsonLd(
          "Desenvolvimento de software sob medida",
          "Desenvolvimento de sistemas web, SaaS, plataformas, backend e APIs.",
          "/desenvolvimento-de-software",
        )}
      />
      <PageHero
        eyebrow="Soluções · Software"
        title={["Desenvolvimento", "de software,", "SaaS e sistemas", "sob medida."]}
        text="Sistemas web, plataformas digitais e o backend que segura o produto. Se a ideia é um produto com assinatura, o caminho específico é a página de desenvolvimento de SaaS."
        crumbs={[
          { label: "Soluções", href: "/desenvolvimento-de-produtos-digitais" },
          { label: "Software" },
        ]}
        image={{ src: "/images/software.jpg", alt: "Desenvolvimento de software sob medida" }}
      >
        <LeadButton services={["software"]}>Pedir orçamento</LeadButton>
      </PageHero>

      <section className="section-gradient relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="O que construímos"
            title="O produto no navegador e o servidor atrás dele."
            text="Não paramos na tela. API, painel, integração e infra entram no mesmo escopo quando o software precisa deles."
            align="split"
          />
          <div className="mt-16 md:mt-20">
            <IconGrid items={kinds} />
          </div>
          <p data-reveal className="mt-16 max-w-xl text-[15px] leading-relaxed text-white/70">
            Para Android e iOS, veja{" "}
            <Link href="/desenvolvimento-de-aplicativos" className="text-white underline decoration-white/30 underline-offset-4">
              desenvolvimento de aplicativos
            </Link>
            . Para um produto com assinatura, veja{" "}
            <Link href="/desenvolvimento-de-saas" className="text-white underline decoration-white/30 underline-offset-4">
              desenvolvimento de SaaS
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="relative bg-[var(--ink)] py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="Stack"
            title="A base que o time usa."
            text="A escolha depende do produto. Esta é a tecnologia com que construímos no dia a dia."
            align="split"
          />
          <div className="mt-14">
            <TechStack />
          </div>
        </div>
      </section>

      <Faq items={faqs} />

      <CTASection
        title="Que sistema você precisa tirar da planilha?"
        text="Descreva o fluxo. Devolvemos o que entra na primeira versão e um orçamento."
        bullets={["Sistema web e SaaS", "Backend e API", "Integrações", "Orçamento sem compromisso"]}
        button="Pedir orçamento"
        services={["software"]}
      />
    </Reveal>
  );
}
