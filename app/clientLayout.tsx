"use client";

import type React from "react";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ChatBox from "@/components/chatbox";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isLogin = pathname?.startsWith("/login");
  const isSignup = pathname?.startsWith("/signup");
  const isAuthPage = isLogin || isSignup;

  return (
    <body className="font-sans">
      {isDashboard ? (
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {!isDashboard && !isSignup && <Header />}
          <main>{children}</main>
          {!isDashboard && !isAuthPage && <Footer />}
          {!isAuthPage && <ChatBox />}
        </ThemeProvider>
      ) : (
        <>
          {!isDashboard && !isSignup && <Header />}
          <main>{children}</main>
          {!isDashboard && !isAuthPage && <Footer />}
          {!isAuthPage && <ChatBox />}
        </>
      )}
    </body>
  );
}
