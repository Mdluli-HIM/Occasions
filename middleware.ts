import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Protects routes that require being signed in. Two tiers:
// - /provider-dashboard, /provider-onboarding: signed in AND role === "provider"
// - /saved: signed in, any role (customers use this; nothing stops a
//   provider account from saving other providers too)
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isProviderOnlyRoute =
    request.nextUrl.pathname.startsWith("/provider-dashboard") ||
    request.nextUrl.pathname.startsWith("/provider-onboarding");

  if (isProviderOnlyRoute && token.role !== "provider") {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/provider-dashboard/:path*", "/provider-onboarding/:path*", "/saved", "/events/:path*"],
};
