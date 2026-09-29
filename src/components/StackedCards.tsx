"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import { openLeadForm, type ServiceKey } from "@/lib/lead-form";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: "mvp",
    label: "mvp",
    title: "O primeiro produto, não o produto inteiro",
    text: "Definimos o recorte, prototipamos e construímos a versão que alguém consegue usar. O resto fica registrado para a etapa seguinte.",
    image: "/images/projeto.jpg",
  },
  {
    id: "apps",
    label: "aplicativos",
    title: "Apps para iOS e Android",
    text: "Fluxos, publicação nas lojas e a base para evoluir depois do lançamento. Mobile é parte do produto — junto com o que acontece no servidor.",
    image: "/images/apps.jpg",
  },
  {
    id: "softwares",
    label: "sistemas",
    title: "Sistemas, SaaS e painéis",
    text: "Plataformas web, áreas logadas e ferramentas internas. O processo da operação vira software que o time realmente usa.",
    image: "/images/software.jpg",
  },
  {
    id: "backend",
    label: "backend",
    title: "APIs, dados e infraestrutura",
    text: "Autenticação, integrações, banco e o ambiente onde o produto roda. Sem essa camada, o app é só uma tela.",
    image: "/images/startups.jpg",
  },
  {
    id: "ia",
    label: "ia no produto",
    title: "IA e automação onde elas trabalham",
    text: "Um recurso dentro do produto: classificar, responder, conectar sistemas. A gente propõe quando encurta o caminho — e diz quando não encaixa.",
    image: "/images/ia.jpg",
  },
  {
    id: "growth",
    label: "complemento",
    title: "Growth, depois que o produto existe",
    text: "Aquisição e mídia para quem já tem o que oferecer. É um serviço à parte, não o motivo de existir da Startups Lab.",
    image: "/images/assessoria.jpg",
  },
];

const cardServices: Record<string, ServiceKey[]> = {
  mvp: ["startup"],
  apps: ["app"],
  softwares: ["software"],
  backend: ["software"],
  ia: ["ia"],
  growth: ["marketing"],
};

const STICKY_TOP = 96;
const STEP = 22;

export function StackedCards() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-stack-head] > *", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-stack-head]", start: "top 80%" },
      });

      const wraps = gsap.utils.toArray<HTMLElement>("[data-card-wrap]");
      const last = wraps[wraps.length - 1];

      wraps.forEach((wrap, i) => {
        if (i === wraps.length - 1) return;
        const card = wrap.querySelector("[data-card]");
        const shade = wrap.querySelector("[data-card-shade]");
        const depth = wraps.length - 1 - i;
        const trigger = {
          trigger: wrap,
          start: `top ${STICKY_TOP + i * STEP}px`,
          endTrigger: last,
          end: `top ${STICKY_TOP + (wraps.length - 1) * STEP}px`,
          scrub: true,
        };
        gsap.to(card, { scale: 1 - depth * 0.035, ease: "none", scrollTrigger: trigger });
        gsap.to(shade, { opacity: Math.min(0.55, depth * 0.12), ease: "none", scrollTrigger: trigger });
      });

      wraps.forEach((wrap) => {
        gsap.from(wrap.querySelectorAll("[data-card-reveal]"), {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: wrap, start: "top 75%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="solucoes" ref={root} className="relative bg-[var(--paper)] pb-[12vh] pt-24 md:pt-36">
      <div className="mx-auto max-w-[1180px] px-5 md:px-10">
        <div data-stack-head className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <span
              data-cursor="highlight"
              className="inline-block text-sm font-medium uppercase tracking-[0.3em] text-[#2f5bf0]"
            >
              Soluções
            </span>
            <h2 className="mt-4 max-w-2xl text-[clamp(2.3rem,4.4vw,3.8rem)] font-medium leading-[1.02] text-[#101118]">
              Da ideia ao produto que alguém usa.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#101118]/60">
            O centro é construir. IA e growth aparecem no fim porque são complemento — não o começo da conversa.
          </p>
        </div>

        <div className="relative">
          {cards.map((c, i) => (
            <div
              key={c.id}
              id={c.id}
              data-card-wrap
              className="sticky mb-[10vh] last:mb-0"
              style={{ top: STICKY_TOP + i * STEP }}
            >
              <article
                data-card
                className="relative grid origin-top gap-1.5 will-change-transform md:min-h-[440px] md:grid-cols-[0.92fr_1.3fr]"
              >
                <a
                  href="#contato"
                  data-cursor-label="Ver mais"
                  className="group relative block aspect-[16/10] overflow-hidden rounded-t-[20px] md:aspect-auto md:rounded-l-[20px] md:rounded-tr-none"
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#2a1a6e]/30 to-transparent" />
                </a>

                <div className="relative flex flex-col justify-center overflow-hidden rounded-b-[20px] bg-[var(--panel)] px-7 py-10 md:rounded-r-[20px] md:rounded-bl-none md:px-14 md:py-14 lg:px-20">
                  <div
                    className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full opacity-30 blur-3xl"
                    style={{ background: "radial-gradient(circle, #6b3cf6, transparent 70%)" }}
                  />
                  <div className="relative flex items-center justify-between" data-card-reveal>
                    <span data-cursor="highlight" className="text-[1.75rem] font-medium text-[var(--accent)]">
                      {c.label}
                    </span>
                    <span className="text-xs font-medium tabular-nums tracking-[0.2em] text-white/35">
                      0{i + 1} / 0{cards.length}
                    </span>
                  </div>
                  <h3
                    data-card-reveal
                    className="relative mt-6 text-[clamp(1.9rem,3.3vw,3rem)] font-medium leading-[1.02] text-[var(--fg)]"
                  >
                    {c.title}
                  </h3>
                  <p data-card-reveal className="relative mt-6 max-w-xl text-[15px] leading-relaxed text-white/65">
                    {c.text}
                  </p>
                  <button
                    type="button"
                    data-card-reveal
                    onClick={() => openLeadForm(cardServices[c.id])}
                    className="group relative mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-white"
                  >
                    Falar sobre isso
                    <ArrowUpRight
                      weight="bold"
                      className="h-4 w-4 text-[var(--accent)] transition-transform duration-500 group-hover:rotate-45"
                    />
                  </button>
                </div>

                <div
                  data-card-shade
                  className="pointer-events-none absolute inset-0 rounded-[20px] bg-[#0b0b10] opacity-0"
                />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
