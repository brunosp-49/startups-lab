"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import {
  ArrowRight,
  ArrowUpRight,
  CaretDown,
  // InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { BrandLockup } from "./BrandLockup";
import { nav, site, type NavItem } from "@/lib/site";
import { onReady } from "@/lib/ready";
import { openLeadForm } from "@/lib/lead-form";

const images = [...new Set(nav.flatMap((item) => [item.image, ...(item.children ?? []).map((c) => c.image)]))];
const isMobile = () => typeof window !== "undefined" && !window.matchMedia("(min-width: 768px)").matches;

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState(1);
  const [preview, setPreview] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (item: NavItem) =>
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || !!item.children?.some((c) => c.href === pathname);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    gsap.set(header, { yPercent: -100, opacity: 0 });
    const off = onReady(() =>
      gsap.to(header, { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.3 }),
    );

    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 60);
      if (!document.body.dataset.menuOpen) {
        const hide = y > last && y > 400;
        gsap.to(header, { yPercent: hide ? -110 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      off();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const tl = gsap.timeline({ paused: true });
    tl.set(menu, { visibility: "visible" })
      .fromTo(
        menu,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" },
      )
      .fromTo(
        menu.querySelectorAll("[data-menu-link] > span"),
        { yPercent: 110 },
        { yPercent: 0, duration: 0.8, stagger: 0.06, ease: "expo.out" },
        "-=0.35",
      )
      .fromTo(
        menu.querySelectorAll("[data-menu-fade]"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" },
        "-=0.6",
      );
    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) {
      document.body.dataset.menuOpen = "1";
      window.__lenis?.stop();
      gsap.to(headerRef.current, { yPercent: 0, duration: 0.4 });
      tl.timeScale(1).play();
    } else {
      delete document.body.dataset.menuOpen;
      window.__lenis?.start();
      tl.timeScale(1.6).reverse();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const items = menuRef.current?.querySelectorAll("[data-sub-item]");
    if (!items?.length) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out", overwrite: true },
    );
  }, [active, open]);

  const close = () => setOpen(false);
  const toggle = () => {
    if (!open) {
      const current = nav.findIndex((item) => item.children && isActive(item));
      setActive(current >= 0 ? current : isMobile() ? -1 : 1);
      setPreview(null);
    }
    setOpen((v) => !v);
  };

  const focusItem = (i: number) => {
    setActive(i);
    setPreview(null);
  };

  const current = nav[active] ?? nav[1];
  const shownImage = preview ?? current.image;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          solid && !open
            ? "border-b border-white/5 bg-[rgba(11,11,16,0.6)] backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-5 md:h-24 md:px-10">
          <Link href="/" onClick={close} aria-label="Startups Lab — início">
            <BrandLockup size="sm" preload />
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openLeadForm()}
              className="hidden items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--accent-ink)] transition hover:bg-white md:inline-flex"
            >
              <ArrowRight weight="bold" className="h-3.5 w-3.5" />
              Fale agora
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              className="group relative flex h-11 w-11 items-center justify-center"
            >
              <span
                className={`absolute h-[2px] w-7 bg-white transition-transform duration-500 ${
                  open ? "rotate-45" : "-translate-y-[5px] group-hover:-translate-y-[7px]"
                }`}
              />
              <span
                className={`absolute h-[2px] bg-white transition-all duration-500 ${
                  open ? "w-7 -rotate-45" : "w-5 translate-x-1 translate-y-[5px] group-hover:w-7 group-hover:translate-x-0 group-hover:translate-y-[7px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        className="invisible fixed inset-0 z-[45] overflow-y-auto overflow-x-hidden bg-[var(--ink-2)]"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, #6b3cf6, transparent 65%)" }}
        />
        <div className="relative mx-auto flex min-h-full max-w-[1320px] flex-col px-5 pb-10 pt-28 md:px-10 md:pt-36">
          <div className="grid flex-1 gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16 lg:gap-24">
            <nav className="flex flex-col justify-center">
              {nav.map((item, i) => {
                const on = i === active;
                const label = (
                  <span className="flex w-full items-center gap-4">
                    <span
                      className={`text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[1.05] tracking-[-0.04em] transition-colors duration-500 ${
                        on ? "text-white" : "text-white/30 hover:text-white/60"
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive(item) && <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />}
                    {item.children ? (
                      <CaretDown
                        weight="light"
                        className={`ml-auto h-6 w-6 text-white/50 transition-transform duration-500 md:hidden ${on ? "rotate-180" : ""}`}
                      />
                    ) : (
                      <ArrowUpRight
                        weight="light"
                        className={`ml-auto h-7 w-7 text-[var(--accent)] transition duration-500 ${
                          on ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                        }`}
                      />
                    )}
                  </span>
                );
                return (
                  <div key={item.label} className="border-b border-white/[0.07] py-2 md:py-3">
                    {item.children ? (
                      <button
                        type="button"
                        data-menu-link
                        onClick={() => {
                          if (!isMobile()) {
                            close();
                            router.push(item.href);
                          } else setActive(on ? -1 : i);
                        }}
                        onMouseEnter={() => focusItem(i)}
                        onFocus={() => focusItem(i)}
                        aria-expanded={on}
                        className="block w-full overflow-hidden text-left"
                      >
                        {label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={close}
                        onMouseEnter={() => focusItem(i)}
                        onFocus={() => focusItem(i)}
                        data-menu-link
                        className="block overflow-hidden"
                      >
                        {label}
                      </Link>
                    )}

                    {item.children && (
                      <div
                        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] md:hidden ${
                          on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <ul className="overflow-hidden">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={close}
                                className="flex items-center justify-between py-2.5 pr-1 first:pt-4"
                              >
                                <span>
                                  <span className={`block text-lg ${pathname === c.href ? "text-[var(--accent)]" : "text-white"}`}>
                                    {c.label}
                                  </span>
                                  <span className="block text-sm text-white/45">{c.text}</span>
                                </span>
                                <ArrowRight weight="light" className="h-5 w-5 text-white/50" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div data-menu-fade className="hidden flex-col justify-center md:flex">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-white/5">
                {images.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 40vw, 1px"
                    className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${
                      src === shownImage ? "scale-100 opacity-100" : "scale-110 opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,16,0.75)] via-transparent to-transparent" />
                <p key={current.label} data-sub-item className="absolute inset-x-6 bottom-5 max-w-sm text-[15px] leading-snug text-white/85">
                  {current.text}
                </p>
              </div>

              <div key={current.label} className="mt-6 min-h-[204px]" onMouseLeave={() => setPreview(null)}>
                {(current.children ?? [current]).map((c) => (
                  <Link
                    key={c.href + c.label}
                    href={c.href}
                    onClick={close}
                    onMouseEnter={() => setPreview(c.image)}
                    onFocus={() => setPreview(c.image)}
                    data-sub-item
                    className="group flex items-center justify-between border-b border-white/[0.07] py-4"
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        className={`text-xl font-medium tracking-[-0.02em] transition-colors duration-300 group-hover:text-[var(--accent)] ${
                          pathname === c.href ? "text-[var(--accent)]" : "text-white"
                        }`}
                      >
                        {c.label}
                      </span>
                      <span className="text-sm text-white/45">{current.children ? c.text : ""}</span>
                    </span>
                    <ArrowUpRight
                      weight="light"
                      className="h-5 w-5 text-white/40 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            data-menu-fade
            className="mt-12 flex flex-col gap-5 border-t border-white/[0.07] pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                {site.email}
              </a>
              <a href={site.phoneHref} className="transition-colors hover:text-white">
                {site.phone}
              </a>
              <span>{site.address.city}</span>
            </div>
            <div className="flex gap-2.5">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-white transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                <LinkedinLogo weight="fill" className="h-[18px] w-[18px]" />
              </a>
              {/* Instagram desativado até existir conta
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-white transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                <InstagramLogo weight="bold" className="h-[18px] w-[18px]" />
              </a>
              */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
