"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Anima descendentes marcados ao entrarem na tela:
 * - [data-reveal]      sobe + fade
 * - [data-reveal-img]  máscara abrindo de baixo para cima
 * - [data-reveal-line] linha crescendo da esquerda
 */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(items, { y: 60, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-img]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0% round 24px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
        const img = el.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.2 },
            { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.3,
            ease: "expo.inOut",
            transformOrigin: "left center",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
