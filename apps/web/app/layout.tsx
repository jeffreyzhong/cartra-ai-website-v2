import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "@repo/ui/tokens.css";
import "@repo/ui/motion.css";
import "@repo/ui/components.css";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import Analytics from "./components/Analytics";
import {
  DEFAULT_DESCRIPTION,
  LOGO_PATH,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  createOrganizationJsonLd,
  createWebsiteJsonLd,
} from "./lib/seo";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cartra | Custom AI Agents",
    template: "%s | Cartra",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: LOGO_PATH, type: 'image/png' },
    ],
    apple: LOGO_PATH,
    shortcut: LOGO_PATH,
  },
  openGraph: {
    title: "Cartra | Custom AI Agents",
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "Cartra custom AI agents for workflow automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartra | Custom AI Agents",
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} antialiased`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [createOrganizationJsonLd(), createWebsiteJsonLd()],
          }}
        />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
