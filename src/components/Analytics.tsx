"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  type Consent,
  applyConsent,
  readConsent,
  track,
  writeConsent,
} from "@/lib/analytics";

export function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const initialConsent = useRef<Consent | null>(null);
  const tracked = useRef<string | null>(null);

  useEffect(() => {
    const stored = readConsent();
    initialConsent.current = stored;
    setConsent(stored);
    setOpen(stored === null);
    setReady(true);

    const onConsent = (event: Event) => {
      const value = (event as CustomEvent<Consent>).detail;
      setConsent(value);
      setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, onConsent);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!ready || consent !== "granted") return;
    applyConsent("granted");
    const query = window.location.search.replace(/^\?/, "");
    const path = query ? `${pathname}?${query}` : pathname;
    if (tracked.current === path) return;
    const first = tracked.current === null;
    tracked.current = path;
    if (first && initialConsent.current === "granted") return;
    track("page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [ready, consent, pathname]);

  useEffect(() => {
    if (!ready || consent !== "denied") return;
    applyConsent("denied");
  }, [ready, consent]);

  if (!ready || !open) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-[60] md:inset-x-auto md:bottom-8 md:left-8 md:max-w-sm">
      <div className="rounded-3xl border border-white/15 bg-[rgba(14,15,22,0.94)] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <p className="text-sm font-medium">Cookies de medição</p>
        <p className="mt-2 text-[13px] leading-relaxed text-white/70">
          Usamos cookies para saber de onde você veio, o que clicou e se a visita veio de um anúncio.
          Os cookies só são gravados se você aceitar.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => writeConsent("granted")}
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-ink)]"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={() => writeConsent("denied")}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
}
