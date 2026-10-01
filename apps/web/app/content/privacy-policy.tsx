import Link from 'next/link';
import type { LegalDocumentContent } from '../components/LegalDocument';

const CONTACT_EMAIL = 'team@cartra.ai';

function EmailLink() {
  return <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
}

export const PRIVACY_POLICY: LegalDocumentContent = {
  lastUpdated: '2026-09-30',
  summary: (
    <>
      How Cartra collects, uses, and protects personal information when you visit our website,
      request a consultation, or work with us. We do not sell personal information, and we do not
      use your data to train general-purpose AI models.
    </>
  ),
  sections: [
    {
      id: 'overview',
      title: 'Overview and scope',
      content: (
        <>
          <p>
            This Privacy Policy explains how Cartra AI (&ldquo;Cartra,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, shares, and protects personal
            information. It applies to our website at <Link href="/">www.cartra.ai</Link>, our
            consultation request form, and
            the business communications we have with prospective clients, clients, and partners
            (together, the &ldquo;Services&rdquo;).
          </p>
          <p>
            Cartra is a business-to-business company. We design, build, deploy, and maintain custom
            AI agents for operations teams, connected to the tools our clients already run. We do
            not offer a consumer app. Our Services are intended for people acting in a professional
            capacity.
          </p>
          <p>
            This policy does not govern data we process on behalf of clients during an engagement.
            That work is governed by a separate written agreement signed with each client (a
            &ldquo;Client Agreement&rdquo;), as explained in{' '}
            <a href="#client-data-and-ai">Client data and AI systems</a>.
          </p>
          <p>
            Please read this policy alongside our <Link href="/terms">Terms of Use</Link>. If you
            do not agree with it, please do not use the Services.
          </p>
        </>
      ),
    },
    {
      id: 'information-we-collect',
      title: 'Information we collect',
      content: (
        <>
          <p>
            We collect only what we need to respond to you, run the website, and serve our clients.
          </p>
          <h3>Information you give us</h3>
          <ul>
            <li>
              <strong>Consultation requests.</strong> When you request a consultation, we collect
              your name, work email, role, company name, and company annual revenue range, plus a
              description of what you need if you choose to add one. We also record which page you
              sent the request from.
            </li>
            <li>
              <strong>Direct communications.</strong> When you email us or message us on WhatsApp
              or WeChat, we receive your message, your contact details, and anything else you
              choose to share, such as attachments.
            </li>
            <li>
              <strong>Business relationship details.</strong> If you are a client contact, partner,
              or vendor, we collect the business contact and billing details needed to manage the
              relationship.
            </li>
          </ul>
          <p>
            Please do not send sensitive personal information, such as health data, financial
            account numbers, or government ID numbers, through the form or by message unless we
            have asked for it under a Client Agreement.
          </p>
          <h3>Information collected automatically</h3>
          <ul>
            <li>
              <strong>Log data.</strong> Our hosting provider records standard server logs,
              including your IP address, browser type (user agent), the pages you request, and
              request times.
            </li>
            <li>
              <strong>Usage and device data.</strong> Through cookies and similar technologies, we
              collect information about how you use the site, such as pages viewed, referring
              pages, device and browser type, approximate location derived from your IP address,
              and events such as clicks on consultation buttons and form submissions. See{' '}
              <a href="#cookies-and-analytics">Cookies and analytics</a>.
            </li>
            <li>
              <strong>Security signals.</strong> Cloudflare Turnstile runs on our consultation form
              and may process your IP address and device and browser signals to tell people from
              bots.
            </li>
          </ul>
          <h3>Information from other sources</h3>
          <p>
            We may receive business contact information from referrals, event organizers, partners,
            and publicly or commercially available business sources, such as professional
            directories and business contact databases. We use it to understand who we are talking
            to and to follow up in a relevant way.
          </p>
        </>
      ),
    },
    {
      id: 'how-we-use-information',
      title: 'How we use information',
      content: (
        <>
          <p>We use personal information to:</p>
          <ul>
            <li>
              Respond to consultation requests and questions, schedule calls, and assess whether we
              are a good fit for your needs.
            </li>
            <li>
              Provide and support the Services, and manage client engagements and other business
              relationships.
            </li>
            <li>
              Communicate with you about our work, including relevant updates. You can opt out of
              non-essential communications at any time.
            </li>
            <li>Measure and improve the website, such as which pages help visitors most.</li>
            <li>
              Protect the Services, including detecting spam, abuse, fraud, and security incidents.
            </li>
            <li>
              Comply with legal obligations, enforce our agreements, and establish or defend legal
              claims.
            </li>
            <li>Fulfill any other purpose we describe when we collect the information, or with your consent.</li>
          </ul>
          <p>
            We may also create aggregated or de-identified information that cannot reasonably
            identify you. We use it to understand trends and improve our Services, and we do not
            attempt to re-identify it.
          </p>
        </>
      ),
    },
    {
      id: 'client-data-and-ai',
      title: 'Client data and AI systems',
      content: (
        <>
          <p>
            When a client engages us to build or run an AI agent, we may process data from that
            client&rsquo;s systems, such as documents, emails, and records in an ERP or CRM,
            including any personal information those records contain (&ldquo;Client Data&rdquo;).
          </p>
          <ul>
            <li>
              <strong>We act on our client&rsquo;s instructions.</strong> For Client Data, we are a
              service provider or processor. The client decides what data an agent can access and
              for what purpose. If you have questions about how an organization uses an agent we
              built, please contact that organization first.
            </li>
            <li>
              <strong>The Client Agreement controls.</strong> Each engagement is governed by a
              Client Agreement, such as a master services agreement, statement of work, or data
              processing agreement. If it conflicts with this policy, the Client Agreement controls
              for Client Data.
            </li>
            <li>
              <strong>No training on your data.</strong> We do not use Client Data, form
              submissions, or messages you send us to train general-purpose or third-party AI
              models.
            </li>
            <li>
              <strong>Model providers are restricted by contract.</strong> When an engagement uses a
              third-party AI model provider, such as a large language model API, we engage that
              provider under terms that prohibit it from using the data to train its models,
              consistent with the Client Agreement.
            </li>
            <li>
              <strong>Access is limited.</strong> We limit access to Client Data to the people who
              need it to deliver the engagement, and we return or delete it as the Client
              Agreement requires.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'cookies-and-analytics',
      title: 'Cookies and analytics',
      content: (
        <>
          <p>
            Cookies are small text files stored on your device. We and our providers use cookies
            and similar technologies, such as scripts and local storage, for two purposes:
          </p>
          <ul>
            <li>
              <strong>Essential.</strong> To run the site and our consultation form securely,
              including bot protection by Cloudflare Turnstile.
            </li>
            <li>
              <strong>Analytics.</strong> We use Google Analytics 4 and Google Tag Manager to
              measure page views and events, such as clicks on consultation buttons and form
              submissions. Google processes this data for us. Learn how in{' '}
              <a href="https://policies.google.com/technologies/partner-sites">
                How Google uses information from sites that use its services
              </a>
              .
            </li>
          </ul>
          <h3>Your choices</h3>
          <ul>
            <li>
              <strong>Browser settings.</strong> Most browsers let you block or delete cookies. If
              you block essential cookies, parts of the site, including the consultation form, may
              not work.
            </li>
            <li>
              <strong>Google Analytics opt-out.</strong> Install the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout">
                Google Analytics Opt-out Browser Add-on
              </a>{' '}
              to stop Google Analytics from measuring your visits.
            </li>
            <li>
              <strong>Do Not Track.</strong> There is no common standard for browser Do Not Track
              signals, so the site does not respond to them. See{' '}
              <a href="#california-residents">California residents</a> for how we treat Global
              Privacy Control.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'how-we-share-information',
      title: 'How we share information',
      content: (
        <>
          <p>We share personal information only as described below.</p>
          <ul>
            <li>
              <strong>Service providers.</strong> Vendors that process information for us under
              contract, including website hosting (Vercel), email delivery and bot protection
              (Cloudflare), analytics (Google), business productivity and communication tools,
              and, within client engagements, AI model providers. They may use the information only
              to provide services to us.
            </li>
            <li>
              <strong>Professional advisers.</strong> Lawyers, accountants, auditors, and insurers,
              where needed for their services and under duties of confidentiality.
            </li>
            <li>
              <strong>Legal and safety.</strong> When we believe in good faith that disclosure is
              required by law, subpoena, or other legal process, or is needed to protect the
              rights, property, or safety of Cartra, our clients, or others.
            </li>
            <li>
              <strong>Business transfers.</strong> As part of a merger, acquisition, financing,
              reorganization, or sale of all or part of our business. The recipient must handle the
              information consistently with this policy.
            </li>
            <li>
              <strong>With your consent.</strong> When you ask us to, or agree that we may.
            </li>
          </ul>
          <p>We may also share aggregated or de-identified information that does not identify you.</p>
        </>
      ),
    },
    {
      id: 'no-sale',
      title: 'No sale of personal information',
      content: (
        <p>
          We do not sell personal information, and we have not sold it in the past 12 months. We do
          not rent or trade contact lists, and we do not give personal information to third
          parties for their own marketing.
        </p>
      ),
    },
    {
      id: 'data-retention',
      title: 'Data retention',
      content: (
        <>
          <p>
            We keep personal information only as long as we need it for the purposes in this
            policy, unless the law requires or permits a longer period. As a general guide:
          </p>
          <ul>
            <li>
              <strong>Consultation requests and correspondence</strong> from people who do not
              become clients: up to 24 months after our last contact.
            </li>
            <li>
              <strong>Client relationship records:</strong> for the length of the relationship,
              then as long as needed for legal, tax, accounting, and contractual purposes.
            </li>
            <li>
              <strong>Analytics data:</strong> up to 14 months, under the retention setting in our
              Google Analytics account.
            </li>
            <li>
              <strong>Server logs:</strong> for a limited period set by our hosting provider.
            </li>
            <li>
              <strong>Client Data:</strong> as set out in the Client Agreement.
            </li>
          </ul>
          <p>
            When we no longer need information, we delete or de-identify it. Where that is not yet
            possible, such as for data in backups, we isolate it until it can be deleted.
          </p>
        </>
      ),
    },
    {
      id: 'security',
      title: 'Security',
      content: (
        <>
          <p>
            We use administrative, technical, and physical safeguards designed to protect personal
            information, including encryption in transit, access controls based on need, and
            careful selection of service providers. Client engagements may carry additional
            safeguards set out in the Client Agreement.
          </p>
          <p>
            No method of transmission or storage is fully secure, so we cannot guarantee absolute
            security. If you believe your interaction with us is no longer secure, contact us at{' '}
            <EmailLink />. If a breach affects your personal information, we will notify you as
            the law requires.
          </p>
        </>
      ),
    },
    {
      id: 'international-transfers',
      title: 'International data transfers',
      content: (
        <>
          <p>
            Cartra is based in the United States, and our service providers may process information
            in the United States and other countries. Those countries may have data protection laws
            that differ from the laws where you live.
          </p>
          <p>
            When we transfer personal information from the European Economic Area, the United
            Kingdom, or Switzerland, we rely on an appropriate safeguard, such as the European
            Commission&rsquo;s Standard Contractual Clauses and the UK addendum, or another lawful
            transfer mechanism. Contact us to learn more about these safeguards.
          </p>
        </>
      ),
    },
    {
      id: 'your-rights',
      title: 'Your rights and choices',
      content: (
        <>
          <p>Depending on where you live, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you and receive a copy.</li>
            <li>Correct information that is inaccurate or incomplete.</li>
            <li>Delete your personal information.</li>
            <li>
              Object to or restrict certain processing, or withdraw consent where we rely on it.
            </li>
            <li>
              Opt out of marketing messages by replying to ask us to stop or by emailing us.
            </li>
          </ul>
          <p>
            To make a request, email <EmailLink />. We will verify your identity before we act,
            usually by matching details you give us with details we hold, and we will respond
            within the time the law requires. We may keep some information where the law allows,
            for example to meet a legal obligation or to keep a record of your opt-out.
          </p>
          <p>
            If your request concerns Client Data, we will refer you to the client that controls it
            and help that client respond.
          </p>
        </>
      ),
    },
    {
      id: 'california-residents',
      title: 'Additional rights for California residents',
      content: (
        <>
          <p>
            If you are a California resident, the California Consumer Privacy Act, as amended by
            the California Privacy Rights Act (&ldquo;CCPA&rdquo;), gives you the rights below.
            This section supplements the rest of this policy.
          </p>
          <h3>What we collect and why</h3>
          <p>In the past 12 months, we have collected these categories of personal information:</p>
          <ul>
            <li>
              <strong>Identifiers</strong>, such as name, email address, messaging handle, and IP
              address.
            </li>
            <li>
              <strong>Professional or employment-related information</strong>, such as role,
              company name, and company revenue range.
            </li>
            <li>
              <strong>Internet or other electronic network activity</strong>, such as pages viewed,
              clicks, browser type, and security signals.
            </li>
            <li>
              <strong>Approximate geolocation</strong>, derived from IP address.
            </li>
            <li>
              <strong>Other information you choose to share</strong>, such as the description in a
              consultation request.
            </li>
          </ul>
          <p>
            We collect these categories from the sources in{' '}
            <a href="#information-we-collect">Information we collect</a>, use them for the purposes
            in <a href="#how-we-use-information">How we use information</a>, disclose them for
            business purposes to the recipients in{' '}
            <a href="#how-we-share-information">How we share information</a>, and keep them for
            the periods in <a href="#data-retention">Data retention</a>.
          </p>
          <p>
            We do not sell personal information or share it for cross-context behavioral
            advertising, and we have no actual knowledge of selling or sharing the personal
            information of anyone under 16. We do not use or disclose sensitive personal
            information for purposes that would give you a right to limit its use.
          </p>
          <h3>Your California rights</h3>
          <ul>
            <li>
              <strong>Right to know</strong> the personal information we collected about you, its
              sources, our purposes, and the categories of third parties we disclosed it to, and to
              receive a copy of specific pieces.
            </li>
            <li>
              <strong>Right to delete</strong> personal information we collected from you, subject
              to legal exceptions.
            </li>
            <li>
              <strong>Right to correct</strong> inaccurate personal information.
            </li>
            <li>
              <strong>Right to opt out</strong> of the sale or sharing of personal information.
              Because we do neither, there is nothing to opt out of today. If that changes, we will
              honor opt-out requests, including Global Privacy Control signals, as the law
              requires.
            </li>
            <li>
              <strong>Right to non-discrimination.</strong> We will not deny you services, charge
              you a different price, or give you a different quality of service because you used
              these rights.
            </li>
          </ul>
          <h3>How to submit a request</h3>
          <p>
            Email <EmailLink /> with the subject line &ldquo;California privacy request&rdquo; and
            tell us which right you want to use. We will confirm receipt within 10 business days
            and respond within 45 days. If we need up to 45 more days, we will tell you why.
          </p>
          <p>
            <strong>Authorized agents.</strong> You may have an authorized agent submit a request
            for you. We will ask the agent for your signed written permission, and we may ask you
            to verify your identity directly with us, unless the agent holds a valid power of
            attorney.
          </p>
        </>
      ),
    },
    {
      id: 'eea-uk-residents',
      title: 'Additional rights for EEA, UK, and Swiss residents',
      content: (
        <>
          <p>
            If you are in the European Economic Area, the United Kingdom, or Switzerland, Cartra is
            the controller of the personal information described in this policy. For Client Data,
            our client is the controller and we act as its processor. We rely on these legal
            bases:
          </p>
          <ul>
            <li>
              <strong>Legitimate interests</strong>, to respond to inquiries, run and secure the
              website, understand how it is used, and develop business relationships. We weigh
              these interests against your rights, and you can object at any time.
            </li>
            <li>
              <strong>Contract</strong>, to take steps you request before entering an agreement
              with us, and to perform that agreement.
            </li>
            <li>
              <strong>Consent</strong>, where we ask for it. You can withdraw consent at any time
              without affecting processing that happened before.
            </li>
            <li>
              <strong>Legal obligation</strong>, to meet tax, accounting, and other legal
              requirements.
            </li>
          </ul>
          <p>
            Beyond the rights in <a href="#your-rights">Your rights and choices</a>, you have the
            right to data portability and the right to object to processing based on legitimate
            interests, including direct marketing.
          </p>
          <p>
            You also have the right to lodge a complaint with the data protection supervisory
            authority where you live or work, or where you believe a violation occurred. In the UK,
            that is the Information Commissioner&rsquo;s Office. We would welcome the chance to
            address your concern first, so please contact us.
          </p>
        </>
      ),
    },
    {
      id: 'childrens-privacy',
      title: 'Children’s privacy',
      content: (
        <p>
          Our Services are for adults acting in a business capacity and are not directed to
          children. We do not knowingly collect personal information from anyone under 16. If you believe a child has
          given us personal information, contact us at <EmailLink /> and we will delete it.
        </p>
      ),
    },
    {
      id: 'third-party-links',
      title: 'Third-party links',
      content: (
        <p>
          The site may link to services we do not control, such as WhatsApp, WeChat, and Google.
          Their own privacy policies govern how they handle your information, including messages
          you send us through their platforms. Please review those policies before you share
          information.
        </p>
      ),
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      content: (
        <p>
          We may update this policy as our Services, our providers, or the law change. When we do,
          we will post the revised policy on this page and update the &ldquo;Last updated&rdquo;
          date at the top of this page. For material changes, we will also give more prominent
          notice, such as a notice on the site or an email. The updated policy applies from the
          date it is posted.
        </p>
      ),
    },
    {
      id: 'contact-us',
      title: 'Contact us',
      content: (
        <>
          <p>
            Questions, requests, or concerns about this policy or our privacy practices? Email{' '}
            <EmailLink /> or write to us at the address below. For help with an engagement, visit
            our <Link href="/support">Support</Link> page.
          </p>
          <address>
            <strong>Cartra AI</strong>
            <br />
            2261 Market Street STE 85777
            <br />
            San Francisco, CA 94114
            <br />
            United States
            <br />
            <EmailLink />
          </address>
        </>
      ),
    },
  ],
};
