"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, X } from "lucide-react";

export default function SignupInfoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
          <span className="text-gray-700">Loading…</span>
        </div>
      }
    >
      <SignupInfoBody />
    </Suspense>
  );
}

function SignupInfoBody() {
  const router = useRouter();
  const search = useSearchParams();
  const role = (search.get("role") || "").toLowerCase();

  const items = useMemo(() => {
    const common = [
      "Valid ID",
      "Facial Verification",
      "NIN Verification",
      "Guarantors",
      "Age Declaration (18+)",
      "Health Certification",
    ];
    if (role === "nanny") {
      return [...common, "Childcare Experience"];
    }
    if (role === "caregiver") {
      return [
        ...common,
        "Medical Training/Experience",
        "First Aid Certification",
      ];
    }
    if (role === "housekeeper") {
      return [...common, "Housekeeping Experience"];
    }
    if (role === "driver") {
      return [
        ...common,
        "Valid Driver's License",
        "3+ Years Driving Experience",
      ];
    }
    return common;
  }, [role]);

  const roleTitle = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "Applicant";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
      style={{ backgroundImage: "url(/bg-info-page.jpg)" }}
    >
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-extrabold text-gray-900">
                {roleTitle} - Requirements
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="text-gray-700 hover:text-red-600 hover:bg-red-50"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="h-6 w-6 text-blue-700 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold text-blue-800">
                    Documents Required for {roleTitle} Registration
                  </h2>
                  <p className="text-sm text-blue-700">
                    Please ensure you have the following documents ready before
                    proceeding:
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {items.map((i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0" />
                    <span className="text-blue-800">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 pt-0">
            <Button
              className="w-full h-12 rounded-xl bg-[#0b1a33] hover:bg-[#132743] text-white font-semibold"
              onClick={() =>
                router.push(`/signup/register?role=${role || "nanny"}`)
              }
            >
              I Understand, Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
