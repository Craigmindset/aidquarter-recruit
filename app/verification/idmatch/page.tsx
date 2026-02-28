"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export default function IDMatchPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [waiver, setWaiver] = useState(false);

  const handleConfirm = async () => {
    if (!file && !waiver) return;
    let url: string | null = null;
    try {
      if (file && user?.id) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", `ids/${user.id}`);
        const res = await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: fd,
        });
        if (res.ok) {
          const j = await res.json();
          url = j?.url || null;
        }
      } else if (waiver) {
        url = "waiver:none";
      }
      if (user?.id) {
        await supabase
          .from("staff_profile")
          .update({ id_upload: url, idpass: true })
          .eq("user_id", user.id);
      }
    } catch {}
    router.push("/verification/facematch");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-center">Valid ID Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-900">
            Acceptable IDs: Driver&apos;s License, National Identity Card,
            International Passport.
          </div>

          <div className="grid gap-2">
            <Label>Upload your ID</Label>
            <Input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFile(f);
                if (f) setWaiver(false);
              }}
            />
            {!file && (
              <button
                type="button"
                className="text-sm text-gray-700 underline w-fit"
                onClick={() => setWaiver(true)}
              >
                I don&apos;t have any current, click
              </button>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              disabled={!file && !waiver}
              onClick={handleConfirm}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
