"use client";

import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [anim, setAnim] = useState<any | null>(null);

  useEffect(() => {
    fetch("/Lonely%20404.json")
      .then((r) => r.json())
      .then(setAnim)
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            {anim && (
              <Lottie
                loop
                play
                animationData={anim}
                style={{ width: 200, height: 200 }}
              />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Page not found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/">Go Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
