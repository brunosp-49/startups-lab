import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TechStack } from "@/components/ui/TechStack";
import { CTASection } from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: "Projetos de desenvolvimento de aplicativos",
  description:
    "Projetos de desenvolvimento de aplicativos e software. Publicamos problema, construção e resultado quando o cliente autoriza.",
  alternates: { canonical: "/projetos" },
};

const formats = [
  {
    title: "Aplicativo",
    problem: "Alguém precisa fazer uma tarefa no celular, com conta, notificação ou pagamento.",
    built: "App para iOS e Android, ligado a uma API, publicado nas lojas.",
    tech: "React Native ou Flutter, API, lojas",
  },
  {
    title: "Sistema ou SaaS",
    problem: "Um processo que hoje vive em planilha ou em mensagens precisa de um lugar só.",
    built: "Produto web com cadastro, área logada e o fluxo principal da operação.",
    tech: "Next.js, painel, banco",
  },
  {
    title: "Backend e integrações",
    problem: "O app ou o site já existe, mas os dados e os outros sistemas não conversam.",
    built: "API, banco, autenticação e a ligação com o que a operação já usa.",
    tech: "Node.js ou Python, PostgreSQL, filas",
  },
  {
    title: "MVP",
    problem: "A ideia ainda não foi usada por ninguém de verdade.",
    built: "A menor versão que dá para colocar na mão de um usuário e aprender com isso.",
    tech: "Protótipo, depois o recorte em código",
  },
];

export default function ProjetosPage() {
  return (
    <Reveal>
      <PageHero
        eyebrow="Projetos"
        title={["O que a gente", "coloca no ar."]}
        text="Um projeto publicado aqui tem nome, problema, o que foi construído e o resultado — quando o cliente autoriza. Enquanto essa lista não abre, o que dá para ver é o formato de produto que sai do Lab."
        crumbs={[{ label: "Projetos" }]}
      />

      <section className="relative bg-[var(--ink)] pb-24 md:pb-36">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="Formatos"
            title="Não são cases. São os tipos de produto que construímos."
            text="Sem cliente inventado e sem número de resultado. Quando um projeto puder ser contado, ele entra com o que aconteceu de fato."
          />
          <ul className="mt-16">
            {formats.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                className="grid gap-6 border-t border-white/10 py-10 last:border-b md:grid-cols-[80px_0.8fr_1.4fr] md:gap-10"
              >
                <span className="text-sm tabular-nums text-white/40">0{i + 1}</span>
                <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-none tracking-[-0.03em] text-white">
                  {item.title}
                </h2>
                <div className="space-y-4 text-[15px] leading-relaxed text-white/70">
                  <p>
                    <span className="text-white">Problema. </span>
                    {item.problem}
                  </p>
                  <p>
                    <span className="text-white">O que é construído. </span>
                    {item.built}
                  </p>
                  <p>
                    <span className="text-white">Tecnologia típica. </span>
                    {item.tech}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative bg-[var(--ink)] pb-24 md:pb-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <SectionIntro
            label="Stack"
            title="Com o que a gente constrói."
            text="A escolha depende do produto. Esta é a base que o time usa no dia a dia."
            align="split"
          />
          <div className="mt-14">
            <TechStack />
          </div>
        </div>
      </section>

      <CTASection
        title="O próximo projeto pode ser o seu."
        text="Se quiser que ele apareça aqui depois, isso é combinado. Primeiro a gente constrói."
        bullets={["Sem portfólio inventado", "Publicação só com autorização", "Problema, construção e resultado reais"]}
      />
    </Reveal>
  );
}
