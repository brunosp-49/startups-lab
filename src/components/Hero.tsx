"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "@phosphor-icons/react";
import { onReady } from "@/lib/ready";

gsap.registerPlugin(ScrollTrigger);

const lines = ["Desenvolvimento de", "aplicativos e produtos", "digitais para startups"];

const videos = ["/video/hero-typing.mp4", "/video/hero-team.mp4"];
const CROSSFADE = 1.2;

function HeroVideos() {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [srcs, setSrcs] = useState<(string | undefined)[]>([]);

  // Streaming <video> keeps HTTP connections open (and Chrome caps them at 6 per host),
  // which stalls client-side navigation. The clips are small, so each one is downloaded
  // once and played from memory instead.
  useEffect(() => {
    const controller = new AbortController();
    const urls: string[] = [];
    videos.forEach((src, i) => {
      fetch(src, { signal: controller.signal })
        .then((r) => r.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          urls.push(url);
          setSrcs((prev) => {
            const next = [...prev];
            next[i] = url;
            return next;
          });
        })
        .catch(() => {});
    });
    const els = refs.current;
    return () => {
      controller.abort();
      els.forEach((v) => v?.pause());
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  const currentReady = !!srcs[active];
  const nextReady = !!srcs[(active + 1) % videos.length];

  useEffect(() => {
    const current = refs.current[active];
    const next = refs.current[(active + 1) % videos.length];
    if (!current || !next || !currentReady) return;

    let switched = false;
    const onTime = () => {
      if (switched || !current.duration || !nextReady) return;
      if (current.duration - current.currentTime <= CROSSFADE) {
        switched = true;
        next.currentTime = 0;
        next.play().catch(() => {});
        setActive((a) => (a + 1) % videos.length);
      }
    };
    current.play().catch(() => {});
    current.addEventListener("timeupdate", onTime);
    return () => current.removeEventListener("timeupdate", onTime);
  }, [active, currentReady, nextReady]);

  return (
    <>
      {videos.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
          style={{ opacity: i === active ? 1 : 0, transitionDuration: `${CROSSFADE}s` }}
          src={srcs[i]}
          poster={i === 0 ? "/video/hero-poster.jpg" : undefined}
          muted
          playsInline
        />
      ))}
    </>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-line] > span", { yPercent: 110 });
      gsap.set("[data-hero-fade]", { opacity: 0, y: 24 });
      gsap.set("[data-hero-video]", { scale: 1.15 });

      const path = root.current?.querySelector<SVGPathElement>("[data-hero-curve]");
      const len = path?.getTotalLength() ?? 0;
      if (path) gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      const intro = () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to("[data-hero-video]", { scale: 1, duration: 2.4, ease: "power3.out" }, 0)
          .to("[data-hero-line] > span", { yPercent: 0, duration: 1.4, stagger: 0.1 }, 0.15)
          .to(path ?? {}, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }, 0.2)
          .to("[data-hero-fade]", { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.8);
      };
      const off = onReady(intro);

      gsap.to("[data-hero-content]", {
        yPercent: -30,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-media]", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      return off;
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="topo"
      ref={root}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[var(--ink)]"
    >
      <div data-hero-media className="absolute inset-0">
        <div data-hero-video className="absolute inset-0">
          <HeroVideos />
        </div>
        <div
          className="absolute inset-0 mix-blend-color opacity-60"
          style={{ background: "linear-gradient(120deg, #6b3cf6 0%, #2f5bf0 55%, #14b8a6 100%)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,transparent_0%,rgba(11,11,16,0.55)_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--ink)] via-[rgba(11,11,16,0.7)] to-transparent" />
      </div>

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          data-hero-curve
          d="M-40 620 C 240 520, 420 760, 720 560 S 1180 300, 1480 420"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        data-hero-content
        className="relative z-10 mx-auto flex h-full max-w-[1320px] flex-col justify-end px-5 pb-20 md:px-10 md:pb-24"
      >
        <h1 className="max-w-[14ch] text-[clamp(2.15rem,5.2vw,5.1rem)] font-medium leading-[0.98] tracking-[-0.045em] text-white sm:max-w-none">
          {lines.map((line, i) => (
            <span key={line} data-hero-line className="split-line">
              <span>
                {line}
                {i === lines.length - 1 && (
                  <span className="brand-gradient-text ml-[0.15em] inline-block italic">/</span>
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div data-hero-fade className="max-w-md">
            <p className="text-lg leading-snug text-white md:text-xl">Tem uma ideia. A gente coloca ela no ar.</p>
            <p className="mt-3 text-base leading-relaxed text-white/70 md:text-lg">
              Transformamos ideias em MVPs, aplicativos e softwares prontos para chegar ao mercado e
              evoluir.
            </p>
          </div>

          <a
            data-hero-fade
            href="#servicos"
            aria-label="Rolar para serviços"
            className="group relative hidden h-32 w-32 shrink-0 items-center justify-center md:flex"
          >
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite]">
              <defs>
                <path id="hero-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text className="fill-white/70 text-[10px] font-medium uppercase">
                <textPath href="#hero-circle" textLength="286" lengthAdjust="spacing">
                  ideia • produto • evolução • ideia • produto • evolução •
                </textPath>
              </text>
            </svg>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] transition-transform duration-500 group-hover:scale-110">
              <ArrowDown weight="bold" className="h-5 w-5 transition-transform duration-500 group-hover:translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
