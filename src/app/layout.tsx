import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import SmoothScroll from "@/components/motion/SmoothScroll";
import PageTransition from "@/components/motion/PageTransition";
import GlobalScene from "@/components/3d/GlobalScene";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PackLoop | Sustainable Packaging",
  description: "Discover, compare and collectively purchase better packaging at affordable prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-transparent text-foreground relative">
        <SmoothScroll>
          <GlobalScene />
          <Navbar />
          <main className="flex-1 flex flex-col relative z-10">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <Toaster />
        </SmoothScroll>
      </body>
    </html>
  );
}
