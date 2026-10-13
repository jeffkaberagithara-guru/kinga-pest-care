import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";

import { AnnouncementBar } from "@/components/announcement-bar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/ui/footer";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { RouteAnnouncer } from "@/components/route-announcer";
import { StructuredData } from "@/components/seo/structured-data";
import { siteConfig, siteUrl, usingPlaceholders } from "@/config/site";

/**
 * Type system (DESIGN.md §5).
 * Manrope carries headings and the wordmark; DM Sans runs body, labels, nav and
 * form controls. Both self-hosted by next/font — no external font request, so
 * the CSP needs no font host allowance.
 */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — Professional Pest Management`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "pest control Kenya",
    "fumigation Nairobi",
    "cockroach control",
    "termite treatment",
    "bedbug treatment",
    "rodent control",
    "mosquito control",
    "residential pest management",
    "commercial pest control",
  ],
  authors: [{ name: siteConfig.legalName }],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Your space, protected with precision.`,
    description: siteConfig.description,
    url: siteUrl,
    locale: "en_KE",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — professional pest management`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Your space, protected with precision.`,
    description: siteConfig.description,
    images: ["/og-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#153E32",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE" className={`${manrope.variable} ${dmSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-sm)] focus:bg-primary focus:px-4 focus:py-2.5 focus:text-small focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <StructuredData siteUrl={siteUrl} />
        <AnnouncementBar />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <RouteAnnouncer />
        {usingPlaceholders && process.env.NODE_ENV !== "production" ? (
          <p className="sr-only">
            Demo configuration: some business contact details are placeholders and must be confirmed
            before launch.
          </p>
        ) : null}
      </body>
    </html>
  );
}
