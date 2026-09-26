declare global {
  interface Window {
    __builditReady?: boolean;
  }
}

export const READY_EVENT = "buildit:ready";

export function markReady() {
  window.__builditReady = true;
  window.dispatchEvent(new Event(READY_EVENT));
}

export function onReady(cb: () => void) {
  if (window.__builditReady) {
    cb();
    return () => {};
  }
  window.addEventListener(READY_EVENT, cb, { once: true });
  return () => window.removeEventListener(READY_EVENT, cb);
}
