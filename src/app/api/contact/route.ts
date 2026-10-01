import { sendContactEmails, type ContactPayload, type FormType } from "@/lib/email";

type Submission = {
  type?: FormType;
  services?: string[];
  name?: string;
  email?: string;
  message?: string;
  area?: string;
  website?: string;
  [key: string]: unknown;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function str(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Submission;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden "website" field.
  if (body.website) return Response.json({ ok: true });

  const type = body.type ?? "lead";
  const name = str(body.name);
  const email = str(body.email);
  const services = Array.isArray(body.services)
    ? body.services.filter((item): item is string => typeof item === "string" && item.length > 0)
    : [];

  const specificOk =
    type === "lead"
      ? services.length > 0
      : type === "contato"
        ? str(body.message).length >= 5
        : str(body.area).length > 0;

  if (name.length < 2 || !isEmail(email) || !specificOk) {
    return Response.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  const payload: ContactPayload = {
    type,
    name,
    email,
    phone: str(body.phone),
    company: str(body.company),
    message: str(body.message),
    services,
    stage: str(body.stage),
    budget: str(body.budget),
    deadline: str(body.deadline),
    subject: str(body.subject),
    area: str(body.area),
    portfolio: str(body.portfolio),
  };

  try {
    await sendContactEmails(payload);
  } catch (error) {
    console.error("[contact]", error);
    return Response.json({ ok: false, error: "email_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
