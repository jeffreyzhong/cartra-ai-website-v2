import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import Script from "next/script";
import CalendlyScripts from "./components/CalendlyScripts";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cartra | Custom AI Agents",
  description: "Custom AI Agents That Bring Efficiency & Productivity to Your Business. Cut operational costs by replacing manual processes with customized AI Agents tailored to your company.",
  icons: {
    icon: '/cartra_geometric_logo_small.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${archivo.variable} font-sans antialiased`}>
        <CalendlyScripts />
        {children}
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
