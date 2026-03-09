"use client";

import type React from "react";
import { useEffect } from "react";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ChatBox from "@/components/chatbox";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isLogin = pathname?.startsWith("/login");
  const isSignup = pathname?.startsWith("/signup");
  const isVerification = pathname?.startsWith("/verification");
  const isAuthPage = isLogin || isSignup;

  useEffect(() => {
    if (!isDashboard) {
      try {
        document.documentElement.classList.remove("dark");
        document.documentElement.removeAttribute("data-theme");
      } catch {}
    }
  }, [isDashboard]);

  return (
    <body className="font-sans overflow-x-hidden pt-16 md:pt-0">
      <AuthProvider>
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
        ) : isVerification ? (
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <SidebarProvider>
              <div className="min-h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-900">
                <Header />
                <div className="flex flex-1">
                  <DashboardSidebar />
                  <main className="flex-1 min-w-0 overflow-x-hidden p-4 sm:p-6 bg-white dark:bg-gray-950">
                    {children}
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        ) : (
          <>
            {!isDashboard && !isSignup && <Header />}
            <main>{children}</main>
            {!isDashboard && !isAuthPage && <Footer />}
            {!isAuthPage && <ChatBox />}
          </>
        )}
        <Toaster />
      </AuthProvider>
    </body>
  );
}
