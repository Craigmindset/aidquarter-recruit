"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function VettingPaymentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  useEffect(() => {
    if ((window as any).PaystackPop) {
      setScriptReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.async = true;
    s.onload = () => setScriptReady(true);
    s.onerror = () => setScriptReady(false);
    document.body.appendChild(s);
  }, []);

  const handlePay = () => {
    if (!paystackKey || !scriptReady) return;
    setLoading(true);
    const PaystackPop = (window as any).PaystackPop;
    const email = (user?.email as string) || "user@aidquarters.com";
    const handler = PaystackPop.setup({
      key: paystackKey,
      email,
      amount: 3000 * 100,
      currency: "NGN",
      ref: `VETT-${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Vetting",
            variable_name: "vetting",
            value: "verification",
          },
        ],
      },
      callback: (response: any) => {
        (async () => {
          try {
            if (user?.id) {
              await supabase
                .from("staff_profile")
                .update({ vet_fee: true })
                .eq("user_id", user.id);
            }
          } catch {}
          router.push("/verification/documentmatch");
        })();
      },
      onClose: () => {
        setLoading(false);
      },
    });
    handler.openIframe();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-center">Vetting Payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-gray-700">
              Pay your vetting fee to proceed with verification.
            </p>
            <p className="text-2xl font-bold">₦3,000</p>
          </div>
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handlePay}
            disabled={loading || !scriptReady || !paystackKey}
          >
            {loading ? "Processing..." : "Pay ₦3,000"}
          </Button>
          <p className="text-xs text-gray-500 text-center">
            Securely processed by Paystack.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
