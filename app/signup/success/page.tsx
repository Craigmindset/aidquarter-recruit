"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "react-lottie-player";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignupSuccessPage() {
  const router = useRouter();
  const [anim, setAnim] = useState<any | null>(null);

  useEffect(() => {
    fetch("/success.json")
      .then((r) => r.json())
      .then(setAnim)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/login");
    }, 10000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-950 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            {anim && (
              <Lottie
                loop
                play
                animationData={anim}
                style={{ width: 140, height: 140 }}
              />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Account Created
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your Account creation was successful. Please kindly verify your
            email to login.
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => router.push("/login")}
          >
            Go to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
