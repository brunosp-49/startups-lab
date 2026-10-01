import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { formatPostDate, posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Artigos sobre MVP, aplicativo e SaaS",
  description:
    "Artigos da Startups Lab sobre MVP, aplicativo, SaaS e como decidir o que construir primeiro.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <Reveal>
      <PageHero
        eyebrow="Blog"
        title={["Dúvidas antes", "de construir."]}
        text="Dúvidas de quem tem uma ideia e ainda está decidindo o que construir. Cada texto aponta para a página do serviço correspondente."
        crumbs={[{ label: "Blog" }]}
      />

      <section className="relative bg-[var(--ink)] pb-24 md:pb-32">
        <div className="mx-auto max-w-[900px] px-5 md:px-10">
          <ul className="border-t border-white/10">
            {posts.map((post) => (
              <li key={post.slug} data-reveal className="border-b border-white/10">
                <Link href={`/blog/${post.slug}`} className="group block py-8">
                  <time dateTime={post.date} className="text-xs uppercase tracking-[0.18em] text-white/40">
                    {formatPostDate(post.date)}
                  </time>
                  <span className="mt-3 flex items-start justify-between gap-6">
                    <span className="text-[1.7rem] font-medium leading-tight text-white">{post.title}</span>
                    <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-[var(--accent)] transition-transform duration-500 group-hover:translate-x-2" />
                  </span>
                  <span className="mt-3 block max-w-xl text-[15px] leading-relaxed text-white/65">{post.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
