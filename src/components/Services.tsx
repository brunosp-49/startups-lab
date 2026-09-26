"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  Brain,
  ChartLineUp,
  ChatCircleDots,
  Code,
  FlowArrow,
  RocketLaunch,
  type Icon,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const services: { icon: Icon; title: string; text: string; href: string }[] = [
  {
    icon: ChartLineUp,
    title: "Marketing",
    text: "Posicionamento, mídia paga e funis que transformam atenção em vendas — com metas claras e ajustes toda semana.",
    href: "#assessoria",
  },
  {
    icon: Brain,
    title: "IA",
    text: "Assistentes treinados com o conhecimento da sua empresa para atender, responder e decidir mais rápido.",
    href: "#ia",
  },
  {
    icon: FlowArrow,
    title: "Automações",
    text: "Tarefas repetitivas no piloto automático: conectamos seus sistemas e liberamos o time para o que importa.",
    href: "#ia",
  },
  {
    icon: Code,
    title: "Software e App",
    text: "Produtos digitais do primeiro rabisco ao lançamento, com design cuidadoso e código pronto para crescer.",
    href: "#apps",
  },
  {
    icon: RocketLaunch,
    title: "Startups",
    text: "Da hipótese ao primeiro cliente pagante — e daí para a escala. Entramos como parte do seu time.",
    href: "#startups",
  },
  {
    icon: ChatCircleDots,
    title: "Outro desafio?",
    text: "Se envolve tecnologia e crescimento, provavelmente já resolvemos algo parecido. Conte pra gente.",
    href: "/contato",
  },
];

export function Services() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-svc]", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: { each: 0.08, grid: "auto", from: "start" },
        scrollTrigger: { trigger: "[data-svc-grid]", start: "top 80%" },
      });
      gsap.from("[data-svc-arrow]", {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="servicos" ref={root} className="relative pb-10 pt-24 md:pt-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="flex items-center gap-4">
          <ArrowDown data-svc-arrow weight="thin" className="h-14 w-14 text-white md:h-16 md:w-16" />
          <span
            data-cursor="highlight"
            className="text-sm font-medium uppercase tracking-[0.3em] text-white/70"
          >
            O que fazemos
          </span>
        </div>

        <div
          data-svc-grid
          className="mt-14 grid gap-x-12 gap-y-16 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-20"
        >
          {services.map(({ icon: IconCmp, title, text, href }) => (
            <Link key={title} href={href} data-svc className="group block">
              <IconCmp
                weight="light"
                className="h-16 w-16 text-[var(--accent)] transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-2 group-hover:rotate-[-8deg] group-hover:scale-110"
              />
              <h3 className="mt-6 text-[1.9rem] font-medium leading-tight text-white">{title}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/80">{text}</p>
              <div className="mt-6 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70 transition-all duration-500 group-hover:w-8 group-hover:bg-[var(--accent)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
