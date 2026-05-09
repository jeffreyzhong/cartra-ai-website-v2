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
import ContactCenter from '../components/ContactCenter';
import { createPageMetadata } from '../lib/seo';

const PROFILE_IMAGE = '/jeff-zhong-headshot.png';
const WECHAT_QR_IMAGE = '/wechat-qrcode.jpg';
const WHATSAPP_QR_IMAGE = '/whatsapp-qrcode.jpg';
const WECHAT_ID = 'jzhong2468';
const EMAIL = 'jeff@cartra.ai';
const WHATSAPP_URL = 'https://wa.me/19094385867';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Jeff Zhong, Founder & CEO at Cartra AI',
    description:
      'Direct contact for Jeff Zhong, Founder & CEO of Cartra AI.',
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
                    alt="Jeff Zhong"
                    fill
                    sizes="128px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>

              <Display as="h1" size="md" align="center" className="mt-6">
                Jeff Zhong
              </Display>

              <div className="mt-3 flex flex-col items-center gap-1.5">
                <Eyebrow tone="accent">Founder &amp; CEO</Eyebrow>
                <Body size="md" tone="muted" align="center">
                  Cartra AI
                </Body>
              </div>

              <ContactCenter
                email={EMAIL}
                wechatId={WECHAT_ID}
                wechatQr={WECHAT_QR_IMAGE}
                whatsappQr={WHATSAPP_QR_IMAGE}
                whatsappUrl={WHATSAPP_URL}
              />

              <Body
                size="lg"
                tone="default"
                align="center"
                className="mt-6 mx-auto"
                maxWidth="38ch"
              >
                Transform your company with AI that&rsquo;s customized to
                exactly how your business works.
              </Body>

              <figure
                className="mt-7 mx-auto text-center"
                style={{ maxWidth: '46ch' }}
              >
                <blockquote
                  className="ds-body italic text-c-text"
                  style={{ fontSize: '0.9375rem', lineHeight: 1.55 }}
                >
                  &ldquo;AI is everywhere right now but we had no idea how we
                  could actually use it in our business in a meaningful way
                  until working with Jeff and Cartra AI.&rdquo;
                </blockquote>
                <figcaption className="mt-3">
                  <span
                    className="font-display text-c-text-muted"
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      letterSpacing: '0.01em',
                    }}
                  >
                    CEO of 8-Figure Freight Forwarder
                  </span>
                </figcaption>
              </figure>

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
