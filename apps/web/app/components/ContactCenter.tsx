'use client';

import Image from 'next/image';
import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button, Eyebrow } from '@repo/ui';
import CopyButton from './CopyButton';

type Method = 'email' | 'wechat' | 'whatsapp';

type ContactCenterProps = {
  email: string;
  wechatId: string;
  wechatQr: string;
  whatsappQr: string;
  whatsappUrl: string;
};

export default function ContactCenter({
  email,
  wechatId,
  wechatQr,
  whatsappQr,
  whatsappUrl,
}: ContactCenterProps) {
  const [active, setActive] = useState<Method | null>(null);
  const close = () => setActive(null);

  return (
    <>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        <PillButton onClick={() => setActive('email')}>
          <EmailGlyph />
          <span>Email</span>
        </PillButton>
        <PillButton onClick={() => setActive('wechat')}>
          <BrandGlyph src="/wechat-logo.svg" />
          <span>WeChat</span>
        </PillButton>
        <PillButton onClick={() => setActive('whatsapp')}>
          <BrandGlyph src="/whatsapp-logo.svg" />
          <span>WhatsApp</span>
        </PillButton>
        <PillButton href="/" dark>
          <span>Visit cartra.ai</span>
          <span aria-hidden>&rarr;</span>
        </PillButton>
      </div>

      <Modal open={active === 'email'} onClose={close} title="Email">
        <ModalHeader glyph={<EmailGlyph size={28} />} label="Email" />
        <a
          href={`mailto:${email}`}
          className="mt-5 block break-all font-display text-c-text transition-colors hover:text-c-primary"
          style={{
            fontSize: '1.25rem',
            fontWeight: 500,
            letterSpacing: '-0.015em',
          }}
        >
          {email}
        </a>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <CopyButton value={email} label="Copy email" />
          <Button as="a" href={`mailto:${email}`} variant="ghost">
            Open in mail
          </Button>
        </div>
      </Modal>

      <Modal open={active === 'wechat'} onClose={close} title="WeChat">
        <ModalHeader
          glyph={<BrandGlyph src="/wechat-logo.svg" size={28} />}
          label="WeChat"
        />
        <div className="mt-5 flex justify-center">
          <div className="rounded-c-lg bg-c-surface-card p-3 border border-c-border">
            <Image
              src={wechatQr}
              alt={`WeChat QR code for ${wechatId}`}
              width={200}
              height={200}
            />
          </div>
        </div>
        <p
          className="mt-5 text-center font-display text-c-text"
          style={{
            fontSize: '0.9375rem',
            fontWeight: 500,
            letterSpacing: '-0.01em',
          }}
        >
          ID: <span className="text-c-text-muted">{wechatId}</span>
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <CopyButton value={wechatId} label="Copy ID" />
          <Button as="a" href="weixin://">
            Open WeChat
          </Button>
        </div>
        <p
          className="mt-5 text-center text-c-text-muted"
          style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}
        >
          Open WeChat, tap{' '}
          <span className="text-c-text">+ &rsaquo; Scan</span>, then point at
          the code.
        </p>
      </Modal>

      <Modal open={active === 'whatsapp'} onClose={close} title="WhatsApp">
        <ModalHeader
          glyph={<BrandGlyph src="/whatsapp-logo.svg" size={28} />}
          label="WhatsApp"
        />
        <div className="mt-5 flex justify-center">
          <div className="rounded-c-lg bg-c-surface-card p-3 border border-c-border">
            <Image
              src={whatsappQr}
              alt="WhatsApp QR code"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <Button
            as="a"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open WhatsApp
          </Button>
        </div>
        <p
          className="mt-5 text-center text-c-text-muted"
          style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}
        >
          Or open WhatsApp, tap the{' '}
          <span className="text-c-text">Camera</span> icon in chats, then point
          at the code.
        </p>
      </Modal>
    </>
  );
}

const PILL_BASE_CLASS =
  'inline-flex items-center gap-2 rounded-c-pill px-3.5 py-2 font-display transition-colors';
const PILL_FILLED_CLASS =
  'bg-c-surface-card text-c-text border border-c-border-strong hover:bg-c-surface';
const PILL_DARK_CLASS =
  'bg-c-text text-c-on-dark border border-c-text hover:bg-c-navy-2';
const PILL_STYLE = {
  fontSize: '0.875rem',
  fontWeight: 500,
  letterSpacing: '-0.005em',
} as const;

function PillButton({
  onClick,
  href,
  dark,
  children,
}: {
  onClick?: () => void;
  href?: string;
  dark?: boolean;
  children: ReactNode;
}) {
  const className = `${PILL_BASE_CLASS} ${dark ? PILL_DARK_CLASS : PILL_FILLED_CLASS}`;
  if (href) {
    return (
      <a href={href} className={className} style={PILL_STYLE}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={PILL_STYLE}
    >
      {children}
    </button>
  );
}

function ModalHeader({ glyph, label }: { glyph: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {glyph}
      <Eyebrow tone="muted">{label}</Eyebrow>
    </div>
  );
}

function BrandGlyph({ src, size = 18 }: { src: string; size?: number }) {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className="rounded-[5px]"
    />
  );
}

function EmailGlyph({ size = 18 }: { size?: number }) {
  const inner = Math.round(size * 0.62);
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center rounded-[5px] bg-c-accent"
      style={{ width: size, height: size }}
    >
      <svg
        width={inner}
        height={inner}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    </span>
  );
}

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/35"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{ animation: 'jeff-modal-fade 180ms ease-out both' }}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative w-full max-w-[400px] rounded-c-lg bg-c-surface-card p-7 border border-c-border"
          onClick={(e) => e.stopPropagation()}
          style={{ animation: 'jeff-modal-pop 200ms cubic-bezier(0.22, 1, 0.36, 1) both' }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-c-pill text-c-text-muted transition-colors hover:bg-c-surface hover:text-c-text"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          {children}
        </div>
      </div>
      <style>{`
        @keyframes jeff-modal-fade {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes jeff-modal-pop {
          from { opacity: 0; transform: translateY(8px) scale(0.98) }
          to { opacity: 1; transform: translateY(0) scale(1) }
        }
      `}</style>
    </div>,
    document.body
  );
}
