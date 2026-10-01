import Link from 'next/link';
import type { LegalDocumentContent } from '../components/LegalDocument';

export const TERMS_OF_USE: LegalDocumentContent = {
  lastUpdated: '2026-09-30',
  summary: (
    <>
      These Terms cover your use of cartra.ai and our consultation request form. Client work
      runs under a separate signed agreement, which controls if the two ever conflict.
    </>
  ),
  sections: [
    {
      id: 'agreement-to-these-terms',
      title: 'Agreement to these Terms',
      content: (
        <>
          <p>
            These Terms of Use (the &ldquo;Terms&rdquo;) are a binding agreement between you and
            Cartra AI (&ldquo;Cartra,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;). They govern your access to and use of{' '}
            <Link href="/">www.cartra.ai</Link> and the pages, forms, and content we make
            available through it (together, the &ldquo;Site&rdquo;).
          </p>
          <p>
            By accessing or using the Site, you agree to these Terms. If you do not agree, do not
            use the Site.
          </p>
          <p>
            If you use the Site on behalf of a company or other organization, &ldquo;you&rdquo;
            includes that organization, and you accept these Terms on its behalf.
          </p>
        </>
      ),
    },
    {
      id: 'about-cartra-and-the-site',
      title: 'About Cartra and the Site',
      content: (
        <>
          <p>
            Cartra designs, builds, deploys, and maintains custom AI agents for mid-market
            operations teams. Our agents integrate with the tools our clients already use.
          </p>
          <p>
            The Site is informational. It describes our services, shares case studies and example
            agent systems, and lets you request a free consultation. It is not a software product.
            It does not offer user accounts, logins, or self-serve access to our agents.
          </p>
          <p>
            When we work with a client, that work is governed by a separate written agreement
            signed by both parties, such as a master services agreement or statement of work (a
            &ldquo;Client Agreement&rdquo;). These Terms do not govern services we provide under a
            Client Agreement. If these Terms conflict with a Client Agreement, the Client Agreement
            controls.
          </p>
        </>
      ),
    },
    {
      id: 'eligibility-and-business-use',
      title: 'Eligibility and business use',
      content: (
        <>
          <p>The Site is built for business use. You may use it only if:</p>
          <ul>
            <li>you are at least 18 years old and able to form a binding contract;</li>
            <li>
              you use the Site for legitimate business purposes, such as learning about our
              services or deciding whether to work with us; and
            </li>
            <li>your use is not prohibited by the laws that apply to you.</li>
          </ul>
          <p>
            If you act on behalf of an organization, you represent that you have the authority to
            bind that organization to these Terms. The Site is not directed to children.
          </p>
        </>
      ),
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      content: (
        <>
          <p>Use the Site lawfully and in good faith. You agree not to:</p>
          <ul>
            <li>use the Site in any way that violates applicable law or the rights of others;</li>
            <li>
              scrape, crawl, or harvest content or data from the Site using bots, spiders, or
              other automated means, except for search engines and AI assistants that index or
              retrieve pages in order to display, link to, or cite them;
            </li>
            <li>
              probe, scan, or test the vulnerability of the Site or any related system, or bypass
              any security, access control, or rate limit;
            </li>
            <li>
              interfere with or disrupt the Site, its servers, or its networks, including by
              overloading them or sending excessive requests;
            </li>
            <li>
              send spam, bulk, or automated submissions through the consultation form, or attempt
              to bypass or defeat our bot protection;
            </li>
            <li>
              submit false or misleading information, impersonate any person or organization, or
              misrepresent your affiliation with anyone;
            </li>
            <li>upload or transmit viruses, malware, or other harmful code;</li>
            <li>copy, frame, or mirror any part of the Site without our written permission;</li>
            <li>
              use the Site or its content to build or support a competing product or service, or
              to develop, train, or improve any AI or machine learning model; or
            </li>
            <li>help or encourage anyone else to do any of the above.</li>
          </ul>
          <p>
            We may investigate suspected violations and take any action we consider appropriate,
            including blocking access and reporting conduct to law enforcement.
          </p>
        </>
      ),
    },
    {
      id: 'consultations-and-information',
      title: 'Consultations and information on the Site',
      content: (
        <>
          <p>
            Content on the Site is general information only. It is not legal, financial, tax,
            accounting, or other professional advice. Talk to a qualified professional about your
            specific situation before acting on it.
          </p>
          <p>You can request a free consultation through the Site. When you do:</p>
          <ul>
            <li>
              You confirm that the information you provide, such as your name, work email, role,
              company, revenue range, and needs, is accurate and that you have the right to share
              it.
            </li>
            <li>
              Submitting the form or taking part in a consultation does not create a client
              relationship. It does not obligate either of us to enter into any agreement.
            </li>
            <li>We may decline, or choose not to respond to, any request for any reason.</li>
            <li>
              Any assessment, estimate, or recommendation we share is preliminary. It is not an
              offer or a commitment unless it appears in a signed Client Agreement.
            </li>
          </ul>
          <p>
            Our <Link href="/privacy">Privacy Policy</Link> governs how we handle and protect
            personal information you send through the Site. Beyond that, information you share,
            such as details about your business, is not subject to any confidentiality obligation
            unless we have signed a written agreement with you that says so. Please do not send
            trade secrets or other sensitive business information through the Site.
          </p>
        </>
      ),
    },
    {
      id: 'ai-content-examples-and-results',
      title: 'AI-generated content, examples, and results',
      content: (
        <>
          <p>
            The Site discusses, and may display, content produced by AI systems, including sample
            outputs, demos, and example agent workflows. AI output can be inaccurate, incomplete,
            or out of date, and it can sound confident when it is wrong. Review any AI-generated
            content carefully before you rely on it.
          </p>
          <p>
            Case studies, metrics, demos, and example agent systems on the Site are illustrative.
            They reflect specific clients, data, and conditions, and we may simplify or anonymize
            details to protect client confidentiality. Past results do not guarantee future
            outcomes. What you could achieve depends on your data, systems, processes, and many
            other factors.
          </p>
          <p>
            Nothing on the Site promises any particular result, savings, or performance.
            Commitments about deliverables or performance exist only in a signed Client Agreement.
          </p>
        </>
      ),
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual property',
      content: (
        <>
          <p>
            The Site and everything on it, including text, graphics, logos, icons, images, videos,
            animations, case studies, example agent systems, code, and the selection and
            arrangement of all of it (&ldquo;Site Content&rdquo;), is owned by Cartra or our
            licensors. It is protected by copyright, trademark, and other intellectual property
            laws.
          </p>
          <p>
            Subject to these Terms, we grant you a limited, revocable, non-exclusive,
            non-transferable, non-sublicensable license to access and view Site Content for the
            internal business purpose of learning about and evaluating our services. You may print
            or save a reasonable number of pages for that purpose, as long as you keep all
            copyright and other notices intact.
          </p>
          <p>
            We grant no other rights, by implication or otherwise. You may not copy, modify,
            distribute, sell, publicly display, or create derivative works from Site Content
            without our prior written permission.
          </p>
          <p>
            Cartra, Cartra AI, the Cartra logo, and our other names, logos, and slogans are our
            trademarks. You may not use them without our prior written permission, including in
            any way that suggests we sponsor or endorse you. Other trademarks on the Site belong to
            their respective owners.
          </p>
        </>
      ),
    },
    {
      id: 'feedback',
      title: 'Feedback',
      content: (
        <>
          <p>
            If you send us comments, ideas, or suggestions about the Site or our services
            (&ldquo;Feedback&rdquo;), you grant us a perpetual, irrevocable, worldwide,
            royalty-free license to use, modify, and incorporate that Feedback for any purpose,
            without compensation or attribution to you. Feedback is voluntary. We have no
            obligation to use it or keep it confidential.
          </p>
          <p>
            Feedback does not include personal information, which we handle under our Privacy
            Policy, or information you share under a Client Agreement, which that agreement
            governs.
          </p>
        </>
      ),
    },
    {
      id: 'third-party-services-and-links',
      title: 'Third-party services and links',
      content: (
        <>
          <p>
            The Site may link to, embed, or rely on websites and services that we do not own or
            control, such as hosting, analytics, and security providers. We provide them for
            convenience only. We do not endorse, and are not responsible for, the content,
            policies, availability, or practices of any third party.
          </p>
          <p>
            Your use of a third-party service is governed by that third party&rsquo;s own terms and
            privacy policy. Review them before you use it.
          </p>
          <p>
            Mentions of third-party tools, platforms, or companies on the Site, including tools our
            agents integrate with, do not imply any partnership, sponsorship, or endorsement unless
            we say so expressly.
          </p>
        </>
      ),
    },
    {
      id: 'privacy',
      title: 'Privacy',
      content: (
        <p>
          Our <Link href="/privacy">Privacy Policy</Link> explains how we collect, use, and share
          personal information when you use the Site or contact us, including information you
          submit through the consultation form. By using the Site, you acknowledge that we will
          handle your information as described there.
        </p>
      ),
    },
    {
      id: 'disclaimer-of-warranties',
      title: 'Disclaimer of warranties',
      content: (
        <>
          <p data-conspicuous>
            The Site and all Site Content are provided &ldquo;as is&rdquo; and &ldquo;as
            available,&rdquo; without warranties of any kind, whether express, implied, or
            statutory. To the maximum extent permitted by law, Cartra disclaims all warranties,
            including any implied warranties of merchantability, fitness for a particular purpose,
            title, non-infringement, and accuracy, and any warranties arising from course of
            dealing or usage of trade.
          </p>
          <p data-conspicuous>
            Without limiting the above, we do not warrant that the Site will be uninterrupted,
            secure, or error-free, that defects will be corrected, that the Site or the servers
            that host it are free of viruses or other harmful components, or that any content on
            the Site, including AI-generated content, case studies, and examples, is accurate,
            complete, or current.
          </p>
          <p>
            Some jurisdictions do not allow the exclusion of certain warranties, so some of the
            above may not apply to you.
          </p>
        </>
      ),
    },
    {
      id: 'limitation-of-liability',
      title: 'Limitation of liability',
      content: (
        <>
          <p data-conspicuous>
            To the maximum extent permitted by law, in no event will Cartra or its affiliates,
            officers, employees, agents, contractors, or licensors be liable for any indirect,
            incidental, special, consequential, exemplary, or punitive damages, or for any loss of
            profits, revenue, data, goodwill, or business opportunity, arising out of or relating
            to these Terms or your use of, or inability to use, the Site. This applies whether the
            claim is based on contract, tort (including negligence), strict liability, or any other
            legal theory, and even if we have been advised of the possibility of those damages.
          </p>
          <p data-conspicuous>
            To the maximum extent permitted by law, our total liability for all claims arising out
            of or relating to these Terms or the Site will not exceed US$100.
          </p>
          <p>
            These limitations apply even if a remedy fails of its essential purpose. They do not limit liability
            that cannot be limited under applicable law, and they do not apply to services you
            receive under a Client Agreement, whose own liability terms control. Some
            jurisdictions do not allow certain limitations, so some of the above may not apply to
            you.
          </p>
        </>
      ),
    },
    {
      id: 'indemnification',
      title: 'Indemnification',
      content: (
        <>
          <p>
            To the extent permitted by law, you agree to defend, indemnify, and hold harmless
            Cartra and its affiliates, officers, employees, agents, contractors, and licensors
            from and against any claims, liabilities, damages, losses, and expenses, including
            reasonable attorneys&rsquo; fees, arising out of or relating to:
          </p>
          <ul>
            <li>your use or misuse of the Site;</li>
            <li>your violation of these Terms;</li>
            <li>your violation of any law or the rights of any third party; or</li>
            <li>any information or content you submit through the Site.</li>
          </ul>
          <p>
            We may assume the exclusive defense and control of any matter subject to
            indemnification, and you agree to cooperate with our defense. You may not settle any
            such matter without our prior written consent.
          </p>
        </>
      ),
    },
    {
      id: 'suspension-and-termination',
      title: 'Suspension and termination of access',
      content: (
        <>
          <p>
            We may suspend, restrict, or end your access to all or part of the Site at any time,
            with or without notice, for any reason, including if we believe you have violated
            these Terms. We may also change, suspend, or discontinue the Site, or any part of it,
            at any time without liability to you.
          </p>
          <p>
            Provisions that by their nature should survive will survive any termination of your
            access. These include the sections on intellectual property, feedback, disclaimers,
            limitation of liability, indemnification, governing law, and general terms.
          </p>
        </>
      ),
    },
    {
      id: 'governing-law-and-venue',
      title: 'Governing law and venue',
      content: (
        <>
          <p>
            These Terms, and any dispute arising out of or relating to them or the Site, are
            governed by the laws of the State of California, without regard to its conflict of
            laws rules.
          </p>
          <p>
            Any such dispute must be brought exclusively in the state or federal courts located in
            San Francisco County, California. You and Cartra each consent to the personal
            jurisdiction of, and venue in, those courts, and waive any objection based on
            inconvenient forum.
          </p>
        </>
      ),
    },
    {
      id: 'changes-to-these-terms',
      title: 'Changes to these Terms',
      content: (
        <>
          <p>
            We may update these Terms from time to time. When we do, we will post the revised
            Terms on this page and update the &ldquo;Last updated&rdquo; date at the top of this
            page. For material changes, we will also give more prominent notice, such as a notice
            on the Site or an email.
          </p>
          <p>
            Changes take effect when posted and apply to your use of the Site from that date. They
            do not apply to disputes that arose before the change was posted. If you keep using
            the Site after changes take effect, you accept the revised Terms. If you do not agree,
            stop using the Site.
          </p>
        </>
      ),
    },
    {
      id: 'general',
      title: 'General',
      content: (
        <>
          <p>
            <strong>Entire agreement.</strong> These Terms, together with our Privacy Policy, are
            the entire agreement between you and Cartra about the Site. They supersede any prior
            understandings about the Site. They do not replace or modify any Client Agreement.
          </p>
          <p>
            <strong>Severability.</strong> If any provision is found unenforceable, it will be
            enforced to the maximum extent permissible, and the remaining provisions stay in full
            effect.
          </p>
          <p>
            <strong>No waiver.</strong> Our failure to enforce any right or provision is not a
            waiver of that right or provision.
          </p>
          <p>
            <strong>Assignment.</strong> You may not assign or transfer these Terms without our
            prior written consent. We may assign them without restriction, including in connection
            with a merger, acquisition, or sale of assets. Any attempted assignment in violation of
            this section is void.
          </p>
          <p>
            <strong>No third-party beneficiaries.</strong> These Terms do not give any rights to
            anyone other than you and Cartra.
          </p>
          <p>
            <strong>Force majeure.</strong> We are not liable for any delay or failure to perform
            caused by events beyond our reasonable control, such as natural disasters, internet or
            hosting outages, labor disputes, or acts of government.
          </p>
          <p>
            <strong>Relationship.</strong> Nothing in these Terms creates a partnership, joint
            venture, agency, employment, or client relationship between you and Cartra.
          </p>
          <p>
            <strong>Notices.</strong> We may give you notice by posting it on the Site or, if you
            have shared your email address with us, by email. You may give us notice using the
            contact details below.
          </p>
          <p>
            <strong>Headings.</strong> Section titles are for convenience only and have no legal
            effect. &ldquo;Including&rdquo; means &ldquo;including without limitation.&rdquo;
          </p>
        </>
      ),
    },
    {
      id: 'contact-us',
      title: 'Contact us',
      content: (
        <>
          <p>
            Questions about these Terms? Email{' '}
            <a href="mailto:team@cartra.ai">team@cartra.ai</a> or write to us at the address
            below. For anything else, visit our <Link href="/support">Support</Link> page.
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
            <a href="mailto:team@cartra.ai">team@cartra.ai</a>
          </address>
        </>
      ),
    },
  ],
};
