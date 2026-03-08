import { NextResponse } from "next/server";
import { getQoreIdToken } from "@/lib/qoreid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const imageUrl: string | undefined = body?.imageUrl;
    const imageBase64: string | undefined = body?.imageBase64;
    if (!imageUrl && !imageBase64) {
      return NextResponse.json({ error: "image required" }, { status: 400 });
    }
    const url = process.env.QOREID_LIVENESS_URL;
    if (!url) {
      return NextResponse.json({ error: "QoreID not configured" }, { status: 501 });
    }
    const token = await getQoreIdToken();
    const payload: Record<string, any> = {};
    if (imageUrl) payload.imageUrl = imageUrl;
    if (imageBase64) payload.imageBase64 = imageBase64;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json({ error: "liveness_failed", detail: txt }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json({ data });
  } catch (e: any) {
    return NextResponse.json({ error: "server_error", detail: e?.message }, { status: 500 });
  }
}

