"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Button } from "@repo/ui";
import { CONSULTATION_FIELDS, REVENUE_OPTIONS } from "../lib/consultation";
import { trackEvent } from "../lib/analytics";
import Turnstile from "./Turnstile";
import styles from "./consultation.module.css";

const ConsultationContext = createContext<() => void>(() => {});
export const useConsultation = () => useContext(ConsultationContext);

export default function ConsultationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <ConsultationContext.Provider value={() => setOpen(true)}>
      {children}
      {open && <ConsultationDialog onClose={() => setOpen(false)} />}
    </ConsultationContext.Provider>
  );
}

function ConsultationDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const submitting = useRef(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [token, setToken] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const element = dialog.current!;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    submitting.current = true;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, "cf-turnstile-response": token }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true)
        throw new Error(
          result.error || "We couldn’t send your request. Please try again.",
        );
      setStatus("success");
      trackEvent("consultation_form_submit", {
        page_path: window.location.pathname,
      });
    } catch (cause) {
      setError(
        cause instanceof Error && cause.name !== "TimeoutError"
          ? cause.message
          : "The request timed out. Please try again.",
      );
      setStatus("error");
      setToken("");
      setAttempt((value) => value + 1);
    } finally {
      submitting.current = false;
    }
  }

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="consultation-title"
      aria-describedby="consultation-description"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose();
        }
      }}
    >
      <header className={styles.header}>
        <h2 id="consultation-title">
          {status === "success"
            ? "Thank you for reaching out."
            : "Cartra | Book a discovery call"}
        </h2>
        <p id="consultation-description">
          {status === "success"
            ? "Jeff will follow up by email to arrange your free consultation."
            : "Tell us a little about yourself so we can make the most of our conversation."}
        </p>
        <button
          type="button"
          onClick={onClose}
          className={styles.close}
          aria-label="Close consultation form"
        >
          ×
        </button>
      </header>
      {status === "success" ? (
        <div className={styles.success}>
          <p role="status">
            Your request has been sent. We look forward to learning about your
            business.
          </p>
          <Button onClick={onClose}>Done</Button>
        </div>
      ) : (
        <form onSubmit={submit} aria-busy={status === "sending"}>
          <fieldset className={styles.fields} disabled={status === "sending"}>
            <legend className="sr-only">Your details</legend>
            {CONSULTATION_FIELDS.map((field) => (
              <div className={styles.field} key={field.name}>
                <label htmlFor={`consultation-${field.name}`}>
                  {field.label}
                </label>
                <input
                  id={`consultation-${field.name}`}
                  name={field.name}
                  type={field.name === "email" ? "email" : "text"}
                  autoComplete={field.autoComplete}
                  maxLength={field.maxLength}
                  required
                />
              </div>
            ))}
            <div className={styles.field}>
              <label htmlFor="consultation-revenue">
                Company annual revenue
              </label>
              <select
                id="consultation-revenue"
                name="revenue"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a range (USD)
                </option>
                {REVENUE_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className={styles.trap} aria-hidden="true">
              <label htmlFor="consultation-website">
                Leave this field empty
              </label>
              <input
                id="consultation-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          </fieldset>
          <footer className={styles.footer}>
            <Turnstile attempt={attempt} onToken={setToken} />
            {error && (
              <p role="alert" className={styles.error}>
                {error} You can also email{" "}
                <a href="mailto:jeff@cartra.ai">jeff@cartra.ai</a>.
              </p>
            )}
            <div className={styles.actions}>
              <p>We’ll email you to find a time to talk.</p>
              <Button
                type="submit"
                disabled={status === "sending" || !token}
                trailingIcon="→"
              >
                {status === "sending" ? "Sending…" : "Request a call"}
              </Button>
            </div>
          </footer>
        </form>
      )}
    </dialog>
  );
}
