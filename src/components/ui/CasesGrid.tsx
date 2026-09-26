"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseCategories, cases, type CaseCategory } from "@/lib/content";

gsap.registerPlugin(Flip, ScrollTrigger);

type Filter = CaseCategory | "todos";

export function CasesGrid({
  only,
  showFilters = true,
  limit,
}: {
  only?: CaseCategory[];
  showFilters?: boolean;
  limit?: number;
}) {
  const [filter, setFilter] = useState<Filter>("todos");
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const pool = only ? cases.filter((c) => only.includes(c.category)) : cases;
  const visible = (filter === "todos" ? pool : pool.filter((c) => c.category === filter)).slice(0, limit);
  const label = (key: CaseCategory) => caseCategories.find((c) => c.key === key)?.label ?? key;

  const choose = (next: Filter) => {
    if (next === filter || !grid.current) return;
    flipState.current = Flip.getState(grid.current.querySelectorAll("[data-case]"));
    setFilter(next);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !grid.current) return;
    flipState.current = null;
    Flip.from(state, {
      targets: grid.current.querySelectorAll("[data-case]"),
      duration: 0.8,
      ease: "expo.inOut",
      absolute: true,
      stagger: 0.03,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.4 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [filter]);

  const counts = (key: Filter) => (key === "todos" ? pool.length : pool.filter((c) => c.category === key).length);

  return (
    <div>
      {showFilters && (
        <div data-reveal className="mb-12 flex flex-wrap gap-2">
          {caseCategories
            .filter((c) => counts(c.key) > 0)
            .map((c) => {
              const on = filter === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => choose(c.key)}
                  aria-pressed={on}
                  className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    on
                      ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                      : "border-[var(--ink)]/15 text-[var(--ink)]/70 hover:border-[var(--ink)]/50 hover:text-[var(--ink)]"
                  }`}
                >
                  {c.label}
                  <span
                    className={`text-xs tabular-nums ${on ? "text-[var(--accent)]" : "text-[var(--ink)]/40"}`}
                  >
                    {counts(c.key)}
                  </span>
                </button>
              );
            })}
        </div>
      )}

      <div ref={grid} className="grid gap-5 md:grid-cols-2 lg:gap-6">
        {visible.map((c) => {
          const index = cases.indexOf(c) + 1;
          return (
            <article
              key={c.title}
              data-case
              className="group relative flex flex-col overflow-hidden rounded-[24px] bg-[var(--ink-2)] text-white"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-2)] via-[rgba(20,21,28,0.2)] to-transparent" />
                <div
                  className="absolute inset-0 opacity-0 mix-blend-color transition-opacity duration-700 group-hover:opacity-50"
                  style={{ background: "linear-gradient(120deg, #2f5bf0, #14b8a6)" }}
                />
                <span className="absolute left-5 top-5 rounded-full bg-[rgba(11,11,16,0.6)] px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                  {label(c.category)}
                </span>
                <span className="absolute right-5 top-5 text-xs font-medium tabular-nums text-white/70">
                  case {String(index).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-6 pb-7 md:px-8 md:pb-9">
                <h3 className="text-[clamp(1.45rem,2.2vw,1.9rem)] font-medium leading-[1.1] text-white">{c.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/60">{c.text}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-7">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition-colors duration-500 group-hover:border-[var(--accent)]/40 group-hover:text-[var(--accent)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
