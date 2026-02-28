"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export default function SqlEditorPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string>("applicant");
  const [sql, setSql] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const r =
      ((user?.user_metadata as any)?.role as string | undefined)?.toLowerCase() ??
      "applicant";
    setRole(r);
  }, [user]);

  useEffect(() => {
    setSql(
      [
        "ALTER TABLE public.staff_profile",
        "ADD COLUMN IF NOT EXISTS profile_image text;",
      ].join("\n"),
    );
  }, []);

  const canAccess = role === "admin";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const downloadSql = () => {
    const blob = new Blob([sql], { type: "text/sql;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "migration_profile_image.sql";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <Card className="w-full max-w-3xl shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-center">SQL Editor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!canAccess ? (
            <div className="text-center space-y-3">
              <p className="text-gray-700">
                Access denied. Only admins can view this page.
              </p>
              <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
            </div>
          ) : (
            <>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-900">
                Copy the SQL below and run it in the Supabase SQL Editor for your
                project to add the profile_image column to staff_profile.
              </div>
              <div className="grid gap-2">
                <Label>SQL</Label>
                <Textarea
                  className="min-h-[200px]"
                  value={sql}
                  onChange={(e) => setSql(e.target.value)}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button onClick={copyToClipboard} className="bg-[#0b1a33] hover:bg-[#132743]">
                  {copied ? "Copied" : "Copy SQL"}
                </Button>
                <Button onClick={downloadSql} className="bg-green-600 hover:bg-green-700">
                  Download .sql
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
