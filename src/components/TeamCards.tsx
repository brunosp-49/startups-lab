"use client";

import { useRef } from "react";
import {
  Brain,
  ChartLineUp,
  Code,
  Compass,
  GearSix,
  Layout,
  PenNib,
  Wallet,
  type Icon,
} from "@phosphor-icons/react";
import { team } from "@/lib/content";

const roleIcons: Record<string, Icon> = {
  "Direção executiva": Compass,
  Operações: GearSix,
  Tecnologia: Code,
  "Marketing & Growth": ChartLineUp,
  "IA & Automação": Brain,
  "Design UI/UX": Layout,
  "Design de marca": PenNib,
  Financeiro: Wallet,
};

function placeSpot(card: HTMLElement, x: number, y: number) {
  const r = card.getBoundingClientRect();
  card.style.setProperty("--spot-x", `${x - r.left}px`);
  card.style.setProperty("--spot-y", `${y - r.top}px`);
}

export function TeamCards() {
  const reduced = useRef(false);

  return (
    <div className="mt-16 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
      {team.map((m, i) => {
        const RoleIcon = roleIcons[m.role] ?? Compass;
        const color = i % 2 ? "#22d3ee" : "#3b82f6";
        return (
          <div
            key={m.role}
            data-reveal
            onMouseEnter={(e) => {
              reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              if (reduced.current) return;
              placeSpot(e.currentTarget, e.clientX, e.clientY);
            }}
            onMouseMove={(e) => {
              if (reduced.current) return;
              placeSpot(e.currentTarget, e.clientX, e.clientY);
            }}
            className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-[var(--ink-2)] p-5 transition-colors duration-500 hover:border-white/25 md:p-7"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
              style={{
                left: "var(--spot-x, 82%)",
                top: "var(--spot-y, 8%)",
                background: color,
              }}
            />
            <span className="relative text-xs tabular-nums text-white/40">0{i + 1}</span>
            <RoleIcon
              weight="thin"
              className="relative h-20 w-20 self-center text-white/80 transition-all duration-700 group-hover:scale-110 group-hover:text-[var(--accent)] md:h-28 md:w-28"
            />
            <div className="relative">
              <p className="text-lg font-medium leading-tight text-white md:text-xl">{m.role}</p>
              <p className="mt-1 text-sm text-white/45">{m.area}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
