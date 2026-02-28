"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export default function FaceMatchPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [started, setStarted] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCapture = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }
    setStarted(true);
  };

  const complete = async () => {
    setVerifying(true);
    try {
      const v = videoRef.current;
      let url: string | null = null;
      if (v && user?.id) {
        const canvas = document.createElement("canvas");
        canvas.width = v.videoWidth || 640;
        canvas.height = v.videoHeight || 480;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
          const blob: Blob | null = await new Promise((resolve) =>
            canvas.toBlob((b) => resolve(b), "image/jpeg", 0.9),
          );
          if (blob) {
            const fd = new FormData();
            fd.append("file", blob, "selfie.jpg");
            fd.append("folder", `faces/${user.id}`);
            const res = await fetch("/api/cloudinary/upload", {
              method: "POST",
              body: fd,
            });
            if (res.ok) {
              const j = await res.json();
              url = j?.url || null;
            }
          }
        }
      }
      if (user?.id) {
        await supabase
          .from("staff_profile")
          .update({ facialvet: url, facepass: true })
          .eq("user_id", user.id);
        const { data } = await supabase
          .from("staff_profile")
          .select("vet_fee, ninpass, idpass, facepass")
          .eq("user_id", user.id)
          .single();
        if (data?.vet_fee && data?.ninpass && data?.idpass && data?.facepass) {
          await supabase
            .from("staff_profile")
            .update({ verified: true })
            .eq("user_id", user.id);
        }
      }
    } catch {}
    try {
      const tracks = streamRef.current?.getTracks() || [];
      tracks.forEach((t) => t.stop());
    } catch {}
    router.push("/verification/success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <Card className="w-full max-w-lg shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-center">Facial Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!started ? (
            <>
              <p className="text-gray-700 text-center">
                We&apos;ll capture your face to confirm liveness and identity.
                Make sure you&apos;re in a well-lit environment.
              </p>
              <div className="flex justify-center">
                <Button
                  onClick={startCapture}
                  className="bg-[#0b1a33] hover:bg-[#132743] text-white"
                >
                  Start Capture
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="aspect-video w-full bg-black/10 rounded-lg flex items-center justify-center text-gray-600">
                <video ref={videoRef} className="h-full" muted />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={complete}
                  disabled={verifying}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {verifying ? "Verifying..." : "Complete Verification"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
