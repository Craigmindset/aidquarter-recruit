import { NextResponse } from "next/server";
import { getQoreIdToken } from "@/lib/qoreid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nin: string | undefined = body?.nin;
    const imageUrl: string | undefined = body?.imageUrl;
    const imageBase64: string | undefined = body?.imageBase64;
    if (!nin) {
      return NextResponse.json({ error: "nin required" }, { status: 400 });
    }
    if (!imageUrl && !imageBase64) {
      return NextResponse.json({ error: "image required" }, { status: 400 });
    }
    const url =
      process.env.QOREID_NIN_LIVENESS_URL ||
      "https://api.qoreid.com/v1/ng/identities/face-verification/nin";
    const token = await getQoreIdToken();
    const payload: Record<string, any> = { idNumber: nin };
    if (imageUrl) {
      payload.imageUrl = imageUrl;
      payload.photoUrl = imageUrl;
    }
    if (imageBase64) {
      payload.imageBase64 = imageBase64;
      payload.photoBase64 = imageBase64;
    }
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (res.status === 401) {
      try {
        const token2 = await getQoreIdToken({
          force: true,
          ignoreEnv: true,
        } as any);
        res = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            authorization: `Bearer ${token2}`,
          },
          body: JSON.stringify(payload),
        });
      } catch (e: any) {
        console.error(
          "[QoreID:NIN:FACE] token refresh failed",
          e?.message || e,
        );
      }
    }
    if (!res.ok) {
      let detail: any = null;
      let text: string | null = null;
      try {
        detail = await res.json();
      } catch {
        try {
          text = await res.text();
        } catch {}
      }
      console.error("[QoreID:NIN:FACE] upstream error", {
        status: res.status,
        detail: detail ?? text,
      });
      return NextResponse.json(
        {
          error: "face_verification_failed",
          status: res.status,
          detail: detail ?? text,
        },
        { status: 502 },
      );
    }
    const data = await res.json();
    try {
      console.log("[QoreID:NIN:FACE] ok", { keys: Object.keys(data || {}) });
    } catch {}
    return NextResponse.json({ data });
  } catch (e: any) {
    return NextResponse.json(
      { error: "server_error", detail: e?.message },
      { status: 500 },
    );
  }
}
