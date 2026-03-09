"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import Lottie from "react-lottie-player";
import Webcam from "react-webcam";

export default function FaceMatchPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [started, setStarted] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [faceAnim, setFaceAnim] = useState<any | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const webcamRef = useRef<any>(null);

  useEffect(() => {
    fetch("/Face%20Scan.json")
      .then((r) => r.json())
      .then(setFaceAnim)
      .catch(() => {});
  }, []);

  const startCapture = async () => {
    setStarted(true);
  };

  const complete = async () => {
    if (!user?.id) return;
    setVerifying(true);
    try {
      let url: string | null = null;
      let dataUrl: string | null = null;
      try {
        dataUrl = webcamRef.current?.getScreenshot?.() || null;
      } catch {}
      if (!dataUrl) {
        const v: any = webcamRef.current?.video || null;
        if (v && v.videoWidth && v.videoHeight) {
          const canvas = document.createElement("canvas");
          canvas.width = v.videoWidth;
          canvas.height = v.videoHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
            dataUrl = canvas.toDataURL("image/jpeg", 0.92);
          }
        }
      }
      if (dataUrl) {
        const parts = dataUrl.split(",");
        const head = parts[0] || "";
        const base64 = parts[1] || "";
        const m = head.match(/data:(.*?);/);
        const mime = (m && m[1]) || "image/jpeg";
        const bin = atob(base64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
        const blob = new Blob([arr], { type: mime });
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
      if (url) {
        setPreviewUrl(url);
      }
      try {
        const v: any = webcamRef.current?.video || null;
        const stream: MediaStream | undefined = v?.srcObject;
        const tracks = stream?.getTracks?.() || [];
        tracks.forEach((t) => t.stop());
      } catch {}
    } catch {}
    setVerifying(false);
  };

  const proceed = async () => {
    if (!previewUrl || !user?.id) return;
    setVerifying(true);
    try {
      try {
        await supabase
          .from("staff_profile")
          .update({ facialvet: previewUrl })
          .eq("user_id", user.id);
      } catch {}
      let ninVal: string | null = null;
      try {
        const { data: prof } = await supabase
          .from("staff_profile")
          .select("nin")
          .eq("user_id", user.id)
          .single();
        ninVal = (prof as any)?.nin || null;
      } catch {}
      if (ninVal) {
        try {
          console.log("Using NIN for face match", {
            nin: ninVal,
            length: String(ninVal).length,
          });
        } catch {}
        const r = await fetch("/api/qoreid/liveness", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ imageUrl: previewUrl, nin: ninVal }),
        });
        const data: any = await r.json().catch(() => ({}));
        const d: any = data?.data ?? data ?? {};
        const face: any = d?.face_verification ?? d?.faceVerification ?? {};
        const overall = String(
          d?.status?.status ?? d?.status ?? "",
        ).toLowerCase();
        const confidence = Number(
          face?.confidence ?? face?.score ?? d?.confidence ?? d?.score ?? 0,
        );
        const matchFlag =
          face?.match === true ||
          d?.match === true ||
          d?.verified === true ||
          overall === "verified";
        try {
          console.log("Face/NIN verification", {
            status: r.status,
            ok: r.ok,
            overall,
            match: face?.match,
            confidence,
            keys: Object.keys(d || {}),
          });
        } catch {}
        const ok = r.ok && (matchFlag || confidence >= 0.6);
        if (ok) {
          try {
            await supabase
              .from("staff_profile")
              .update({ facepass: true, verified: true })
              .eq("user_id", user.id);
          } catch {}
          try {
            toast({
              title: "Face match successful",
              description: "Redirecting to dashboard...",
            });
          } catch {}
          router.replace("/dashboard");
          setVerifying(false);
          return;
        }
      }
      try {
        toast({
          title: "Face match failed",
          description: "Please recapture and try again.",
        });
      } catch {}
    } catch {}
    setVerifying(false);
  };

  const recapture = () => {
    setPreviewUrl(null);
    setVerifying(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <Card className="w-full max-w-lg shadow-xl border-0">
        <CardHeader>
          <div className="flex justify-center mb-2">
            {faceAnim && (
              <Lottie
                loop
                play
                animationData={faceAnim}
                style={{ width: 120, height: 120 }}
              />
            )}
          </div>
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
              <div className="aspect-video w-full bg-black/10 rounded-lg overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Captured selfie"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    mirrored
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                    videoConstraints={{ facingMode: "user" }}
                  />
                )}
              </div>
              <div className="flex justify-end gap-2">
                {!previewUrl ? (
                  <Button
                    onClick={complete}
                    disabled={verifying}
                    className="bg-green-600 hover:bg-green-700 transition-opacity active:opacity-70 disabled:opacity-50"
                  >
                    {verifying ? "Capturing..." : "Capture"}
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={recapture}
                      disabled={verifying}
                      variant="outline"
                      className="transition-opacity active:opacity-70 disabled:opacity-50"
                    >
                      Recapture
                    </Button>
                    <Button
                      onClick={proceed}
                      disabled={verifying}
                      className="bg-green-600 hover:bg-green-700 transition-opacity active:opacity-70 disabled:opacity-50"
                    >
                      {verifying ? "Verifying..." : "Proceed"}
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
