import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* UI / Body font */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Mono font */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Authority / Institutional font (NCSBN-style) */
const authorityFont = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-authority",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIDES-T2D Portal",
  description: "Secure digital health research portal — University of Massachusetts Boston",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${authorityFont.variable}`}
    >
      <body className="antialiased bg-white font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
