import { track } from "@/lib/analytics";

export const LEAD_FORM_EVENT = "buildit:lead-form";

export type ServiceKey = "app" | "software" | "ia" | "marketing" | "startup";

export function openLeadForm(services: ServiceKey[] = []) {
  track("lead_form_open", { services: services.join(",") });
  window.dispatchEvent(new CustomEvent<ServiceKey[]>(LEAD_FORM_EVENT, { detail: services }));
}
