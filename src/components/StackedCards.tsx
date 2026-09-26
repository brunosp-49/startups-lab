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
    id: "apps",
    label: "apps",
    title: "Aplicativos para Android e iOS",
    text: "Do fluxo desenhado no papel ao app publicado nas lojas. Testamos a experiência com usuários reais, desenvolvemos com tecnologia multiplataforma e acompanhamos as métricas depois do lançamento para evoluir o que importa.",
    image: "/images/apps.jpg",
  },
  {
    id: "softwares",
    label: "softwares",
    title: "Sistemas e plataformas sob medida",
    text: "Quando a planilha já não dá conta, entra o software certo. Criamos painéis, portais, SaaS e sistemas internos que se encaixam no seu processo — e não o contrário.",
    image: "/images/software.jpg",
  },
  {
    id: "assessoria",
    label: "marketing",
    title: "Marketing de performance com IA",
    text: "Marca, conteúdo, redes sociais e mídia paga guiados por dados. Usamos IA para testar criativos e automatizar relatórios, e assim descobrir mais rápido o que realmente vende.",
    image: "/images/assessoria.jpg",
  },
  {
    id: "projeto",
    label: "validação",
    title: "Validação de ideias e MVPs",
    text: "Antes de investir pesado, provamos a ideia. Entrevistas, protótipos clicáveis e testes de demanda mostram se vale seguir — e o que construir primeiro.",
    image: "/images/projeto.jpg",
  },
  {
    id: "ia",
    label: "inteligência artificial",
    title: "Agentes de IA e automações",
    text: "Assistentes que atendem clientes, qualificam leads e tiram dúvidas do time, conectados aos seus sistemas. Menos trabalho manual, mais tempo para decidir.",
    image: "/images/ia.jpg",
  },
  {
    id: "startups",
    label: "startups",
    title: "Aceleração de startups",
    text: "Para quem já tem produto e quer tração: organizamos a operação, montamos o funil de aquisição e deixamos os números prontos para a conversa com investidores.",
    image: "/images/startups.jpg",
  },
];

const cardServices: Record<string, ServiceKey[]> = {
  apps: ["app"],
  softwares: ["software"],
  assessoria: ["marketing"],
  projeto: ["startup"],
  ia: ["ia"],
  startups: ["startup"],
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
              Um time. Todas as frentes do seu crescimento.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#101118]/60">
            Escolha por onde começar. As frentes conversam entre si — o que aprendemos em uma melhora a outra.
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
