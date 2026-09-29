"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-img]",
        { clipPath: "inset(100% 0% 0% 0% round 20px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 20px)",
          duration: 1.4,
          ease: "expo.inOut",
          stagger: 0.25,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        },
      );
      gsap.fromTo(
        "[data-about-img] img",
        { scale: 1.25 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.fromTo(
        "[data-about-small]",
        { yPercent: 25 },
        {
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.from("[data-about-copy] > *", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-about-copy]", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={root} className="relative py-20 md:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-16 px-5 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div className="relative pb-24 pr-10 md:pb-28 md:pr-24">
          <div
            data-about-img
            className="relative aspect-[4/3.4] overflow-hidden rounded-[20px]"
          >
            <Image
              src="/images/about-1.jpg"
              alt="Time comemorando resultado"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div
            data-about-small
            className="absolute bottom-0 right-0 w-[48%] max-w-[300px]"
          >
            <div
              data-about-img
              className="relative aspect-[3/4] overflow-hidden rounded-[20px] shadow-[0_30px_80px_rgba(20,10,60,0.45)]"
            >
              <Image
                src="/images/about-2.jpg"
                alt="Time de desenvolvimento"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div data-about-copy>
          <span
            data-cursor="highlight"
            className="inline-block text-[1.75rem] font-medium text-[var(--accent)]"
          >
            Quem somos
          </span>
          <h2 className="mt-4 text-[clamp(2.4rem,4.6vw,4rem)] font-medium leading-[1.02] text-white">
            Um laboratório para ideias que querem virar produto
          </h2>
          <p className="mt-8 text-[17px] leading-relaxed text-white/85">
            Experimentar, aprender e construir. A Startups Lab existe para quem tem uma ideia de startup
            e precisa de um time de tecnologia para colocá-la no ar.
          </p>
          <p className="mt-5 text-[17px] leading-relaxed text-white/85">
            Engenharia, produto e design no mesmo lugar. IA e marketing entram quando o produto pede —
            o centro do trabalho é construir.
          </p>
          <div className="mt-10">
            <MagneticButton
              href="/sobre"
              className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--accent-ink)] transition-colors hover:bg-white"
            >
              <ArrowRight weight="bold" className="h-4 w-4" />
              Conheça o Lab
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
