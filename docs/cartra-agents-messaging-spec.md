# Cartra Agents — Positioning, Messaging, and Site Spec

Status: draft for review. Not approved homepage copy. Do not ship until questions in §8 are answered.

Scope: **Cartra Agents** only. Cartra Voice is a second product; keep it off the public IA until Agents is rewritten.

Visual system stays in `DESIGN.md`. This file is company story, IA, and copy structure only.

---

## 1. Diagnosis

The site currently sells **custom workflow-automation engagements**. The business now sells **Cartra Agents**: persistent, company-specific digital employees that people already know how to talk to, plus automations those employees can run.

That is a category change, not a polish pass.

### What the site says today

House story: mid-market ops automation. Anti-platform. Built to order. Deployed in ~6 weeks. Maintained by Cartra.

Live hero:

> Custom AI agents to power the next decade of your business.
>
> Don't fall behind in the AI era. Transform your company with AI that's fully tailored to your specific operations and procedures.

Wedge (the most outdated line on the site):

> Not a platform. Not a prompt. A production system your ops team can trust.

Nav: Results, Agent Systems, Case Studies, Process, FAQ. No product name. No “how people use it.”

Proof and examples are still good: freight document ops, manufacturer procurement + knowledge, six workflow patterns, Meta/Google founders, 6-week deploy.

### What the business now is

Two products under Cartra:

| Product | Role | This spec |
|---|---|---|
| **Cartra Agents** | Custom agents that automate workflows and act as knowledgeable employees. Always on. Remember. Use the company’s existing tools. Enterprise models with zero data retention. Designed, deployed, and taught by Cartra. | In scope |
| **Cartra Voice** | Separate platform offering | Later |

Cartra Agents should feel familiar to anyone who has used ChatGPT or Claude, and more useful than those tools because the agent is *the company’s* — not a generic chat window.

### The gap in one sentence

We describe **systems we build for you**. We do not yet describe **employees you work with**.

Missing on the live site:

- Named product: Cartra Agents
- Familiar chat experience (Slack / email / iMessage / Teams — wherever it actually lives)
- Persistence, memory, always-on
- The agent as a teammate *and* an automation engine
- Onboarding / education of the customer’s people
- Zero data retention / no training on customer data, stated as a product property
- Company architecture that leaves room for Voice later

Still true and reusable:

- Built around the company’s real procedures
- Deploys into the stack they already run
- Human-in-the-loop where judgment is required
- Mid-market, not enterprise
- High-touch design + deploy + maintain
- Existing workflow examples and case studies

---

## 2. Recommended company architecture

```
Cartra
  ├── Cartra Agents     ← public lead product now
  └── Cartra Voice      ← later; do not preview in nav yet
```

**Cartra** is the company. **Cartra Agents** is the product. Do not make visitors choose between “agency” and “product” on first paint. The motion is: product they recognize, delivered by a team that installs and teaches it.

Kill the live wedge line “Not a platform.” It fights the new product. Replacement idea (not final copy): we are not a generic chatbot and not a DIY prompt kit. We install company agents into how the business already works.

Keep services language in Process and FAQ. Move it out of the hero.

---

## 3. Positioning

### Category

Company AI agents for small-to-mid-sized businesses. Not consumer ChatGPT. Not an enterprise AI OS.

### For

Owners, operators, and department leads at companies that already feel the ChatGPT/Claude habit, but cannot put company work, memory, or systems of record into a generic chat product.

Default size: small-to-mid-market (not Fortune-scale). Confirm exact band in §8.

### Against

| They already know | Why it is not enough | What Cartra Agents is |
|---|---|---|
| ChatGPT / Claude | Smart, familiar, forgets, not in their stack, trains or retains by default | Same conversational feel, company memory, company tools, ZDR |
| Zapier / RPA / “AI automation agency” | Automates steps, not a teammate you can talk to | Chat + automations in one employee |
| Wonderful / Sierra / enterprise agent platforms | Built for global, regulated enterprise | Same idea, sized and priced for mid-market, installed with you |
| Hiring another coordinator | Expensive, slow, tribal knowledge walks out | Always-on employee that compounds |

### One-line (working)

**Cartra Agents are AI employees for your company — as familiar as ChatGPT, built on your procedures, connected to your tools, and always on.**

### Three pillars (do not drop any)

1. **A teammate people already know how to use.** Chat-first. Managers, ops, finance, leadership talk to it the way they already talk to ChatGPT or Claude.
2. **It actually does the work.** Automations, tools, and systems the company already uses. The six current “agent systems” are examples of jobs the employee can run — not the product itself.
3. **It gets more yours over time.** Memory, personalization, procedure-fit. Cartra designs it, deploys it, and teaches the team how to work with it.

### Voice

Keep `.impeccable.md`: thoughtful, intelligent, sharp. Ramp-like punch + Cursor-like restraint.

Avoid: “digital employee revolution,” “never makes mistakes,” “fraction of an FTE” as a punchline, agency-brochure verbs as the first thing people read.

Prefer: familiar, persistent, your procedures, your tools, always on, we install it and teach your people.

---

## 4. What to take from Wonderful — and what not to

Wonderful is the right **scale analog**: agents that do real work, sit in real systems, and get installed by humans. Wrong **buyer analog**: global enterprise, CX containment, AI OS.

### Steal

**Job triad, rewritten for mid-market.** Wonderful: engage customers / assist employees / execute work. Cartra Agents, tighter:

1. **Work with your people** — answer from company knowledge, draft, decide with a human, teach the next person.
2. **Run the work** — complete procedures from intake to system-of-record.
3. **Get better in production** — memory + procedure tuning, not a one-shot build.

**“Built for real work” four-pack**, Cartra version:

- Lives where the team already works (chat, email, existing tools)
- Handles multi-step procedures, not a single prompt
- Reads and writes the systems you already pay for
- Grounded in *this* company’s SOPs, files, and tribal knowledge

**Lifecycle, not a dump-and-run.** Wonderful: workspaces, versioning, catalog, permissions, reusable skills, A/B. We should not clone their enterprise console. We *should* say: design → deploy → onboard people → improve from real use.

**Forward-deployed delivery as a feature.** Wonderful leads with local pods. Cartra already has this (15 hours, 6 weeks, success manager) but hides it below “not a platform.” Lift it as: *we build it with your team and teach your team to use it.*

**Proof as operating stories.** Their case tiles are verbs + scale. Keep our freight and manufacturer stories; retitle them as *what the agent does at work*, not *what engagement we sold*.

### Do not steal

- “AI OS,” Gateway, Systems, A2A protocol theater
- Enterprise module soup (catalog, tags, A/B) on a first homepage
- Customer-containment / voice-across-every-channel as the lead (that is closer to Cartra Voice later)
- Fortune-scale social proof language we cannot match
- “Hand you the keys and we leave” if we actually stay on as operator/teacher

### Positioning vs Wonderful (usable in sales, not on the homepage)

Wonderful is the enterprise version of “agents that do the work, installed by a team.” Cartra is that motion for companies that will never get a Wonderful pod: smaller, faster, more personal, one product they can feel in a week, not an operating-model transformation program.

---

## 5. Message hierarchy

Use this order on every Agents-facing page.

1. **Product:** Cartra Agents
2. **Job:** AI employees for your company
3. **Feel:** Familiar chat. Always on. Remembers. Uses your tools.
4. **Fit:** Built on *your* operations and procedures
5. **Proof:** Concrete jobs (current examples) + outcomes
6. **How we work:** We design, deploy, and onboard your people
7. **Trust:** Your stack, your permissions, ZDR / no training (only if legally true)

Current homepage inverts this: decade-stakes → anti-platform → case studies → “productized agent systems” → process.

---

## 6. Information architecture

### Now (Agents-only public site)

| Surface | Change |
|---|---|
| `/` | Company + Cartra Agents homepage |
| `/agents` | New product page (or rename `/agent-systems` later) |
| `/agent-systems/*` | Keep URLs for SEO; reframe as **jobs / capabilities**, not the product name |
| `/case-studies` | Keep; retitle as proof of Agents in production |
| `/#process` | How Cartra installs Agents and teaches the team |
| Commercial SEO pages | Keep for search; rewrite intros so they point *to* Cartra Agents, not “we are an agency” |

### Nav (proposed)

`Agents` · `Examples` · `Results` · `How it works` · `Book a call`

- **Agents** = product
- **Examples** = current agent-systems catalog, renamed in UI
- Do not add Voice, Pricing, or Login unless those are real

### Later (Voice)

Add `Voice` as a sibling in nav. Homepage gets a quiet two-product footer or a “Also: Cartra Voice” band. Do not design that band in this pass.

### Rename in UI, not necessarily in URLs

| Current public phrase | Proposed public phrase |
|---|---|
| Agent systems | Jobs Cartra Agents run / Example workflows |
| Agent system | Agent (or named role: AP agent, knowledge agent) |
| Engagement | Deployment |
| What we build | Cartra Agents |
| AI automation agency (on-page H1s) | Keep in metadata if needed; stop leading the visible story with it |

---

## 7. Homepage spec (Agents pass)

Keep the current visual layout (left hero, animation, cream canvas). Rewrite the *job of each band*.

| Band | Job | Direction |
|---|---|---|
| **Hero** | Name the product and the feel | Headline can stay close (“Custom AI agents…”). Subhead must say: familiar to use, built on your procedures, always on / remembers / your tools. Animation already tells SOP → chat → learning. Copy should match it. |
| **Trust** | Credibility in 5 seconds | Keep Meta/Google. Keep 6-week deploy if still true. Recast “per agent system” stats as “per Agents deployment” if the commercial unit changed. |
| **Wedge** | What it is / isn’t | Replace “Not a platform.” Three beats: teammate you chat with · runs your procedures in your tools · gets more yours over time. |
| **How people use it** | New band | Short: talk to it like ChatGPT; it already knows the company; it can take actions; it is still there tomorrow. One channel list (only real channels). |
| **Results** | Proof | Keep both case studies. Call them Agents in production, not “agent systems we sold.” |
| **Examples** | Jobs, not SKUs | Keep all six. Intro: “Among the jobs your Cartra Agents can take on.” Knowledge base becomes the conversational example; the other five become automation examples. |
| **Opportunity** | Outcomes | Keep the four shifts. Less “when agent systems move from pilot to production,” more “once the team actually works with the agents.” |
| **Process** | Install + teach | Discover procedures → build and connect → launch and **onboard employees**. FAQ already says training; the process section barely does. |
| **Trust & security** | Enterprise-grade without enterprise theater | Add ZDR / no training *only if approved*. Keep permissions and ownership. |
| **FAQ** | Objections | Add: vs ChatGPT; memory; who talks to it; data; Voice later if asked. Soften “scoped per agent system” if packaging changed. |
| **SEO services band** | Demote | Keep links. Don’t let “Explore the services behind the agent systems” be a primary story. |

### Existing examples — keep, re-angle

| Current | Re-angle as |
|---|---|
| Company Knowledge Base | The employee that knows the company and answers like a senior teammate |
| Customs & Document Ops | The employee that processes the document pile and posts it |
| Procurement & Vendor Ops | The employee that runs purchasing the way you already approve it |
| AP / AR | The employees that keep finance moving overnight |
| Sales Ops Hygiene | The employee that keeps the CRM honest |

Do not invent new verticals in this pass. Do not resurrect commented Voice / Outreach / Conversion cards on the Agents homepage.

---

## 8. Questions to answer before copy is written

Please answer in-line. Assumptions I will otherwise use are in italics.

### Product shape

1. **Where do people talk to Cartra Agents today?** Slack, email, iMessage, Teams, a Cartra web app, all of the above? *Assume Slack + email unless you say otherwise. Only name channels that are real.*
2. **Is it one company agent with many skills, or several named agents?** *Assume a small set of named agents per company (AP, knowledge, etc.), all on the same Cartra Agents platform.*
3. **Is there a product UI customers log into, or only chat-in-existing-tools plus Cartra behind the scenes?**
4. **How explicit can we be vs ChatGPT / Claude / OpenClaw / Hermes?** *Assume we can say “as familiar as ChatGPT or Claude” and should not name OpenClaw/Hermes on the homepage.*

### Trust claims

5. **Can we publicly say zero data retention and “not used to train any provider”?** Which model vendors? Any caveats (logs, subprocessors, customer-controlled keys)?
6. **Is SOC 2 still “in progress”?** Anything else we can claim now?

### Commercial model

7. **What is the unit of sale now?** Per company Agents deployment, per seat, per named agent, still per workflow? This changes FAQ, stats, and “6 weeks.”
8. **Do we still say ~15 hours / 6 weeks / 90-day payback?**
9. **Do we still use “limited availability / N clients this quarter”?**

### Audience and house

10. **Exact company size?** `.impeccable.md` says 50–500. You said small-to-medium, not quite enterprise. *Assume 20–500 unless you tighten it.*
11. **Primary buyer?** CEO/owner vs COO/ops vs finance lead? *Assume owner/operator first, ops lead second.*
12. **When should Cartra Voice appear at all?** Hidden until a later pass, or a single footer mention?
13. **Should `/ai-automation-agency` and `/ai-agent-development-company` stay as SEO pages with rewritten intros, or do you want those keywords retired from visible H1s even if URLs stay?** *Assume keep URLs, rewrite visible story toward Agents.*

### Proof

14. **Are the two case studies still the ones we lead with?** Any new deployment we can name?
15. **Are the 60% cost / 30% error / 6-week numbers still the ones we want on the first screen?**

---

## 9. Roadmap

Do not start homepage copy until §8 is answered. Then:

### Phase 1 — Source of truth

Update `docs/marketing-context.md` with approved Agents positioning, hero, and subhead. Update `.impeccable.md` audience if size/buyer changed. Leave Voice as a one-line stub.

### Phase 2 — Homepage + nav

Rewrite homepage bands per §7. Rename nav. Point hero animation copy at the same story (already close). Run `pnpm check:public-copy`.

### Phase 3 — Examples + case studies

Reframe `/agent-systems` as jobs Cartra Agents run. Keep slugs. Update index and detail intros. Same for `/case-studies`.

### Phase 4 — FAQ, process, trust

Add ChatGPT/memory/ZDR/onboarding questions. Process step 3 = teach the team.

### Phase 5 — SEO landings

Rewrite the three commercial pages so they answer the old query and convert to Cartra Agents. Do not keyword-stuff the homepage.

### Phase 6 — Voice (later)

Sibling product page + nav. Do not mix Voice cards into the Agents examples grid.

---

## 10. Success check

A sharp operator should get, in under a minute:

1. Cartra sells **Cartra Agents**.
2. They are **employees you chat with**, not a one-off automation project.
3. They **use the company’s tools and procedures**.
4. They **remember and improve**.
5. **Cartra installs them and teaches the team.**
6. There is **proof** this already works in ops.
7. Voice is not required to understand the company.

If they still think “this is an AI automation agency I hire for a 6-week project,” the rewrite failed.
