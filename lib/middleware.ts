import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const protectedMatchers = ["/dashboard/:path*"];

export async function runMiddleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string,
    {
      cookies: {
        get: (name: string) => req.cookies.get(name)?.value,
        set: (name: string, value: string, options: any) => {
          try {
            req.cookies.set({ name, value, ...options });
            res.cookies.set({ name, value, ...options });
          } catch {
            // noop
          }
        },
        remove: (name: string, options: any) => {
          try {
            req.cookies.delete(name);
            res.cookies.delete(name);
          } catch {
            // noop
          }
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  if (pathname.startsWith("/dashboard") && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", pathname + (url.search || ""));
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}
