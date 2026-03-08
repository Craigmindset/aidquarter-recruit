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
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(appFirstName);
  const [lastName, setLastName] = useState(appLastName);

  const handleEnter = async () => {
    setError("");
    setMatchVerified(false);
    setReturned(null);
    if (!/^[0-9]{11}$/.test(nin)) {
      setError("NIN must be 11 digits");
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setError("First and last name are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/qoreid/nin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nin,
          firstname: firstName.trim(),
          lastname: lastName.trim(),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(
          j?.detail || j?.error || j?.message || "NIN verification failed",
        );
        return;
      }
      const j: any = await res.json();
      const data: any = j?.data || {};
      const ninCheckStatus = String(
        data?.summary?.nin_check?.status || "",
      ).toUpperCase();
      const overallStatus = String(data?.status?.status || "").toLowerCase();
      if (ninCheckStatus === "NO_MATCH" || overallStatus === "id_mismatch") {
        setError("Sorry your data does not match input");
        return;
      }
      if (ninCheckStatus === "EXACT_MATCH" || overallStatus === "verified") {
        const n: any = data?.nin || {};
        const normGender = (() => {
          const g = String(n.gender || "").toLowerCase();
          if (g.startsWith("m")) return "male";
          if (g.startsWith("f")) return "female";
          return g || "";
        })();
        const birth = n.birthdate || n.birthDate || n.dob || "";
        const addr =
          (n.residence && (n.residence.address1 || n.residence.address)) ||
          n.address ||
          n.residentialAddress ||
          n.homeAddress ||
          n.contactAddress ||
          "";
        const payload: NinReturn = {
          firstName: String(n.firstname || n.firstName || "").trim(),
          lastName: String(n.lastname || n.lastName || "").trim(),
          dob: String(birth || "").trim(),
          gender: normGender,
          address: String(addr || "").trim(),
        };
        setReturned(payload);
        setMatchVerified(true);
        return;
      }
      setError("Verification could not be confirmed. Please try again.");
    } catch {
      setError("NIN verification is temporarily unavailable");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (override?: NinReturn | null) => {
    const ret = override ?? returned;
    if (!ret || !user) return;
    try {
      const toISO = (s: string | null | undefined): string | null => {
        if (!s) return null;
        const t = String(s).replace(/\//g, "-").trim();
        const m1 = t.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (m1) return `${m1[1]}-${m1[2]}-${m1[3]}`;
        const m2 = t.match(/^(\d{2})-(\d{2})-(\d{4})$/);
        if (m2) {
          const a = parseInt(m2[1], 10);
          const b = parseInt(m2[2], 10);
          const yyyy = m2[3];
          let dd = m2[1],
            mm = m2[2];
          if (a > 12) {
            dd = m2[1];
            mm = m2[2];
          } else if (b > 12) {
            mm = m2[1];
            dd = m2[2];
          } else {
            dd = m2[1];
            mm = m2[2];
          }
          return `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
        }
        return null;
      };
      const iso = toISO(ret.dob);
      const g = String(ret.gender || "").toLowerCase();
      const gender = g.startsWith("m")
        ? "male"
        : g.startsWith("f")
          ? "female"
          : null;
      await supabase
        .from("staff_profile")
        .update({
          dob: iso,
          gender,
          address: ret.address || null,
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
          {!(returned && matchVerified) && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <Label>First Name</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div className="grid gap-1">
                <Label>Last Name</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>
          )}

          {!returned && (
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
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Enter"}
                </Button>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {!error && returned && !matchVerified && (
                <p className="text-sm text-orange-600">
                  The returned data does not match your known data, please
                  contact support.
                </p>
              )}
            </div>
          )}

          {matchVerified && returned && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <Label>First Name</Label>
                <Input value={returned.firstName} disabled />
              </div>
              <div className="grid gap-1">
                <Label>Last Name</Label>
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
              onClick={() => handleConfirm()}
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
