import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";
import { LeadButton } from "@/components/ui/LeadButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Desenvolvimento de Produtos Digitais",
  description:
    "Desenvolvimento de produtos digitais para startups e empresas: MVP, aplicativo, software, SaaS ou IA, conforme o que a ideia precisa.",
  alternates: { canonical: "/desenvolvimento-de-produtos-digitais" },
};

const paths = [
  {
    prompt: "Você tem uma ideia?",
    label: "MVP",
    text: "Ainda não há especificação, time ou produto. O trabalho é recortar a primeira versão e colocar no ar.",
    href: "/mvp-para-startups",
  },
  {
    prompt: "Precisa de um aplicativo?",
    label: "Aplicativos",
    text: "Android e iOS, do MVP de aplicativo à publicação na App Store e no Google Play.",
    href: "/desenvolvimento-de-aplicativos",
  },
  {
    prompt: "Precisa transformar uma operação em software?",
    label: "Sistemas",
    text: "Sistema web, plataforma e o backend da operação que hoje vive em planilha ou mensagem.",
    href: "/desenvolvimento-de-software",
  },
  {
    prompt: "Quer criar um SaaS?",
    label: "SaaS",
    text: "Produto com cadastro, assinatura, pagamento, painel e mais de um usuário na mesma conta.",
    href: "/desenvolvimento-de-saas",
  },
  {
    prompt: "Precisa incorporar IA?",
    label: "IA",
    text: "Assistente ou automação dentro do produto, quando isso resolve uma parte real do uso.",
    href: "/ia-e-automacao",
  },
];

export default function ProdutosDigitaisPage() {
  return (
    <Reveal>
      <JsonLd
        data={serviceJsonLd(
          "Desenvolvimento de produtos digitais",
          "Desenvolvimento de MVPs, aplicativos, SaaS e software sob medida para startups e empresas.",
          "/desenvolvimento-de-produtos-digitais",
        )}
      />
      <PageHero
        eyebrow="Soluções"
        title={["Produtos", "digitais para", "startups e", "empresas."]}
        text="Desenvolvimento de produtos digitais para quem ainda está escolhendo o formato. A ideia pode virar MVP, aplicativo, sistema, SaaS ou um produto com IA."
        crumbs={[{ label: "Produtos digitais" }]}
        image={{ src: "/images/projeto.jpg", alt: "Desenvolvimento de produtos digitais" }}
      >
        <LeadButton services={["startup"]}>Pedir orçamento</LeadButton>
      </PageHero>

      <section className="section-gradient relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <h2 className="max-w-[16ch] text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.05] text-white">
            Por onde a ideia entra.
          </h2>
          <ul className="mt-14 border-t border-white/10">
            {paths.map((path) => (
              <li key={path.href} data-reveal className="border-b border-white/10">
                <Link href={path.href} className="group grid gap-4 py-8 md:grid-cols-[1.1fr_1.4fr_auto] md:items-center md:gap-10">
                  <span>
                    <span className="block text-sm uppercase tracking-[0.18em] text-white/45">{path.prompt}</span>
                    <span className="mt-2 block text-[1.7rem] font-medium text-white">{path.label}</span>
                  </span>
                  <span className="max-w-xl text-[15px] leading-relaxed text-white/70">{path.text}</span>
                  <ArrowRight className="h-6 w-6 text-[var(--accent)] transition-transform duration-500 group-hover:translate-x-2" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Ainda não sabe se é app, SaaS ou sistema?"
        text="Conta a ideia. A gente indica o formato e o recorte da primeira versão."
        bullets={["MVP", "Aplicativo", "Software ou SaaS", "Orçamento sem compromisso"]}
        button="Pedir orçamento"
        services={["startup"]}
      />
    </Reveal>
  );
}
