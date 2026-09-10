"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};

export default function Turnstile({
  onToken,
}: {
  onToken: (token: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
    if (!ready || !container.current || !sitekey || !api) return;
    const id = api.render(container.current, {
      sitekey,
      action: "consultation",
      theme: "light",
      size: "flexible",
      callback: (token: string) => {
        setFailed(false);
        onToken(token);
      },
      "expired-callback": () => onToken(""),
      "error-callback": () => {
        onToken("");
        setFailed(true);
      },
    });
    return () => {
      api.remove(id);
    };
  }, [ready, sitekey, onToken]);

  if (!sitekey) return null;
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setReady(true)}
        onError={() => setFailed(true)}
      />
      <div ref={container} />
      {failed && (
        <p role="alert">
          Verification could not load. Please reopen the form to retry, or email{" "}
          <a href="mailto:jeff@cartra.ai">jeff@cartra.ai</a>.
        </p>
      )}
    </>
  );
}
