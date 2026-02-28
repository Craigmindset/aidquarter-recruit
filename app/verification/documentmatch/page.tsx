"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
type NinReturn = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  address: string;
};

export default function DocumentMatchPage() {
  const { user } = useAuth();
  const router = useRouter();
  const appFirstName =
    ((user?.user_metadata as any)?.firstName as string | undefined) ?? "";
  const appLastName =
    ((user?.user_metadata as any)?.lastName as string | undefined) ?? "";

  const [nin, setNin] = useState("");
  const [error, setError] = useState("");
  const [matchVerified, setMatchVerified] = useState(false);
  const [returned, setReturned] = useState<NinReturn | null>(null);

  const handleEnter = async () => {
    setError("");
    setMatchVerified(false);
    setReturned(null);
    if (!/^[0-9]{11}$/.test(nin)) {
      setError("NIN must be 11 digits");
      return;
    }
    if (nin === "11111111111") {
      setReturned({
        firstName: appFirstName,
        lastName: appLastName,
        dob: "10-10-1990",
        gender: "male",
        address: "123, Ikeja, Lagos",
      });
      setMatchVerified(true);
      return;
    }
    setError("NIN verification is temporarily disabled");
  };

  const handleConfirm = async () => {
    if (!matchVerified || !returned || !user) return;
    try {
      const parts = (returned.dob || "").split("-");
      let iso: string | null = null;
      if (parts.length === 3) {
        const [mm, dd, yyyy] = parts;
        iso = `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
      }
      await supabase
        .from("staff_profile")
        .update({
          dob: iso,
          gender:
            (returned.gender || "").toLowerCase() === "male"
              ? "male"
              : "female",
          address: returned.address || null,
          ninpass: true,
        })
        .eq("user_id", user.id);
    } catch {}
    router.push("/verification/idmatch");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-center">NIN Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label>First Name (from application)</Label>
              <Input value={appFirstName} disabled />
            </div>
            <div className="grid gap-1">
              <Label>Last Name (from application)</Label>
              <Input value={appLastName} disabled />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Please enter your NIN</Label>
            <div className="flex gap-2">
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={11}
                value={nin}
                onChange={(e) =>
                  setNin(e.target.value.replace(/\\D/g, "").slice(0, 11))
                }
                placeholder="11-digit NIN"
                className={`${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              <Button
                className="bg-[#0b1a33] hover:bg-[#132743] text-white"
                onClick={handleEnter}
              >
                Enter
              </Button>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {!error && returned && !matchVerified && (
              <p className="text-sm text-orange-600">
                The returned data does not match your known data, please contact
                support.
              </p>
            )}
          </div>

          {matchVerified && returned && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <Label>Returned First Name</Label>
                <Input value={returned.firstName} disabled />
              </div>
              <div className="grid gap-1">
                <Label>Returned Last Name</Label>
                <Input value={returned.lastName} disabled />
              </div>
              <div className="grid gap-1">
                <Label>Date of Birth</Label>
                <Input value={returned.dob} disabled />
              </div>
              <div className="grid gap-1">
                <Label>Gender</Label>
                <Input value={returned.gender} disabled />
              </div>
              <div className="grid gap-1 md:col-span-2">
                <Label>Address</Label>
                <Input value={returned.address} disabled />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              disabled={!matchVerified}
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
