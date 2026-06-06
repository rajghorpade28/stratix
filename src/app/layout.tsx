import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NextAuthProvider } from "@/components/providers/SessionProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STRATIX | Premium Brand Scaling Agency",
  description: "India's new-age brand scaling agency helping brands grow beyond limits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${outfit.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
        <NextAuthProvider>
          <ScrollProgress />
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
