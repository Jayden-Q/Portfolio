import type { Metadata } from "next";
import { DM_Sans, Figtree } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { cn } from "@/lib/utils";

import LenisProvider from "./providers/lenis-provider";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Jayden Qin - Web Design & Development",
  description: "Freelance web designer located in Dublin. View my portfolio and get a custom website for your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", dmSans.variable, dmSans.variable, "font-sans", figtree.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <LenisProvider />
        {children}
        <Footer />
      </body>
    </html>
  );
}
