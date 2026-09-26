"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  ChartLineUp,
  Check,
  CircleNotch,
  Code,
  DeviceMobile,
  RocketLaunch,
  WhatsappLogo,
  X,
  type Icon,
} from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { LEAD_FORM_EVENT, type ServiceKey } from "@/lib/lead-form";
import { Chips, Field, Honeypot, isEmail } from "@/components/ui/FormFields";

const serviceOptions: { key: ServiceKey; icon: Icon; label: string; hint: string }[] = [
  { key: "app", icon: DeviceMobile, label: "Aplicativo", hint: "Android e iOS" },
  { key: "software", icon: Code, label: "Software sob medida", hint: "Plataformas e sistemas" },
  { key: "ia", icon: Brain, label: "IA e automações", hint: "Agentes e integrações" },
  { key: "marketing", icon: ChartLineUp, label: "Marketing e growth", hint: "Performance e branding" },
  { key: "startup", icon: RocketLaunch, label: "Startup / MVP", hint: "Da hipótese à escala" },
];

const stages = [
  { value: "ideia", label: "Só uma ideia", hint: "Quero entender se faz sentido" },
  { value: "validando", label: "Validando", hint: "Tenho um protótipo ou pesquisa" },
  { value: "mvp", label: "Já tenho um MVP", hint: "Preciso evoluir o produto" },
  { value: "escala", label: "Em operação", hint: "Quero escalar ou otimizar" },
];

const budgets = ["Até R$ 20 mil", "R$ 20–50 mil", "R$ 50–150 mil", "Acima de R$ 150 mil", "Ainda não sei"];
const deadlines = ["O quanto antes", "Em 1–3 meses", "Em 3–6 meses", "Sem pressa"];

const steps = [
  { eyebrow: "Seu projeto", title: "O que você quer construir?", hint: "Escolha uma ou mais opções." },
  { eyebrow: "Momento", title: "Em que fase está o projeto?", hint: "Isso nos ajuda a indicar o melhor caminho." },
  { eyebrow: "Detalhes", title: "Conte um pouco mais", hint: "Opcional — mas quanto mais contexto, melhor." },
  { eyebrow: "Contato", title: "Como falamos com você?", hint: "Respondemos em até 1 dia útil." },
];

const MAX_MESSAGE = 800;

type Status = "idle" | "sending" | "error" | "done";

const initial = {
  services: [] as ServiceKey[],
  stage: "",
  budget: "",
  deadline: "",
  message: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
};

export function LeadForm() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  const set = <K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  useEffect(() => {
    const onOpen = (e: Event) => {
      const preset = (e as CustomEvent<ServiceKey[]>).detail ?? [];
      closing.current = false;
      setStatus("idle");
      setStep(0);
      setData((d) => ({ ...(d.name ? d : initial), services: preset.length ? preset : d.services }));
      setMounted(true);
    };
    window.addEventListener(LEAD_FORM_EVENT, onOpen);
    return () => window.removeEventListener(LEAD_FORM_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0).fromTo(
      panelRef.current,
      { xPercent: 104 },
      { xPercent: 0, duration: 1 },
      0,
    );
    panelRef.current?.focus();
    return () => {
      tl.kill();
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [mounted]);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    gsap
      .timeline({ defaults: { ease: "expo.in" }, onComplete: () => setMounted(false) })
      .to(panelRef.current, { xPercent: 104, duration: 0.6 }, 0)
      .to(overlayRef.current, { opacity: 0, duration: 0.5 }, 0.1);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, close]);

  useEffect(() => {
    if (!mounted || !bodyRef.current) return;
    bodyRef.current.scrollTop = 0;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-lf-item]",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.05 },
      );
      gsap.fromTo(
        "[data-lf-check]",
        { strokeDashoffset: 60 },
        { strokeDashoffset: 0, duration: 0.9, delay: 0.25, ease: "power3.out" },
      );
    }, bodyRef);
    return () => ctx.revert();
  }, [mounted, step, status]);

  const valid = [
    data.services.length > 0,
    data.stage !== "",
    true,
    data.name.trim().length >= 2 && isEmail(data.email),
  ][step];

  const toggleService = (key: ServiceKey) =>
    setData((d) => ({
      ...d,
      services: d.services.includes(key) ? d.services.filter((s) => s !== key) : [...d.services, key],
    }));

  const submit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!valid || status === "sending") return;
    if (step < steps.length - 1) setStep((s) => s + 1);
    else submit();
  };

  if (!mounted) return null;

  const firstName = data.name.trim().split(" ")[0];
  const whatsappText = encodeURIComponent(
    `Olá! Sou ${data.name.trim()} e acabei de enviar o formulário no site da Startups Lab.`,
  );
  const progress = status === "done" ? 1 : (step + 1) / steps.length;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Formulário de contato">
      <div
        ref={overlayRef}
        onClick={close}
        className="absolute inset-0 bg-[rgba(6,7,12,0.65)] backdrop-blur-md"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-[620px] flex-col overflow-hidden bg-[var(--ink-2)] outline-none md:inset-y-3 md:right-3 md:rounded-[28px] md:border md:border-white/10 md:shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
      >
        <div className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#2f5bf0] opacity-25 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-48 -left-24 h-[360px] w-[360px] rounded-full bg-[var(--accent)] opacity-[0.08] blur-[120px]" />

        <header className="relative flex items-center justify-between px-6 pb-5 pt-6 md:px-10 md:pt-8">
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-white/50">
            <span className="text-[var(--accent)]">
              {status === "done" ? "Pronto" : `0${step + 1}`}
            </span>
            <span className="h-px w-6 bg-white/20" />
            <span>{status === "done" ? "Enviado" : steps[step].eyebrow}</span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Fechar formulário"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40 hover:bg-white/5"
          >
            <X className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
          </button>
        </header>

        <div className="relative mx-6 h-[3px] overflow-hidden rounded-full bg-white/10 md:mx-10">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
            style={{ width: `${progress * 100}%`, background: "var(--brand-gradient)" }}
          />
        </div>

        <form onSubmit={onSubmit} className="relative flex min-h-0 flex-1 flex-col" noValidate>
          <div ref={bodyRef} data-lenis-prevent className="flex-1 overflow-y-auto px-6 pb-8 pt-10 md:px-10">
            {status === "done" ? (
              <div className="flex min-h-full flex-col justify-center pb-10">
                <div data-lf-item className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)]">
                  <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
                    <path
                      data-lf-check
                      d="M10 21 L17 28 L30 13"
                      stroke="var(--accent-ink)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="60"
                    />
                  </svg>
                </div>
                <h2 data-lf-item className="mt-10 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.02] text-white">
                  Recebemos, {firstName}!
                </h2>
                <p data-lf-item className="mt-5 max-w-md text-base leading-relaxed text-white/65">
                  Nosso time vai analisar o seu projeto e retornar em até 1 dia útil pelo e-mail{" "}
                  <span className="text-white">{data.email.trim()}</span>.
                </p>
                <div data-lf-item className="mt-10 flex flex-wrap gap-3">
                  <a
                    href={`${site.whatsapp}?text=${whatsappText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center gap-2.5 rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--accent-ink)] transition hover:bg-white"
                  >
                    <WhatsappLogo weight="fill" className="h-[18px] w-[18px]" />
                    Adiantar pelo WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white transition hover:border-white/40"
                  >
                    Voltar ao site
                  </button>
                </div>
              </div>
            ) : (
              <div key={step}>
                <h2 data-lf-item className="text-[clamp(2rem,4.4vw,3rem)] leading-[1.04] text-white">
                  {steps[step].title}
                </h2>
                <p data-lf-item className="mt-3 text-[15px] text-white/55">
                  {steps[step].hint}
                </p>

                <div className="mt-9">
                  {step === 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {serviceOptions.map(({ key, icon: IconCmp, label, hint }) => {
                        const on = data.services.includes(key);
                        return (
                          <button
                            key={key}
                            type="button"
                            data-lf-item
                            aria-pressed={on}
                            onClick={() => toggleService(key)}
                            className={`group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-colors duration-300 last:odd:col-span-2 md:p-5 ${
                              on
                                ? "border-[var(--accent)] bg-[rgba(46,242,216,0.08)]"
                                : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                            }`}
                          >
                            <span
                              className={`absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 ${
                                on
                                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                                  : "border-white/20 text-transparent"
                              }`}
                            >
                              <Check weight="bold" className="h-3 w-3" />
                            </span>
                            <IconCmp
                              weight="light"
                              className={`h-9 w-9 transition-all duration-500 group-hover:-translate-y-0.5 ${
                                on ? "text-[var(--accent)]" : "text-white/80"
                              }`}
                            />
                            <span className="mt-5 text-[15px] font-medium leading-tight text-white md:text-base">
                              {label}
                            </span>
                            <span className="mt-1 text-xs text-white/45 md:text-[13px]">{hint}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {step === 1 && (
                    <>
                      <div className="grid gap-2.5">
                        {stages.map((s, i) => {
                          const on = data.stage === s.value;
                          return (
                            <button
                              key={s.value}
                              type="button"
                              data-lf-item
                              aria-pressed={on}
                              onClick={() => set("stage", s.value)}
                              className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300 ${
                                on
                                  ? "border-[var(--accent)] bg-[rgba(46,242,216,0.08)]"
                                  : "border-white/10 bg-white/[0.03] hover:border-white/25"
                              }`}
                            >
                              <span
                                className={`text-xs font-medium tabular-nums ${on ? "text-[var(--accent)]" : "text-white/35"}`}
                              >
                                0{i + 1}
                              </span>
                              <span className="flex-1">
                                <span className="block text-base font-medium text-white">{s.label}</span>
                                <span className="mt-0.5 block text-[13px] text-white/45">{s.hint}</span>
                              </span>
                              <span
                                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                                  on ? "border-[var(--accent)]" : "border-white/25"
                                }`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-full bg-[var(--accent)] transition-transform duration-300 ${
                                    on ? "scale-100" : "scale-0"
                                  }`}
                                />
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <p data-lf-item className="mt-10 text-sm font-medium text-white">
                        Investimento previsto <span className="text-white/40">(opcional)</span>
                      </p>
                      <Chips
                        options={budgets}
                        value={data.budget}
                        onChange={(v) => set("budget", v)}
                      />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div data-lf-item className="relative">
                        <textarea
                          value={data.message}
                          maxLength={MAX_MESSAGE}
                          onChange={(e) => set("message", e.target.value)}
                          rows={6}
                          placeholder="Ex.: Quero criar um app de agendamento para clínicas, com pagamentos e lembretes automáticos…"
                          className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-[15px] leading-relaxed text-white outline-none transition-colors placeholder:text-white/30 focus:border-[var(--accent)]"
                        />
                        <span className="absolute bottom-4 right-5 text-xs tabular-nums text-white/35">
                          {data.message.length}/{MAX_MESSAGE}
                        </span>
                      </div>

                      <p data-lf-item className="mt-10 text-sm font-medium text-white">
                        Para quando você precisa?
                      </p>
                      <Chips
                        options={deadlines}
                        value={data.deadline}
                        onChange={(v) => set("deadline", v)}
                      />
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          label="Nome *"
                          value={data.name}
                          onChange={(v) => set("name", v)}
                          autoComplete="name"
                          className="sm:col-span-2"
                        />
                        <Field
                          label="E-mail *"
                          type="email"
                          value={data.email}
                          onChange={(v) => set("email", v)}
                          autoComplete="email"
                          invalid={data.email.length > 4 && !isEmail(data.email)}
                        />
                        <Field
                          label="WhatsApp"
                          type="tel"
                          value={data.phone}
                          onChange={(v) => set("phone", v)}
                          autoComplete="tel"
                        />
                        <Field
                          label="Empresa"
                          value={data.company}
                          onChange={(v) => set("company", v)}
                          autoComplete="organization"
                          className="sm:col-span-2"
                        />
                      </div>
                      <Honeypot value={data.website} onChange={(v) => set("website", v)} />

                      <div data-lf-item className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Resumo</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {data.services.map((key) => (
                            <span
                              key={key}
                              className="rounded-full bg-[rgba(46,242,216,0.12)] px-3 py-1 text-xs font-medium text-[var(--accent)]"
                            >
                              {serviceOptions.find((o) => o.key === key)?.label}
                            </span>
                          ))}
                          {[stages.find((s) => s.value === data.stage)?.label, data.budget, data.deadline]
                            .filter(Boolean)
                            .map((v) => (
                              <span key={v} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-white/70">
                                {v}
                              </span>
                            ))}
                        </div>
                      </div>

                      {status === "error" && (
                        <p className="mt-5 text-sm text-[#ff8a8a]">
                          Não conseguimos enviar agora. Tente novamente ou fale com a gente pelo WhatsApp.
                        </p>
                      )}
                      <p data-lf-item className="mt-5 text-xs leading-relaxed text-white/35">
                        Usamos seus dados apenas para responder ao seu contato.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {status !== "done" && (
            <footer className="relative flex items-center justify-between gap-4 border-t border-white/10 px-6 py-5 md:px-10">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className={`inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white ${
                  step === 0 ? "invisible" : ""
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </button>

              <div className="flex items-center gap-5">
                <span className="hidden text-xs tabular-nums text-white/35 sm:block">
                  {step + 1} de {steps.length}
                </span>
                <button
                  type="submit"
                  disabled={!valid || status === "sending"}
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-[var(--accent)] pl-6 pr-5 text-sm font-semibold text-[var(--accent-ink)] transition-all duration-300 hover:bg-white disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
                >
                  {status === "sending" ? (
                    <>
                      Enviando
                      <CircleNotch weight="bold" className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      {step === steps.length - 1 ? "Enviar" : "Continuar"}
                      <ArrowRight
                        weight="bold"
                        className="h-4 w-4 transition-transform duration-300 group-enabled:group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </div>
            </footer>
          )}
        </form>
      </div>
    </div>
  );
}
