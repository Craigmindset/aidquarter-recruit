import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(req: NextRequest) {
  try {
    const { access_token, refresh_token } = await req.json();
    if (!access_token || !refresh_token) {
      return NextResponse.json({ error: "Missing tokens" }, { status: 400 });
    }

    const res = NextResponse.json({ ok: true });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
    const key =
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as
        | string
        | undefined) ||
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined);

    const supabase = createServerClient(
      (url || "") as string,
      (key || "") as string,
      {
        cookies: {
          get: (name: string) => req.cookies.get(name)?.value,
          set: (name: string, value: string, options: any) => {
            try {
              req.cookies.set({ name, value, ...options });
              res.cookies.set({ name, value, ...options });
            } catch {
              // ignore
            }
          },
          remove: (name: string, options: any) => {
            try {
              req.cookies.delete(name);
              res.cookies.delete(name);
            } catch {
              // ignore
            }
          },
        },
      },
    );

    await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
