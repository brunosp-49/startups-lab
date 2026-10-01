import type { Metadata } from "next";
import { ChartLineUp, Megaphone, Target } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { IconGrid } from "@/components/ui/IconGrid";
import { CTASection } from "@/components/ui/CTASection";
import { LeadButton } from "@/components/ui/LeadButton";

export const metadata: Metadata = {
  title: "Growth",
  description:
    "Marketing e aquisição como serviço complementar da Startups Lab, depois que o aplicativo ou o software já existe.",
  alternates: { canonical: "/growth" },
};

const items = [
  {
    icon: Target,
    title: "Depois do produto",
    text: "Aquisição faz sentido quando já existe algo para a pessoa usar. Antes disso, o trabalho é construir.",
  },
  {
    icon: Megaphone,
    title: "Mídia e mensagem",
    text: "Campanhas e páginas para apresentar o produto a quem tem o problema que ele resolve.",
  },
  {
    icon: ChartLineUp,
    title: "Leitura do que acontece",
    text: "O que as pessoas fazem depois do clique volta para o produto: o que travou, o que vale a próxima versão.",
  },
];

export default function GrowthPage() {
  return (
    <Reveal>
      <PageHero
        eyebrow="Complemento · Growth"
        title={["Crescer o", "produto que", "já está no ar."]}
        text="Marketing e aquisição existem aqui como complemento. A Startups Lab é uma empresa de produto e tecnologia — growth entra quando o produto pede usuários."
        crumbs={[{ label: "Soluções", href: "/desenvolvimento-de-produtos-digitais" }, { label: "Growth" }]}
        image={{ src: "/images/assessoria.jpg", alt: "Acompanhamento de aquisição de um produto" }}
      >
        <LeadButton services={["marketing"]}>Falar sobre aquisição</LeadButton>
      </PageHero>

      <section className="section-gradient relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="O lugar disso"
            title="Não é o começo da conversa."
            text="Se a ideia ainda não virou produto, o caminho é MVP e desenvolvimento. Esta página é para quem já tem o que oferecer."
            align="split"
          />
          <div className="mt-16 md:mt-20">
            <IconGrid items={items} />
          </div>
        </div>
      </section>

      <CTASection
        title="O produto já está no ar?"
        text="Se sim, a gente olha como as pessoas chegam até ele. Se não, o primeiro passo é construir."
        bullets={["Serviço complementar", "Ligado ao produto, não solto", "Pode ficar de fora do escopo"]}
        services={["marketing"]}
        button="Falar sobre aquisição"
      />
    </Reveal>
  );
}
