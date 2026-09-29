import { faqJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Faq({
  items,
  title = "Perguntas frequentes",
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <section className="relative bg-[var(--ink)] py-24 md:py-32">
      <JsonLd data={faqJsonLd(items)} />
      <div className="mx-auto max-w-[900px] px-5 md:px-10">
        <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05] text-white">{title}</h2>
        <div className="mt-10 border-t border-white/10">
          {items.map((item) => (
            <details key={item.q} className="group border-b border-white/10">
              <summary className="cursor-pointer list-none py-6 text-lg font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-6">
                  {item.q}
                  <span className="mt-1 text-[var(--accent)] transition-transform duration-300 group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-white/70">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
