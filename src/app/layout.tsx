import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CursorGlow from "@/components/shared/CursorGlow";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaagdevi Infra Projects | Building Tomorrow's Landmarks",
  description:
    "Premium residential, commercial and investment destinations designed for growth and prosperity.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  keywords: [
    "Vaagdevi Infra",
    "real estate",
    "luxury homes",
    "commercial properties",
    "open plots",
    "Hyderabad real estate",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <LenisProvider>
          {children}
          <CursorGlow />
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}
