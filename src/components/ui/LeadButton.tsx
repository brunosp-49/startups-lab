"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { MagneticButton } from "@/components/MagneticButton";
import { openLeadForm, type ServiceKey } from "@/lib/lead-form";

const styles = {
  solid:
    "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-white",
  outline:
    "border border-white/25 text-white hover:border-white hover:bg-white/5",
};

export function LeadButton({
  children,
  services,
  href,
  variant = "solid",
}: {
  children: React.ReactNode;
  services?: ServiceKey[];
  href?: string;
  variant?: keyof typeof styles;
}) {
  return (
    <MagneticButton
      href={href}
      onClick={href ? undefined : () => openLeadForm(services)}
      className={`inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${styles[variant]}`}
    >
      <ArrowRight weight="bold" className="h-4 w-4" />
      {children}
    </MagneticButton>
  );
}
