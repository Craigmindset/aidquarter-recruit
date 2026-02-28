import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function envs() {
  const env = process.env.QOREID_ENV === "live" ? "live" : "sandbox";
  const base =
    env === "live"
      ? process.env.QOREID_LIVE_BASE_URL || "https://api.qoreid.com"
      : process.env.QOREID_BASE_URL || "https://sandbox.qoreid.com";
  const clientId =
    env === "live" ? process.env.QOREID_LIVE_CLIENT_ID : process.env.QOREID_CLIENT_ID;
  const secret =
    env === "live"
      ? process.env.QOREID_LIVE_CLIENT_SECRET
      : process.env.QOREID_CLIENT_SECRET;
  return { base, clientId, secret };
}

async function getToken() {
  const { base, clientId, secret } = envs();
  const res = await fetch(`${base}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ clientId, secret }),
  });
  if (!res.ok) return null;
  const j = await res.json();
  return j?.access_token || j?.accessToken || j?.token || null;
}

function norm(s: string) {
  return (s || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const { nin, firstName, lastName } = await req.json();
    if (!nin || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const token = await getToken();
    if (!token) {
      return NextResponse.json({ error: "Auth error" }, { status: 502 });
    }
    const { base } = envs();
    const res = await fetch(`${base}/v1/ng/identities/nin/${encodeURIComponent(nin)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ firstname: firstName, lastname: lastName }),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      return NextResponse.json({ error: t || "Verification failed" }, { status: res.status });
    }
    const j = await res.json();
    const n = j?.nin ?? j;
    const retFirst = n?.firstname ?? "";
    const retLast = n?.lastname ?? "";
    const matched = norm(firstName) === norm(retFirst) && norm(lastName) === norm(retLast);
    const dob = n?.birthdate ?? n?.dateOfBirth ?? "";
    const gender = n?.gender ?? "";
    const address = n?.address ?? n?.residence?.address1 ?? n?.residence?.address ?? "";
    return NextResponse.json({
      matched,
      returned: { firstName: retFirst, lastName: retLast, dob, gender, address },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
