import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import PortfolioShell from "@/components/layout/PortfolioShell";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "Mustafa Ali — Software Developer",
    template: "%s | Mustafa Ali",
  },
  description:
    "Portfolio of Mustafa Ali — Software Developer specializing in elegant digital experiences.",
  keywords: [
    "Mustafa Ali",
    "Software Developer",
    "Web Developer",
    "Portfolio",
    "Next.js",
    "React",
    "Full Stack",
  ],
  authors: [{ name: "Mustafa Ali" }],
  creator: "Mustafa Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mustafaali.dev",
    siteName: "Mustafa Ali — Software Developer",
    title: "Mustafa Ali — Software Developer",
    description:
      "Portfolio of Mustafa Ali — Software Developer specializing in elegant digital experiences.",
    images: [
      {
        url: "/assets/Mustafa Image.jpeg",
        width: 1200,
        height: 630,
        alt: "Mustafa Ali — Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustafa Ali — Software Developer",
    description:
      "Portfolio of Mustafa Ali — Software Developer specializing in elegant digital experiences.",
    images: ["/assets/Mustafa Image.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body
        className="relative min-h-screen overflow-x-hidden"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <Providers>
          <PortfolioShell>{children}</PortfolioShell>
        </Providers>
      </body>
    </html>
  );
}

