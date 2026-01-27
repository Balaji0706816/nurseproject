// app/layout.tsx
import type { Metadata } from "next";
import "@/app/globals.css"; 
import ChatNavbar from "@/app/components/dashboard/ChatNavbar";
import ChatMiniFooter from "@/app/components/dashboard/ChatMiniFooter";

export const metadata: Metadata = {
  title: "AIDES-T2D",
  description: "AIDES-T2D Study Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="bg-white font-sans">
    <ChatNavbar />
    {children}
    <ChatMiniFooter />
   </div>
  );
}
