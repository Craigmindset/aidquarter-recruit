import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
    const key = process.env.CLOUDINARY_API_KEY as string;
    const secret = process.env.CLOUDINARY_API_SECRET as string;
    if (!cloud || !key || !secret) {
      return NextResponse.json({ error: "Missing Cloudinary env" }, { status: 500 });
    }
    const form = await req.formData();
    const file = form.get("file") as unknown as File | null;
    const folder = (form.get("folder") as string) || "";
    const publicId = (form.get("public_id") as string) || "";
    const overwrite = (form.get("overwrite") as string) || "";
    const invalidate = (form.get("invalidate") as string) || "";
    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    const ts = Math.floor(Date.now() / 1000).toString();
    const params: Record<string, string> = {};
    if (folder) params.folder = folder;
    if (publicId) params.public_id = publicId;
    if (overwrite) params.overwrite = overwrite;
    if (invalidate) params.invalidate = invalidate;
    params.timestamp = ts;
    const entries = Object.entries(params).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    const toSign = entries.map(([k, v]) => `${k}=${v}`).join("&");
    const sig = crypto.createHash("sha1").update(`${toSign}${secret}`).digest("hex");
    const upload = new FormData();
    upload.append("file", file);
    upload.append("api_key", key);
    upload.append("timestamp", ts);
    upload.append("signature", sig);
    if (folder) upload.append("folder", folder);
    if (publicId) upload.append("public_id", publicId);
    if (overwrite) upload.append("overwrite", overwrite);
    if (invalidate) upload.append("invalidate", invalidate);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/auto/upload`, {
      method: "POST",
      body: upload as any,
    });
    if (!res.ok) {
      const t = await res.text();
      return NextResponse.json({ error: t || "Upload failed" }, { status: res.status });
    }
    const j = await res.json();
    return NextResponse.json({ url: j.secure_url || j.url || "" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
