"use client";

import { type ReactNode } from "react";
import { Button } from "@repo/ui";
import { trackEvent } from "../lib/analytics";
import { useConsultation } from "./ConsultationProvider";

type ConsultationButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  trailingIcon?: ReactNode;
  className?: string;
  eventLocation?: string;
};

export default function ConsultationButton({
  children,
  variant = "primary",
  trailingIcon,
  className,
  eventLocation = "site",
}: ConsultationButtonProps) {
  const open = useConsultation();
  return (
    <Button
      variant={variant}
      trailingIcon={trailingIcon}
      className={className}
      aria-haspopup="dialog"
      onClick={() => {
        trackEvent("consultation_cta_click", {
          cta_location: eventLocation,
          cta_text:
            typeof children === "string" ? children : "Consultation CTA",
        });
        open();
      }}
    >
      {children}
    </Button>
  );
}
