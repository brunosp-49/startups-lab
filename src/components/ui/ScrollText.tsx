"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Parágrafo grande em que as palavras "acendem" conforme o scroll. */
export function ScrollText({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  const root = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={root}
      className="text-[clamp(1.9rem,4.2vw,3.8rem)] font-medium leading-[1.12] tracking-[-0.035em] text-white"
    >
      {words.map((w, i) => {
        const clean = w.replace(/[.,;:!?]/g, "").toLowerCase();
        const hl = highlight.includes(clean);
        return (
          <span key={i} data-word className={hl ? "text-[var(--accent)]" : undefined}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
