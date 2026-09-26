import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";
import { LeadButton } from "@/components/ui/LeadButton";
import { Services } from "@/components/Services";
import { BigMarquee } from "@/components/BigMarquee";
import { About } from "@/components/About";
import { Pillars } from "@/components/Pillars";
import { Partners } from "@/components/Partners";
import { StackedCards } from "@/components/StackedCards";

export const metadata: Metadata = {
  title: "Inovação",
  description:
    "Marketing, IA e automação trabalhando juntos para empresas que querem vender mais e operar melhor.",
};

export default function InovacaoPage() {
  return (
    <Reveal>
      <PageHero
        eyebrow="O que fazemos · Inovação"
        title={["Marketing, IA e", "automação trabalhando", "juntos."]}
        text="Encontramos onde o seu negócio está perdendo vendas ou tempo e atacamos com a combinação certa de estratégia, mídia, automação e inteligência artificial."
        crumbs={[{ label: "O que fazemos" }, { label: "Inovação" }]}
        image={{ src: "/images/ia.jpg", alt: "Inteligência artificial aplicada a negócios" }}
      >
        <LeadButton services={["marketing", "ia"]}>Quero um diagnóstico</LeadButton>
      </PageHero>

      <div className="section-gradient relative overflow-hidden">
        <Services />
        <BigMarquee />
        <About />
        <Pillars />
        <Partners />
      </div>

      <StackedCards />

      <CTASection
        title="Onde a IA pode ajudar a sua empresa?"
        text="Numa conversa rápida, levantamos os gargalos de vendas e de operação e apontamos o que dá para resolver primeiro — e com que retorno."
        bullets={["Mapa de oportunidades", "Prioridades por impacto", "Mão na massa com o nosso time"]}
        services={["marketing", "ia"]}
      />
    </Reveal>
  );
}
