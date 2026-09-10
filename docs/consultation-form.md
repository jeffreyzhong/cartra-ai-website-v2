# Consultation form setup

All consultation buttons and the homepage footer Contact button open the same custom form. It collects name, work email, role, company, and annual revenue in USD. Revenue ranges include “Prefer not to say.” Submissions go to `jeff@cartra.ai`; replying addresses the visitor. The form requests a call, and Jeff schedules it by email.

## Cloudflare configuration

1. In Cloudflare, open **Compute → Email Service → Email Sending → Onboard Domain** and onboard the sender domain (for example, `cartra.ai`). The domain must use Cloudflare DNS. Review and apply the DNS authentication records shown in the dashboard. This uses outbound Email Sending, not inbound Email Routing; preserve existing mailbox MX records.
2. Create an account-scoped API token with **Email Sending: Edit**. Obtain the Cloudflare account ID and choose a sender address such as `website@cartra.ai` on the onboarded domain.
3. Create a **Managed Turnstile** widget allowing `cartra.ai`, `www.cartra.ai`, and any preview hostname used for testing. Obtain its site key and secret key. The backend verifies the token, hostname, and `consultation` action; failed verification never sends mail.
4. Add these variables to the website hosting project's environment settings (and locally to `apps/web/.env.local`, using `.env.example` as the template):

| Variable | Value |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |
| `CLOUDFLARE_EMAIL_API_TOKEN` | API token with Email Sending: Edit |
| `CLOUDFLARE_EMAIL_FROM` | Sender address on the onboarded domain |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile public site key |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key |

Only the Turnstile site key is public. Store secrets in environment settings, not source control or chat. No Worker deployment, SMTP password, or Resend key is needed. Email Sending must be available/enabled on the account.

5. Redeploy after setting variables: the public site key is embedded at build time. For local development, restart the dev server.
6. Submit a real test request, confirm receipt at `jeff@cartra.ai`, and check that Reply addresses the visitor. Check Cloudflare Email Service logs for queued mail or bounces. API acceptance cannot guarantee inbox placement or final delivery of queued messages.

## Behavior and validation

The endpoint rejects invalid fields, control characters, oversized bodies, foreign browser origins, honeypot submissions, and missing/invalid Turnstile tokens. Server credentials are never exposed. Missing configuration fails closed; there is no development bypass that sends unverified email. No personal details are sent to analytics or logged in provider errors.

A failed submission preserves the entered fields and refreshes verification for a retry. Success appears only when Cloudflare reports the recipient as delivered or queued. Closing the dialog resets the form; users can dismiss with Escape, the close button, or the backdrop. No booking is automatically placed on a calendar.

Run `pnpm --filter web test:consultation` for mocked backend tests and `pnpm validate` for project checks. No tests send live email. Before production, perform the real submission check above with the configured domain and widget.

References: [Cloudflare Email Sending setup](https://developers.cloudflare.com/email-service/get-started/send-emails/), [Email Sending API](https://developers.cloudflare.com/api/resources/email_sending/methods/send/), [Turnstile validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
