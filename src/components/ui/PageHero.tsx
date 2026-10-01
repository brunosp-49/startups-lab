"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaretRight } from "@phosphor-icons/react";
import { onReady } from "@/lib/ready";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  eyebrow: string;
  title: string[];
  text?: string;
  crumbs?: { href?: string; label: string }[];
  image?: { src: string; alt: string };
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, text, crumbs, image, children }: Props) {
  const root = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const trail = [
    { name: "Início", path: "/" },
    ...(crumbs ?? []).map((crumb, index, list) => ({
      name: crumb.label,
      path: crumb.href ?? (index === list.length - 1 ? pathname : "/"),
    })),
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-ph-line] > span", { yPercent: 110 });
      gsap.set("[data-ph-fade]", { opacity: 0, y: 24 });
      if (image) {
        gsap.set("[data-ph-image]", { clipPath: "inset(30% 8% 0% 8% round 28px)" });
        gsap.set("[data-ph-image] img", { scale: 1.3 });
      }

      const path = root.current?.querySelector<SVGPathElement>("[data-ph-curve]");
      const len = path?.getTotalLength() ?? 0;
      if (path) gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      const off = onReady(() => {
        const tl = gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to("[data-ph-line] > span", { yPercent: 0, duration: 1.3, stagger: 0.09 }, 0.1)
          .to("[data-ph-fade]", { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.5);
        if (path) tl.to(path, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut" }, 0.2);
        if (image) {
          tl.to("[data-ph-image]", { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.6, ease: "expo.inOut" }, 0.4)
            .to("[data-ph-image] img", { scale: 1.08, duration: 2, ease: "expo.out" }, 0.4);
        }
      });

      gsap.to("[data-ph-glow]", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      if (image) {
        gsap.to("[data-ph-image] img", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: "[data-ph-image]", start: "top bottom", end: "bottom top", scrub: true },
        });
      }
      return off;
    }, root);
    return () => ctx.revert();
  }, [image]);

  return (
    <section ref={root} className="relative overflow-hidden bg-[var(--ink)] pb-16 pt-36 md:pb-24 md:pt-48">
      <div
        data-ph-glow
        className="pointer-events-none absolute -right-40 -top-56 h-[720px] w-[720px] rounded-full opacity-45 blur-[140px]"
        style={{ background: "radial-gradient(circle, #2f5bf0, transparent 65%)" }}
      />
      <div
        data-ph-glow
        className="pointer-events-none absolute -left-48 top-40 h-[520px] w-[520px] rounded-full opacity-20 blur-[140px]"
        style={{ background: "radial-gradient(circle, #22d3ee, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse 80% 70% at 60% 30%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 60% 30%, black, transparent 75%)",
        }}
      />
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-[80%] w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          data-ph-curve
          d="M-40 520 C 300 380, 520 700, 820 480 S 1200 180, 1480 300"
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
        {crumbs && <JsonLd data={breadcrumbJsonLd(trail)} />}
        {crumbs && (
          <nav data-ph-fade aria-label="Você está em" className="mb-10 flex items-center gap-2 text-[13px] text-white/45">
            <Link href="/" className="transition hover:text-white">
              Início
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <CaretRight className="h-3 w-3" />
                {c.href ? (
                  <Link href={c.href} className="transition hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <p
          data-ph-fade
          className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[var(--accent)]"
        >
          <span className="h-px w-8 bg-[var(--accent)]" />
          {eyebrow}
        </p>

        <h1
          className={`mt-7 font-medium leading-[0.98] tracking-[-0.045em] text-white ${
            title.length > 3
              ? "max-w-[16ch] text-[clamp(2.15rem,5vw,4.4rem)]"
              : "max-w-[15ch] text-[clamp(2.7rem,7vw,6.6rem)]"
          }`}
        >
          {title.map((line, i) => (
            <span key={line} data-ph-line className="split-line">
              <span>
                {line}
                {i === title.length - 1 && (
                  <span className="brand-gradient-text ml-[0.12em] inline-block italic">/</span>
                )}
              </span>
            </span>
          ))}
        </h1>

        {(text || children) && (
          <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
            {text && (
              <p data-ph-fade className="max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
                {text}
              </p>
            )}
            {children && (
              <div data-ph-fade className="flex flex-wrap gap-3">
                {children}
              </div>
            )}
          </div>
        )}

        {image && (
          <div data-ph-image className="relative mt-16 aspect-[16/9] overflow-hidden rounded-[28px] md:mt-24 md:aspect-[21/9]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              loading="eager"
              sizes="(min-width: 1320px) 1240px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,16,0.55)] via-transparent to-transparent" />
            <div
              className="absolute inset-0 mix-blend-color opacity-40"
              style={{ background: "linear-gradient(120deg, #2f5bf0, #14b8a6)" }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
