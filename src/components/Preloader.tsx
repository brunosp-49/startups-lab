"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { markReady } from "@/lib/ready";
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      document.documentElement.style.overflow = "";
      markReady();
      setDone(true);
    };

    document.documentElement.style.overflow = "hidden";
    const counter = { v: 0 };
    const num = el.querySelector<HTMLSpanElement>("[data-count]");
    const timer = window.setTimeout(finish, 8000);

    const tl = gsap.timeline({ onComplete: finish });

    tl.fromTo(
      el.querySelector("[data-logo]"),
      { opacity: 0, y: 20, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
    )
      .to(
        counter,
        {
          v: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (num) num.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        },
        0,
      )
      .to(el.querySelector("[data-bar]"), { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
      .to(el.querySelector("[data-inner]"), { opacity: 0, y: -30, duration: 0.45, ease: "power2.in" })
      .to(el, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.1");

    return () => {
      window.clearTimeout(timer);
      tl.kill();
      if (!finished) document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      data-preloader=""
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--ink)]"
    >
      <div data-inner className="flex w-[min(320px,70vw)] flex-col items-center">
        <div data-logo>
          <Image
            src="/logo-startups-lab.png"
            alt="Startups Lab"
            width={1400}
            height={524}
            preload
            className="h-auto w-56"
          />
        </div>
        <div className="mt-8 h-px w-full overflow-hidden bg-white/10">
          <div
            data-bar
            className="h-full w-full origin-left scale-x-0"
            style={{ background: "var(--brand-gradient)" }}
          />
        </div>
        <span
          data-count
          className="mt-4 self-end text-xs font-medium tabular-nums tracking-[0.2em] text-white/50"
        >
          000
        </span>
      </div>
    </div>
  );
}
