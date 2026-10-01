"use client";

import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";

export function WhatsAppLink({
  place,
  onClick,
  ...props
}: ComponentProps<"a"> & { place: string }) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      {...props}
      onClick={(event) => {
        track("whatsapp_click", { link_place: place });
        onClick?.(event);
      }}
    />
  );
}
