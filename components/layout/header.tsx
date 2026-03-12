"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, LogIn, UserPlus, House } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isVerification = pathname?.startsWith("/verification");
  const isDashboardLike = isDashboard || isVerification;
  const isLogin = pathname?.startsWith("/login");
  const { user, signOut } = useAuth();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut();
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!user?.id) {
          setProfileImageUrl(null);
          return;
        }
        let hadCache = false;
        if (typeof window !== "undefined") {
          const key = `aq:profile-img:${user.id}`;
          const raw = localStorage.getItem(key);
          if (raw) {
            try {
              const parsed = JSON.parse(raw) as {
                ts: number;
                url: string | null;
              };
              const ttl = 24 * 60 * 60 * 1000;
              if (
                parsed &&
                typeof parsed.ts === "number" &&
                Date.now() - parsed.ts < ttl
              ) {
                setProfileImageUrl(parsed.url ?? null);
                hadCache = true;
              }
            } catch {}
          }
        }
        if (hadCache) return;
        const { data } = await supabase
          .from("staff_profile")
          .select("profile_image")
          .eq("user_id", user.id)
          .single();
        const url = ((data as any)?.profile_image ?? null) as string | null;
        setProfileImageUrl(url);
        if (typeof window !== "undefined") {
          try {
            const key = `aq:profile-img:${user.id}`;
            localStorage.setItem(key, JSON.stringify({ ts: Date.now(), url }));
          } catch {}
        }
      } catch {
        setProfileImageUrl(null);
      }
    };
    loadProfile();
  }, [user?.id]);

  useEffect(() => {
    const handler = (e: Event) => {
      try {
        const anyEvent = e as any;
        const url = anyEvent?.detail?.url as string | undefined;
        if (url) {
          setProfileImageUrl(url);
          try {
            if (typeof window !== "undefined" && user?.id) {
              const key = `aq:profile-img:${user.id}`;
              localStorage.setItem(
                key,
                JSON.stringify({ ts: Date.now(), url }),
              );
            }
          } catch {}
        }
      } catch {}
    };
    if (typeof window !== "undefined") {
      window.addEventListener("aq:profile-image-updated", handler);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("aq:profile-image-updated", handler);
      }
    };
  }, []);
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 z-40 w-full">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={
              user && !isDashboardLike
                ? "/dashboard"
                : isDashboardLike
                  ? "/dashboard"
                  : "/"
            }
            className="flex items-center space-x-2"
          >
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <span className="font-bold text-lg">AQ</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Aidquarters</span>
          </Link>

          {/* Desktop Navigation - Hide on dashboard-like pages */}
          {!isDashboardLike && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href={user ? "/dashboard" : "/"}
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Home
              </Link>

              <Link
                href="/why-aidquarters"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Why Aidquarters
              </Link>
              <Link
                href="/whats-new"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                What's New
              </Link>
              <Link
                href="/find-aid"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Recruitment
              </Link>
            </nav>
          )}

          {/* Dashboard Navigation - Show on dashboard-like pages */}
          {isDashboardLike && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="/dashboard/support"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Support
              </Link>
            </nav>
          )}

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isDashboard || user ? (
              <>
                {user && (
                  <Link href="/dashboard">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage
                        src={
                          profileImageUrl ??
                          ((user.user_metadata as any)?.avatarUrl as
                            | string
                            | undefined) ??
                          ""
                        }
                        alt="Profile"
                      />
                      <AvatarFallback>
                        {`${(((user.user_metadata as any)?.firstName as string | undefined)?.[0] ?? (user.email ?? "U")[0]).toUpperCase()}${(((user.user_metadata as any)?.lastName as string | undefined)?.[0] ?? "").toUpperCase()}`}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                )}
                <ThemeToggle />
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          {isDashboardLike ? (
            <div className="md:hidden flex items-center gap-3">
              {user && (
                <>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white border border-gray-200 shadow text-green-700 hover:bg-green-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white active:scale-95 transition"
                    aria-label="Home"
                  >
                    <House className="h-5 w-5" strokeWidth={2.5} />
                  </Link>
                  <Link href="/dashboard" aria-label="Profile">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage
                        src={
                          profileImageUrl ??
                          ((user.user_metadata as any)?.avatarUrl as
                            | string
                            | undefined) ??
                          ""
                        }
                        alt="Profile"
                      />
                      <AvatarFallback>
                        {`${(((user.user_metadata as any)?.firstName as string | undefined)?.[0] ?? (user.email ?? "U")[0]).toUpperCase()}${(((user.user_metadata as any)?.lastName as string | undefined)?.[0] ?? "").toUpperCase()}`}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </>
              )}
              <SidebarTrigger className="text-gray-900 dark:text-gray-900 hover:text-gray-700">
                <Menu className="h-8 w-8" />
              </SidebarTrigger>
            </div>
          ) : (
            <div className="md:hidden flex items-center gap-3">
              {user && (
                <Link href="/dashboard" aria-label="Profile">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage
                      src={
                        profileImageUrl ??
                        ((user.user_metadata as any)?.avatarUrl as
                          | string
                          | undefined) ??
                        ""
                      }
                      alt="Profile"
                    />
                    <AvatarFallback>
                      {`${(((user.user_metadata as any)?.firstName as string | undefined)?.[0] ?? (user.email ?? "U")[0]).toUpperCase()}${(((user.user_metadata as any)?.lastName as string | undefined)?.[0] ?? "").toUpperCase()}`}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              )}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-900 dark:text-gray-900 hover:text-gray-700"
                  >
                    <Menu className="h-8 w-8" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-2 mb-8">
                      <div className="bg-green-600 text-white p-2 rounded-lg">
                        <span className="font-bold text-lg">AQ</span>
                      </div>
                      <span className="font-bold text-xl text-gray-900">
                        Aidquarters
                      </span>
                    </div>
                    <nav className="flex flex-col space-y-4 flex-1">
                      <>
                        <Link
                          href={user ? "/dashboard" : "/"}
                          className="text-gray-700 hover:text-green-600 font-medium py-2 px-4 hover:bg-green-50 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Home
                        </Link>
                        <Link
                          href="/services"
                          className="text-gray-700 hover:text-green-600 font-medium py-2 px-4 hover:bg-green-50 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Services
                        </Link>
                        <Link
                          href="/why-aidquarters"
                          className="text-gray-700 hover:text-green-600 font-medium py-2 px-4 hover:bg-green-50 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Why Aidquarters
                        </Link>
                        <Link
                          href="/whats-new"
                          className="text-gray-700 hover:text-green-600 font-medium py-2 px-4 hover:bg-green-50 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          What's New
                        </Link>
                        <Link
                          href="/find-aid"
                          className="text-gray-700 hover:text-green-600 font-medium py-2 px-4 hover:bg-green-50 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Recruitment
                        </Link>
                      </>
                    </nav>
                    <div className="border-t pt-4 mt-4">
                      {isDashboard || user ? (
                        <Button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          variant="ghost"
                          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      ) : (
                        <div className="flex flex-col space-y-2">
                          <Button
                            asChild
                            variant="outline"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Link href="/login">
                              <LogIn className="h-4 w-4 mr-2" />
                              Login
                            </Link>
                          </Button>
                          <Button
                            asChild
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Link href="/#services">
                              <UserPlus className="h-4 w-4 mr-2" />
                              Sign Up
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
