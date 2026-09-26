"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUp, NotePencil, WhatsappLogo } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { openLeadForm } from "@/lib/lead-form";
import { onReady } from "@/lib/ready";

export function FloatingActions() {
  const pillRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    gsap.set(pill, { y: 120, opacity: 0 });
    const off = onReady(() =>
      gsap.to(pill, { y: 0, opacity: 1, duration: 1.1, delay: 1.2, ease: "expo.out" }),
    );

    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      off();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={pillRef}
        className="fixed bottom-6 right-5 z-40 rounded-full p-px shadow-[0_18px_50px_rgba(0,0,0,0.35)] md:bottom-8 md:right-8"
        style={{ background: "var(--brand-gradient)" }}
      >
        <div className="flex h-12 items-center rounded-full bg-[rgba(14,15,22,0.92)] p-1.5 text-sm font-medium text-white backdrop-blur-xl">
          <button
            type="button"
            onClick={() => openLeadForm()}
            aria-label="Abrir formulário de contato"
            className="group flex h-9 items-center gap-2 rounded-full pl-3 pr-4 transition-colors duration-300 hover:bg-white/10"
          >
            <NotePencil className="h-[18px] w-[18px] text-[var(--accent)] transition-transform duration-500 group-hover:rotate-[-12deg]" />
            Formulário
          </button>

          <span className="mx-1 h-5 w-px bg-white/15" />

          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="Fale com a gente no WhatsApp — online"
            className="group flex h-9 items-center gap-2.5 rounded-full pl-1 pr-3.5 transition-colors duration-300 hover:bg-white/10"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-105">
              <WhatsappLogo weight="fill" className="h-4 w-4" />
            </span>
            Online
            <span className="online-dot h-2 w-2 rounded-full bg-[#4ade80]" />
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={toTop}
        aria-label="Voltar ao topo"
        className={`fixed bottom-[5.25rem] right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] shadow-[0_12px_30px_rgba(46,242,216,0.35)] transition-all duration-500 hover:-translate-y-1 md:bottom-[5.75rem] md:right-8 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <ArrowUp weight="bold" className="h-5 w-5" />
      </button>
    </>
  );
}
