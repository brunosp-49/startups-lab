type Submission = {
  type?: "lead" | "contato" | "carreira";
  services?: string[];
  name?: string;
  email?: string;
  message?: string;
  area?: string;
  website?: string;
  [key: string]: unknown;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

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
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  const specificOk =
    type === "lead"
      ? Array.isArray(body.services) && body.services.length > 0
      : type === "contato"
        ? typeof body.message === "string" && body.message.trim().length >= 5
        : typeof body.area === "string" && body.area.length > 0;

  if (name.length < 2 || !isEmail(email) || !specificOk) {
    return Response.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  // TODO: enviar para e-mail/CRM (ex.: Resend, HubSpot) — por enquanto só registra no servidor.
  console.log(`[${type}]`, { ...body, name, email, receivedAt: new Date().toISOString() });

  return Response.json({ ok: true });
}
