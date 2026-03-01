import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Kbon — AI-Powered Smart Farming Platform",
    template: "%s | Kbon",
  },
  description:
    "Kbon delivers AI-driven crop monitoring, IoT sensor networks, and precision agriculture solutions to help farmers increase yields and reduce environmental impact.",
  keywords: [
    "smart farming",
    "agritech",
    "precision agriculture",
    "IoT sensors",
    "AI crop monitoring",
    "sustainable agriculture",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kbon.io",
    siteName: "Kbon",
    title: "Kbon — AI-Powered Smart Farming Platform",
    description:
      "AI-driven crop monitoring, IoT sensor networks, and precision agriculture solutions.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kbon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kbon — AI-Powered Smart Farming Platform",
    description:
      "AI-driven crop monitoring, IoT sensor networks, and precision agriculture solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
