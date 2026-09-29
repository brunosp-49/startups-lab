"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BigMarquee() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-big-row='a']",
        { xPercent: 0 },
        {
          xPercent: -35,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        "[data-big-row='b']",
        { xPercent: -35 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const word = (outline: boolean) => (
    <>
      <span className={outline ? "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)]" : "text-white"}>
        IDEIA
      </span>
      <span className="self-center text-[0.45em] text-[var(--accent)]">✦</span>
      <span className={outline ? "text-white" : "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)]"}>
        PRODUTO
      </span>
      <span className="self-center text-[0.45em] text-[var(--accent)]">✦</span>
    </>
  );

  return (
    <div ref={root} aria-hidden className="relative overflow-hidden py-16 md:py-24">
      <div
        data-big-row="a"
        className="flex w-max gap-[0.3em] whitespace-nowrap text-[clamp(4.5rem,15vw,15rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em]"
      >
        {word(false)}
        {word(true)}
        {word(false)}
      </div>
      <div
        data-big-row="b"
        className="mt-2 flex w-max gap-[0.3em] whitespace-nowrap text-[clamp(4.5rem,15vw,15rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em]"
      >
        {word(true)}
        {word(false)}
        {word(true)}
      </div>
    </div>
  );
}
