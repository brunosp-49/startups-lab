import type { Metadata } from "next";
import Link from "next/link";
import {
  AndroidLogo,
  AppleLogo,
  DeviceMobile,
  GooglePlayLogo,
  Plugs,
  RocketLaunch,
  Wrench,
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
  title: "Desenvolvimento de Aplicativos Android e iOS",
  description:
    "Empresa de desenvolvimento de aplicativos para Android e iOS. Do MVP de aplicativo à publicação na App Store e no Google Play, com backend e evolução.",
  alternates: { canonical: "/desenvolvimento-de-aplicativos" },
};

const kinds = [
  { icon: RocketLaunch, title: "Apps para startups", text: "A primeira versão que um usuário consegue baixar e usar, sem o produto inteiro de uma vez." },
  { icon: DeviceMobile, title: "Apps para empresas", text: "Um fluxo que hoje acontece no WhatsApp ou na planilha, resolvido no celular de quem opera." },
  { icon: DeviceMobile, title: "MVP mobile", text: "O recorte mínimo do aplicativo: as telas e as funções que provam se a ideia se sustenta." },
  { icon: DeviceMobile, title: "React Native", text: "Uma base de código para Android e iOS, quando isso encurta o prazo sem prender o produto." },
  { icon: AndroidLogo, title: "Android", text: "Aplicativo publicado no Google Play, com a conta de desenvolvedor e o fluxo de atualização." },
  { icon: AppleLogo, title: "iOS", text: "Aplicativo na App Store, incluindo o que a revisão da Apple costuma exigir antes de aprovar." },
  { icon: Plugs, title: "Backend e APIs", text: "O app conversa com um servidor: conta, dados e integrações. Sem isso, ele é só uma tela." },
  { icon: GooglePlayLogo, title: "Publicação nas lojas", text: "Subida na App Store e no Google Play, com a ficha, os ícones e a primeira versão no ar." },
  { icon: Wrench, title: "Manutenção e evolução", text: "Depois do lançamento: correção, a próxima função e o que o uso real mostrou que faltava." },
];

const faqs = [
  {
    q: "Quanto custa desenvolver um aplicativo?",
    a: "Não existe um preço único. O valor muda com o recorte: um MVP enxuto custa menos do que um app com pagamentos, painel e várias integrações. Na primeira conversa devolvemos um orçamento da primeira versão, sem compromisso.",
  },
  {
    q: "Quanto tempo demora para criar um app?",
    a: "Depende do que entra na primeira versão. Um recorte curto chega ao ar antes de um produto completo. O prazo da primeira entrega é estimado depois que o escopo está claro.",
  },
  {
    q: "Vocês desenvolvem Android e iOS?",
    a: "Sim. Publicamos nas duas lojas. Em muitos projetos usamos uma base compartilhada, como React Native, e separamos o que cada plataforma exige.",
  },
  {
    q: "Vocês fazem o backend?",
    a: "Sim. Conta, dados, API e o que o aplicativo precisa para funcionar de verdade entram no mesmo projeto. Também fazemos software web em uma frente própria.",
  },
  {
    q: "Vocês publicam o aplicativo na App Store e no Google Play?",
    a: "Sim. A publicação faz parte da etapa de lançamento: ficha das lojas, build e o acompanhamento até a versão estar disponível.",
  },
  {
    q: "É possível começar apenas com um MVP?",
    a: "É o caminho que mais recomendamos. A primeira versão cobre o uso principal. O resto fica registrado para a evolução.",
  },
  {
    q: "Vocês trabalham com startups em estágio inicial?",
    a: "Sim. Dá para começar com uma ideia ainda sem especificação. O trabalho inclui recortar o que entra no primeiro aplicativo.",
  },
];

export default function AplicativosPage() {
  return (
    <Reveal>
      <JsonLd
        data={serviceJsonLd(
          "Desenvolvimento de aplicativos",
          "Desenvolvimento de aplicativos Android e iOS para startups, do MVP à publicação nas lojas.",
          "/desenvolvimento-de-aplicativos",
        )}
      />
      <PageHero
        eyebrow="Soluções · Aplicativos"
        title={["Desenvolvimento", "de aplicativos", "para Android", "e iOS."]}
        text="Criamos aplicativos para Android e iOS do zero, da definição do MVP até a publicação nas lojas. Serve para uma startup que quer o primeiro app e para uma empresa que precisa tirar um fluxo do papel. O backend entra junto quando o app precisa guardar dados ou falar com outro sistema."
        crumbs={[
          { label: "Soluções", href: "/desenvolvimento-de-produtos-digitais" },
          { label: "Aplicativos" },
        ]}
        image={{ src: "/images/apps.jpg", alt: "Desenvolvimento de aplicativos para Android e iOS" }}
      >
        <LeadButton services={["app"]}>Pedir orçamento</LeadButton>
      </PageHero>

      <section className="section-gradient relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="O que entra num app"
            title="Do recorte à loja."
            text="Mobile é uma frente forte da Startups Lab, e o aplicativo quase sempre precisa de servidor, integração e uma versão seguinte."
            align="split"
          />
          <div className="mt-16 md:mt-20">
            <IconGrid items={kinds} />
          </div>
          <p data-reveal className="mt-16 max-w-xl text-[15px] leading-relaxed text-white/70">
            Se o produto também vive no navegador, o caminho é{" "}
            <Link href="/desenvolvimento-de-software" className="text-white underline decoration-white/30 underline-offset-4">
              desenvolvimento de software
            </Link>
            . Se a ideia ainda está no papel, começamos pelo{" "}
            <Link href="/mvp-para-startups" className="text-white underline decoration-white/30 underline-offset-4">
              MVP
            </Link>
            .
          </p>
        </div>
      </section>

      <Faq items={faqs} />

      <CTASection
        title="Qual aplicativo você quer colocar na loja?"
        text="Conta a ideia em poucas linhas. Devolvemos o recorte da primeira versão, com prazo e orçamento."
        bullets={["Android e iOS", "MVP antes do produto inteiro", "Publicação nas lojas", "Backend no mesmo time"]}
        button="Pedir orçamento"
        services={["app"]}
      />
    </Reveal>
  );
}
