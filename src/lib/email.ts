import { Resend } from "resend";
import { site } from "@/lib/site";

export type FormType = "lead" | "contato" | "carreira";

export type ContactPayload = {
  type: FormType;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  services?: string[];
  stage?: string;
  budget?: string;
  deadline?: string;
  subject?: string;
  area?: string;
  portfolio?: string;
};

const serviceLabels: Record<string, string> = {
  startup: "MVP",
  app: "Aplicativo",
  software: "Software e backend",
  ia: "IA e automação",
  marketing: "Growth",
};

const stageLabels: Record<string, string> = {
  ideia: "Só uma ideia",
  validando: "Validando",
  mvp: "Já tenho um MVP",
  escala: "Em operação",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function firstName(name: string) {
  return name.split(/\s+/)[0] || name;
}

function fromAddress() {
  return process.env.CONTACT_FROM_EMAIL ?? `Startups Lab <${site.email}>`;
}

function teamAddress() {
  return process.env.CONTACT_TO_EMAIL ?? site.email;
}

function fields(payload: ContactPayload) {
  const services = (payload.services ?? []).map((key) => serviceLabels[key] ?? key).join(", ");
  const stage = payload.stage ? (stageLabels[payload.stage] ?? payload.stage) : "";

  return [
    ["Nome", payload.name],
    ["E-mail", payload.email],
    ["WhatsApp", payload.phone ?? ""],
    ["Empresa", payload.company ?? ""],
    ["Interesse", services],
    ["Momento", stage],
    ["Investimento", payload.budget ?? ""],
    ["Prazo", payload.deadline ?? ""],
    ["Assunto", payload.subject ?? ""],
    ["Área", payload.area ?? ""],
    ["Portfólio", payload.portfolio ?? ""],
    ["Mensagem", payload.message ?? ""],
  ].filter(([, value]) => value.length > 0);
}

function copyFor(type: FormType, name: string) {
  if (type === "carreira") {
    return {
      notifySubject: `Nova candidatura — ${name}`,
      notifyTitle: "Nova candidatura pelo site",
      confirmSubject: "Recebemos sua candidatura",
      confirmTitle: `${firstName(name)}, recebemos sua candidatura`,
      confirmBody:
        "Obrigado pelo interesse. Seu perfil entra no nosso banco de talentos e falamos com você quando houver uma oportunidade compatível.",
    };
  }

  if (type === "contato") {
    return {
      notifySubject: `Novo contato — ${name}`,
      notifyTitle: "Nova mensagem pelo site",
      confirmSubject: "Recebemos sua mensagem",
      confirmTitle: `${firstName(name)}, recebemos sua mensagem`,
      confirmBody: "Vamos ler com atenção e responder em até 1 dia útil neste e-mail.",
    };
  }

  return {
    notifySubject: `Novo orçamento — ${name}`,
    notifyTitle: "Nova solicitação de orçamento",
    confirmSubject: "Recebemos o seu pedido",
    confirmTitle: `${firstName(name)}, recebemos o seu pedido`,
    confirmBody:
      "Vamos analisar o que você contou sobre o projeto e retornar em até 1 dia útil neste e-mail.",
  };
}

function wrap(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
  <body style="margin:0;padding:32px 16px;background:#f3f4f7;font-family:Inter,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:24px;padding:36px 32px;border:1px solid #eceff2">
      <p style="margin:0 0 24px;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#6b7280">Startups Lab</p>
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.15;font-weight:500;color:#14151c">${title}</h1>
      ${body}
    </div>
  </body>
</html>`;
}

function fieldRows(payload: ContactPayload) {
  return fields(payload)
    .map(
      ([label, value]) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #eceff2;color:#6b7280;font-size:13px;width:160px;vertical-align:top">${escapeHtml(label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eceff2;color:#14151c;font-size:15px;line-height:1.5">${escapeHtml(value).replaceAll("\n", "<br>")}</td>
      </tr>`,
    )
    .join("");
}

function notifyHtml(payload: ContactPayload, title: string) {
  return wrap(
    title,
    `<p style="margin:0 0 24px;color:#4b5563;font-size:16px;line-height:1.5">Responda este e-mail para falar direto com ${escapeHtml(firstName(payload.name))}.</p>
    <table style="width:100%;border-collapse:collapse">${fieldRows(payload)}</table>`,
  );
}

function confirmHtml(title: string, body: string) {
  return wrap(
    escapeHtml(title),
    `<p style="margin:0 0 24px;color:#4b5563;font-size:16px;line-height:1.6">${escapeHtml(body)}</p>
    <p style="margin:0;color:#9ca3af;font-size:13px">Startups Lab · ${escapeHtml(site.email)}</p>`,
  );
}

export async function sendContactEmails(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const copy = copyFor(payload.type, payload.name);
  const summary = fields(payload)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  if (!apiKey) {
    console.error("[email] RESEND_API_KEY ausente — a solicitação não saiu por e-mail.");
    console.log("[contact]", { ...payload, summary });
    return;
  }

  const resend = new Resend(apiKey);
  const from = fromAddress();
  const team = teamAddress();

  const notify = await resend.emails.send({
    from,
    to: team,
    replyTo: payload.email,
    subject: copy.notifySubject,
    html: notifyHtml(payload, copy.notifyTitle),
    text: `${copy.notifyTitle}\n\n${summary}`,
  });

  if (notify.error) {
    throw new Error(notify.error.message);
  }

  const confirm = await resend.emails.send({
    from,
    to: payload.email,
    replyTo: team,
    subject: copy.confirmSubject,
    html: confirmHtml(copy.confirmTitle, copy.confirmBody),
    text: `${copy.confirmTitle}\n\n${copy.confirmBody}\n\nStartups Lab · ${site.email}`,
  });

  if (confirm.error) {
    console.error("[email:confirm]", confirm.error);
  }
}
