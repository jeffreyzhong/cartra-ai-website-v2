"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { TURNSTILE_ACTION, TURNSTILE_SITE_KEY } from "../lib/turnstile";

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};

export default function Turnstile({
  onToken,
  attempt,
}: {
  onToken: (token: string) => void;
  attempt: number;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const sitekey = TURNSTILE_SITE_KEY;

  useEffect(() => {
    const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
    if (!ready || !container.current || !sitekey || !api) return;
    const id = api.render(container.current, {
      sitekey,
      action: TURNSTILE_ACTION,
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
    widget.current = id;
    return () => {
      api.remove(id);
      widget.current = null;
    };
  }, [ready, sitekey, onToken]);

  useEffect(() => {
    const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
    if (attempt > 0 && widget.current !== null) {
      onToken("");
      api?.reset(widget.current);
    }
  }, [attempt, onToken]);

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
