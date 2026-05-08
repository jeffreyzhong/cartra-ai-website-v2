import Image from 'next/image';
import type { Metadata } from 'next';
import {
  Surface,
  Mesh,
  Section,
  Container,
  Card,
  Display,
  Body,
  Eyebrow,
  Button,
} from '@repo/ui';
import Navigation from '../components/Navigation';
import CopyButton from '../components/CopyButton';
import { createPageMetadata } from '../lib/seo';

const PROFILE_IMAGE = '/jeff-zhong-headshot.png';
const WECHAT_QR_IMAGE = '/wechat-qrcode.jpg';
const WHATSAPP_QR_IMAGE = '/whatsapp-qrcode.jpg';
const WECHAT_ID = 'jzhong2468';
const EMAIL = 'jeff@cartra.ai';

const PILL_LINK_CLASS =
  'inline-flex items-center gap-1.5 rounded-full border border-c-border bg-white/60 px-2.5 py-1 font-display text-c-text-muted backdrop-blur-sm transition-colors hover:border-c-accent hover:text-c-accent active:scale-[0.97]';
const PILL_LINK_STYLE = {
  fontSize: '0.75rem',
  fontWeight: 500,
  letterSpacing: '-0.005em',
} as const;

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Jeffrey Zhong, Founder & CEO at Cartra AI',
    description:
      'Direct contact for Jeffrey Zhong, Founder & CEO of Cartra AI.',
    path: '/jeff',
  }),
  robots: { index: false, follow: false },
};

export default function JeffPage() {
  return (
    <Surface className="text-gray-900">
      <Mesh />
      <Navigation />
      <main>
        <Section padding="hero">
          <Container size="sm">
            <Card surface="frosted">
              <div className="flex justify-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-full ring-1 ring-c-border shadow-sm">
                  <Image
                    src={PROFILE_IMAGE}
                    alt="Jeffrey Zhong"
                    fill
                    sizes="128px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>

              <Display as="h1" size="md" align="center" className="mt-6">
                Jeffrey Zhong
              </Display>

              <div className="mt-3 flex flex-col items-center gap-1.5">
                <Eyebrow tone="accent">Founder &amp; CEO</Eyebrow>
                <Body size="md" tone="muted" align="center">
                  Cartra AI
                </Body>
              </div>

              <hr className="mt-8 border-0 border-t border-c-border" />

              <dl className="mt-8 space-y-8">
                <div>
                  <dt>
                    <Eyebrow tone="muted">Email</Eyebrow>
                  </dt>
                  <dd className="mt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="font-display text-c-text transition-colors hover:text-c-accent"
                      style={{
                        fontSize: '1.0625rem',
                        fontWeight: 500,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {EMAIL}
                    </a>
                    <CopyButton value={EMAIL} label="Copy" />
                  </dd>
                </div>

                <div>
                  <dt>
                    <Eyebrow tone="muted">WeChat</Eyebrow>
                  </dt>
                  <dd className="mt-3">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      <div className="rounded-xl bg-white p-3 ring-1 ring-c-border">
                        <Image
                          src={WECHAT_QR_IMAGE}
                          alt={`WeChat QR code for ${WECHAT_ID}`}
                          width={144}
                          height={144}
                        />
                      </div>
                      <div className="space-y-3">
                        <p
                          className="font-display text-c-text"
                          style={{
                            fontSize: '0.9375rem',
                            fontWeight: 500,
                            letterSpacing: '-0.01em',
                          }}
                        >
                          ID:{' '}
                          <span className="text-c-text-muted">{WECHAT_ID}</span>
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <CopyButton value={WECHAT_ID} label="Copy ID" />
                          <a
                            href="weixin://"
                            className={PILL_LINK_CLASS}
                            style={PILL_LINK_STYLE}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <path d="M14 3h7v7" />
                              <path d="M10 14 21 3" />
                              <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                            </svg>
                            <span>Open WeChat</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </dd>
                </div>

                <div>
                  <dt>
                    <Eyebrow tone="muted">WhatsApp</Eyebrow>
                  </dt>
                  <dd className="mt-3">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      <div className="rounded-xl bg-white p-3 ring-1 ring-c-border">
                        <Image
                          src={WHATSAPP_QR_IMAGE}
                          alt="WhatsApp QR code"
                          width={144}
                          height={144}
                        />
                      </div>
                      <div className="space-y-3">
                        <Body size="sm" tone="muted">
                          Open WhatsApp, tap the{' '}
                          <span className="text-c-text">Camera</span> icon in
                          chats, then point at the code.
                        </Body>
                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href="https://wa.me/19094385867"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={PILL_LINK_CLASS}
                            style={PILL_LINK_STYLE}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <path d="M14 3h7v7" />
                              <path d="M10 14 21 3" />
                              <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                            </svg>
                            <span>Open WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </dd>
                </div>
              </dl>

              <hr className="mt-10 border-0 border-t border-c-border" />

              <div className="mt-8 flex justify-center">
                <Button as="a" href="/" trailingIcon="→">
                  Visit cartra.ai
                </Button>
              </div>
            </Card>
          </Container>
        </Section>
      </main>
    </Surface>
  );
}
