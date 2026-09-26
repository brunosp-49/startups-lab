"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/lib/content";
import { onReady } from "@/lib/ready";

gsap.registerPlugin(ScrollTrigger);

export function Stats({ tone = "dark" }: { tone?: "dark" | "blue" }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const values = gsap.utils.toArray<HTMLElement>("[data-stat-value]", el);
    const cells = el.querySelectorAll("[data-stat]");
    const ctx = gsap.context(() => {
      gsap.set(cells, { y: 40, opacity: 0 });
      values.forEach((v) => (v.textContent = "0"));
    }, root);

    const play = (delay: number) =>
      ctx.add(() => {
        const tl = gsap.timeline({ delay });
        tl.to(cells, { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08 });
        values.forEach((v, i) => {
          const counter = { v: 0 };
          tl.to(
            counter,
            {
              v: Number(v.dataset.statValue),
              duration: 2.2,
              ease: "power3.out",
              onUpdate: () => {
                v.textContent = Math.round(counter.v).toString();
              },
            },
            i * 0.08,
          );
        });
      });

    const off = onReady(() =>
      ctx.add(() => {
        // Visible on load: let the page hero intro play first.
        const delay = el.getBoundingClientRect().top < window.innerHeight ? 0.9 : 0;
        ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => play(delay) });
      }),
    );

    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      className={`grid grid-cols-2 overflow-hidden rounded-[28px] border lg:grid-cols-4 ${
        tone === "blue" ? "border-white/20 bg-white/[0.06]" : "border-white/10 bg-white/[0.02]"
      }`}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          data-stat
          className={`relative px-6 py-10 md:px-10 md:py-14 ${i % 2 === 1 ? "border-l" : ""} ${
            i >= 2 ? "border-t lg:border-t-0" : ""
          } ${i === 2 ? "lg:border-l" : ""} ${tone === "blue" ? "border-white/20" : "border-white/10"}`}
        >
          <p className="flex items-baseline text-[clamp(2.6rem,5.4vw,4.8rem)] font-medium leading-none tracking-[-0.05em] text-white">
            {s.prefix && <span className="mr-1 text-[0.5em] text-[var(--accent)]">{s.prefix.trim()}</span>}
            <span data-stat-value={s.value} className="tabular-nums">
              {s.value}
            </span>
            {s.suffix && <span className="text-[0.6em]">{s.suffix}</span>}
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-white/55">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
