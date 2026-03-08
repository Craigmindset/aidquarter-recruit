import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { access_token, refresh_token } = await req.json();
    if (!access_token || !refresh_token) {
      return NextResponse.json({ error: "Missing tokens" }, { status: 400 });
    }

    const res = NextResponse.json({ ok: true });
    const store = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string) ||
        (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string),
      {
        cookies: {
          get: (name: string) => store.get(name)?.value,
          set: (name: string, value: string, options: CookieOptions) => {
            try {
              res.cookies.set(name, value, options as any);
            } catch {}
          },
          remove: (name: string, options: CookieOptions) => {
            try {
              res.cookies.set(name, "", { ...(options as any), maxAge: 0 });
            } catch {}
          },
        },
      },
    );

    await supabase.auth.setSession({ access_token, refresh_token });

    return res;
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
