import type { Metadata } from "next";
import Link from "next/link";
import {
  CreditCard,
  Database,
  Lock,
  RocketLaunch,
  SquaresFour,
  Stack,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
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
  title: "Desenvolvimento de SaaS",
  description:
    "Desenvolvimento de SaaS do zero: MVP, cadastro, assinatura, pagamentos, painel, multiusuário, backend e a evolução do produto.",
  alternates: { canonical: "/desenvolvimento-de-saas" },
};

const kinds = [
  {
    icon: RocketLaunch,
    title: "SaaS do zero",
    text: "A ideia vira um produto no navegador, com o fluxo que o primeiro cliente precisa para pagar e usar.",
  },
  {
    icon: Stack,
    title: "MVP de SaaS",
    text: "O recorte que prova a assinatura: uma conta, um plano e a tarefa principal. O resto fica para a versão seguinte.",
  },
  {
    icon: SquaresFour,
    title: "Arquitetura",
    text: "Como o produto se divide entre tela, regras e dados, para crescer sem recomeçar do zero.",
  },
  {
    icon: Lock,
    title: "Cadastro e login",
    text: "Quem entra, o que cada pessoa pode ver e como a conta da empresa se separa da conta do usuário.",
  },
  {
    icon: CreditCard,
    title: "Assinatura e pagamento",
    text: "Plano, cobrança e o estado da assinatura ligados ao que a pessoa pode fazer dentro do produto.",
  },
  {
    icon: UsersThree,
    title: "Multiusuário",
    text: "Mais de uma pessoa na mesma conta: quem administra, quem opera e quem só consulta.",
  },
  {
    icon: SquaresFour,
    title: "Painel administrativo",
    text: "Clientes, planos e o que está acontecendo no produto, sem abrir o banco de dados.",
  },
  {
    icon: Database,
    title: "Backend e infraestrutura",
    text: "API, banco e o ambiente em que o SaaS fica no ar. A evolução continua depois do primeiro cliente.",
  },
];

const faqs = [
  {
    q: "Vocês desenvolvem um SaaS do zero?",
    a: "Sim. Da definição do que entra na primeira versão até cadastro, área logada, cobrança e o painel de quem opera o produto.",
  },
  {
    q: "Dá para começar com um MVP de SaaS?",
    a: "É o caminho que mais recomendamos. A primeira versão cobre um plano e o uso principal. Novos planos e papéis entram quando alguém já está usando.",
  },
  {
    q: "Assinatura e pagamento entram no escopo?",
    a: "Quando o produto cobra para existir, sim. A integração de pagamento faz parte do desenvolvimento, junto com o que cada plano libera.",
  },
  {
    q: "Qual a diferença para a página de software?",
    a: "Software sob medida cobre sistemas, portais e a operação de uma empresa. Esta página é para um produto que várias empresas assinam e usam.",
  },
  {
    q: "Quanto custa criar um SaaS?",
    a: "Não publicamos um valor fechado. O orçamento depende do recorte: quantos papéis de usuário, quais planos e o que fica de fora da primeira versão. O número sai depois da primeira conversa.",
  },
];

export default function SaasPage() {
  return (
    <Reveal>
      <JsonLd
        data={serviceJsonLd(
          "Desenvolvimento de SaaS",
          "Desenvolvimento de SaaS para startups: MVP, cadastro, assinatura, pagamentos, painel e backend.",
          "/desenvolvimento-de-saas",
        )}
      />
      <PageHero
        eyebrow="Soluções · SaaS"
        title={["Desenvolvimento", "de SaaS."]}
        text="Um produto com cadastro, assinatura e painel, feito para receber os primeiros clientes. A Startups Lab desenvolve o SaaS do recorte inicial até a versão que já cobra."
        crumbs={[
          { label: "Soluções", href: "/desenvolvimento-de-produtos-digitais" },
          { label: "SaaS" },
        ]}
        image={{ src: "/images/software.jpg", alt: "Desenvolvimento de um produto SaaS" }}
      >
        <LeadButton services={["software"]}>Pedir orçamento</LeadButton>
      </PageHero>

      <section className="section-gradient relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="O que entra"
            title="O que um SaaS precisa para o primeiro cliente usar."
            text="Não é só a tela. Conta, permissão, cobrança e o servidor atrás disso fazem parte do mesmo produto."
            align="split"
          />
          <div className="mt-16 md:mt-20">
            <IconGrid items={kinds} />
          </div>
          <p data-reveal className="mt-16 max-w-xl text-[15px] leading-relaxed text-white/70">
            Se o produto ainda não tem forma, começamos pelo{" "}
            <Link href="/mvp-para-startups" className="text-white underline decoration-white/30 underline-offset-4">
              desenvolvimento de MVP
            </Link>
            . Se a necessidade é um sistema interno, e não um produto assinado, veja{" "}
            <Link href="/desenvolvimento-de-software" className="text-white underline decoration-white/30 underline-offset-4">
              desenvolvimento de software
            </Link>
            .
          </p>
        </div>
      </section>

      <Faq items={faqs} />

      <CTASection
        title="Que SaaS você quer colocar no ar?"
        text="Descreva quem paga e o que essa pessoa faz no primeiro dia. Devolvemos o recorte e um orçamento."
        bullets={["MVP de SaaS", "Assinatura e painel", "Backend no mesmo time", "Orçamento sem compromisso"]}
        button="Pedir orçamento"
        services={["software"]}
      />
    </Reveal>
  );
}
