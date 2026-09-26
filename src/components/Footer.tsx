"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo,
  Phone,
} from "@phosphor-icons/react";
import { BrandLockup } from "./BrandLockup";
import { nav, site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const links = nav.flatMap((item) =>
  item.children ? item.children : [{ href: item.href, label: item.label }],
);

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-footer-brand]",
        { y: 120, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 25%", scrub: true },
        },
      );
      gsap.from("[data-footer-col]", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-footer-cols]", start: "top 90%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contato" ref={root} className="relative overflow-hidden bg-[var(--ink-2)] pt-32 md:pt-44">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #6b3cf6, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
        <div data-footer-brand className="flex justify-center">
          <BrandLockup size="xl" align="center" />
        </div>

        <div
          data-footer-cols
          className="mt-28 grid gap-12 pb-16 sm:grid-cols-2 md:mt-36 lg:grid-cols-[1.3fr_1.1fr_0.8fr_1.2fr] lg:gap-10"
        >
          <div data-footer-col>
            <p className="text-lg font-semibold text-white">Bora tirar do papel?</p>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/70">
              Uma ideia nova, um produto parado ou uma meta de crescimento: a gente quer ouvir. A
              primeira conversa é sem compromisso — e costuma render bons insights.{" "}
              <strong className="font-semibold text-white">O próximo experimento pode ser o seu.</strong>
            </p>
          </div>

          <div data-footer-col>
            <p className="text-lg font-semibold text-white">Fale conosco</p>
            <p className="mt-5 text-[15px] font-semibold text-white">{site.address.city}</p>
            <p className="text-[15px] text-white/70">{site.address.street}</p>
            <a
              href={site.phoneHref}
              className="mt-6 flex items-center gap-3 text-lg font-semibold text-white transition hover:text-[var(--accent)]"
            >
              <Phone weight="fill" className="h-5 w-5" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 flex items-center gap-3 text-lg font-semibold text-white transition hover:text-[var(--accent)]"
            >
              <EnvelopeSimple weight="fill" className="h-5 w-5" />
              {site.email}
            </a>
          </div>

          <div data-footer-col>
            <p className="text-lg font-semibold text-white">Navegue</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group inline-flex items-center gap-2 text-[15px] transition ${
                      pathname === item.href ? "text-[var(--accent)]" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col>
            <p className="text-lg font-semibold text-white">Receba novidades</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-5">
              <div className="flex items-center gap-3 border-b border-white/25 pb-3 transition-colors focus-within:border-[var(--accent)]">
                <EnvelopeSimple className="h-4 w-4 shrink-0 text-white/50" />
                <input
                  type="email"
                  required
                  placeholder="Informe seu e-mail profissional"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                />
                <button type="submit" aria-label="Inscrever" className="text-white transition hover:text-[var(--accent)]">
                  <ArrowRight weight="bold" className="h-5 w-5" />
                </button>
              </div>
            </form>

            <p className="mt-10 text-lg font-semibold text-white">Nossas redes</p>
            <div className="mt-4 flex gap-3">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2f5bf0] text-white transition hover:-translate-y-1 hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                <LinkedinLogo weight="fill" className="h-5 w-5" />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2f5bf0] text-white transition hover:-translate-y-1 hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                <InstagramLogo weight="bold" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-[1320px] px-5 py-7 text-center text-sm text-white/55 md:px-10">
          Startups Lab™ {new Date().getFullYear()}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
