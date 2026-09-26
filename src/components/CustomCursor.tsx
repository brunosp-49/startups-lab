"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";

type Mode = "default" | "link" | "highlight" | "label";

const SIZES: Record<Mode, number> = {
  default: 10,
  link: 44,
  highlight: 96,
  label: 92,
};

const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    document.documentElement.classList.add("has-custom-cursor");
    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.45, ease: "power3.out" });

    let mode: Mode = "default";
    let currentText = "";
    let visible = false;

    const apply = (next: Mode, text = "") => {
      if (next === mode && text === currentText) return;
      mode = next;
      currentText = text;
      setLabel(text);
      const size = SIZES[next];
      gsap.to(dot, {
        width: size,
        height: size,
        backgroundColor: next === "label" ? "#2ef2d8" : "#ffffff",
        mixBlendMode: next === "label" ? "normal" : "difference",
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.set(dot, { x: e.clientX, y: e.clientY });
        gsap.to(dot, { opacity: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const labelled = target.closest<HTMLElement>("[data-cursor-label]");
      if (labelled) {
        apply("label", labelled.dataset.cursorLabel ?? "");
        return;
      }
      if (target.closest("[data-cursor='highlight']")) {
        apply("highlight");
        return;
      }
      if (target.closest("a, button, input, [data-cursor='link']")) {
        apply("link");
        return;
      }
      apply("default");
    };

    const onLeaveWindow = () => {
      visible = false;
      gsap.to(dot, { opacity: 0, duration: 0.3 });
    };

    const onDown = () => gsap.to(dot, { scale: 0.75, duration: 0.2 });
    const onUp = () => gsap.to(dot, { scale: 1, duration: 0.3, ease: "back.out(3)" });

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-2.5 w-2.5 items-center justify-center rounded-full bg-white mix-blend-difference"
    >
      {label && (
        <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-[#06231f]">
          {label}
        </span>
      )}
    </div>
  );
}
