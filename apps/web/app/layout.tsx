import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const aeonik = localFont({
  src: [
    {
      path: "./fonts/aeonik-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/aeonik-regularitalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/aeonik-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/aeonik-mediumitalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/aeonik-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/aeonik-semibolditalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-aeonik",
  display: "swap",
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
    <html lang="en" className={`${inter.variable} ${aeonik.variable}`}>
      <body className="antialiased">
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
