"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type Step = { title: string; tag?: string; text: string };

export function Timeline({ steps, aside }: { steps: Step[]; aside: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-tl-progress]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-tl-list]", start: "top 60%", end: "bottom 60%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-tl-step]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 62%",
          onToggle: (self) => el.classList.toggle("is-active", self.isActive || self.progress === 1),
          onLeave: () => el.classList.add("is-done"),
          onEnterBack: () => el.classList.remove("is-done"),
        });
        gsap.from(el.querySelectorAll("[data-tl-fade]"), {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
      <div className="lg:sticky lg:top-32 lg:self-start">{aside}</div>

      <ol data-tl-list className="relative">
        <span className="absolute bottom-6 left-[27px] top-6 w-px bg-white/12 md:left-[35px]" />
        <span
          data-tl-progress
          className="absolute bottom-6 left-[27px] top-6 w-px origin-top md:left-[35px]"
          style={{ background: "linear-gradient(180deg, #8b5cf6, #3b82f6, #22d3ee)" }}
        />
        {steps.map((s, i) => (
          <li
            key={s.title}
            data-tl-step
            className="group relative grid grid-cols-[56px_1fr] gap-6 pb-16 last:pb-0 md:grid-cols-[72px_1fr] md:gap-10"
          >
            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[var(--ink)] text-sm font-medium tabular-nums text-white/50 transition-all duration-500 group-[.is-active]:border-[var(--accent)] group-[.is-active]:bg-[var(--accent)] group-[.is-active]:text-[var(--accent-ink)] group-[.is-done]:border-[var(--accent)] group-[.is-done]:text-[var(--accent)] md:h-[72px] md:w-[72px] md:text-base">
              0{i + 1}
            </span>
            <div className="pt-2 md:pt-4">
              {s.tag && (
                <p data-tl-fade className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)]">
                  {s.tag}
                </p>
              )}
              <h3
                data-tl-fade
                className="mt-3 text-[clamp(1.7rem,2.8vw,2.5rem)] font-medium leading-[1.05] text-white/45 transition-colors duration-500 group-[.is-active]:text-white group-[.is-done]:text-white"
              >
                {s.title}
              </h3>
              <p data-tl-fade className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/65">
                {s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
