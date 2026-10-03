import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Catalina Ward Sacrament Meetings",
    template: "%s | Catalina Ward",
  },
  description: "View and manage sacrament meeting programs for Catalina Ward.",
  metadataBase: new URL("https://sacrament-meetings-coral.vercel.app"), // your real URL
  openGraph: {
    title: "Catalina Ward Sacrament Meetings",
    description:
      "View and manage sacrament meeting programs for Catalina Ward.",
    images: ["/opengraph-image.png"], // or rely on file convention below
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
