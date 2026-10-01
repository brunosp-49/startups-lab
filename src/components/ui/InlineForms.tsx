"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { track } from "@/lib/analytics";
import { Chips, Field, Honeypot, isEmail } from "./FormFields";

type Status = "idle" | "sending" | "error" | "done";

function useSubmit(type: "contato" | "carreira") {
  const [status, setStatus] = useState<Status>("idle");
  const send = async (payload: Record<string, string>) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...payload }),
      });
      if (!res.ok) throw new Error();
      if (type === "contato") track("generate_lead", { form_name: "contato" });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };
  return { status, send, reset: () => setStatus("idle") };
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[var(--ink-2)] p-6 md:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#2f5bf0] opacity-30 blur-[100px]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Success({ title, text, onReset }: { title: string; text: string; onReset: () => void }) {
  return (
    <div className="flex min-h-[420px] flex-col justify-center">
      <CheckCircle weight="fill" className="h-16 w-16 text-[var(--accent)]" />
      <h3 className="mt-8 text-[clamp(2rem,3.4vw,2.8rem)] font-medium leading-[1.05] text-white">{title}</h3>
      <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/65">{text}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-10 w-fit rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/50"
      >
        Enviar outra mensagem
      </button>
    </div>
  );
}

function Submit({ status, disabled, children }: { status: Status; disabled: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs leading-relaxed text-white/35">Usamos seus dados apenas para responder ao seu contato.</p>
      <button
        type="submit"
        disabled={disabled || status === "sending"}
        className="group inline-flex h-14 shrink-0 items-center justify-center gap-2.5 rounded-full bg-[var(--accent)] px-8 text-sm font-semibold text-[var(--accent-ink)] transition-colors duration-300 hover:bg-white disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
      >
        {status === "sending" ? (
          <>
            Enviando
            <CircleNotch weight="bold" className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            {children}
            <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-enabled:group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </div>
  );
}

const subjects = ["Novo projeto", "Parceria", "Imprensa", "Outro assunto"];

export function ContactForm() {
  const { status, send, reset } = useSubmit("contato");
  const [d, setD] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "", website: "" });
  const set = (k: keyof typeof d) => (v: string) => setD((s) => ({ ...s, [k]: v }));
  const valid = d.name.trim().length >= 2 && isEmail(d.email) && d.message.trim().length >= 5;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (valid) send(d);
  };

  return (
    <Panel>
      {status === "done" ? (
        <Success
          title={`Mensagem enviada, ${d.name.trim().split(" ")[0]}!`}
          text="Recebemos seu contato e retornamos em até 1 dia útil."
          onReset={() => {
            setD({ ...d, subject: "", message: "" });
            reset();
          }}
        />
      ) : (
        <form onSubmit={onSubmit} noValidate className="grid gap-4">
          <div>
            <p className="text-sm font-medium text-white">Sobre o que você quer falar?</p>
            <Chips options={subjects} value={d.subject} onChange={set("subject")} className="mt-4 mb-4" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome *" value={d.name} onChange={set("name")} autoComplete="name" />
            <Field
              label="E-mail *"
              type="email"
              value={d.email}
              onChange={set("email")}
              autoComplete="email"
              invalid={d.email.length > 4 && !isEmail(d.email)}
            />
            <Field label="WhatsApp" type="tel" value={d.phone} onChange={set("phone")} autoComplete="tel" />
            <Field label="Empresa" value={d.company} onChange={set("company")} autoComplete="organization" />
          </div>
          <Field label="Mensagem *" value={d.message} onChange={set("message")} multiline />
          <Honeypot value={d.website} onChange={set("website")} />
          {status === "error" && (
            <p className="text-sm text-[#ff8a8a]">Não conseguimos enviar agora. Tente novamente em instantes.</p>
          )}
          <div className="mt-2">
            <Submit status={status} disabled={!valid}>
              Enviar mensagem
            </Submit>
          </div>
        </form>
      )}
    </Panel>
  );
}

const areas = ["Tecnologia", "Design", "Marketing & Growth", "IA & Dados", "Operações & Vendas", "Outra"];

export function CareersForm() {
  const { status, send, reset } = useSubmit("carreira");
  const [d, setD] = useState({ name: "", email: "", phone: "", portfolio: "", area: "", message: "", website: "" });
  const set = (k: keyof typeof d) => (v: string) => setD((s) => ({ ...s, [k]: v }));
  const valid = d.name.trim().length >= 2 && isEmail(d.email) && d.area !== "";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (valid) send(d);
  };

  return (
    <Panel>
      {status === "done" ? (
        <Success
          title="Candidatura recebida!"
          text="Obrigado pelo interesse. Seu perfil entra no nosso banco de talentos e falamos com você quando houver uma oportunidade compatível."
          onReset={() => {
            setD({ name: "", email: "", phone: "", portfolio: "", area: "", message: "", website: "" });
            reset();
          }}
        />
      ) : (
        <form onSubmit={onSubmit} noValidate className="grid gap-4">
          <div>
            <p className="text-sm font-medium text-white">Qual a sua área? *</p>
            <Chips options={areas} value={d.area} onChange={set("area")} className="mt-4 mb-4" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome completo *" value={d.name} onChange={set("name")} autoComplete="name" />
            <Field
              label="E-mail *"
              type="email"
              value={d.email}
              onChange={set("email")}
              autoComplete="email"
              invalid={d.email.length > 4 && !isEmail(d.email)}
            />
            <Field label="WhatsApp" type="tel" value={d.phone} onChange={set("phone")} autoComplete="tel" />
            <Field label="LinkedIn ou portfólio" type="url" value={d.portfolio} onChange={set("portfolio")} autoComplete="url" />
          </div>
          <Field label="Conte um pouco sobre você" value={d.message} onChange={set("message")} multiline />
          <Honeypot value={d.website} onChange={set("website")} />
          {status === "error" && (
            <p className="text-sm text-[#ff8a8a]">Não conseguimos enviar agora. Tente novamente em instantes.</p>
          )}
          <div className="mt-2">
            <Submit status={status} disabled={!valid}>
              Enviar candidatura
            </Submit>
          </div>
        </form>
      )}
    </Panel>
  );
}
