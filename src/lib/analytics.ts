export const GOOGLE_ADS_ID = "AW-18485664348";

export const CONSENT_KEY = "startupslab-consent";
export const CONSENT_EVENT = "startupslab:consent";
export const CONSENT_OPEN_EVENT = "startupslab:consent-open";

export type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function applyConsent(value: Consent) {
  if (typeof window === "undefined") return;
  const state = value === "granted" ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

export function writeConsent(value: Consent) {
  localStorage.setItem(CONSENT_KEY, value);
  applyConsent(value);
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: value }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

export function track(event: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
