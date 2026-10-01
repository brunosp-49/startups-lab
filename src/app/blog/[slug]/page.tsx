import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { formatPostDate, getPost, posts } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <Reveal>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: "pt-BR",
          mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
          author: { "@id": `${siteUrl}/#organization` },
          publisher: { "@id": `${siteUrl}/#organization` },
        }}
      />

      <article className="bg-[var(--ink)] pb-24 pt-36 md:pb-32 md:pt-48">
        <div className="mx-auto max-w-[760px] px-5 md:px-10">
          <nav aria-label="Você está em" className="flex flex-wrap items-center gap-2 text-[13px] text-white/45">
            <Link href="/" className="transition hover:text-white">
              Início
            </Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="transition hover:text-white">
              Blog
            </Link>
          </nav>
          <time dateTime={post.date} className="mt-8 block text-xs uppercase tracking-[0.18em] text-white/40">
            {formatPostDate(post.date)}
          </time>
          <h1 className="mt-4 text-[clamp(2.1rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70">{post.description}</p>

          <div className="mt-14 space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-[1.6rem] font-medium leading-tight text-white">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[16px] leading-relaxed text-white/75">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <Link
            href={post.serviceHref}
            className="mt-16 flex items-center justify-between gap-6 border-y border-white/10 py-8 text-white"
          >
            <span>
              <span className="block text-xs uppercase tracking-[0.18em] text-white/40">Continuar</span>
              <span className="mt-2 block text-xl font-medium">{post.serviceLabel}</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-[var(--accent)]" />
          </Link>
        </div>
      </article>

      <section className="bg-[var(--ink)] pb-24">
        <div className="mx-auto max-w-[760px] px-5 md:px-10">
          <h2 className="text-sm uppercase tracking-[0.18em] text-white/40">Outros textos</h2>
          <ul className="mt-6 border-t border-white/10">
            {related.map((item) => (
              <li key={item.slug} className="border-b border-white/10">
                <Link href={`/blog/${item.slug}`} className="block py-5 text-lg text-white transition hover:text-[var(--accent)]">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
