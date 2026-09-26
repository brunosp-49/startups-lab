"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WordMarquee({ words }: { words: string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.fromTo("[data-wm-row='a']", { xPercent: 0 }, { xPercent: -30, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-wm-row='b']", { xPercent: -30 }, { xPercent: 0, ease: "none", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  const row = (offset: number) =>
    [...words, ...words, ...words].map((w, i) => {
      const outline = (i + offset) % 2 === 1;
      return (
        <Fragment key={`${w}-${i}`}>
          <span
            className={
              outline ? "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.7)]" : "text-white"
            }
          >
            {w}
          </span>
          <span className="self-center text-[0.4em] text-[var(--accent)]">✦</span>
        </Fragment>
      );
    });

  const cls =
    "flex w-max gap-[0.3em] whitespace-nowrap text-[clamp(3.8rem,11vw,11rem)] font-semibold lowercase leading-[0.95] tracking-[-0.05em]";

  return (
    <div ref={root} aria-hidden className="relative overflow-hidden py-16 md:py-24">
      <div data-wm-row="a" className={cls}>
        {row(0)}
      </div>
      <div data-wm-row="b" className={`mt-2 ${cls}`}>
        {row(1)}
      </div>
    </div>
  );
}
