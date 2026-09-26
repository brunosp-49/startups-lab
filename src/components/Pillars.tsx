"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: "Crescimento com marketing e IA",
    text: "Estratégia, mídia e automação trabalhando juntas. Montamos a sua máquina de aquisição e ajustamos toda semana com base em dados — não em achismo.",
    href: "/inovacao",
  },
  {
    title: "Seu app ou software, do zero",
    text: "Escopo enxuto, primeira versão rápida e evolução contínua. Você acompanha cada entrega e sabe exatamente em que pé o projeto está.",
    href: "/desenvolvimento",
  },
  {
    title: "Startups do rascunho à escala",
    text: "Validação, MVP, lançamento e crescimento com um time que já passou por cada uma dessas fases — e sabe onde costumam estar as armadilhas.",
    href: "/startups",
  },
];

export function Pillars() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" } });
      tl.from("[data-pillar-title]", { y: 50, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12 })
        .from("[data-pillar-line]", { scaleX: 0, duration: 1.2, ease: "expo.inOut", stagger: 0.12 }, 0.1)
        .from("[data-pillar-text]", { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12 }, 0.4);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-16 md:py-24">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 md:grid-cols-3 md:gap-8 md:px-10 lg:gap-10">
        {pillars.map((p) => (
          <Link key={p.title} href={p.href} className="group block">
            <div data-pillar-title className="flex items-start justify-between gap-6">
              <h3 className="text-[clamp(1.7rem,2.4vw,2.15rem)] font-medium leading-[1.05] text-white">
                {p.title}
              </h3>
              <ArrowUpRight
                weight="light"
                className="mt-1 h-7 w-7 shrink-0 text-white transition-transform duration-500 group-hover:rotate-45 group-hover:text-[var(--accent)]"
              />
            </div>
            <div className="relative mt-8 h-px w-full">
              <span data-pillar-line className="absolute inset-0 origin-left bg-white/45" />
              <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100" />
            </div>
            <p data-pillar-text className="mt-7 text-[15px] leading-relaxed text-white/85">
              {p.text}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
