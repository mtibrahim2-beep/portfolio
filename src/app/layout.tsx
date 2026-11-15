import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { person } from "@/content/profile";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const description =
  "Mohammad Tauhid Ibrahim is a finance professional in Dhaka working across financial reporting, MIS, investor reporting and financial operations at WeGro Technologies.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${person.name}, Finance`,
  description,
  authors: [{ name: person.name, url: person.linkedin }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: `${person.name}, Finance`,
    description,
    siteName: person.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name}, Finance`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1b2d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
