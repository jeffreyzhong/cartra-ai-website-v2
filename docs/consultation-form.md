# Consultation form setup

All consultation buttons and the homepage footer Contact button open the same custom form. It collects name, work email, role, company, and annual revenue in USD. Role is a required dropdown covering owners/founders, CEOs, other C-suite executives, VPs, directors, managers, individual contributors, and Other. Revenue options are Under $20M, $20M–$100M, $100M–$200M, $200M–$500M, $500M–$1B, and $1B+. Submissions go to `jeff@cartra.ai`; replying addresses the visitor. The form requests a call, and Jeff schedules it by email.

Work-email checks run in the browser and backend: trim surrounding whitespace, validate address and domain syntax, and reject a small explicit list of common personal-email providers. Custom company domains (including subdomains and plus-addressing) are accepted. This is a sanity check, not DNS, mailbox ownership, or deliverability verification.

An optional “What would you like help with?” textarea lets visitors describe their needs in up to 2,000 characters. The plain-text notification includes their response with line breaks preserved, or “Not provided” if left empty. The backend enforces the length and rejects control characters other than tabs and line breaks.

## Cloudflare configuration

1. In Cloudflare, open **Compute → Email Service → Email Sending → Onboard Domain** and onboard the sender domain (for example, `cartra.ai`). The domain must use Cloudflare DNS. Review and apply the DNS authentication records shown in the dashboard. This uses outbound Email Sending, not inbound Email Routing; preserve existing mailbox MX records.
2. Create an account-scoped API token with **Email Sending: Edit**. Obtain the Cloudflare account ID and choose a sender address such as `website@cartra.ai` on the onboarded domain.
3. Use the existing Turnstile widget **`0x4AAAAAAEuqg9DEsiTyBBBB`**; its public key is the application's default. Confirm that its allowed hostnames include `cartra.ai` and `www.cartra.ai`. Store its matching secret directly in the hosting environment as `TURNSTILE_SECRET_KEY`. Do not create a replacement widget or paste the secret into chat. The backend verifies the token, an explicit hostname allowlist, the request hostname, and the `consultation` action; failed verification never sends mail.
4. Add these variables to the website hosting project's environment settings (and locally to `apps/web/.env.local`, using `.env.example` as the template):

| Variable | Value |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |
| `CLOUDFLARE_EMAIL_API_TOKEN` | API token with Email Sending: Edit |
| `CLOUDFLARE_EMAIL_FROM` | Sender address on the onboarded domain |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional override; defaults to `0x4AAAAAAEuqg9DEsiTyBBBB` |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key |
| `TURNSTILE_HOSTNAMES` | Defaults to `cartra.ai,www.cartra.ai`; explicit frontend hostnames for this deployment |

Only the Turnstile site key is public. Store secrets in environment settings, not source control or chat. No Worker deployment, SMTP password, or Resend key is needed. Email Sending must be available/enabled on the account.

5. Redeploy after setting variables: the public site key is embedded at build time. For local development, restart the dev server. If testing on a preview hostname, authorize that hostname on the widget and set `TURNSTILE_HOSTNAMES` in that preview environment. Never include `localhost` or `127.0.0.1` in the production allowlist.
6. Submit a real test request, confirm receipt at `jeff@cartra.ai`, and check that Reply addresses the visitor. Check Cloudflare Email Service logs for queued mail or bounces. API acceptance cannot guarantee inbox placement or final delivery of queued messages.

## Behavior and validation

The endpoint rejects invalid fields, control characters, oversized bodies, foreign browser origins, honeypot submissions, and missing/invalid Turnstile tokens. Server credentials are never exposed. Missing configuration fails closed; there is no development bypass that sends unverified email. No personal details are sent to analytics or logged in provider errors.

A failed submission preserves the entered fields and calls `turnstile.reset(widgetId)` to obtain a fresh single-use token for a retry. The browser submits `cf-turnstile-response`; it never calls Siteverify directly. Success appears only when Cloudflare reports the recipient as delivered or queued. Closing the dialog resets the form; users can dismiss with Escape, the close button, or the backdrop. No booking is automatically placed on a calendar.

Run `pnpm --filter web test:consultation` for mocked backend tests and `pnpm validate` for project checks. No tests send live email. Before production, perform the real submission check above with the configured domain and widget.

Live Turnstile validation is pending until the matching secret is installed: send a fresh real token through `/api/consultation`, then replay that same request and confirm rejection without a second email. A passing mock test does not verify the widget's domain configuration or the deployed secret.

References: [Cloudflare Email Sending setup](https://developers.cloudflare.com/email-service/get-started/send-emails/), [Email Sending API](https://developers.cloudflare.com/api/resources/email_sending/methods/send/), [Turnstile validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
