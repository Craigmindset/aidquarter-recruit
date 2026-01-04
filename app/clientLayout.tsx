"use client";

import type React from "react";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ChatBox from "@/components/chatbox";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isLogin = pathname?.startsWith("/login");
  return (
    <body className="font-sans">
      {!isDashboard && <Header />}
      <main>{children}</main>
      {!isDashboard && !isLogin && <Footer />}
      {!isLogin && <ChatBox />}
    </body>
  );
}
