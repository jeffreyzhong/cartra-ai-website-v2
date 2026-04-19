import type { Metadata } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import CalendlyScripts from "./components/CalendlyScripts";
import "@repo/ui/tokens.css";
import "@repo/ui/motion.css";
import "@repo/ui/components.css";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Cartra | Custom AI Agents",
  description:
    "Custom AI Agents That Bring Efficiency & Productivity to Your Business. Cut operational costs by replacing manual processes with customized AI Agents tailored to your company.",
  icons: {
    icon: [
      { url: '/cartra_geometric_logo_round.png', sizes: 'any' },
      { url: '/cartra_geometric_logo_round.png', type: 'image/png' },
    ],
    apple: '/cartra_geometric_logo_round.png',
    shortcut: '/cartra_geometric_logo_round.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${sourceSerif.variable} antialiased`}>
        <CalendlyScripts />
        {children}
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
