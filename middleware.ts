import type { NextRequest } from "next/server";
import { runMiddleware } from "@/lib/middleware";

export async function middleware(req: NextRequest) {
  return runMiddleware(req);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
