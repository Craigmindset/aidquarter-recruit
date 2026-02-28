"use client";

import type React from "react";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const nextPath = search.get("next");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setInfo("");
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        { email, password }
      );
      if (authError) {
        setError(authError.message || "Unable to sign in");
        setIsLoading(false);
        return;
      }
      if (data?.session) {
        try {
          await fetch("/api/auth/set-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
            }),
          });
        } catch {
          // proceed even if cookie sync fails; middleware may still allow after client nav
        }
        if (nextPath && nextPath.startsWith("/")) {
          router.replace(nextPath);
        } else {
          router.push("/dashboard");
        }
      } else {
        setError("No active session found");
        setIsLoading(false);
      }
    } catch {
      setError("Unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError("");
    setInfo("");
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
      });
      if (resendError) {
        setError(resendError.message || "Unable to resend confirmation");
      } else {
        setInfo("Confirmation email sent. Check your inbox.");
      }
    } catch {
      setError("Unexpected error while resending confirmation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <p className="mt-2 text-gray-600">
              Sign in to your Aidquarters account
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              {info && <p className="text-sm text-green-600">{info}</p>}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    maxLength={22}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {password && password.length < 6 && (
                  <p className="text-xs text-red-600">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              {error?.toLowerCase().includes("confirm") && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-sm text-green-600 hover:text-green-700 underline"
                    disabled={isLoading || !email}
                  >
                    Resend confirmation email
                  </button>
                </div>
              )}
            </form>

            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div> */}

            {/* <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
            </div> */}

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/#services"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
