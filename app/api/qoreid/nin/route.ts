import { NextResponse } from "next/server";
import { getQoreIdToken } from "@/lib/qoreid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nin: string | undefined = body?.nin;
    if (!nin) {
      return NextResponse.json({ error: "nin required" }, { status: 400 });
    }
    const base =
      process.env.QOREID_NIN_VERIFY_URL ||
      "https://api.qoreid.com/v1/ng/identities/nin/{idNumber}";
    const firstname = body?.firstname || body?.firstName;
    const lastname = body?.lastname || body?.lastName;
    const middlename = body?.middlename || body?.middleName;
    const dob = body?.dob;
    const phone = body?.phone;
    const email = body?.email;
    const gender = body?.gender;
    const url = base.includes("{idNumber}")
      ? base.replace("{idNumber}", nin)
      : base.endsWith("/")
        ? `${base}${nin}`
        : `${base}/${nin}`;
    const token = await getQoreIdToken();
    const payload: Record<string, any> = {};
    if (firstname) payload.firstname = firstname;
    if (lastname) payload.lastname = lastname;
    if (middlename) payload.middlename = middlename;
    if (dob) payload.dob = dob;
    if (phone) payload.phone = phone;
    if (email) payload.email = email;
    if (gender) payload.gender = gender;
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
        const token2 = await getQoreIdToken({ force: true, ignoreEnv: true });
        res = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            authorization: `Bearer ${token2}`,
          },
          body: JSON.stringify(payload),
        });
      } catch {}
    }
    if (!res.ok) {
      let detail: any = null;
      let text: string | null = null;
      try {
        detail = await res.json();
      } catch {
        text = await res.text().catch(() => null);
      }
      return NextResponse.json(
        {
          error: "verification_failed",
          status: res.status,
          detail: detail ?? text ?? "Upstream error",
        },
        { status: 502 },
      );
    }
    const data = await res.json();
    try {
      if (process.env.NODE_ENV !== "production") {
        const redact = (o: any): any => {
          if (o && typeof o === "object") {
            for (const k of Object.keys(o)) {
              if (
                k === "photo" ||
                k === "signature" ||
                k === "photoBase64" ||
                k === "imageBase64"
              ) {
                (o as any)[k] = "[redacted]";
              } else {
                const v = (o as any)[k];
                if (v && typeof v === "object") redact(v);
              }
            }
          }
          return o;
        };
        const safe = redact(JSON.parse(JSON.stringify(data)));
        console.log("[QoreID:NIN] response", safe);
      }
    } catch {}
    return NextResponse.json({ data });
  } catch (e: any) {
    return NextResponse.json(
      { error: "server_error", detail: e?.message },
      { status: 500 },
    );
  }
}
