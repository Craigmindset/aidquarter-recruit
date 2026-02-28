"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VerificationSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/dashboard");
    }, 2500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardContent className="p-6 text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Verification Complete</h1>
          <p className="text-gray-600">Your profile has been successfully vetted.</p>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
