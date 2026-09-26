export const LEAD_FORM_EVENT = "buildit:lead-form";

export type ServiceKey = "app" | "software" | "ia" | "marketing" | "startup";

export function openLeadForm(services: ServiceKey[] = []) {
  window.dispatchEvent(new CustomEvent<ServiceKey[]>(LEAD_FORM_EVENT, { detail: services }));
}
