import { parseConsultation, validEmail } from "../../lib/consultation";

export const runtime = "nodejs";
const RECIPIENT = "jeff@cartra.ai";
const MAX_BODY_BYTES = 8192;

function failure(error: string, status: number) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return failure("This request is not allowed.", 403);
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return failure("Expected a JSON request.", 415);

  // Bound actual bytes, including streamed requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return failure("Please complete all fields.", 400);
  let raw = "";
  let size = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return failure("The request is too large.", 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return failure("Unable to read the request.", 400);
  }
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return failure("Invalid request.", 400);
  }
  const details = parseConsultation(input);
  if (!details)
    return failure(
      "Please complete all fields with a valid email and revenue range.",
      400,
    );
  if (input.website) return failure("Unable to verify this request.", 400);

  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_EMAIL_API_TOKEN;
  const sender = process.env.CLOUDFLARE_EMAIL_FROM;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (
    !account ||
    !/^[a-f0-9]{32}$/i.test(account) ||
    !apiToken ||
    !sender ||
    !validEmail(sender) ||
    !turnstileSecret
  ) {
    return failure("The form is temporarily unavailable.", 503);
  }

  if (
    typeof input.token !== "string" ||
    !input.token ||
    input.token.length > 2048
  )
    return failure("Please complete the verification and try again.", 400);

  try {
    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: input.token,
        }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!verification.ok)
      return failure(
        "Verification is temporarily unavailable. Please try again.",
        503,
      );
    const challenge = await verification.json();
    if (
      challenge.success !== true ||
      challenge.action !== "consultation" ||
      challenge.hostname !== new URL(request.url).hostname
    ) {
      return failure("Verification expired or failed. Please try again.", 400);
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${account}/email/sending/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: sender,
          to: RECIPIENT,
          reply_to: details.email,
          subject: `Discovery call request: ${details.company}`,
          text: [
            "New Cartra discovery call request",
            "",
            `Name: ${details.name}`,
            `Work email: ${details.email}`,
            `Role: ${details.role}`,
            `Company: ${details.company}`,
            `Annual revenue (USD): ${details.revenue}`,
            "",
            "Reply to this email to arrange a consultation.",
          ].join("\n"),
        }),
        signal: AbortSignal.timeout(12000),
      },
    );
    const result = await response.json();
    const delivery = result.result;
    if (
      !response.ok ||
      result.success !== true ||
      (!delivery?.delivered?.includes(RECIPIENT) &&
        !delivery?.queued?.includes(RECIPIENT))
    ) {
      // Never log submission details, credentials, or provider response bodies.
      console.error("Consultation email not accepted", {
        status: response.status,
      });
      return failure("We couldn’t send your request. Please try again.", 502);
    }
    return Response.json({ success: true });
  } catch {
    console.error("Consultation email service unavailable");
    return failure("We couldn’t send your request. Please try again.", 502);
  }
}
