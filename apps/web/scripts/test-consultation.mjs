import assert from "node:assert/strict";
import process from "node:process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

// Transpile the isolated route to exercise its real validation and provider calls.
const require = createRequire(import.meta.url);
function load(path, dependencies = {}) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const loaded = { exports: {} };
  new Function("require", "module", "exports", compiled)(
    (name) => dependencies[name] ?? require(name),
    loaded,
    loaded.exports,
  );
  return loaded.exports;
}
const lib = load("../app/lib/consultation.ts");
const { POST } = load("../app/api/consultation/route.ts", {
  "../../lib/consultation": lib,
  "../../lib/turnstile": load("../app/lib/turnstile.ts"),
});
const payload = {
  name: "Test Visitor",
  email: "visitor@example.com",
  role: "CEO",
  company: "Example Co",
  needs: "Reduce manual data entry.\nConnect our existing tools.",
  revenue: lib.REVENUE_OPTIONS[0],
  "cf-turnstile-response": "test-token",
  website: "",
};
for (const email of [
  "person@cartra.ai",
  "first.last+sales@sub.company.co.uk",
  " Person@Company.COM ",
]) {
  assert.equal(lib.workEmailError(email), "");
}
for (const email of [
  "",
  "bad",
  "a@@company.com",
  "a..b@company.com",
  ".a@company.com",
  "a.@company.com",
  "a@-company.com",
  "a@company..com",
  "a@company.c",
  "a@company.com/path",
  "a b@company.com",
  "a".repeat(65) + "@company.com",
  "person@GMAIL.COM",
  "person@outlook.com",
]) {
  assert.notEqual(lib.workEmailError(email), "");
  assert.equal(lib.parseConsultation({ ...payload, email }), null);
}
assert.deepEqual(lib.REVENUE_OPTIONS, [
  "Under $20M",
  "$20M–$100M",
  "$100M–$200M",
  "$200M–$500M",
  "$500M–$1B",
  "$1B+",
]);
for (const role of lib.ROLE_OPTIONS)
  assert.ok(lib.parseConsultation({ ...payload, role }));
for (const revenue of lib.REVENUE_OPTIONS)
  assert.ok(lib.parseConsultation({ ...payload, revenue }));
const envKeys = [
  "CLOUDFLARE_ACCOUNT_ID",
  "CLOUDFLARE_EMAIL_API_TOKEN",
  "CLOUDFLARE_EMAIL_FROM",
  "TURNSTILE_SECRET_KEY",
  "TURNSTILE_HOSTNAMES",
];
const originalEnv = Object.fromEntries(
  envKeys.map((key) => [key, process.env[key]]),
);
const originalFetch = globalThis.fetch;
let calls = [];
let challenge = {
  success: true,
  hostname: "cartra.ai",
  action: "consultation",
};
let delivery = {
  success: true,
  result: { delivered: ["jeff@cartra.ai"], queued: [] },
};
let providerStatus = 200;
const request = (body = payload, options = {}) =>
  new Request("https://cartra.ai/api/consultation", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://cartra.ai",
      ...options,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
try {
  Object.assign(process.env, {
    CLOUDFLARE_ACCOUNT_ID: "a".repeat(32),
    CLOUDFLARE_EMAIL_API_TOKEN: "test-secret",
    CLOUDFLARE_EMAIL_FROM: "website@cartra.ai",
    TURNSTILE_SECRET_KEY: "test-turnstile",
    TURNSTILE_HOSTNAMES: "cartra.ai,www.cartra.ai",
  });
  globalThis.fetch = async (url, options) => {
    calls.push({
      url,
      body:
        options.body instanceof URLSearchParams
          ? Object.fromEntries(options.body)
          : JSON.parse(options.body),
    });
    return url.includes("siteverify")
      ? Response.json(challenge)
      : Response.json(delivery, { status: providerStatus });
  };
  assert.equal((await POST(request())).status, 200);
  assert.equal(calls[1].body.to, "jeff@cartra.ai");
  assert.equal(calls[1].body.reply_to, payload.email);
  assert.equal(calls[0].body.response, payload["cf-turnstile-response"]);
  assert.ok(calls[1].body.text.includes("Role: CEO"));
  assert.ok(calls[1].body.text.includes(payload.needs));
  assert.equal(
    lib.parseConsultation({ ...payload, needs: undefined }).needs,
    "",
  );
  assert.ok(lib.parseConsultation({ ...payload, needs: "x".repeat(2000) }));
  delivery = {
    success: true,
    result: { delivered: [], queued: ["jeff@cartra.ai"] },
  };
  assert.equal((await POST(request())).status, 200);
  delivery = {
    success: true,
    result: {
      delivered: [],
      queued: [],
      permanent_bounces: ["jeff@cartra.ai"],
    },
  };
  assert.equal((await POST(request())).status, 502);
  providerStatus = 403;
  assert.equal((await POST(request())).status, 502);
  calls = [];
  for (const invalid of [
    null,
    {},
    { ...payload, name: " " },
    { ...payload, email: "bad" },
    { ...payload, needs: "x".repeat(2001) },
    { ...payload, needs: { text: "Invalid type" } },
    { ...payload, needs: "Bad\u0000text" },
    { ...payload, email: "person@gmail.com" },
    { ...payload, email: "a..b@company.com" },
    { ...payload, role: "" },
    { ...payload, role: "Invented role" },
    { ...payload, revenue: "Under $1 million" },
    { ...payload, company: "Bad\r\nBcc: someone@example.com" },
    { ...payload, name: "x".repeat(101) },
    { ...payload, revenue: "invalid" },
    { ...payload, "cf-turnstile-response": "" },
    { ...payload, website: "spam" },
    "{",
  ]) {
    assert.equal((await POST(request(invalid))).status, 400);
  }
  assert.equal((await POST(request("x".repeat(16385)))).status, 413);
  assert.equal(
    (await POST(request(payload, { origin: "https://other.example" }))).status,
    403,
  );
  assert.equal(
    (await POST(request(payload, { "content-type": "text/plain" }))).status,
    415,
  );
  assert.equal(calls.length, 0);
  delete process.env.CLOUDFLARE_EMAIL_API_TOKEN;
  assert.equal((await POST(request())).status, 503);
  process.env.CLOUDFLARE_EMAIL_API_TOKEN = "test-secret";
  process.env.TURNSTILE_HOSTNAMES = "";
  assert.equal((await POST(request())).status, 503);
  process.env.TURNSTILE_HOSTNAMES = "other.example";
  calls = [];
  assert.equal((await POST(request())).status, 400);
  assert.equal(calls.length, 1);
  process.env.TURNSTILE_HOSTNAMES = "cartra.ai,www.cartra.ai";
  for (const invalid of [
    { success: false },
    { ...challenge, hostname: "other.example" },
    { ...challenge, action: "login" },
  ]) {
    challenge = invalid;
    calls = [];
    assert.equal((await POST(request())).status, 400);
    assert.equal(calls.length, 1);
  }
  // Model Siteverify's single-use contract: never send twice for one token.
  calls = [];
  const redeemed = new Set();
  globalThis.fetch = async (url, options) => {
    calls.push(url);
    if (url.includes("siteverify")) {
      const token = options.body.get("response");
      if (redeemed.has(token))
        return Response.json({
          success: false,
          "error-codes": ["timeout-or-duplicate"],
        });
      redeemed.add(token);
      return Response.json({
        success: true,
        hostname: "cartra.ai",
        action: "consultation",
      });
    }
    return Response.json({
      success: true,
      result: { delivered: ["jeff@cartra.ai"], queued: [] },
    });
  };
  assert.equal((await POST(request())).status, 200);
  assert.equal((await POST(request())).status, 400);
  assert.equal(
    calls.filter((url) => url.includes("email/sending/send")).length,
    1,
  );
  assert.equal(
    (
      await POST(
        request({ ...payload, "cf-turnstile-response": "fresh-token" }),
      )
    ).status,
    200,
  );
  globalThis.fetch = async () => {
    throw new Error("Provider timeout");
  };
  assert.equal((await POST(request())).status, 502);
  console.log(
    "Consultation tests passed: delivery, queue, bounce, provider errors, validation, size, origin, configuration, and verification.",
  );
} finally {
  globalThis.fetch = originalFetch;
  for (const key of envKeys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
}
